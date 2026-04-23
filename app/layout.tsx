import './globals.css';
import Link from 'next/link';
import { Map, Compass, Footprints, User } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '大观园 - Grand View Garden',
  description: '每一个城市，都是一座未被读完的园林。',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="bg-[#121212] flex justify-center items-center min-h-screen overflow-hidden">
        
        {/* --- 手机模拟器外壳 --- */}
        <div className="relative w-[375px] h-[812px] bg-white rounded-[60px] border-[12px] border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col scale-[0.85] sm:scale-100 transition-transform">
          
          {/* 手机顶部的刘海/听筒区域 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#333] rounded-b-3xl z-[100] flex justify-center items-end pb-1">
             <div className="w-12 h-1 bg-white/10 rounded-full mb-1"></div>
          </div>

          {/* 手机状态栏（模拟时间等） */}
          <div className="h-11 w-full bg-white flex justify-between items-center px-8 shrink-0 z-50">
            <span className="text-[14px] font-bold">9:41</span>
            <div className="flex gap-1.5 items-center">
              <span className="text-xs">📶</span>
              <span className="text-xs">🔋</span>
            </div>
          </div>

          {/* 核心内容区 */}
          <main className="flex-1 relative overflow-y-auto no-scrollbar bg-[#F8F7F2]">
            {children}
          </main>

          {/* 底部导航栏（固定在模拟器底部） */}
          <nav className="h-[70px] bg-white/95 backdrop-blur-sm border-t flex justify-around items-center px-2 shrink-0 z-50 pb-2">
            <Link href="/map" className="flex flex-col items-center gap-1 text-gray-400 hover:text-black transition-colors">
              <Map size={22} />
              <span className="text-[10px] font-bold">地图</span>
            </Link>
            <Link href="/routes" className="flex flex-col items-center gap-1 text-gray-400 hover:text-black transition-colors">
              <Compass size={22} />
              <span className="text-[10px] font-bold">路线</span>
            </Link>
            <Link href="/walking" className="flex flex-col items-center gap-1 text-gray-400 hover:text-black transition-colors">
              <Footprints size={22} />
              <span className="text-[10px] font-bold">游玩</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-black transition-colors">
              <User size={22} />
              <span className="text-[10px] font-bold">我的</span>
            </Link>
          </nav>

          {/* 底部苹果 Home Indicator 小黑条 */}
          <div className="h-5 bg-white w-full flex justify-center items-start shrink-0 z-50">
            <div className="w-32 h-1 bg-black/20 rounded-full" />
          </div>

        </div>
        {/* --- 模拟器结束 --- */}

      </body>
    </html>
  );
}
