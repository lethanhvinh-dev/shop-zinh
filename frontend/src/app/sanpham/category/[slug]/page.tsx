// src/app/sanpham/category/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { allCategories, mockProducts } from "@/data/products";

// --- Khai báo kiểu local để TypeScript biết cấu trúc dữ liệu ---
type Category = {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  description?: string;
};

type Product = {
  id: number;
  name: string;
  categoryId: number;
  imageUrl: string;
  description?: string;
};

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// Nếu allCategories/mockProducts chưa typed, ép kiểu an toàn ở đây
const categories = allCategories as unknown as Category[];
const productsAll = mockProducts as unknown as Product[];

export async function generateStaticParams() {
  // đảm bảo trả về slug cho export tĩnh
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const resolved = await params;
  const slug = String(resolved.slug);

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl text-red-600">
          Không tìm thấy danh mục: {slug}
        </h2>
        <Link href="/sanpham" className="text-orange-500 underline">
          Quay lại Sản phẩm
        </Link>
      </div>
    );
  }

  const products = productsAll.filter((p) => p.categoryId === category.id);

  return (
    <div className="bg-[#fff7ef]">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/sanpham">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-orange-500">{category.title}</span>
        </nav>

        <div className="grid md:grid-cols-12 gap-8 items-start mb-10">
          <div className="md:col-span-6">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border bg-white">
              <Image
                src={category.imageUrl}
                alt={category.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center">
            <h1 className="text-3xl font-serif tracking-wider mb-4 text-gray-800">
              {category.title}
            </h1>
            <p className="text-gray-700 leading-relaxed">
              {category.description || `Mô tả ngắn về ${category.title}`}
            </p>
          </div>
        </div>

        <section className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif text-gray-800">
              SẢN PHẨM {category.title}
            </h2>
            <Link
              href="/sanpham"
              className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white"
            >
              Xem tất cả
            </Link>
          </div>

          {products.length === 0 ? (
            <p className="text-gray-500">Chưa có sản phẩm cho danh mục này.</p>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/sanpham/${p.id}`}
                  className="group block overflow-hidden rounded-lg bg-gray-50"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
