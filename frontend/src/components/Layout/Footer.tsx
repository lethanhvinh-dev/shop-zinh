"use client";
import Link from "next/link";
import { ShieldCheck, Printer, Users } from "lucide-react";

const advantages = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-white" />,
    title: "Chất lượng in ấn và dịch vụ khách hàng vượt trội",
  },
  {
    icon: <Printer className="h-8 w-8 text-white" />,
    title: (
      <>
        {" "}
        Thiết bị hiện đại, dịch vụ in nhanh, <br /> đáng tin cậy{" "}
      </>
    ),
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: (
      <>
        {" "}
        Đội ngũ nhân viên chuyên nghiệp, <br /> luôn hỗ trợ khách hàng{" "}
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full">
      {/* 🔹 PHẦN ƯU ĐIỂM NỔI BẬT */}
      <div className="bg-[#FFF8F3] py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {advantages.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-brand-primary)">
                  {item.icon}
                </div>
                <p className="max-w-xs text-base font-semibold text-gray-800">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔸 PHẦN FOOTER CHÍNH */}
      <div className="bg-(--color-brand-primary) text-gray-200">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Cột 1 */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-white">INK ZÍNH®</h3>
              <p className="text-sm leading-relaxed">
                INK ZÍNH® - Đơn vị uy tín giúp bạn có những sản phẩm chất lượng.
              </p>
            </div>

            {/* Cột 2 */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">
                THÔNG TIN
              </h4>
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/sanpham"
                  className="text-sm hover:text-white hover:underline"
                >
                  Sản phẩm
                </Link>
                <Link
                  href="/gioithieu"
                  className="text-sm hover:text-white hover:underline"
                >
                  Giới thiệu
                </Link>
                <Link
                  href="/lienhe"
                  className="text-sm hover:text-white hover:underline"
                >
                  Liên hệ
                </Link>
              </nav>
            </div>

            {/* Cột 3 */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">LIÊN HỆ</h4>
              <div className="flex flex-col space-y-3 text-sm">
                <p>
                  <strong className="text-white">Địa chỉ:</strong> 18/28/8 CMT8,
                  KP4, Phường Trung Dũng, TP.Biên Hòa, Đồng Nai
                </p>
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  lethanhvinh.dev@gmail.com
                </p>
                <p>
                  <strong className="text-white">Số điện thoại:</strong>{" "}
                  0834016499 - 0941056340
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="border-t border-white/20 bg-black/10">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <p className="text-center text-xs text-gray-300">
              © Bản quyền thuộc về INK ZÍNH®. Thiết kế bởi{" "}
              <span className="text-white font-semibold">(MT)</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
