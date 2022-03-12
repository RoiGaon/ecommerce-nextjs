import React from "react";
// Styles
import s from "./Layout.module.css";
// Components
import { Footer, Navbar } from "@components/common";
import { Sidebar } from "@components/ui";
import { CartSidebar } from "@components/cart";
import { useUI } from "@components/ui/context";
// Framework - logic
import { ApiProvider } from "@framework";

const Layout: React.FC = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useUI();

  return (
    <ApiProvider>
      <div className={s.root}>
        <Navbar />
        <Sidebar onClose={closeSidebar} isOpen={isSidebarOpen}>
          <CartSidebar />
        </Sidebar>
        <main className="fit">{children}</main>
        <Footer />
      </div>
    </ApiProvider>
  );
};

export default Layout;
