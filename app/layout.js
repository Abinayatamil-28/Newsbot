import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Newsbot",
  description: "Generated by create next app",
  icons: {
    icon: 'https://reactheme.com/products/html/echooling/assets/images/logo2.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://reactheme.com/products/html/echooling/assets/images/logo2.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
