import { Outlet, useLocation } from "react-router-dom";
import { Footer, Header } from "./components";
import { useTopLoading } from "./hooks";
import { useBackToTop } from "./hooks";
import { ToastContainer } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  useTopLoading()
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {useBackToTop()}
      <ToastContainer />
      <Header />

      <main className="flex-grow pt-20 sm:pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
