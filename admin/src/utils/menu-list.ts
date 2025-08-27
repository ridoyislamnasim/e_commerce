import { Group } from "@/types/shared";
import {
  Tag,
  Users,
  LayoutGrid,
  Printer,
  ShoppingBag,
  BadgeDollarSign,
  Globe,
  FileUp,
  FileDown,
  FolderTree,
  PackageX,
  UserCog,
  Settings,
  BriefcaseBusiness,
  ShoppingCart,
  Shapes,
  Package2,
  TicketPercent,
  FlameKindling,
  Images,
  ShoppingBasket,
} from "lucide-react";

import cmsIcon from "@/assets/sideBar/Cms.svg";
import couponAndDiscountIcon from "@/assets/sideBar/Coupons&Discounts.svg";
import courierIcon from "@/assets/sideBar/Courier.svg";
import dashboardIcon from "@/assets/sideBar/Dashboard.svg";
import generalSettingsIcon from "@/assets/sideBar/GeneralSettings.svg";
import inventoryIcon from "@/assets/sideBar/Inventory.svg";
import orderManagementIcon from "@/assets/sideBar/OrderManagement.svg"; 
import coustomerManagementIcon from "@/assets/sideBar/CoustomerManagement.svg";
import productManagementIcon from "@/assets/sideBar/ProductManagement.svg";
import reportIcon from "@/assets/sideBar/Reports&Invoice.svg";
import userManagementIcon from "@/assets/sideBar/UserManagement&Roles.svg";
import categoryIcon from "@/assets/sideBar/Category.svg";
import subCategoryIcon from "@/assets/sideBar/SubCategory.svg";



export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: dashboardIcon,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/order-list",
          label: "Orders Management",
          active: pathname.includes("/order-list"),
          icon: orderManagementIcon,
          submenus: [],
        },
        // {
        //   href: "/bulk-order-list",
        //   label: "Bulk Orders",
        //   active: pathname.includes("/bulk-order-list"),
        //   icon: ShoppingBasket,
        //   submenus: [],
        // },
        {
          href: "/courier",
          label: "Courier Management",
          active: pathname.includes("/courier"),
          icon: courierIcon,
          submenus: [],
        },
        {
          href: "/products",
          label: "Products Management",
          active: pathname.includes("/products"),
          icon: productManagementIcon,
          submenus: [],
        },
        {
          href: "/category",
          label: "Category",
          active: pathname.includes("/category"),
          icon: categoryIcon,
          submenus: [],
        },
        {
          href: "/subcategory",
          label: "Sub Category",
          active: pathname.includes("/subcategory"),
          icon: subCategoryIcon,
          submenus: [],
        },
        {
          href: "/ReportsAndInvoices",
          label: "Reports & Invoices",
          active: pathname.includes("/ReportsAndInvoices"),
          icon: reportIcon,
          submenus: [],
        },
        {
          href: "/coustomer",
          label: "Customer Management",
          active: pathname.includes("/customer"),
          icon: coustomerManagementIcon,
          submenus: [],
        },
        {
          href: "/coupon-and-discounts",
          label: "Coupon & Discounts",
          active: pathname.includes("/coupon-and-discounts"),
          icon: couponAndDiscountIcon,
          submenus: [],
        },
        {
          href: "/CMS",
          label: "CMS",
          active: pathname.includes("/CMS"),
          icon: cmsIcon,
          submenus: [],
        },
        {
          href: "/general-settings",
          label: "General Settings",
          active: pathname.includes("/general-settings"),
          icon: generalSettingsIcon,
          submenus: [],
        },
         {
          href: "/user-management",
          label: "User Management & Roles",
          active: pathname.includes("/user-management"),
          icon: userManagementIcon,
          submenus: [],
        },
        {
          href: "/category",
          label: "Category",
          active: pathname.includes("/category"),
          icon: Shapes,
          submenus: [
            {
              href: "/category/category",
              label: "Category",
              active: pathname === "/category/category",
            },
            {
              href: "/category/subcategory",
              label: "Subcategory",
              active: pathname === "/category/subcategory",
            },
            {
              href: "/category/childcategory",
              label: "Childcategory",
              active: pathname === "/category/childcategory",
            },
          ],
        },
        
        
      ],
    },
    {
      groupLabel: "Pages",
      menus: [
        {
          href: "/banners",
          label: "Banners",
          active: pathname.includes("/banners"),
          icon: Images,
          submenus: [],
        },
        {
          href: "/blogs",
          label: "Blogs",
          active: pathname.includes("/blogs"),
          icon: Images,
          submenus: [],
        },
        {
          href: "/contact",
          label: "Contacts",
          active: pathname.includes("/contact"),
          icon: Images,
          submenus: [],
        },
      ],
    },
    // {
    //   groupLabel: "Configuration",
    //   menus: [
    //     {
    //       href: "/staffs",
    //       label: "Staffs",
    //       active: pathname.includes("/staffs"),
    //       icon: UserCog,
    //       submenus: [],
    //     },
    //   ],
    // },
  ];
}
