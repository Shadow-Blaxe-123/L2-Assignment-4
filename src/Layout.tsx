import type { PropsWithChildren } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Loader from "@/components/Loader";

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
