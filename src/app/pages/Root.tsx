import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { CartSidebar } from '../components/CartSidebar';
import { Footer } from '../components/Footer';
import { AppProvider } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import { ScrollToTop } from '../components/ScrollToTop';

export function Root() {
  return (
    <AppProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col w-full overflow-x-hidden">
        <Header />
        <main className="mt-0 md:mt-6 flex-1 w-full overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
        <CartSidebar />
        <BottomNav />
      </div>
    </AppProvider>
  );
}