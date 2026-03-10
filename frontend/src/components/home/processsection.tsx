// src/app/components/home/Processsection.tsx
"use client";

import Image from "next/image";

// Dữ liệu cho các bước
const processSteps = [
  { text: "Đặt hàng online", icon: "🛒" },
  { text: "Lên file demo", icon: "💻" },
  { text: "In mẫu khách duyệt", icon: "📱" },
  { text: "Tiến hành in và thành phẩm", icon: "🖨️" },
  { text: "Đóng gói và giao hàng", icon: "📦" },
];

const ProcessSection = () => {
  return (
    <section className="w-full bg-(--color-brand-light) py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">QUY TRÌNH IN ẤN</h2>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Cột 1: Các bước */}
          <div className="flex flex-col space-y-4">
            {/* Logo "2 Hour" */}
            <div className="mb-4">
              <span className="text-5xl font-extrabold text-red-600">2</span>
              <span className="ml-2 text-2xl font-bold text-gray-700">
                HOUR
              </span>
              <span className="ml-1 text-lg font-semibold text-gray-700">
                PRINT NOW
              </span>
              <h3 className="text-4xl font-bold text-gray-800">IN NHANH</h3>
            </div>

            {/* Danh sách các bước */}
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center rounded-lg bg-white p-4 shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--color-brand-primary) text-xl text-white">
                  {step.icon}
                </div>
                <span className="ml-4 text-lg font-medium text-gray-700">
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Cột 2: Ảnh minh họa */}
          <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-lg bg-gray-200">
            {/* Bạn có thể thay bằng component <Image> sau này */}
            <Image
              src="/12.png"
              alt="Ảnh minh họa quy trình"
              className="lex h-full min-h-[400px] w-full items-center justify-center rounded-lg bg-gray-200"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// hello
export default ProcessSection;
