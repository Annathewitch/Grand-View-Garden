import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LayoutGrid, Compass, Footprints, User } from 'lucide-react'; // 引入图标库

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
      <body className="bg-white flex justify-center items-center min-h-screen">
        {/* 模拟 iPhone 15 外壳 */}
        <div className="w-[375px] h-[812px] bg-black rounded-[50px] border-[12px] border-black shadow-2xl overflow-hidden relative scale-[0.8] origin-center">
          
          {/* 刘海屏幕区域 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-[100] flex justify-center items-end pb-1">
             <div className="w-10 h-1 bg-white/20 rounded-full"></div>
          </div>

          {/* 内容区域 */}
          <main className="h-full w-full relative">
            {children}
          </main>

          {/* 底部导航栏 */}
          <nav className="absolute bottom-0 left-0 right-0 h-[70px] bg-white border-t border-gray-100 flex justify-around items-center px-4 z-[90] pb-2">
            <Link href="/" className="flex flex-col items-center gap-1 text-blue-500">
              <LayoutGrid size={22} fill="currentColor"/>
              <span className="text-[10px] font-bold">大观</span>
            </Link>
            <Link href="/routes" className="flex flex-col items-center gap-1 text-gray-400">
              <Compass size={22}/>
              <span className="text-[10px]">路线</span>
            </Link>
            <div className="relative">
              <div className="w-12 h-12 bg-blue-500 rounded-full text-white text-3xl flex items-center justify-center -top-3 absolute left-1/2 -translate-x-1/2 font-light shadow-xl border-4 border-white active:scale-95 transition-transform">+</div>
            </div>
            <Link href="/walking" className="flex flex-col items-center gap-1 text-gray-400">
              <Footprints size={22}/>
              <span className="text-[10px]">游玩</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400">
              <User size={22}/>
              <span className="text-[10px]">我的</span>
            </Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
