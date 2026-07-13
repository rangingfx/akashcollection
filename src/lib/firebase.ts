import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  getDocFromServer,
  setDoc,
  DocumentData,
  initializeFirestore
} from "firebase/firestore";
import config from "../../firebase-applet-config.json";

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(config) : getApp();

// Initialize Firestore (with support for custom database ID)
const db = config.firestoreDatabaseId 
  ? initializeFirestore(app, {}, config.firestoreDatabaseId)
  : getFirestore(app);

// Test Firestore connection on boot
export async function testFirestoreConnection() {
  try {
    // Attempt an offline-safe check or direct fetch
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firestore connection test completed.");
  } catch (error) {
    if (error instanceof Error && error.message.includes("offline")) {
      console.warn("Firestore appears to be offline. Local cache will be used.", error);
    } else {
      console.error("Firestore connection error:", error);
    }
  }
}

// Automatically test connection on module load
testFirestoreConnection();

export { db };

// Interfaces matching firebase-blueprint
export interface FirestoreOrder {
  id: string;
  date: string;
  status: string;
  total: number;
  subtotal: number;
  shippingFee: number;
  carrier?: string;
  trackingNo?: string;
  trackingUrl?: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    paymentMethod: string;
    bankReceiptImage?: string;
  };
  items: Array<{
    product: {
      id: string;
      title: string;
      price: number;
      sku: string;
      image: string;
      fabric: string;
      pieces: number;
    };
    selectedSize: string;
    quantity: number;
  }>;
}

export interface FirestoreReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  verified: boolean;
  date: string;
}

// --- Orders Collection Helpers ---

export async function saveOrderToFirestore(order: FirestoreOrder): Promise<void> {
  try {
    // We use the order.id as the document ID for absolute uniqueness
    const orderRef = doc(db, "orders", order.id);
    await setDoc(orderRef, order);
    console.log(`Successfully persisted order ${order.id} to Firestore!`);
  } catch (err) {
    console.error(`Failed to save order ${order.id} to Firestore:`, err);
    throw err;
  }
}

export async function fetchOrdersFromFirestore(): Promise<FirestoreOrder[]> {
  try {
    const ordersCol = collection(db, "orders");
    const q = query(ordersCol);
    const snapshot = await getDocs(q);
    const orders: FirestoreOrder[] = [];
    snapshot.forEach((doc) => {
      orders.push(doc.data() as FirestoreOrder);
    });
    // Sort descending by date (most recent first)
    return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error("Failed to fetch orders from Firestore:", err);
    return [];
  }
}

// --- Reviews Collection Helpers ---

export async function saveReviewToFirestore(review: FirestoreReview): Promise<void> {
  try {
    const reviewRef = doc(db, "reviews", review.id);
    await setDoc(reviewRef, review);
    console.log(`Successfully persisted review ${review.id} to Firestore!`);
  } catch (err) {
    console.error(`Failed to save review ${review.id} to Firestore:`, err);
    throw err;
  }
}

export async function fetchReviewsFromFirestore(): Promise<FirestoreReview[]> {
  try {
    const reviewsCol = collection(db, "reviews");
    const q = query(reviewsCol);
    const snapshot = await getDocs(q);
    const reviews: FirestoreReview[] = [];
    snapshot.forEach((doc) => {
      reviews.push(doc.data() as FirestoreReview);
    });
    return reviews;
  } catch (err) {
    console.error("Failed to fetch reviews from Firestore:", err);
    return [];
  }
}
