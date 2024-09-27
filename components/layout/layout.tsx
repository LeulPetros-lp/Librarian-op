// src/layout/Layout.tsx
import React, { useState } from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import Auth from "@/components/auth/auth";
import Preview from "../preview/preview";
import HeaderNav from "../HeaderNav/HeaderNav";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [_, setLocked] = useLockedBody(false);
  const [isAuth, setIsAuth] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <>
      <SidebarContext.Provider
        value={{
          collapsed: sidebarOpen,
          setCollapsed: handleToggleSidebar,
        }}
      >
        <section className="flex">
          <SidebarWrapper />
          <NavbarWrapper>{children}</NavbarWrapper>
        </section>
      </SidebarContext.Provider>
    </>
  );
};

export default Layout;
