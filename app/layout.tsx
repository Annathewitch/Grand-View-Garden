import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '大观园 - CityWalk 发现与记录',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="bg-[#f1f5f9] flex justify-center items-center min-h-screen">
        {/* 注意：这里只保留最外层的物理装饰
            具体的 iPhone 容器样式我们已经在各页面内定义好了
            为了避免双重边框，我们将 layout 设置为简单的容器
        */}
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}
