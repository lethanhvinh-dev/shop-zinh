// (File "all-productlist" của bạn)
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// 🔑 BƯỚC 1: IMPORT DỮ LIỆU TỪ FILE CHUNG
import { allCategories } from "@/data/products"; // (Hoặc dùng ../../data/data)

// Đây là component cho trang /danh-muc (HIỂN THỊ DANH MỤC)
const AllCategoriesPage = () => {
  return (
    <div className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 1. Breadcrumbs */}
        <nav className="mb-6 flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500">
            Trang chủ
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="font-medium text-orange-500">Danh mục</span>
        </nav>

        {/* 2. Tiêu đề */}
        <div className="mb-10 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            DANH MỤC SẢN PHẨM
          </h1>
        </div>

        {/* 3. Lưới tất cả danh mục */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {/* 🔑 BƯỚC 2: Map qua `allCategories` đã import */}
          {allCategories.map((category) => (
            <Link
              key={category.id}
              // 🔑 BƯỚC 3: Link đến trang SẢN PHẨM và lọc theo ID danh mục
              // (Điều này sẽ làm cho sidebar ở trang /sanpham tự động chọn đúng)
              href={`/sanpham?category=${category.id}`}
              className="group flex flex-col items-center text-center"
            >
              {/* Hình ảnh */}
              <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md aspect-4/3">
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Tên danh mục */}
              <h3 className="text-base font-semibold text-gray-700 transition-colors group-hover:text-gray-900 md:text-lg">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesPage;
