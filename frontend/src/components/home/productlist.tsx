"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allCategories } from "@/data/products";

// Chỉ hiển thị 4 danh mục trên trang chủ
const featuredCategoryIds = [1, 2, 3, 4];

const ProductCategories = () => {
  const featured = allCategories.filter((c) =>
    featuredCategoryIds.includes(c.id)
  );

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Tiêu đề + Xem tất cả */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            DANH MỤC SẢN PHẨM
          </h2>
          <Link
            href="/all-productlist"
            className="rounded-md bg-gray-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-700"
          >
            Xem tất cả
          </Link>
        </div>

        {/* Lưới 4 danh mục nổi bật */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((category) => (
            // NOTE: dùng slug cho đường dẫn đẹp: /sanpham/tem-nhan
            <Link
              key={category.id}
              href={`/sanpham/category/${category.slug}`}
              className="group relative block overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">
                  {category.title}
                </h3>
                <ArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
