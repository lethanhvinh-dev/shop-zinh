import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react"; // ✅ Thêm icon

export default function GioiThieuPage() {
  return (
    <>
      <main className="bg-white py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <section className="flex flex-col items-center">
            <h1 className="text-3xl font-bold uppercase text-gray-800 mb-4 text-center">
              GIỚI THIỆU INK ZÍNH®
            </h1>
            <p className="text-lg text-gray-700 text-center">
              INK ZÍNH® - Cung cấp mẫu in HOT nhất thị trường
            </p>
            <p className="text-lg text-gray-600 text-center mb-10">
              Chuyên thiết kế và in ấn các phiên bản chất lượng, hiện đại nhất
            </p>

            {/* Hình ảnh chính */}
            <div className="mt-8">
              <Image
                src="/Group 75.png"
                alt="Hình ảnh giới thiệu"
                className="rounded-lg shadow-lg"
                width={800}
                height={400}
              />
            </div>

            {/* Nội dung */}
            <div className="mt-10 max-w-3xl text-gray-700 space-y-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Về Chúng Tôi
              </h2>

              <p>
                INK ZÍNH® tự hào là đơn vị hàng đầu trong lĩnh vực in ấn và
                thiết kế bao bì tại Việt Nam. Với hơn 10 năm kinh nghiệm, chúng
                tôi đã đồng hành cùng hàng ngàn thương hiệu...
              </p>

              <p>
                Đội ngũ của chúng tôi gồm những chuyên gia giàu kinh nghiệm,
                luôn nỗ lực không ngừng để cập nhật xu hướng mới nhất...
              </p>

              {/* ✅ NÚT ICON CHUYỂN ĐỘNG */}
              <Link href="/lienhe">
                <button
                  className="
                    group mt-6 mx-auto flex items-center gap-2
                    px-6 py-3 bg-black text-white rounded-lg 
                    hover:bg-gray-800 transition-all
                  "
                >
                  Liên hệ ngay
                  <ArrowRight
                    className="
                      w-5 h-5 
                      transition-transform duration-300 
                      group-hover:translate-x-1
                    "
                  />
                </button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
