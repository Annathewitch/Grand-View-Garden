import './globals.css';
import Link from 'next/link';
import { Map, Compass, Footprints, User } from 'lucide-react';
import type { Metadata } from 'next';

// 这一部分是新增的：用于让浏览器识别你的“心形感叹号”图标
export const metadata: Metadata = {
  title: '大观园 - 深度城市游走',
  description: '每一个城市，都是一座未被读完的园林。',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest', // 对应你那个 JSON 文件名
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="bg-gray-50 max-w-md mx-auto min-h-screen border-x border-gray-100 shadow-xl">
        <main className="pb-20">{children}</main>
        
        {/* 底部导航栏 */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t flex justify-around py-3 text-gray-400 z-50">
          <Link href="/map" className="flex flex-col items-center gap-1 hover:text-black">
            <Map size={20}/>
            <span className="text-[10px]">地图</span>
          </Link>
          <Link href="/routes" className="flex flex-col items-center gap-1 hover:text-black">
            <Compass size={20}/>
            <span className="text-[10px]">路线</span>
          </Link>
          <Link href="/walking" className="flex flex-col items-center gap-1 hover:text-black">
            <Footprints size={20}/>
            <span className="text-[10px]">游玩</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 hover:text-black">
            <User size={20}/>
            <span className="text-[10px]">我的</span>
          </Link>
        </nav>
      </body>
    </html>
  );
}
