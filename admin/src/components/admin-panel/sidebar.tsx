"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/store/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import { useSidebarToggle } from "@/hooks/store/use-sidebar-toggle";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import Image from "next/image";
// import { getSetting } from "@/services/settings";
import React from "react";
import { fileUrlGenerator } from "@/utils/helpers";
import logo from "@/assets/logo/Logo.png";

export function Sidebar() {
  // Mobile sidebar open button
  const handleMobileOpen = () => setMobileOpen(true);
  // Mobile sidebar state
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.type === "sidebar-toggle") {
        setMobileOpen(e.detail.open);
      }
    };
    window.addEventListener("sidebar-toggle", handler);
    return () => window.removeEventListener("sidebar-toggle", handler);
  }, []);

  // Close sidebar on overlay click (mobile)
  const handleOverlayClick = () => setMobileOpen(false);
  const sidebar = useStore(useSidebarToggle, (state) => state);
  // const [setting, setSetting] = React.useState<Settings>();

  // React.useEffect(() => {
  //   getSetting().then((data) => setSetting(data));
  // }, []);

  if (!sidebar) return null;
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME;

  return (
    <>
      {/* Mobile sidebar open button */}
      <button
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-[#19b6c9] text-white shadow-lg lg:hidden"
        onClick={handleMobileOpen}
        aria-label="Open sidebar"
        style={{ display: mobileOpen ? 'none' : 'block' }}
      >
        {/* Hamburger icon */}
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h20M4 14h20M4 21h20" />
        </svg>
      </button>
      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={handleOverlayClick}
      />
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen lg:translate-x-0 transition-all ease-in-out duration-300",
          sidebar?.isOpen === false ? "w-[90px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile sidebar close button */}
        {mobileOpen && (
          <button
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-700 text-white lg:hidden"
            onClick={handleOverlayClick}
            aria-label="Close sidebar"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        )}
        <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
        <div className="relative h-full flex flex-col py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
          <Link
            href="/dashboard"
            className={cn(
              "min-h-[60px] max-h-[60px] w-full flex items-center justify-center border-r-0 transition-transform ease-in-out duration-300",
              sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center w-[100px] h-[100px] font-bold uppercase text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
              )}
            >
              <Image
                src={logo}
                alt={String(brandName)}
                height={60}
                width={60}
                className="object-contain w-[60px] h-[60px]"
              />
            </span>
          </Link>
          <Menu isOpen={sidebar?.isOpen} />
        </div>
      </aside>
    </>
  );
}
