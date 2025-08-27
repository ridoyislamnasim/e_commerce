"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/store/use-store";
import { Footer } from "@/components/admin-panel/footer";
import { Sidebar } from "@/components/admin-panel/sidebar";
import Topbar from "@/components/admin-panel/topbar";
import { useSidebarToggle } from "@/hooks/store/use-sidebar-toggle";
// import { useBranch } from "@/hooks/store/use-branch";
// import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  // const branchStore = useStore(useBranch, (state) => state);
  // const branch = useStore(useBranch, (state) => state.branch);
  // const { data } = useSession();
  // const [branch, setBranch] = useState<Branches>();
  const [loading, setLoading] = useState(true);

  // console.log(branch, "from admin panel layout");

  // useEffect(() => {
  //   if (data?.user.branchId) {
  //     setLoading(true); // Start loading
  //     // console.log(
  //     //   data,
  //     //   "branch id from admin panel layout.........."
  //     // );
  //     getBranch(Number(data.user.branchId))
  //       .then((fetchedBranch) => {
  //         // setBranch(fetchedBranch);
  //         branchStore?.setBranch(fetchedBranch);
  //         localStorage.setItem("selectedBranch", JSON.stringify(fetchedBranch));
  //       })
  //       .catch((error) => {
  //         console.error("Failed to fetch branch:", error);
  //         // setBranch(undefined); // Handle error state
  //       })
  //       .finally(() => setLoading(false)); // End loading
  //   }
  // }, [data]);

  if (!sidebar) return null;

  // if (loading)
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center">
  //       <div role="status">
  //         <svg
  //           aria-hidden="true"
  //           className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
  //           viewBox="0 0 100 101"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //             fill="currentColor"
  //           />
  //           <path
  //             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //             fill="currentFill"
  //           />
  //         </svg>
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   );

  // if (branch?.id === 0) return <BranchSelector />; // Show Branch Selector if no branch is set

  return (
    <>
      <Topbar />
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-100 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64",
          // On mobile, don't add margin-left so sidebar overlays content
          "ml-0"
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64",
          "ml-0"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
