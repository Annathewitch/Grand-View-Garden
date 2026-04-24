// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body style={{ 
        background: "#f1f5f9", 
        margin: 0, 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh" 
      }}>
        {children}
      </body>
    </html>
  );
}
