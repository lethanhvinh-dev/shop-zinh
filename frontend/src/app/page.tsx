"use client";

import HeroSection from "@/components/home/herosection";
import ProcessSection from "@/components/home/processsection";
import ProductList from "@/components/home/productlist";
import About from "@/components/home/about";
import Image from "next/image";
export default function HomePage() {
  return (
    <div className="relative">
      <main>
        <HeroSection />
        <ProductList />
        <ProcessSection />
        <About />
      </main>

      {/* ✅ Floating quick buttons */}
      <div
        aria-hidden="true"
        className="fixed bottom-8 right-4 z-50 flex flex-col gap-4"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Gọi điện */}
        <a
          href="tel:0834016499"
          aria-label="Gọi 0834016499"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow transition hover:scale-105"
        >
          📞
        </a>

        {/* Zalo — icon đúng như hình */}
        <a
          href="https://zalo.me/0834016499"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Chat Zalo 0834016499"
          className="flex h-12 w-12 items-center justify-center rounded-full shadow transition hover:scale-105 bg-white"
        >
          <Image
            src="/zalo-crop.png"
            alt="Zalo"
            width={40}
            height={40}
            className="object-contain"
          />
        </a>

        {/* Chat nội bộ */}
        <a
          href="/lienhe"
          aria-label="Mở chat"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow transition hover:scale-105"
        >
          💬
        </a>
      </div>
    </div>
  );
}
