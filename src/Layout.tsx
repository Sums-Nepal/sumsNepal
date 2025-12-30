import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import { useTopLoading } from "./hooks";
import { useBackToTop } from "./hooks";
 import { ToastContainer } from 'react-toastify';
const Layout = () => {
  useTopLoading()
    return (
    <>
    {
      useBackToTop()
    }
    <ToastContainer/>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
