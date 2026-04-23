import './globals.css';
import Link from 'next/link';
import { Map, Compass, Footprints, User } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="bg-gray-50 max-w-md mx-auto min-h-screen border-x border-gray-100 shadow-xl">
        <main className="pb-20">{children}</main>
        
        {/* 底部导航栏 */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t flex justify-around py-3 text-gray-400 z-50">
          <Link href="/map" className="flex flex-col items-center gap-1 hover:text-black"><Map size={20}/>地图</Link>
          <Link href="/routes" className="flex flex-col items-center gap-1 hover:text-black"><Compass size={20}/>路线</Link>
          <Link href="/walking" className="flex flex-col items-center gap-1 hover:text-black"><Footprints size={20}/>游玩</Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 hover:text-black"><User size={20}/>我的</Link>
        </nav>
      </body>
    </html>
  );
}
