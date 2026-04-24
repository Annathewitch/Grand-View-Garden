"use client";
import { useState } from 'react';
import { Settings, RefreshCw, Footprints, Map as MapIcon, Compass, User, MapPin } from 'lucide-react';

export default function ProfilePage() {
  const [bottomTab, setBottomTab] = useState("我的");

  return (
    <div style={appContainerStyle}>
      <div style={contentAreaStyle}>
        {/* 顶部状态与设置 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '50px 20px 0' }}>
          <Settings size={24} color="#333" />
        </div>

        {/* 用户信息 */}
        <div style={{ padding: '0 25px' }}>
          <div style={avatarWrapper}>
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" style={imgFit} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginTop: '20px' }}>林深时见鹿</h1>
          <p style={{ color: '#999', fontWeight: '500' }}>Digital Nomad Explorer</p>
          <button style={creatorBtnStyle}>
            <RefreshCw size={14} /> 切换至创作者视图
          </button>
        </div>

        {/* 数据统计 */}
        <div style={{ padding: '0 25px', marginTop: '40px' }}>
          <div style={statItem}>
            <div style={statLabel}><Footprints size={20}/> Total Steps</div>
            <div style={statValue}>124,890</div>
          </div>
          <div style={statItem}>
            <div style={statLabel}><MapIcon size={20}/> Routes</div>
            <div style={statValue}>18 Entries</div>
          </div>
        </div>
      </div>

      {/* 底部导航栏 (保持与 Home 页面一致) */}
      <div style={bottomNavStyle}>
        <div onClick={() => window.location.href='/'} style={navItem}><MapPin size={22} /><span>大观</span></div>
        <div onClick={() => window.location.href='/routes'} style={navItem}><Compass size={22} /><span>路线</span></div>
        <div style={navAddWrapper}><div style={navAddBtn}>+</div></div>
        <div onClick={() => window.location.href='/walking'} style={navItem}><Footprints size={22} /><span>游玩</span></div>
        <div style={navActive}><User size={22} /><span>我的</span></div>
      </div>
      <div style={notchStyle}></div>
    </div>
  );
}

// 样式复用自 Home 页面
const appContainerStyle: React.CSSProperties = { width: "390px", height: "844px", margin: "20px auto", background: "#fff", borderRadius: "40px", position: "relative", border: "8px solid #1a1a1a", overflow: "hidden" };
const contentAreaStyle: React.CSSProperties = { width: "100%", height: "100%", overflowY: 'auto' };
const avatarWrapper: React.CSSProperties = { width: '100%', aspectRatio: '1/1', borderRadius: '24px', overflow: 'hidden', background: '#f5f5f5' };
const imgFit: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };
const creatorBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', border: '1px solid #eee', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', color: '#666', marginTop: '15px' };
const statItem: React.CSSProperties = { marginBottom: '30px' };
const statLabel: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px', color: '#333', fontWeight: 'bold', fontSize: '14px' };
const statValue: React.CSSProperties = { fontSize: '36px', fontWeight: '900', letterSpacing: '-1px', marginTop: '5px' };
const bottomNavStyle: React.CSSProperties = { position: "absolute", bottom: 0, width: "100%", height: "84px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", display: "flex", justifyContent: "space-around", alignItems: "center", paddingBottom: "20px", borderTop: "1px solid #eee" };
const navItem: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#ccc", fontSize: "10px", fontWeight: "bold", cursor: "pointer" };
const navActive: React.CSSProperties = { ...navItem, color: "#2563EB" };
const navAddWrapper: React.CSSProperties = { position: "relative", width: "50px", height: "50px" };
const navAddBtn: React.CSSProperties = { position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)", width: "56px", height: "56px", background: "#2563EB", borderRadius: "50%", color: "#fff", fontSize: "30px", display: "flex", justifyContent: "center", alignItems: "center", border: "6px solid #fff" };
const notchStyle: React.CSSProperties = { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "150px", height: "30px", background: "#1a1a1a", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" };
