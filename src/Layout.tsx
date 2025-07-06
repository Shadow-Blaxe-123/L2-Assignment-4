import type { PropsWithChildren } from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { Toaster } from "sonner";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
