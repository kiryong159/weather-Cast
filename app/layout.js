import localFont from "next/font/local";
import "./globals.css";
/* import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] }); */

export const metadata = {
  title: "초단기 예보 조회",
  description: "기상청 API를 활용한 예보 조회",
};

const myFont = localFont({
  src: "./Bazzi.woff",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
