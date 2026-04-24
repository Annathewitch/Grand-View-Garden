"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Settings, RefreshCw, Footprints, Map as MapIcon, Compass, User, MapPin, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div style={appContainerStyle}>
      <div style={contentAreaStyle}>
        {/* 顶部操作栏 */}
        <div style={topActionRow}>
          <div style={iconCircle}><Settings size={20} color="#64748b" /></div>
        </div>

        {/* 用户核心信息 */}
        <div style={{ padding: '0 25px' }}>
          <div style={avatarWrapper}>
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" style={imgFit} alt="avatar" />
          </div>
          
          <div style={{ marginTop: '24px' }}>
            <h1 style={userNameText}>林深时见鹿</h1>
            <p style={userSubText}>Digital Nomad Explorer · 上海</p>
          </div>

          <button style={creatorBtnStyle}>
            <RefreshCw size={14} /> 切换至创作者视图
          </button>
        </div>

        {/* 数据统计网格 */}
        <div style={statsGrid}>
          <div style={statCard}>
            <div style={statLabel}><Footprints size={18} color="#3B82F6"/> 累计步数</div>
            <div style={statValue}>124,890</div>
          </div>
          <div style={statCard}>
            <div style={statLabel}><MapIcon size={18} color="#10B981"/> 探索路线</div>
            <div style={statValue}>18 条</div>
          </div>
        </div>

        {/* 菜单列表 */}
        <div style={{ padding: '0 25px', marginTop: '30px', paddingBottom: '40px' }}>
          {['我的收藏', '游玩历史', '勋章墙', '账号设置'].map((item) => (
            <div key={item} style={menuItem}>
              <span>{item}</span>
              <ChevronRight size={18} color="#cbd5e1" />
            </div>
          ))}
        </div>
      </div>

      {/* 底部导航栏 */}
      <div style={bottomNavStyle}>
        <div onClick={() => router.push('/')} style={navInactive}><MapPin size={22} /><span>大观</span></div>
        <div onClick={() => router.push('/routes')} style={navInactive}><Compass size={22} /><span>路线</span></div>
        <div style={addBtnOuter}><div style={addBtnInner}>+</div></div>
        <div onClick={() => router.push('/walking')} style={navInactive}><Footprints size={22} /><span>游玩</span></div>
        <div style={navActive}><User size={22} /><span>我的</span></div>
      </div>

      <div style={iphoneNotch}></div>
    </div>
  );
}

// --- 样式定义 ---
const appContainerStyle: React.CSSProperties = { width: "390px", height: "844px", margin: "0 auto", background: "#fff", borderRadius: "45px", position: "relative", border: "10px solid #1e293b", overflow: "hidden", display: "flex", flexDirection: "column" };
const contentAreaStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', paddingBottom: '100px' };
const topActionRow: React.CSSProperties = { display: 'flex', justifyContent: 'flex-end', padding: '60px 25px 0' };
const iconCircle: React.CSSProperties = { width: '40px', height: '40px', background: '#f8fafc', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #f1f5f9' };
const avatarWrapper: React.CSSProperties = { width: '80px', height: '80px', borderRadius: '24px', overflow: 'hidden', background: '#e2e8f0', marginTop: '10px' };
const imgFit: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };
const userNameText: React.CSSProperties = { fontSize: '24px', fontWeight: '900', color: '#1e293b' };
const userSubText: React.CSSProperties = { color: '#64748b', fontWeight: '600', fontSize: '13px', marginTop: '4px' };
const creatorBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', fontSize: '13px', fontWeight: 'bold', color: '#475569', marginTop: '20px', cursor: 'pointer' };
const statsGrid: React.CSSProperties = { padding: '0 25px', marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' };
const statCard: React.CSSProperties = { background: '#f8fafc', padding: '15px', borderRadius: '20px' };
const statLabel: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' };
const statValue: React.CSSProperties = { fontSize: '22px', fontWeight: '900', color: '#1e293b' };
const menuItem: React.CSSProperties = { padding: '20px 0', borderBottom: '1px solid #f1f5f9', fontSize: '15px', fontWeight: '700', color: '#1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' };
const bottomNavStyle: React.CSSProperties = { position: "absolute", bottom: 0, width: "100%", height: "85px", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", display: "flex", justifyContent: "space-around", alignItems: "center", paddingBottom: "15px", borderTop: "1px solid #f1f5f9", zIndex: 500 };
const navInactive: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#cbd5e1", fontSize: "10px", fontWeight: "700", cursor: "pointer" };
const navActive: React.CSSProperties = { ...navInactive, color: "#3B82F6" };
const addBtnOuter: React.CSSProperties = { position: "relative", width: "50px", height: "50px" };
const addBtnInner: React.CSSProperties = { position: "absolute", top: "-28px", left: "50%", transform: "translateX(-50%)", width: "54px", height: "54px", background: "#3B82F6", borderRadius: "50%", color: "#fff", fontSize: "28px", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #fff", boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" };
const iphoneNotch: React.CSSProperties = { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "160px", height: "30px", background: "#1e293b", borderBottomLeftRadius: "18px", borderBottomRightRadius: "18px", zIndex: 1000 };
