import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import { useTopLoading } from "./hooks";
import { useBackToTop } from "./hooks";
const Layout = () => {
  useTopLoading()
    return (
    <>
    {
      useBackToTop()
    }
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
