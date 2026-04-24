"use client";

export default function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "390px",
        height: "844px",
        margin: "20px auto",
        borderRadius: "44px",
        overflow: "hidden",
        border: "10px solid #111",
        boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
        background: "#000",
        position: "relative",
      }}
    >
      {/* 屏幕 */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FDFDFB",
          borderRadius: "34px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* 刘海（Dynamic Island） */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "30px",
            background: "#000",
            borderRadius: "20px",
            zIndex: 1000,
          }}
        />

        {/* 状态栏 */}
        <div
          style={{
            height: "44px",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "14px",
            fontWeight: 600,
            color: "#000",
          }}
        >
          <span>9:41</span>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ width: "18px", height: "10px", background: "#000", borderRadius: "2px" }} />
            <div style={{ width: "14px", height: "10px", background: "#000", borderRadius: "2px" }} />
          </div>
        </div>

        {/* 内容区 */}
        <div
          style={{
            position: "absolute",
            top: "44px",
            bottom: "0",
            left: 0,
            right: 0,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
