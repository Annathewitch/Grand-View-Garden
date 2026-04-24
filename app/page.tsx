"use client";
import React, { useState } from 'react';
import { Search, MapPin, Coffee, GalleryVertical, Trees as Tree, Menu, Compass, Footprints, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 类型定义 ---
type MapPoint = {
  id: number;
  x: number;
  y: number;
  title: string;
  desc: string;
  img: string;
  category: string;
};

export default function IntegratedMapPage() {
  // 1. 状态管理
  const [bottomTab, setBottomTab] = useState("大观");
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [activeCategory, setActiveCategory] = useState("咖啡店");

  // 2. 模拟数据 (这里你可以根据需要修改坐标)
  const mapPoints: MapPoint[] = [
    { 
      id: 1, x: 260, y: 380, category: "咖啡店",
      title: "xx咖啡店一日游", 
      desc: "新开在内部的这家店简直就是 citywalk 的不二去处，窗外就是百年的老梧桐...",
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
    },
    { 
      id: 2, x: 120, y: 310, category: "展览",
      title: "古着店探店/限时展", 
      desc: "这里收集了来自世界各地的复古单品，每一件都有自己的故事，非常适合拍照。",
      img: "https://images.unsplash.com/photo-1534349762230-e09605823948?w=400"
    }
  ];

  // 3. 处理地图背景点击（关闭弹出卡片）
  const handleMapClick = () => {
    setSelectedPoint(null);
  };

  return (
    <div style={appContainerStyle}>
      <div style={contentAreaStyle}>
        
        {/* 只有在“大观”标签下才显示地图交互 */}
        {bottomTab === "大观" && (
          <div style={fullScreenWrapper}>
            
            {/* 地图背景图层 - 点击可关闭卡片 */}
            <div style={mapLayer} onClick={handleMapClick}>
              <img 
                src="/shanghai-map.png" // 请确保你的 public 文件夹下有这张图，或者换成任意 URL
                style={mapImageStyle} 
                alt="Map Background" 
              />
            </div>

            {/* 顶部搜索栏 */}
            <div style={searchBarContainer}>
              <div style={searchInner}>
                <Menu size={20} color="#999" />
                <input placeholder="搜索最近周末活动" style={inputReset} />
                <Search size={20} color="#999" />
              </div>
            </div>

            {/* 顶部分类 Tab 切换功能 */}
            <div style={categoryRow}>
              {[
                { name: "咖啡店", icon: <Coffee size={14} /> },
                { name: "展览", icon: <GalleryVertical size={14} /> },
                { name: "自然", icon: <Tree size={14} /> }
              ].map((cat) => (
                <div 
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  style={activeCategory === cat.name ? catActive : catInactive}
                >
                  {cat.icon} {cat.name}
                </div>
              ))}
            </div>

            {/* 地图标点功能 - 根据分类过滤并渲染 */}
            {mapPoints.filter(p => p.category === activeCategory).map(p => (
              <div 
                key={p.id} 
                onClick={(e) => { 
                  e.stopPropagation(); // 防止触发地图背景的 handleMapClick
                  setSelectedPoint(p); 
                }}
                style={{ ...markerPosition, left: p.x, top: p.y }}
              >
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <MapPin size={32} fill={selectedPoint?.id === p.id ? "#3B82F6" : "#EF4444"} color="white" />
                </motion.div>
              </div>
            ))}

            {/* 弹出详情卡片功能 */}
            <AnimatePresence>
              {selectedPoint && (
                <motion.div 
                  initial={{ y: 300, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  exit={{ y: 300, opacity: 0 }} 
                  style={detailCardStyle}
                >
                  <div style={cardImageContainer}>
                    <img src={selectedPoint.img} style={imgCover} alt="Detail" />
                  </div>
                  <div style={cardContent}>
                    <div style={cardTitle}>{selectedPoint.title}</div>
                    <div style={cardDescription}>{selectedPoint.desc}</div>
                    <div style={cardFooter}>
                        <button onClick={() => setSelectedPoint(null)} style={cancelBtn}>返回</button>
                        <button style={actionBtn}>开启路线</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 其他页面占位 */}
        {bottomTab !== "大观" && (
          <div style={placeholderContent}>
            正在进入 {bottomTab} 模块...
          </div>
        )}
      </div>

      {/* 底部导航栏 - 严格锁死在容器底部 */}
      <div style={bottomNavContainer}>
        <div onClick={() => setBottomTab("大观")} style={bottomTab === "大观" ? navActive : navInactive}>
          <MapPin size={22} /><span>大观</span>
        </div>
        <div onClick={() => setBottomTab("路线")} style={bottomTab === "路线" ? navActive : navInactive}>
          <Compass size={22} /><span>路线</span>
        </div>
        
        <div style={addBtnOuter}>
          <div style={addBtnInner}>+</div>
        </div>

        <div onClick={() => setBottomTab("游玩")} style={bottomTab === "游玩" ? navActive : navInactive}>
          <Footprints size={22} /><span>游玩</span>
        </div>
        <div onClick={() => setBottomTab("我的")} style={bottomTab === "我的" ? navActive : navInactive}>
          <User size={22} /><span>我的</span>
        </div>
      </div>

      {/* iPhone 顶栏装饰 */}
      <div style={iphoneNotch}></div>
    </div>
  );
}

// ==================== 样式表 (与你提供的模板逻辑一致) ====================

const appContainerStyle: React.CSSProperties = { 
  width: "390px", 
  height: "844px", 
  margin: "0 auto", // 确保居中
  background: "#fff", 
  borderRadius: "45px", 
  position: "relative", 
  border: "10px solid #1e293b", 
  overflow: "hidden", // 必须保留，确保内容不出框
  display: "flex",    // 新增：确保内容垂直排列
  flexDirection: "column" // 新增
};

const contentAreaStyle: React.CSSProperties = { width: "100%", height: "100%" };
const fullScreenWrapper: React.CSSProperties = { width: "100%", height: "100%", position: "relative" };

const mapLayer: React.CSSProperties = { position: "absolute", inset: 0, zIndex: 0 };
const mapImageStyle: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };

const searchBarContainer: React.CSSProperties = { position: "absolute", top: "55px", left: "20px", right: "20px", zIndex: 50 };
const searchInner: React.CSSProperties = { background: "#fff", height: "50px", borderRadius: "15px", display: "flex", alignItems: "center", padding: "0 15px", gap: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" };
const inputReset: React.CSSProperties = { flex: 1, border: "none", outline: "none", fontSize: "14px" };

const categoryRow: React.CSSProperties = { position: "absolute", top: "120px", left: "20px", display: "flex", gap: "10px", zIndex: 50 };
const catInactive: React.CSSProperties = { background: "rgba(255,255,255,0.9)", padding: "8px 14px", borderRadius: "12px", fontSize: "12px", fontWeight: "600", color: "#64748b", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", border: "1px solid rgba(0,0,0,0.05)" };
const catActive: React.CSSProperties = { ...catInactive, background: "#3B82F6", color: "#fff", border: "none" };

const markerPosition: React.CSSProperties = { position: "absolute", transform: "translate(-50%, -100%)", cursor: "pointer", zIndex: 10 };

const detailCardStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "100px",
  left: "20px",
  right: "20px",
  background: "#fff",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  zIndex: 100
};

const cardImageContainer: React.CSSProperties = { height: "140px", background: "#f1f5f9" };
const imgCover: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
const cardContent: React.CSSProperties = { padding: "18px" };
const cardTitle: React.CSSProperties = { fontSize: "17px", fontWeight: "800", color: "#1e293b" };
const cardDescription: React.CSSProperties = { fontSize: "12px", color: "#64748b", marginTop: "6px", lineHeight: "1.6" };
const cardFooter: React.CSSProperties = { display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "15px" };

const actionBtn: React.CSSProperties = { background: "#3B82F6", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" };
const cancelBtn: React.CSSProperties = { ...actionBtn, background: "none", color: "#94a3b8" };

const bottomNavContainer: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "85px",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  paddingBottom: "15px",
  borderTop: "1px solid #f1f5f9",
  zIndex: 200
};

const navInactive: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#cbd5e1", fontSize: "10px", fontWeight: "700", cursor: "pointer" };
const navActive: React.CSSProperties = { ...navInactive, color: "#3B82F6" };

const addBtnOuter: React.CSSProperties = { position: "relative", width: "50px", height: "50px" };
const addBtnInner: React.CSSProperties = { position: "absolute", top: "-28px", left: "50%", transform: "translateX(-50%)", width: "54px", height: "54px", background: "#3B82F6", borderRadius: "50%", color: "#fff", fontSize: "28px", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #fff", boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" };

const iphoneNotch: React.CSSProperties = { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "160px", height: "30px", background: "#1e293b", borderBottomLeftRadius: "18px", borderBottomRightRadius: "18px", zIndex: 1000 };

const placeholderContent: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color: "#94a3b8", fontSize: "14px" };
