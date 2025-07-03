import type { PropsWithChildren } from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
