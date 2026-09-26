import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  initializeFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import config from '../../firebase-applet-config.json';

const app = getApps().length ? getApp() : initializeApp(config);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {}, config.firestoreDatabaseId);
export const storage = getStorage(app);

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  category: string;
  sku: string;
  stock: number;
  imageUrls: string[];
  active: boolean;
  featured: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
};

const productsRef = collection(db, 'products');

export async function listProducts(): Promise<Product[]> {
  const snapshot = await getDocs(query(productsRef, orderBy('createdAt', 'desc')));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Product));
}

export async function saveProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
  const productRef = id ? doc(db, 'products', id) : doc(productsRef);
  const existing = id ? await getDoc(productRef) : null;
  await setDoc(productRef, {
    ...product,
    updatedAt: serverTimestamp(),
    ...(!existing?.exists() ? { createdAt: serverTimestamp() } : {}),
  }, { merge: true });
  return productRef.id;
}

export async function removeProduct(product: Product) {
  await deleteDoc(doc(db, 'products', product.id));
  await Promise.all(product.imageUrls
    .filter((url) => url.includes('firebasestorage.googleapis.com'))
    .map(async (url) => {
      try { await deleteObject(ref(storage, url)); } catch { /* file may already be gone */ }
    }));
}

export async function uploadProductImages(files: File[]): Promise<string[]> {
  return Promise.all(files.map(async (file) => {
    if (!file.type.startsWith('image/')) throw new Error(`${file.name} is not an image.`);
    if (file.size > 5 * 1024 * 1024) throw new Error(`${file.name} is larger than 5 MB.`);
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
    const objectRef = ref(storage, `products/${crypto.randomUUID()}-${safeName}`);
    await uploadBytes(objectRef, file, { contentType: file.type });
    return getDownloadURL(objectRef);
  }));
}
