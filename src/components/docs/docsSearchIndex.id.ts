export interface DocsSearchEntry {
  title: string;
  page: string;
  href: string;
  excerpt: string;
}

export const docsSearchIndex: DocsSearchEntry[] = [
  {
    title: "Pengantar Codessa",
    page: "Pengantar",
    href: "/docs",
    excerpt:
      "Codessa berfungsi sebagai lapisan cerdas antara repositori dan pengembang Anda, menganalisis pull request secara otomatis.",
  },
  {
    title: "Cara Kerjanya",
    page: "Pengantar",
    href: "/docs#how-it-works",
    excerpt: "Push kode, analisis AI, umpan balik — loop ulasan tiga langkah pada setiap pull request.",
  },
  {
    title: "Bahasa yang Didukung",
    page: "Pengantar",
    href: "/docs#languages",
    excerpt:
      "Bahasa pemrograman yang diulas Codessa (Python, JavaScript, PHP, Go) dan bahasa output ulasan (en, id, zh).",
  },
  {
    title: "Panduan Cepat",
    page: "Panduan Cepat",
    href: "/docs/quickstart-guide",
    excerpt: "Masuk, instal Aplikasi GitHub, aktifkan ulasan AI, lalu tambahkan file konfigurasi.",
  },
  {
    title: "Hubungkan",
    page: "Panduan Cepat",
    href: "/docs/quickstart-guide#setup",
    excerpt: "Masuk menggunakan GitHub, instal Aplikasi GitHub, dan aktifkan ulasan AI di repositori.",
  },
  {
    title: "Pengaturan Konfigurasi",
    page: "Panduan Cepat",
    href: "/docs/quickstart-guide#configuration-setup",
    excerpt:
      "Tambahkan file .github/.codessa.yml untuk mengontrol nada, ambang batas keparahan, dan fokus analisis.",
  },
  {
    title: "Hierarki Konfigurasi",
    page: "Hierarki Konfigurasi",
    href: "/docs/configuration-hierarchy",
    excerpt: "Bagaimana .codessa.yml, pengaturan dashboard, dan default bawaan saling menggantikan.",
  },
  {
    title: "Cara kerja prioritas",
    page: "Hierarki Konfigurasi",
    href: "/docs/configuration-hierarchy#precedence",
    excerpt: ".codessa.yml menang jika diatur, lalu pengaturan dashboard, lalu default bawaan.",
  },
  {
    title: "Contoh field-per-field",
    page: "Hierarki Konfigurasi",
    href: "/docs/configuration-hierarchy#example",
    excerpt: "Contoh kerja menunjukkan nilai mana yang menang untuk setiap pengaturan individual.",
  },
];
