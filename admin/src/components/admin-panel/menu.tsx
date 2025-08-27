"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/utils/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useLogout } from "@/hooks/use-logout";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);
  const { loading, handleLogout } = useLogout();

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-0 h-full w-full bg-[#fafbfc] border-r border-gray-200">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-0 px-0">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-2" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Link href={href}>
                              <div
                                className={cn(
                                  "flex items-center gap-3 px-6 h-12 cursor-pointer transition-all",
                                  active
                                    ? "bg-white font-medium text-[#19b6c9] border-l-4 border-[#19b6c9] shadow-sm"
                                    : "bg-transparent text-gray-500 border-l-4 border-transparent hover:bg-gray-100 hover:text-[#19b6c9]",
                                  "rounded-none"
                                )}
                              >
                                {/* <Icon
                                size={22}
                                className={
                                  active ? "text-[#19b6c9]" : "text-gray-400"
                                }
                              /> */}
                                {typeof Icon === "function" ? (
                                  <Icon
                                    size={22}
                                    className={active ? "text-[#19b6c9]" : "text-gray-400"}
                                  />
                                ) : (
                                  <img
                                    src={Icon.src || Icon}
                                    alt={label + " icon"}
                                    className="w-[22px] h-[22px]"
                                    style={{
                                      filter: active
                                        ? "invert(54%) sepia(98%) saturate(747%) hue-rotate(153deg) brightness(97%) contrast(101%)"
                                        : "grayscale(1)",
                                    }}
                                  />
                                )}
                                {isOpen !== false && (
                                  <span className="text-base tracking-tight">
                                    {label}
                                  </span>
                                )}
                              </div>
                            </Link>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button
                    disabled={loading}
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-6 h-12 mt-2 text-gray-500 border-l-4 border-transparent hover:bg-gray-100 hover:text-[#19b6c9] rounded-none transition-all"
                  >
                    <LogOut size={22} className="text-gray-400" />
                    <span className="text-base tracking-tight">Sign out</span>
                  </button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
