import type { PropsWithChildren } from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Toaster } from "sonner";
import Loader from "./Components/Loader";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <Loader />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
