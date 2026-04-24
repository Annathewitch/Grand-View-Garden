"use client";
import { useState } from 'react';
import { Search, MapPin, Coffee, GalleryVertical, Trees as Tree, Menu, Compass, Footprints, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppDemo() {
  // 1. 状态管理 (保留你原来的地图逻辑)
  const [bottomTab, setBottomTab] = useState("大观");
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const mapPoints = [
    { id: 1, x: 260, y: 380, title: "xx咖啡店一日游" },
    { id: 2, x: 120, y: 310, title: "古着店探店" }
  ];

  return (
    /* --- 最外层：iPhone 模拟容器 (参考你给的代码格式) --- */
    <div style={appContainerStyle}>
      
      {/* 内容区域：根据 bottomTab 切换 */}
      <div style={contentAreaStyle}>
        
        {bottomTab === "大观" && (
          <div style={pageWrapperStyle}>
            {/* 地图层 */}
            <img src="/shanghai-map.png" style={mapBgStyle} alt="Map" onClick={() => setSelectedPoint(null)} />

            {/* 顶部搜索栏 - 严格参考图一 UI */}
            <div style={searchBarWrapper}>
              <div style={searchInnerStyle}>
                <Menu size={20} color="#999" />
                <input placeholder="搜索最近周末活动" style={inputStyle} />
                <Search size={20} color="#999" />
              </div>
            </div>

            {/* 分类 Tabs */}
            <div style={categoryWrapper}>
              <div style={activeTabStyle}><Coffee size={14} /> 咖啡店</div>
              <div style={inactiveTabStyle}><GalleryVertical size={14} /> 展览</div>
              <div style={inactiveTabStyle}><Tree size={14} /> 自然</div>
            </div>

            {/* 地图标点 */}
            {mapPoints.map(p => (
              <div key={p.id} onClick={(e) => { e.stopPropagation(); setSelectedPoint(p.id); }}
                style={{ ...markerStyle, left: p.x, top: p.y }}>
                <MapPin size={32} fill={selectedPoint === p.id ? "#DC2626" : "#EF4444"} color="white" />
              </div>
            ))}

            {/* 弹出卡片 */}
            <AnimatePresence>
              {selectedPoint && (
                <motion.div initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }} style={popupCardStyle}>
                  <div style={cardImageStyle}>
                    <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" style={imgFit} />
                  </div>
                  <div style={cardContentStyle}>
                    <div style={cardTitleStyle}>{mapPoints.find(p => p.id === selectedPoint)?.title}</div>
                    <div style={cardDescStyle}>新开在内部的这家店简直就是 citywalk 的不二去处...</div>
                    <div style={cardBtnGroup}>
                        <button onClick={() => setSelectedPoint(null)} style={secBtn}>取消</button>
                        <button style={priBtn}>查看详情</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {bottomTab === "路线" && <div style={centerTextStyle}>路线页面开发中...</div>}
        {bottomTab === "游玩" && <div style={centerTextStyle}>游玩页面开发中...</div>}
        {bottomTab === "我的" && <div style={centerTextStyle}>个人中心开发中...</div>}
      </div>

      {/* --- 底部导航栏：严格锁死在 iPhone 容器内 --- */}
      <div style={bottomNavStyle}>
        <div onClick={() => setBottomTab("大观")} style={bottomTab === "大观" ? navActive : navItem}>
          <MapPin size={22} /><span>大观</span>
        </div>
        <div onClick={() => setBottomTab("路线")} style={bottomTab === "路线" ? navActive : navItem}>
          <Compass size={22} /><span>路线</span>
        </div>
        
        {/* 中间加号按钮 */}
        <div style={navAddWrapper}>
          <div style={navAddBtn}>+</div>
        </div>

        <div onClick={() => setBottomTab("游玩")} style={bottomTab === "游玩" ? navActive : navItem}>
          <Footprints size={22} /><span>游玩</span>
        </div>
        <div onClick={() => setBottomTab("我的")} style={bottomTab === "我的" ? navActive : navItem}>
          <User size={22} /><span>我的</span>
        </div>
      </div>

      {/* iPhone 刘海装饰 */}
      <div style={notchStyle}></div>
    </div>
  );
}

// ==================== 样式表 (CSS-in-JS 格式) ====================

const appContainerStyle: React.CSSProperties = {
  width: "390px",
  height: "844px",
  margin: "20px auto",
  background: "#fff",
  borderRadius: "40px",
  position: "relative", // 核心：让内部所有 absolute 元素以此为基准
  border: "8px solid #1a1a1a",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
};

const contentAreaStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative"
};

const pageWrapperStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative"
};

const mapBgStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const bottomNavStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "84px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  paddingBottom: "20px",
  borderTop: "1px solid #eee",
  zIndex: 100
};

const navItem: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  color: "#ccc",
  fontSize: "10px",
  fontWeight: "bold",
  cursor: "pointer"
};

const navActive: React.CSSProperties = {
  ...navItem,
  color: "#2563EB"
};

const navAddWrapper: React.CSSProperties = {
  position: "relative",
  width: "50px",
  height: "50px"
};

const navAddBtn: React.CSSProperties = {
  position: "absolute",
  top: "-30px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "56px",
  height: "56px",
  background: "#2563EB",
  borderRadius: "50%",
  color: "#fff",
  fontSize: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "6px solid #fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const searchBarWrapper: React.CSSProperties = {
  position: "absolute",
  top: "50px",
  left: "15px",
  right: "15px",
  zIndex: 50
};

const searchInnerStyle: React.CSSProperties = {
  background: "#fff",
  height: "54px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  padding: "0 15px",
  gap: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: "14px",
  fontWeight: "500"
};

const categoryWrapper: React.CSSProperties = {
  position: "absolute",
  top: "115px",
  left: "15px",
  display: "flex",
  gap: "8px",
  zIndex: 50
};

const activeTabStyle: React.CSSProperties = {
  background: "#2563EB",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "5px"
};

const inactiveTabStyle: React.CSSProperties = {
  ...activeTabStyle,
  background: "rgba(255,255,255,0.9)",
  color: "#666",
  border: "1px solid rgba(0,0,0,0.05)"
};

const markerStyle: React.CSSProperties = {
  position: "absolute",
  transform: "translate(-50%, -100%)",
  cursor: "pointer",
  zIndex: 10
};

const popupCardStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "100px",
  left: "15px",
  right: "15px",
  background: "#fff",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  zIndex: 80
};

const cardImageStyle: React.CSSProperties = { height: "160px", background: "#eee" };
const imgFit: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
const cardContentStyle: React.CSSProperties = { padding: "20px" };
const cardTitleStyle: React.CSSProperties = { fontSize: "18px", fontWeight: "900", color: "#111" };
const cardDescStyle: React.CSSProperties = { fontSize: "12px", color: "#666", marginTop: "8px", lineHeight: "1.5" };
const cardBtnGroup: React.CSSProperties = { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" };

const priBtn: React.CSSProperties = { background: "#2563EB", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold" };
const secBtn: React.CSSProperties = { ...priBtn, background: "none", color: "#999" };

const notchStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "150px",
  height: "30px",
  background: "#1a1a1a",
  borderBottomLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  zIndex: 1000
};

const centerTextStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  color: "#999"
};
