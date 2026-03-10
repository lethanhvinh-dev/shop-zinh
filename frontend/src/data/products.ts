// Đây là file "Nguồn Dữ Liệu" duy nhất của bạn
// src/data/data.ts

// 1. ĐỊNH NGHĨA DANH MỤC
// Bao gồm cả 3 danh mục bạn thiếu ("Thẻ Nhựa Cào", "Ấn Phẩm Văn Phòng", "Túi Giấy")
export const allCategories = [
  {
    id: 1,
    title: "TEM NHÃN",
    slug: "tem-nhan",
    imageUrl:
      "https://himpaper.vn/data/category/TEM%20NH%C3%83N/z5308504211360_0f4899222ad8a5ae74369182a8440451-01.jpg",
  },
  {
    id: 2,
    title: "HỘP GIẤY",
    slug: "hop-giay",
    imageUrl:
      "https://himpaper.vn/data/category/H%E1%BB%98P%20GI%E1%BA%A4Y/M010T150_Cosmatic_Container_1-01-01.jpg",
  },
  {
    id: 3,
    title: "CATALOGUE",
    slug: "catalogue",
    imageUrl: "https://himpaper.vn/data/category/CATALOUGE/11610238.png",
  },
  {
    id: 4,
    title: "BROCHURE/TỜ RƠI",
    slug: "brochure-to-roi",
    imageUrl:
      "https://himpaper.vn/data/category/BROCHURE%20-%20T%E1%BB%9C%20R%C6%A0I/BROCHURE1-01.jpg",
  },
  {
    id: 5,
    title: "THIỆP CƯỚI",
    slug: "thiep-cuoi",
    imageUrl:
      "https://himpaper.vn/data/category/THI%E1%BB%86P%20C%C6%AF%E1%BB%9AI/z5308691804078_bc5affe8ec1f227ae538e4f6bebe09fd.jpg",
  },
  {
    id: 6,
    title: "NAMECARD",
    slug: "namecard",
    imageUrl: "https://himpaper.vn/data/category/NAMECARD/KK-01-01.jpg",
  },
  {
    id: 7,
    title: "VOUCHER",
    slug: "voucher",
    imageUrl: "https://himpaper.vn/data/category/VOUCHER/voucher.jpg",
  },
  {
    id: 8,
    title: "BAO LÌ XÌ",
    slug: "bao-li-xi",
    imageUrl:
      "https://himpaper.vn/data/category/BAO%20L%C3%8C%20X%C3%8C/gggyju-01.jpg.png",
  },
  {
    id: 9,
    title: "LỊCH",
    slug: "lich",
    imageUrl:
      "https://himpaper.vn/data/category/L%E1%BB%8ACH/z5768411133518_2579b804cff0c36e86f931c2b53cf14f.jpg",
  },
  {
    id: 10,
    title: "SỔ TAY",
    slug: "so-tay",
    imageUrl:
      "https://himpaper.vn/data/category/S%E1%BB%94%20TAY/notebook_mockup_05-01.jpg.png",
  },
  {
    id: 11,
    title: "MENU",
    slug: "menu",
    imageUrl:
      "https://himpaper.vn/data/category/MENU/z5308594956544_8e60f3f33b198b82e94792e1e5a17022.jpg",
  },
  {
    id: 12,
    title: "TAG - THẺ TREO",
    slug: "tag-the-treo",
    imageUrl:
      "https://himpaper.vn/data/category/TAG-TH%E1%BA%BA%20TREO/z5308604775186_2244df5425b9b86e51150223e86f1ad8-01.jpg.png",
  },
  {
    id: 13,
    title: "THẺ NHỰA CÀO",
    slug: "the-nhua-cao",
    // (Sử dụng tạm ảnh voucher)
    imageUrl: "https://himpaper.vn/data/category/VOUCHER/voucher.jpg",
  },
  {
    id: 14,
    title: "ẤN PHẨM VĂN PHÒNG",
    slug: "an-pham-van-phong",
    // (Sử dụng tạm ảnh sổ tay)
    imageUrl:
      "https://himpaper.vn/data/category/S%E1%BB%94%20TAY/notebook_mockup_05-01.jpg.png",
  },
  {
    id: 15,
    title: "TÚI GIẤY",
    slug: "tui-giay",
    // (Sử dụng tạm ảnh hộp giấy)
    imageUrl:
      "https://himpaper.vn/data/category/H%E1%BB%98P%20GI%E1%BA%A4Y/M010T150_Cosmatic_Container_1-01-01.jpg",
  },
];

// 2. ĐỊNH NGHĨA SẢN PHẨM THẬT
// Mỗi sản phẩm sẽ có categoryId liên kết với id ở trên
// Tôi sẽ tạo ví dụ 2-3 sản phẩm cho mỗi danh mục
export const mockProducts = [
  // Tem Nhãn (categoryId: 1)
  {
    id: 101,
    name: "In Tem Decal Giấy",
    categoryId: 1,
    imageUrl:
      "https://himpaper.vn/data/category/TEM%20NH%C3%83N/z5308504211360_0f4899222ad8a5ae74369182a8440451-01.jpg",
    description: "Dịch vụ in tem decal giấy chất lượng cao, bế mọi hình dạng.",
  },
  {
    id: 102,
    name: "In Tem Nhãn Nhựa PVC",
    categoryId: 1,
    imageUrl:
      "https://himpaper.vn/data/category/TEM%20NH%C3%83N/z5308504211360_0f4899222ad8a5ae74369182a8440451-01.jpg",
    description: "Tem nhựa PVC chống nước, độ bền cao, thích hợp ngoài trời.",
  },

  // 2) HỘP GIẤY (categoryId: 2)
  {
    id: 201,
    name: "In Hộp Giấy Kraft",
    categoryId: 2,
    imageUrl:
      "https://himpaper.vn/data/category/H%E1%BB%98P%20GI%E1%BA%A4Y/M010T150_Cosmatic_Container_1-01-01.jpg",
    description: "Hộp giấy kraft thân thiện môi trường, phong cách vintage.",
  },
  {
    id: 202,
    name: "In Hộp Mỹ Phẩm Cao Cấp",
    categoryId: 2,
    imageUrl:
      "https://himpaper.vn/data/category/H%E1%BB%98P%20GI%E1%BA%A4Y/M010T150_Cosmatic_Container_1-01-01.jpg",
    description: "Hộp mỹ phẩm cao cấp, ép kim, cán màng, bồi carton cứng.",
  },

  // 3) CATALOGUE (categoryId: 3)
  {
    id: 301,
    name: "In Catalogue A4 Bấm Kim",
    categoryId: 3,
    imageUrl: "https://himpaper.vn/data/category/CATALOUGE/11610238.png",
    description: "In catalogue A4 đóng kim giữa, phù hợp hội chợ sự kiện.",
  },
  {
    id: 302,
    name: "In Catalogue Cao Cấp",
    categoryId: 3,
    imageUrl: "https://himpaper.vn/data/category/CATALOUGE/11610238.png",
    description: "Catalogue giấy Couche 250gsm, cán mờ sang trọng.",
  },

  // 4) BROCHURE/TỜ RƠI (categoryId: 4)
  {
    id: 401,
    name: "In Tờ Rơi A5/A4",
    categoryId: 4,
    imageUrl:
      "https://himpaper.vn/data/category/BROCHURE%20-%20T%E1%BB%9C%20R%C6%A0I/BROCHURE1-01.jpg",
    description: "Tờ rơi quảng cáo giá rẻ, số lượng linh hoạt.",
  },
  {
    id: 402,
    name: "In Brochure Gấp 3",
    categoryId: 4,
    imageUrl:
      "https://himpaper.vn/data/category/BROCHURE%20-%20T%E1%BB%9C%20R%C6%A0I/BROCHURE1-01.jpg",
    description: "Brochure gấp 3 cấn đường sắc nét, giấy Couche 150gsm.",
  },

  // 5) THIỆP CƯỚI (categoryId: 5)
  {
    id: 501,
    name: "Thiệp Cưới Hiện Đại",
    categoryId: 5,
    imageUrl:
      "https://himpaper.vn/data/category/THI%E1%BB%86P%20C%C6%AF%E1%BB%9AI/z5308691804078_bc5affe8ec1f227ae538e4f6bebe09fd.jpg",
    description: "Thiệp cưới phong cách hiện đại, thiết kế theo yêu cầu.",
  },
  {
    id: 502,
    name: "Thiệp Cưới Cao Cấp",
    categoryId: 5,
    imageUrl:
      "https://himpaper.vn/data/category/THI%E1%BB%86P%20C%C6%AF%E1%BB%9AI/z5308691804078_bc5affe8ec1f227ae538e4f6bebe09fd.jpg",
    description: "Ép kim, dập nổi, giấy mỹ thuật sang trọng.",
  },

  // 6) NAMECARD (categoryId: 6)
  {
    id: 601,
    name: "Namecard Giấy Mỹ Thuật",
    categoryId: 6,
    imageUrl: "https://himpaper.vn/data/category/NAMECARD/KK-01-01.jpg",
    description: "Giấy mỹ thuật vân sang trọng, in cao cấp.",
  },
  {
    id: 602,
    name: "Namecard Ép Kim",
    categoryId: 6,
    imageUrl: "https://himpaper.vn/data/category/NAMECARD/KK-01-01.jpg",
    description: "Ép kim gold/silver nổi bật thương hiệu.",
  },

  // 7) VOUCHER (categoryId: 7)
  {
    id: 701,
    name: "In Voucher Khuyến Mãi",
    categoryId: 7,
    imageUrl: "https://himpaper.vn/data/category/VOUCHER/voucher.jpg",
    description: "In voucher giảm giá, khuyến mãi theo yêu cầu.",
  },
  {
    id: 702,
    name: "In Thẻ Quà Tặng",
    categoryId: 7,
    imageUrl: "https://himpaper.vn/data/category/VOUCHER/voucher.jpg",
    description: "Gift card sang trọng, thiết kế độc quyền.",
  },

  // 8) BAO LÌ XÌ (categoryId: 8)
  {
    id: 801,
    name: "Bao Lì Xì Tết",
    categoryId: 8,
    imageUrl:
      "https://himpaper.vn/data/category/BAO%20L%C3%8C%20X%C3%8C/gggyju-01.jpg.png",
    description: "Bao lì xì 2025, thiết kế độc quyền, cán mờ.",
  },
  {
    id: 802,
    name: "Bao Lì Xì In Logo",
    categoryId: 8,
    imageUrl:
      "https://himpaper.vn/data/category/BAO%20L%C3%8C%20X%C3%8C/gggyju-01.jpg.png",
    description: "Bao lì xì in logo doanh nghiệp, tối thiểu 1000 cái.",
  },

  // 9) LỊCH (categoryId: 9)
  {
    id: 901,
    name: "Lịch Để Bàn 2025",
    categoryId: 9,
    imageUrl:
      "https://himpaper.vn/data/category/L%E1%BB%8ACH/z5768411133518_2579b804cff0c36e86f931c2b53cf14f.jpg",
    description: "Lịch để bàn chữ A, thiết kế theo yêu cầu.",
  },
  {
    id: 902,
    name: "Lịch Treo Tường Lò Xo",
    categoryId: 9,
    imageUrl:
      "https://himpaper.vn/data/category/L%E1%BB%8ACH/z5768411133518_2579b804cff0c36e86f931c2b53cf14f.jpg",
    description: "Lịch treo tường 7 tờ/13 tờ lò xo giữa.",
  },

  // 10) SỔ TAY (categoryId: 10)
  {
    id: 1001,
    name: "Sổ Tay Bìa Cứng",
    categoryId: 10,
    imageUrl:
      "https://himpaper.vn/data/category/S%E1%BB%94%20TAY/notebook_mockup_05-01.jpg.png",
    description: "Sổ bìa cứng cao cấp, in logo theo yêu cầu.",
  },
  {
    id: 1002,
    name: "Sổ Tay Lò Xo",
    categoryId: 10,
    imageUrl:
      "https://himpaper.vn/data/category/S%E1%BB%94%20TAY/notebook_mockup_05-01.jpg.png",
    description: "Sổ lò xo tiện dụng, phù hợp học sinh / văn phòng.",
  },

  // 11) MENU (categoryId: 11)
  {
    id: 1101,
    name: "Menu Nhà Hàng",
    categoryId: 11,
    imageUrl:
      "https://himpaper.vn/data/category/MENU/z5308594956544_8e60f3f33b198b82e94792e1e5a17022.jpg",
    description: "Menu ép plastic chống nước, bền lâu.",
  },
  {
    id: 1102,
    name: "Menu Cafe Gấp 3",
    categoryId: 11,
    imageUrl:
      "https://himpaper.vn/data/category/MENU/z5308594956544_8e60f3f33b198b82e94792e1e5a17022.jpg",
    description: "Menu gấp 3 cho quán cà phê, in nhanh trong ngày.",
  },

  // 12) TAG - THẺ TREO (categoryId: 12)
  {
    id: 1201,
    name: "Thẻ Treo Quần Áo",
    categoryId: 12,
    imageUrl:
      "https://himpaper.vn/data/category/TAG-TH%E1%BA%BA%20TREO/z5308604775186_2244df5425b9b86e51150223e86f1ad8-01.jpg.png",
    description: "Thẻ sản phẩm thời trang, in theo bộ nhận diện.",
  },
  {
    id: 1202,
    name: "Tag Bao Bì",
    categoryId: 12,
    imageUrl:
      "https://himpaper.vn/data/category/TAG-TH%E1%BA%BA%20TREO/z5308604775186_2244df5425b9b86e51150223e86f1ad8-01.jpg.png",
    description: "Thẻ treo bao bì, thiết kế theo yêu cầu.",
  },

  // 13) THẺ NHỰA CÀO (categoryId: 13) — ảnh trùng voucher nhưng tách categoryId riêng
  {
    id: 1301,
    name: "Thẻ Cào Mini Game",
    categoryId: 13,
    imageUrl: "https://himpaper.vn/data/category/VOUCHER/voucher.jpg",
    description: "Thẻ cào mini game, lớp phủ bạc siêu bền.",
  },
  {
    id: 1302,
    name: "Thẻ Cào Khuyến Mãi",
    categoryId: 13,
    imageUrl: "https://himpaper.vn/data/category/VOUCHER/voucher.jpg",
    description: "Thẻ cào cho chương trình khuyến mãi số lượng lớn.",
  },

  // 14) ẤN PHẨM VĂN PHÒNG (categoryId: 14)
  {
    id: 1401,
    name: "Giấy Tiêu Đề Công Ty",
    categoryId: 14,
    imageUrl:
      "https://himpaper.vn/data/category/S%E1%BB%94%20TAY/notebook_mockup_05-01.jpg.png",
    description: "In giấy tiêu đề theo bộ nhận diện thương hiệu.",
  },
  {
    id: 1402,
    name: "Bao Thư Công Ty",
    categoryId: 14,
    imageUrl:
      "https://himpaper.vn/data/category/S%E1%BB%94%20TAY/notebook_mockup_05-01.jpg.png",
    description: "Bao thư A4/A5 cho doanh nghiệp.",
  },

  // 15) TÚI GIẤY (categoryId: 15)
  {
    id: 1501,
    name: "Túi Giấy Kraft",
    categoryId: 15,
    imageUrl:
      "https://himpaper.vn/data/category/H%E1%BB%98P%20GI%E1%BA%A4Y/M010T150_Cosmatic_Container_1-01-01.jpg",
    description: "Túi giấy kraft thân thiện môi trường.",
  },
  {
    id: 1502,
    name: "Túi Giấy Cao Cấp",
    categoryId: 15,
    imageUrl:
      "https://himpaper.vn/data/category/H%E1%BB%98P%20GI%E1%BA%A4Y/M010T150_Cosmatic_Container_1-01-01.jpg",
    description: "Túi giấy sang trọng bồi carton, ép kim logo.",
  },
];

