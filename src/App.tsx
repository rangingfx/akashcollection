import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, Check, ChevronRight, Edit3, ImagePlus, LogOut, Menu, Minus,
  Package, Plus, Search, ShieldCheck, ShoppingBag, Trash2, Truck, X,
} from 'lucide-react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import {
  auth, listProducts, Product, removeProduct, saveProduct, uploadProductImages,
} from './lib/firebase';

const WHATSAPP_NUMBER = '923115930237';
const money = (value: number) => `Rs. ${value.toLocaleString('en-PK')}`;

type CartItem = { product: Product; quantity: number };
type ProductDraft = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
const emptyDraft: ProductDraft = {
  name: '', description: '', price: 0, compareAtPrice: null, category: 'Unstitched',
  sku: '', stock: 0, imageUrls: [], active: true, featured: false,
};

function Logo() {
  return <a href="/" className="logo" aria-label="Akash Collection home"><span>AKASH</span><small>COLLECTION</small></a>;
}

function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [queryText, setQueryText] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('akash-cart') || '[]'); } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    listProducts().then(setProducts).catch(() => setLoadError('Products are temporarily unavailable. Please contact us on WhatsApp.')).finally(() => setLoading(false));
  }, []);
  useEffect(() => { localStorage.setItem('akash-cart', JSON.stringify(cart)); }, [cart]);

  const active = products.filter((product) => product.active);
  const categories = ['All', ...Array.from(new Set(active.map((product) => product.category)))];
  const visible = useMemo(() => active.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const needle = queryText.toLowerCase().trim();
    const matchesSearch = !needle || `${product.name} ${product.category} ${product.sku}`.toLowerCase().includes(needle);
    return matchesCategory && matchesSearch;
  }), [active, category, queryText]);
  const featured = active.find((product) => product.featured) || active[0];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    if (product.stock < 1) return;
    setCart((current) => {
      const found = current.find((item) => item.product.id === product.id);
      return found
        ? current.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item)
        : [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const setQuantity = (id: string, quantity: number) => setCart((current) => current
    .map((item) => item.product.id === id ? { ...item, quantity: Math.min(quantity, item.product.stock) } : item)
    .filter((item) => item.quantity > 0));
  const orderOnWhatsApp = () => {
    if (!cart.length) return;
    const lines = cart.map((item) => `• ${item.product.name} (${item.product.sku}) × ${item.quantity} — ${money(item.product.price * item.quantity)}`);
    const message = `Assalam-o-Alaikum, I would like to order:\n\n${lines.join('\n')}\n\nTotal: ${money(total)}\n\nPlease confirm availability and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return <div className="site-shell">
    <div className="announcement">Free delivery across Pakistan on orders above Rs. 2,500</div>
    <header className="store-header">
      <div className="container header-row">
        <button className="icon-button mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"><Menu /></button>
        <Logo />
        <nav className={menuOpen ? 'store-nav open' : 'store-nav'} aria-label="Main navigation">
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our promise</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}>
          <ShoppingBag /><span>Bag</span>{cartCount > 0 && <b>{cartCount}</b>}
        </button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Akash Collection · Pakistan</p>
            <h1>Beautiful clothing.<br/>Simple shopping.</h1>
            <p>Carefully selected unstitched and ready-to-wear pieces, clear pricing, and personal service on WhatsApp.</p>
            <div className="hero-actions"><a className="button primary" href="#shop">Shop collection <ChevronRight /></a><a className="button quiet" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">Ask a question</a></div>
            <div className="trust-row"><span><ShieldCheck />Authentic products</span><span><Truck />Nationwide delivery</span></div>
          </div>
          <div className="hero-visual">
            {featured ? <><img src={featured.imageUrls[0] || '/lawn-1.jpeg'} alt={featured.name}/><div className="hero-product"><span>Featured</span><strong>{featured.name}</strong><small>{money(featured.price)}</small></div></> : <img src="/lawn-1.jpeg" alt="Akash Collection fabric"/>}
          </div>
        </div>
      </section>

      <section className="shop-section container" id="shop">
        <div className="section-heading"><div><p className="eyebrow">New collection</p><h2>Shop what you love</h2></div><p>{active.length} products available</p></div>
        <div className="shop-tools">
          <label className="search-field"><Search/><span className="sr-only">Search products</span><input value={queryText} onChange={(event) => setQueryText(event.target.value)} placeholder="Search by name or SKU"/></label>
          <div className="category-tabs" aria-label="Product categories">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
        </div>

        {loading && <div className="state-card"><div className="spinner"/><h3>Loading the collection…</h3></div>}
        {loadError && <div className="state-card error"><h3>We couldn’t load the shop</h3><p>{loadError}</p><a className="button primary" href={`https://wa.me/${WHATSAPP_NUMBER}`}>Chat on WhatsApp</a></div>}
        {!loading && !loadError && visible.length === 0 && <div className="state-card"><Package/><h3>{active.length ? 'No matching products' : 'New products are coming soon'}</h3><p>{active.length ? 'Try another search or category.' : 'Contact us on WhatsApp for today’s available designs.'}</p></div>}
        <div className="product-grid">{visible.map((product) => <article className="product-card" key={product.id}>
          <div className="product-image"><img src={product.imageUrls[0] || '/lawn-1.jpeg'} alt={product.name} loading="lazy"/>{product.featured && <span className="badge">Featured</span>}{product.stock < 1 && <span className="sold-out">Sold out</span>}</div>
          <div className="product-info"><p>{product.category}</p><h3>{product.name}</h3><div className="price"><strong>{money(product.price)}</strong>{product.compareAtPrice && product.compareAtPrice > product.price ? <s>{money(product.compareAtPrice)}</s> : null}</div><button className="button primary full" disabled={product.stock < 1} onClick={() => addToCart(product)}>{product.stock < 1 ? 'Out of stock' : 'Add to bag'}</button></div>
        </article>)}</div>
      </section>

      <section className="promise" id="about"><div className="container promise-grid"><div><p className="eyebrow">Our promise</p><h2>A straightforward way to shop.</h2></div><div className="promise-list"><article><span>01</span><h3>Clear details</h3><p>Honest availability, simple pricing, and product information you can understand.</p></article><article><span>02</span><h3>Personal confirmation</h3><p>Every order is confirmed by our team on WhatsApp before dispatch.</p></article><article><span>03</span><h3>Support that responds</h3><p>Questions about fabric, size, or delivery? Speak directly with our team.</p></article></div></div></section>
    </main>

    <footer><div className="container footer-grid"><Logo/><p>Quality clothing, carefully selected for customers across Pakistan.</p><div><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp</a><a href="mailto:info@akashcollection.pk">Email</a></div></div><div className="container footer-bottom">© 2026 Akash Collection. All rights reserved.</div></footer>

    {cartOpen && <div className="drawer-layer" role="dialog" aria-modal="true" aria-label="Shopping bag"><button className="drawer-backdrop" onClick={() => setCartOpen(false)} aria-label="Close cart"/><aside className="cart-drawer"><div className="drawer-head"><div><p className="eyebrow">Your order</p><h2>Shopping bag</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X/></button></div>{!cart.length ? <div className="empty-cart"><ShoppingBag/><h3>Your bag is empty</h3><p>Add a product to start your order.</p></div> : <><div className="cart-items">{cart.map(({ product, quantity }) => <article className="cart-item" key={product.id}><img src={product.imageUrls[0] || '/lawn-1.jpeg'} alt=""/><div><h3>{product.name}</h3><p>{money(product.price)}</p><div className="quantity"><button onClick={() => setQuantity(product.id, quantity - 1)} aria-label="Decrease quantity"><Minus/></button><span>{quantity}</span><button onClick={() => setQuantity(product.id, quantity + 1)} aria-label="Increase quantity"><Plus/></button></div></div><button className="remove" onClick={() => setQuantity(product.id, 0)} aria-label={`Remove ${product.name}`}><Trash2/></button></article>)}</div><div className="cart-summary"><div><span>Total</span><strong>{money(total)}</strong></div><p>Delivery charges are confirmed before dispatch.</p><button className="button whatsapp full" onClick={orderOnWhatsApp}>Order on WhatsApp <ChevronRight/></button></div></>}</aside></div>}
  </div>;
}

function AdminLogin({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); setBusy(true); setError(''); try { await onLogin(email, password); } catch (err) { setError(err instanceof Error ? err.message : 'Unable to sign in.'); } finally { setBusy(false); } };
  return <main className="admin-login"><section className="login-card"><a href="/" className="back-link"><ArrowLeft/> Back to store</a><Logo/><div><p className="eyebrow">Secure access</p><h1>Store administration</h1><p>Sign in to manage the Akash Collection product catalog.</p></div><form onSubmit={submit} className="admin-form"><label>Email<input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required/></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required/></label>{error && <p className="form-error">{error}</p>}<button className="button primary full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button></form></section></main>;
}

function ProductEditor({ initial, onCancel, onSaved }: { initial?: Product; onCancel: () => void; onSaved: () => void }) {
  const [draft, setDraft] = useState<ProductDraft>(initial ? { name: initial.name, description: initial.description, price: initial.price, compareAtPrice: initial.compareAtPrice || null, category: initial.category, sku: initial.sku, stock: initial.stock, imageUrls: initial.imageUrls, active: initial.active, featured: initial.featured } : emptyDraft);
  const [files, setFiles] = useState<File[]>([]); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const field = <K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent) => { event.preventDefault(); setBusy(true); setError(''); try { const uploaded = files.length ? await uploadProductImages(files) : []; await saveProduct({ ...draft, price: Number(draft.price), compareAtPrice: draft.compareAtPrice ? Number(draft.compareAtPrice) : null, stock: Number(draft.stock), imageUrls: [...draft.imageUrls, ...uploaded] }, initial?.id); onSaved(); } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save product.'); } finally { setBusy(false); } };
  return <div className="modal-layer" role="dialog" aria-modal="true" aria-label={initial ? 'Edit product' : 'Add product'}><button className="drawer-backdrop" onClick={onCancel} aria-label="Close editor"/><section className="product-editor"><div className="drawer-head"><div><p className="eyebrow">Product details</p><h2>{initial ? 'Edit product' : 'Add a product'}</h2></div><button className="icon-button" onClick={onCancel}><X/></button></div><form onSubmit={submit} className="admin-form product-form"><div className="form-grid"><label>Product name<input value={draft.name} onChange={(e) => field('name', e.target.value)} required maxLength={120}/></label><label>SKU<input value={draft.sku} onChange={(e) => field('sku', e.target.value.toUpperCase())} required maxLength={40}/></label><label>Category<input value={draft.category} onChange={(e) => field('category', e.target.value)} required maxLength={50}/></label><label>Stock<input type="number" min="0" value={draft.stock} onChange={(e) => field('stock', Number(e.target.value))} required/></label><label>Price (PKR)<input type="number" min="0" step="1" value={draft.price || ''} onChange={(e) => field('price', Number(e.target.value))} required/></label><label>Compare-at price<input type="number" min="0" step="1" value={draft.compareAtPrice || ''} onChange={(e) => field('compareAtPrice', Number(e.target.value) || null)}/></label></div><label>Description<textarea value={draft.description} onChange={(e) => field('description', e.target.value)} rows={5} required maxLength={1200}/></label><label className="upload-box"><ImagePlus/><span><strong>Upload product images</strong><small>JPG, PNG, WebP · up to 5 MB each</small></span><input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))}/></label>{files.length > 0 && <p className="file-note">{files.length} image{files.length > 1 ? 's' : ''} selected</p>}{draft.imageUrls.length > 0 && <div className="image-list">{draft.imageUrls.map((url) => <div key={url}><img src={url} alt="Product preview"/><button type="button" onClick={() => field('imageUrls', draft.imageUrls.filter((item) => item !== url))}><X/></button></div>)}</div>}<div className="check-row"><label><input type="checkbox" checked={draft.active} onChange={(e) => field('active', e.target.checked)}/> Visible in store</label><label><input type="checkbox" checked={draft.featured} onChange={(e) => field('featured', e.target.checked)}/> Featured product</label></div>{error && <p className="form-error">{error}</p>}<div className="form-actions"><button type="button" className="button quiet" onClick={onCancel}>Cancel</button><button className="button primary" disabled={busy}>{busy ? 'Saving…' : 'Save product'}</button></div></form></section></div>;
}

function AdminDashboard({ user }: { user: User }) {
  const [products, setProducts] = useState<Product[]>([]); const [loading, setLoading] = useState(true); const [queryText, setQueryText] = useState(''); const [editing, setEditing] = useState<Product | 'new' | null>(null); const [error, setError] = useState('');
  const refresh = () => { setLoading(true); listProducts().then(setProducts).catch(() => setError('Could not load products.')).finally(() => setLoading(false)); };
  useEffect(refresh, []);
  const filtered = products.filter((product) => `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(queryText.toLowerCase()));
  const remove = async (product: Product) => { if (!window.confirm(`Delete “${product.name}”? This cannot be undone.`)) return; try { await removeProduct(product); refresh(); } catch { setError('Could not delete the product.'); } };
  return <div className="admin-shell"><aside className="admin-sidebar"><Logo/><nav><a className="active" href="#products"><Package/> Products</a><a href="/"><ArrowLeft/> View store</a></nav><div className="admin-user"><span>{user.email}</span><button onClick={() => signOut(auth)}><LogOut/> Sign out</button></div></aside><main className="admin-main"><header className="admin-top"><div><p className="eyebrow">Store workspace</p><h1>Products</h1><p>Add products, update stock, and control what customers see.</p></div><button className="button primary" onClick={() => setEditing('new')}><Plus/> Add product</button></header><section className="stat-grid"><article><span>Total products</span><strong>{products.length}</strong></article><article><span>Visible</span><strong>{products.filter((p) => p.active).length}</strong></article><article><span>Low stock</span><strong>{products.filter((p) => p.stock > 0 && p.stock <= 5).length}</strong></article><article><span>Out of stock</span><strong>{products.filter((p) => p.stock === 0).length}</strong></article></section><section className="admin-panel" id="products"><div className="panel-tools"><label className="search-field"><Search/><span className="sr-only">Search products</span><input value={queryText} onChange={(e) => setQueryText(e.target.value)} placeholder="Search products"/></label></div>{error && <p className="form-error panel-error">{error}</p>}{loading ? <div className="state-card"><div className="spinner"/>Loading products…</div> : !filtered.length ? <div className="state-card"><Package/><h3>{products.length ? 'No matching products' : 'Your store is ready for its first product'}</h3><p>Add a product with images, price, stock, and category.</p><button className="button primary" onClick={() => setEditing('new')}><Plus/> Add product</button></div> : <div className="product-table"><div className="table-row table-head"><span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Status</span><span>Actions</span></div>{filtered.map((product) => <div className="table-row" key={product.id}><div className="table-product"><img src={product.imageUrls[0] || '/lawn-1.jpeg'} alt=""/><div><strong>{product.name}</strong><small>{product.sku}</small></div></div><span data-label="Category">{product.category}</span><strong data-label="Price">{money(product.price)}</strong><span data-label="Stock">{product.stock}</span><span data-label="Status" className={product.active ? 'status active' : 'status'}>{product.active ? <><Check/> Live</> : 'Hidden'}</span><div className="table-actions"><button onClick={() => setEditing(product)} aria-label={`Edit ${product.name}`}><Edit3/></button><button className="danger" onClick={() => remove(product)} aria-label={`Delete ${product.name}`}><Trash2/></button></div></div>)}</div>}</section></main>{editing && <ProductEditor initial={editing === 'new' ? undefined : editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); refresh(); }}/>}</div>;
}

function AdminApp() {
  const [user, setUser] = useState<User | null>(null); const [allowed, setAllowed] = useState<boolean | null>(null); const [authError, setAuthError] = useState('');
  const hasAdminAccess = (candidate: User) => candidate.email?.toLowerCase() === 'admin@rangingfx.com' && candidate.emailVerified;
  useEffect(() => { document.title = 'Admin · Akash Collection'; const meta = document.querySelector('meta[name="robots"]'); meta?.setAttribute('content', 'noindex, nofollow'); return onAuthStateChanged(auth, (next) => { setUser(next); setAllowed(next ? hasAdminAccess(next) : false); }); }, []);
  const login = async (email: string, password: string) => { const result = await signInWithEmailAndPassword(auth, email, password); if (!hasAdminAccess(result.user)) { await signOut(auth); throw new Error('Use the verified admin@rangingfx.com administrator account.'); } setAuthError(''); };
  if (allowed === null) return <div className="full-loader"><div className="spinner"/>Checking access…</div>;
  if (!user || !allowed) return <><AdminLogin onLogin={login}/>{authError && <p>{authError}</p>}</>;
  return <AdminDashboard user={user}/>;
}

export default function App() {
  return window.location.pathname.startsWith('/admin') ? <AdminApp/> : <Storefront/>;
}
