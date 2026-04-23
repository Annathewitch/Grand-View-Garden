import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '大观园 - Grand View Garden',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 定义您要求的苹果模型框样式
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '375px',
    height: '812px',
    backgroundColor: '#fff',
    borderRadius: '40px',
    border: '8px solid #333',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const statusBarStyle: React.CSSProperties = {
    height: '44px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 25px',
    fontSize: '14px',
    fontWeight: 'bold',
    zIndex: 100,
  };

  return (
    <html lang="zh">
      <body style={{ 
        backgroundColor: '#1a1a1a', 
        margin: 0, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        {/* 苹果模型框 */}
        <div style={containerStyle}>
          {/* 模拟 iPhone 刘海 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150px',
            height: '25px',
            backgroundColor: '#333',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
            zIndex: 101
          }} />

          {/* 状态栏 */}
          <div style={statusBarStyle}>
            <span>9:41</span>
            <div style={{ display: 'flex', gap: '5px' }}>📶🔋</div>
          </div>

          {/* 页面主内容区 - 必须预留底部导航栏的高度 */}
          <main style={{ 
            flex: 1, 
            overflowY: 'auto', 
            paddingBottom: '70px', // 为底部 Bar 预留空间
            position: 'relative' 
          }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
