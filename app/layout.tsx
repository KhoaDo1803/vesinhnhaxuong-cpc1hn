import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quản lý hóa chất vệ sinh | DB-QD-007",
  description: "Quản lý pha chế, luân chuyển, sử dụng và kiểm tra hóa chất vệ sinh theo SOP DB-QD-007.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">{children}</body>
    </html>
  );
}
