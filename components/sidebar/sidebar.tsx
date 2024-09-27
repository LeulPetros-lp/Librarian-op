'use-client'
import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PiBooks } from "react-icons/pi";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { MdDashboard } from "react-icons/md";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { MdGroups } from "react-icons/md";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
    
            <SidebarMenu title="OnePlanet library system">
            <SidebarItem
              title="Home"
              icon
              isActive={pathname === "/"}
              href="/"
            />
              <SidebarItem
                isActive={pathname === "/books"}
                title="Books"
                icon
                href="/books/search"
              />
              <SidebarItem
                isActive={pathname === "/add-student"}
                title="Add Student"
                icon
                href="/add-student"
              />
    
              <SidebarItem
                isActive={pathname === "/book-shelf"}
                title="Book Shelf"
                icon
                href="/book-shelf"
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/statistics"}
                title="Statistics"
                icon
              />
            </SidebarMenu>

            <SidebarMenu title="About us">
              <SidebarItem
                isActive={pathname === "/About-us"}
                title="About us"
                icon
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
