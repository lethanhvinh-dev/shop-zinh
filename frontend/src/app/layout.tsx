// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header"; // <-- 1. Import Header
import SearchHeader from "../components/Layout/SearchHeader";
import Footer from "../components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INK ZÍNH - In ấn chất lượng",
  description: "Chuyên in ấn tem nhãn, hộp giấy, catalogue",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi,en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header /> {/* <-- 2. Đặt Header ở đây */}
          <SearchHeader /> {/* Thêm SearchHeader ở đây */}
          <main className="grow">{children}</main>
          <Footer /> {/* Bạn có thể thêm Footer ở đây sau */}
        </div>
      </body>
    </html>
  );
}
