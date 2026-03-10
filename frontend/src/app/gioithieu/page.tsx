import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Component Breadcrumbs
 * Tách riêng ra để có nền riêng (màu be/xám nhạt)
 * Tôi dùng bg-gray-50 hoặc bg-amber-50 để giả lập màu be nhạt, bạn có thể đổi
 */
const Breadcrumbs: React.FC = () => {
  return (
    // Nền màu xám/be nhạt cho toàn bộ thanh breadcrumbs
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-orange-500">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-orange-500">Giới Thiệu</span>
        </nav>
      </div>
    </div>
  );
};

/**
 * Trang Giới thiệu
 * Giờ sẽ không có Breadcrumbs bên trong
 */
export default function GioiThieuPage() {
  return (
    // Dùng Fragment (<>) để bọc 2 thành phần
    <>
      {/* 1. Breadcrumbs nằm bên ngoài với nền riêng */}
      <Breadcrumbs />

      {/* 2. Nội dung chính với nền trắng */}
      {/* Thêm bg-white ở đây để đảm bảo nền trắng cho nội dung */}
      <main className="bg-white py-8">
        {/* Thêm container bọc nội dung bên trong main */}
        <div className="container mx-auto max-w-7xl px-4">
          <section className="flex flex-col items-center">
            {/* Tiêu đề và các dòng mô tả từ ảnh của bạn */}
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
            <div className="relative w-full max-w-4xl mb-12">
              <Image
                src="/Group 75.png"
                alt="Giới thiệu các mẫu in ấn của Him Paper"
                width={908}
                height={666}
                style={{ width: "100%", height: "auto" }} // Giúp ảnh responsive
                priority // Ưu tiên tải ảnh này vì nó quan trọng
              />
            </div>

            {/* Phần nội dung văn bản cho trang giới thiệu */}
            <div className="max-w-3xl mx-auto text-left space-y-6 text-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800">
                Sứ mệnh của chúng tôi
              </h2>
              <p>
                Tại INK ZÍNH®, chúng tôi tin rằng bao bì không chỉ là thứ để
                chứa đựng sản phẩm, mà còn là câu chuyện đầu tiên thương hiệu
                của bạn kể cho khách hàng. Sứ mệnh của chúng tôi là cung cấp các
                giải pháp in ấn bao bì sáng tạo, chất lượng cao, giúp nâng tầm
                giá trị thương hiệu và tạo ấn tượng khó phai.
              </p>
              <p>
                Chúng tôi liên tục cập nhật những xu hướng thiết kế và công nghệ
                in ấn mới nhất (offset, digital, flexo...) để đảm bảo mọi sản
                phẩm từ INK ZÍNK® đều sắc nét, bền đẹp và thân thiện với môi
                trường.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8">
                Tại sao chọn INK ZÍNH®?
              </h2>
              <ul className="list-disc list-inside space-y-3">
                <li>
                  <b>Thiết kế độc quyền:</b> Đội ngũ designer sáng tạo, sẵn sàng
                  biến ý tưởng của bạn thành hiện thực.
                </li>
                <li>
                  <b>Chất lượng vượt trội:</b> Sử dụng nguyên vật liệu cao cấp
                  (giấy mỹ thuật, giấy kraft,...) và công nghệ in hiện đại nhất.
                </li>
                <li>
                  <b>Giá cả cạnh tranh:</b> Tối ưu quy trình sản xuất để mang
                  lại mức giá tốt nhất thị trường mà không ảnh hưởng chất lượng.
                </li>
                <li>
                  <b>Dịch vụ tận tâm:</b> Hỗ trợ tư vấn 24/7, giao hàng nhanh
                  chóng, đúng hẹn.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
