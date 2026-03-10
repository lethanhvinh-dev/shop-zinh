"use client";
// src/app/components/home/Herosection.tsx
import Link from "next/link";

const HeroSection = () => {
  // URL ảnh nền bạn vừa cung cấp
  const heroBackgroundUrl = "https://himpaper.vn/data/banner/BANNER.jpg";

  return (
    <section
      className="relative w-full"
      style={{
        backgroundImage: `url(${heroBackgroundUrl})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Đảm bảo ảnh lấp đầy
      }}
    >
      {/* Thêm một lớp phủ tối mờ (tùy chọn, nhưng giúp chữ dễ đọc hơn) */}
      <div className="absolute inset-0 z-0 bg-black/10"></div>

      {/* Nội dung (z-10 để nổi lên trên) */}
      <div className="relative z-10 container mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
        {/* Cột 1: Chữ và Nút (chữ màu trắng) */}
        <div className="flex flex-col items-start space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            IN NHANH 2H <br />
            CHUYÊN IN ẤN TEM NHÃN - <br />
            HỘP GIẤY - CATALOGUE
          </h1>
          <p className="text-lg text-gray-100">
            Biến ý tưởng của bạn thành sản phẩm cao cấp để lại ấn tượng lâu dài.
          </p>
          <Link
            href="/lienhe"
            className="rounded-md bg-(--color-brand-primary) px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            LIÊN HỆ
          </Link>
        </div>

        {/* Cột 2: Hình ảnh (placeholder) */}
        <div className="flex items-center justify-center">
          {/* Tạm thời dùng placeholder nếu chưa có ảnh */}
          <div className="flex h-96 w-full max-w-lg items-center justify-center rounded-lg">
            <span className="text-gray-200"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

//hello
export default HeroSection;
