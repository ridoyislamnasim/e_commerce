import Image from "next/image";
import { ShoppingBag, Bell, User, AlertCircle } from "lucide-react";
import { UserNav } from "./user-nav";

export default function Topbar() {
  return (
    <header className="w-full h-[60px] flex items-center bg-white border-b border-gray-200 sticky top-0 z-10">
      {/* Left: Logo */}
      <div className="h-full flex items-center px-6  min-w-[320px]">
        
      </div>
      {/* Center: Search */}
      <div className="flex-1 flex items-center px-6">
        <div className="flex items-center gap-3 w-full max-w-[350px]">
          {/* <button className="text-gray-400 text-2xl mr-2">
            <span className="material-icons">menu</span>
          </button> */}
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#19b6c9] bg-white"
          />
        </div>
      </div>
      {/* Right: Icons */}
      <div className="flex items-center gap-8 px-8">
        <div className="relative">
          <ShoppingBag size={28} className="text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-[#19b6c9] text-white text-xs rounded-full px-1.5 py-0.5">0</span>
        </div>
        <div className="relative">
          <Bell size={28} className="text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-[#19b6c9] text-white text-xs rounded-full px-1.5 py-0.5">0</span>
        </div>
        <div className="relative">
          <AlertCircle size={28} className="text-gray-700" />
        </div>
        <div className="relative">
          {/* <User size={28} className="text-gray-700" /> */}
                    <UserNav />
        </div>
      </div>
    </header>
  );
}