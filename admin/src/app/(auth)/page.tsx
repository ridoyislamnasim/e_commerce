
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] relative">
      {/* Background watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="90%" height="90%" viewBox="0 0 1200 800" fill="none">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="600"
            fill="#f5f5f5"
            fontWeight="bold"
            opacity="0.07"
          >
            M
          </text>
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" alt="MSLV Fashion" width={120} height={40} />
        </div>
        <div className="bg-white rounded-xl shadow-lg px-8 py-10 flex flex-col items-center">
          <h2 className="text-2xl font-medium mb-8 text-center">Sign in</h2>
          <div className="w-full flex flex-col gap-4">
            <Link href="/admin" className="w-full">
              <button className="w-full bg-black text-white rounded-full py-2 text-lg font-medium shadow transition hover:bg-gray-900">
                Admin
              </button>
            </Link>
            <Link href="/user" className="w-full">
              <button className="w-full border border-gray-300 text-black rounded-full py-2 text-lg font-medium shadow transition hover:bg-gray-100">
                User
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
