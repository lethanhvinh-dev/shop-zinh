// src/app/sanpham/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { mockProducts, allCategories } from "@/data/products";

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolved = await params;
  const id = String(resolved.id);

  const product = mockProducts.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-red-600">
          Không tìm thấy sản phẩm với ID: {id}
        </h1>
        <Link href="/sanpham" className="text-orange-500 underline">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const category = allCategories.find((c) => c.id === product.categoryId);

  // related products (cùng category, exclude current)
  const relatedProducts = mockProducts
    .filter((p) => p.categoryId === product.categoryId && String(p.id) !== id)
    .slice(0, 4);

  return (
    <div className="bg-[#fff7ef]">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link href="/sanpham" className="hover:text-orange-500">
            Sản phẩm
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/sanpham/category/${category?.slug ?? ""}`}
            className="hover:text-orange-500"
          >
            {category ? category.title : "Danh mục"}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-orange-500">{product.name}</span>
        </nav>

        {/* Nội dung chi tiết */}
        <div className="grid md:grid-cols-2 gap-10 items-start bg-white p-8 rounded-2xl shadow-sm">
          {/* Cột ảnh */}
          <div className="relative w-full">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Cột thông tin */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-serif font-bold mb-4 text-gray-900">
              {product.name}
            </h1>

            <p className="mb-3 text-md text-gray-700">
              <span className="font-semibold text-gray-900">Danh mục: </span>
              <Link
                href={`/sanpham/category/${category?.slug ?? ""}`}
                className="text-orange-600 font-semibold hover:underline"
              >
                {category ? category.title : "Không rõ"}
              </Link>
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              {product.description}
            </p>

            <Link
              href="/lienhe"
              className="inline-block w-fit rounded-md bg-orange-500 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              Yêu Cầu Báo Giá
            </Link>
          </div>
        </div>

        {/* ---------- SẢN PHẨM LIÊN QUAN ---------- */}
        <section className="mt-12 bg-[#fdeee4] py-10 rounded-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif tracking-wider">
                SẢN PHẨM {category?.title}
              </h2>
              <Link
                href={`/sanpham/category/${category?.slug ?? ""}`}
                className="rounded-md bg-[#7a4427] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95"
              >
                Xem tất cả
              </Link>
            </div>

            {relatedProducts.length === 0 ? (
              <p className="text-gray-600">Chưa có sản phẩm liên quan.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/sanpham/${rp.id}`}
                    className="group block overflow-hidden rounded-lg bg-white shadow-sm"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                      <Image
                        src={rp.imageUrl}
                        alt={rp.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {rp.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {rp.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* small pagination dots (optional, giống mẫu) */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7a4427]" />
              <span className="h-2 w-2 rounded-full bg-white border border-gray-300" />
            </div>
          </div>
        </section>
        {/* ---------- Kết thúc related ---------- */}
      </div>
    </div>
  );
}
