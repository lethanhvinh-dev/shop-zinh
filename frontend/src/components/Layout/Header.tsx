"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // <-- 1. Import useState
import Image from "next/image";
const navItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/sanpham" },
  { name: "Giới thiệu", href: "/gioithieu" },
  { name: "Liên hệ", href: "/lienhe" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  // 2. Tạo state để quản lý việc đóng/mở menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // 3. Thêm 'relative' để menu con định vị đúng
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          <Image
            src="/logo.png"
            alt="INK ZÍNH®"
            width={100}
            height={99}
            className="mx-auto mb-4"
          />
        </Link>

        {/* --- NAV CHO DESKTOP (PC) --- */}
        <nav className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            const activeClass =
              "rounded-md bg-[var(--color-brand-primary)] px-4 py-2 font-semibold text-white";
            const normalClass =
              "text-gray-600 hover:text-[var(--color-brand-primary)] font-medium transition-colors";

            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={`transition-colors ${
                    isActive ? activeClass : normalClass
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* --- NÚT BẤM CHO MOBILE --- */}
        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
            // 4. Thêm onClick để bật/tắt state
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* 5. Tự động đổi icon 3 gạch / icon X */}
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* --- MENU SỔ XUỐNG CHO MOBILE --- */}
      {/* 6. Đây là phần menu xổ xuống, nó sẽ hiện khi isMenuOpen = true */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-lg ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            // Style cho link mobile (hơi khác desktop)
            const activeClass =
              "block w-full rounded-md bg-gray-100 px-4 py-2 font-semibold text-[var(--color-brand-primary)]";
            const normalClass =
              "block w-full rounded-md px-4 py-2 text-gray-600 hover:bg-gray-50";

            return (
              <Link
                key={item.name}
                href={item.href}
                // 7. Tự đóng menu khi bấm vào 1 link
                onClick={() => setIsMenuOpen(false)}
              >
                <span
                  className={`w-full transition-colors ${
                    isActive ? activeClass : normalClass
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
