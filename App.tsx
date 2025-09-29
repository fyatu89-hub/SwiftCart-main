import React, { useState, useEffect } from 'react';
import { Product, Order, Settings, View, OrderStatus, DiscountCode, Admin, Page } from './types';
import { PRODUCTS_DATA } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetailPage from './components/ProductDetailPage';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import DynamicPage from './components/DynamicPage';

// Initial Data
const INITIAL_SETTINGS: Settings = {
  siteName: 'SwiftCart Music',
  logoUrl: '',
  currency: '$',
  primaryColor: '#4f46e5', // indigo-600
  navLinks: [
    { id: 1, label: 'Home', href: '/products' },
    { id: 2, label: 'Guitars', href: '/category/guitars' },
    { id: 3, label: 'Keyboards', href: '/category/keyboards' },
    { id: 4, label: 'Drums', href: '/category/drums' },
    { id: 5, label: 'Studio Gear', href: '/category/studio-gear' },
    { id: 6, label: 'Orchestral', href: '/category/orchestral' },
    { id: 7, label: 'About Us', href: '/about' },
    { id: 8, label: 'Contact', href: '/contact' },
  ],
  footerLinks: [
    { id: 1, label: 'Privacy Policy', href: '/privacy' },
    { id: 2, label: 'Terms of Service', href: '/terms' },
  ],
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
  },
  footerDescription: 'Your one-stop shop for the finest musical instruments, offering a wide range of products from guitars to keyboards, all at competitive prices.',
  footerCopyrightText: `© ${new Date().getFullYear()} SwiftCart Music. All Rights Reserved.`,
};

const INITIAL_PAGES: Page[] = [
    { id: 1, title: 'About Us', slug: '/about', content: 'Founded in 2023, SwiftCart started as a small project by a group of music enthusiasts who wanted to make professional-grade instruments more accessible. Today, we\'ve grown into a trusted online retailer, known for our curated selection, expert advice, and commitment to customer satisfaction. We are more than just a store; we are a community of musicians.' },
    { id: 2, title: 'Contact', slug: '/contact', content: 'We\'d love to hear from you! Whether you have a question about our products, an order, or anything else, our team is ready to answer all your questions. Email us at support@swiftcartmusic.com or call us at (555) 123-4567.' },
    { id: 3, title: 'Privacy Policy', slug: '/privacy', content: 'This is the privacy policy. We respect your privacy and are committed to protecting it. This policy describes the types of information we may collect from you or that you may provide when you visit our website and our practices for collecting, using, maintaining, protecting, and disclosing that information.' },
    { id: 4, title: 'Terms of Service', slug: '/terms', content: 'These are the terms of service. By accessing or using our website, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.' },
];

const App: React.FC = () => {
  // State Management
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);
  const [discounts, setDiscounts] = useState<DiscountCode[]>([{ code: 'SAVE10', discount: 10 }]);
  const [pages, setPages] = useState<Page[]>(INITIAL_PAGES);
  const [admins, setAdmins] = useState<Admin[]>([{ id: 1, username: 'admin', password: 'password' }]);
  
  // UI State
  const [currentView, setCurrentView] = useState<View>(View.Shop);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPageSlug, setCurrentPageSlug] = useState<string>('/products');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loggedInAdmin, setLoggedInAdmin] = useState<Admin | null>(null);
  const [loginError, setLoginError] = useState<string>('');

  // Apply primary color from settings to the root element
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary-500', settings.primaryColor);
    document.documentElement.style.setProperty('--color-primary-600', settings.primaryColor); // Assuming a slightly darker shade
    document.documentElement.style.setProperty('--color-primary-700', settings.primaryColor); // Assuming an even darker shade
  }, [settings.primaryColor]);

  // Handlers
  const handleLogin = (username: string, password) => {
    const admin = admins.find(a => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password);
    if (admin) {
      setIsAuthenticated(true);
      setLoggedInAdmin(admin);
      setLoginError('');
      setCurrentView(View.Admin);
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInAdmin(null);
    setCurrentView(View.Shop);
  };
  
  const handleOrderSubmit = (orderDetails: Omit<Order, 'id' | 'timestamp' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderDetails,
      id: `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: OrderStatus.Pending,
    };
    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...product, id: Date.now() };
    setProducts(prev => [newProduct, ...prev]);
  };
  
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };
  
  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  }
  
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
  }
  
  const handleAddDiscount = (discount: DiscountCode) => {
      setDiscounts(prev => [...prev, discount]);
  }

  const handleDeleteDiscount = (code: string) => {
      setDiscounts(prev => prev.filter(d => d.code !== code));
  }

  const handleAddPage = (page: Omit<Page, 'id'>) => {
    const newPage: Page = { ...page, id: Date.now() };
    setPages(prev => [...prev, newPage]);
  };

  const handleUpdatePage = (updatedPage: Page) => {
    setPages(prev => prev.map(p => p.id === updatedPage.id ? updatedPage : p));
  };

  const handleDeletePage = (pageId: number) => {
    setPages(prev => prev.filter(p => p.id !== pageId));
  };


  const renderShopView = () => {
    const page = pages.find(p => p.slug === currentPageSlug);

    let content;
    if (selectedProduct) {
        content = <ProductDetailPage 
            product={selectedProduct} 
            onBackToListing={() => setSelectedProduct(null)} 
            onSubmit={handleOrderSubmit}
            currency={settings.currency}
        />;
    } else if (currentPageSlug.startsWith('/category/')) {
        const categorySlug = currentPageSlug.split('/')[2];
        const categoryName = settings.navLinks.find(link => link.href === currentPageSlug)?.label || 'Products';
        const filteredProducts = products.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === categorySlug);
        content = <ProductList 
            title={categoryName}
            products={filteredProducts} 
            onProductSelect={setSelectedProduct} 
            currency={settings.currency}
        />;
    } else if (currentPageSlug === '/products') {
        content = <ProductList 
            products={products} 
            onProductSelect={setSelectedProduct} 
            currency={settings.currency}
        />;
    } else if (page) {
        content = <DynamicPage title={page.title} content={page.content} />;
    } else {
        content = <ProductList 
            products={products} 
            onProductSelect={setSelectedProduct} 
            currency={settings.currency}
        />; // Default fallback
    }

    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header 
            setCurrentView={setCurrentView} 
            setCurrentPageSlug={(slug) => { setSelectedProduct(null); setCurrentPageSlug(slug); }} 
            settings={settings}
            orderCount={orders.filter(o => o.status === OrderStatus.Pending).length}
        />
        <main className="flex-grow container mx-auto p-4 md:p-8">
            {content}
        </main>
        <Footer settings={settings} setCurrentView={setCurrentView} setCurrentPageSlug={(slug) => { setSelectedProduct(null); setCurrentPageSlug(slug); }} />
      </div>
    );
  }

  const renderAdminView = () => {
    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} error={loginError} />
    }
    return <AdminDashboard
        products={products}
        orders={orders}
        settings={settings}
        discounts={discounts}
        pages={pages}
        admins={admins}
        loggedInAdmin={loggedInAdmin}
        onLogout={handleLogout}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onDeleteOrder={handleDeleteOrder}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateSettings={setSettings}
        onAddDiscount={handleAddDiscount}
        onDeleteDiscount={handleDeleteDiscount}
        onAddPage={handleAddPage}
        onUpdatePage={handleUpdatePage}
        onDeletePage={handleDeletePage}
        setAdmins={setAdmins}
    />;
  }

  return (
    <>
      <style>{`
        :root {
          --color-primary-500: ${settings.primaryColor};
          --color-primary-600: ${settings.primaryColor};
          --color-primary-700: ${settings.primaryColor};
          --color-secondary: #1f2937; /* gray-800 */
        }
      `}</style>
      {currentView === View.Shop ? renderShopView() : renderAdminView()}
    </>
  );
};

export default App;