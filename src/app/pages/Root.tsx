import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { CartSidebar } from '../components/CartSidebar';
import { Footer } from '../components/Footer';
import { AppProvider } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

export function Root() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
        <div className="overflow-x-hidden"></div>
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartSidebar />
        <BottomNav />
      </div>
    </AppProvider>
  );
}