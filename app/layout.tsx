import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '大观园 - Grand View Garden',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="bg-[#1a1a1a] flex justify-center items-center min-h-screen font-sans">
        {/* 模拟手机外壳 */}
        <div className="relative w-[375px] h-[812px] bg-white shadow-2xl rounded-[60px] border-[8px] border-[#333] overflow-hidden flex flex-col">
          {/* 手机状态栏 */}
          <div className="h-11 w-full bg-white flex justify-between items-center px-8 shrink-0">
            <span className="text-xs font-bold">9:41</span>
            <div className="flex gap-1.5 items-center">
              <span className="text-[10px]">📶</span>
              <span className="text-[10px]">🔋</span>
            </div>
          </div>
          
          {/* 内容区 */}
          <main className="flex-1 relative overflow-hidden bg-[#F8F7F2]">
            {children}
          </main>

          {/* 底部 Home Indicator (苹果小黑条) */}
          <div className="h-8 bg-white w-full flex justify-center items-center shrink-0">
            <div className="w-32 h-1 bg-black/20 rounded-full" />
          </div>
        </div>
      </body>
    </html>
  );
}
