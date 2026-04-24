"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, Navigation, Compass, MapPin, 
  Footprints, User, Search, Flame, Bookmark, Heart, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 样式定义 (保持与首页一致的 iPhone 框架) ---
const appContainerStyle: React.CSSProperties = { 
  width: "390px", 
  height: "844px", 
  margin: "0 auto", 
  background: "#fff", 
  borderRadius: "45px", 
  position: "relative", 
  border: "10px solid #1e293b", 
  overflow: "hidden", 
  display: "flex", 
  flexDirection: "column" 
};

const contentAreaStyle: React.CSSProperties = { 
  flex: 1, 
  overflowY: 'auto', 
  position: 'relative',
  paddingBottom: '100px' // 为底部导航留出空间
};

const headerContainer: React.CSSProperties = { padding: '60px 20px 20px' };
const searchCircle: React.CSSProperties = { width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const tabRow: React.CSSProperties = { display: 'flex', gap: '25px', marginTop: '25px' };
const tabInactive: React.CSSProperties = { fontSize: '14px', fontWeight: '800', color: '#cbd5e1', cursor: 'pointer', position: 'relative', paddingBottom: '8px' };
const tabActive: React.CSSProperties = { ...tabInactive, color: '#1e293b' };
const tabUnderline: React.CSSProperties = { position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: '#3B82F6', borderRadius: '2px' };

const aiCardStyle: React.CSSProperties = { background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', borderRadius: '24px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px 25px' };
const aiIconBg: React.CSSProperties = { width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' };

const postCardContainer: React.CSSProperties = { margin: '0 20px 30px', cursor: 'pointer' };
const imageWrapper: React.CSSProperties = { position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '30px', overflow: 'hidden' };
const fullImg: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };
const postOverlay: React.CSSProperties = { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' };

// --- 底部导航样式 (必须与首页完全一致) ---
const bottomNavStyle: React.CSSProperties = { position: "absolute", bottom: 0, width: "100%", height: "85px", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", display: "flex", justifyContent: "space-around", alignItems: "center", paddingBottom: "15px", borderTop: "1px solid #f1f5f9", zIndex: 500 };
const navInactive: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#cbd5e1", fontSize: "10px", fontWeight: "700", cursor: "pointer" };
const navActive: React.CSSProperties = { ...navInactive, color: "#3B82F6" };
const addBtnInner: React.CSSProperties = { position: "absolute", top: "-28px", left: "50%", transform: "translateX(-50%)", width: "54px", height: "54px", background: "#3B82F6", borderRadius: "50%", color: "#fff", fontSize: "28px", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #fff", boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" };
const iphoneNotch: React.CSSProperties = { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "160px", height: "30px", background: "#1e293b", borderBottomLeftRadius: "18px", borderBottomRightRadius: "18px", zIndex: 1000 };

export default function RoutesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('推荐');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const posts = [
    {
      id: 1,
      title: "静安寺转角：隐于闹市的半日闲处",
      author: "林深时见鹿",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      cover: "https://images.unsplash.com/photo-1541432901012-a76c76546ef3?w=800",
      stats: { distance: "3.2km", time: "1.5h", walkCount: 245 },
      hot: true
    },
    {
      id: 2,
      title: "武康路不只有大楼：老洋房深度巡礼",
      author: "城市拾荒者",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      cover: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800",
      stats: { distance: "2.8km", time: "2h", walkCount: 890 },
      hot: false
    }
  ];

  return (
    <div style={appContainerStyle}>
      <div style={contentAreaStyle}>
        {/* 头部 */}
        <div style={headerContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900' }}>探索路线</h1>
            <div style={searchCircle}><Search size={18} color="#64748b" /></div>
          </div>

          <div style={tabRow}>
            {['推荐', '附近', '最新', '收藏'].map(tab => (
              <div key={tab} onClick={() => setActiveTab(tab)} style={activeTab === tab ? tabActive : tabInactive}>
                {tab}
                {activeTab === tab && <motion.div layoutId="underline" style={tabUnderline} />}
              </div>
            ))}
          </div>
        </div>

        {/* AI 卡片 */}
        <div style={aiCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={aiIconBg}><Sparkles size={16} color="#60A5FA" /></div>
            <div>
              <div style={{ color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>AI 路线定制</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>输入心情，即刻出发</div>
            </div>
          </div>
          <button style={{ background: '#3B82F6', border: 'none', borderRadius: '10px', padding: '8px' }}>
            <Navigation size={14} color="white" />
          </button>
        </div>

        {/* 路线列表 */}
        {posts.map(post => (
          <motion.div key={post.id} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPost(post)} style={postCardContainer}>
            <div style={imageWrapper}>
              <img src={post.cover} style={fullImg} alt="cover" />
              <div style={postOverlay}>
                {post.hot && <div style={{ background: '#EF4444', color: '#fff', fontSize: '10px', padding: '4px 8px', borderRadius: '6px', width: 'fit-content', marginBottom: '8px' }}>🔥 HOT</div>}
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '800' }}>{post.title}</h3>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={post.avatar} style={{ width: '24px', height: '24px', borderRadius: '50%' }} alt="avatar" />
                <span style={{ fontSize: '12px', color: '#64748b' }}>{post.author}</span>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{post.stats.walkCount} 人走过</span>
            </div>
          </motion.div>
        ))}

        {/* 详情弹窗 */}
        <AnimatePresence>
          {selectedPost && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 600 }}
              />
              <motion.div 
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '32px 32px 0 0', padding: '20px 25px 40px', zIndex: 700 }}
              >
                <div style={{ width: '40px', height: '5px', background: '#e2e8f0', margin: '0 auto 20px' }} />
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{selectedPost.title}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', background: '#f8fafc', padding: '15px', borderRadius: '15px' }}>
                  <span>🚶 {selectedPost.stats.distance}</span>
                  <span>⏱ {selectedPost.stats.time}</span>
                </div>
                <button 
                  onClick={() => router.push('/walking')} 
                  style={{ width: '100%', background: '#3B82F6', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: 'bold' }}
                >
                  开启这段旅程
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 底部导航栏 (固定在底部) */}
      <div style={bottomNavStyle}>
        <div onClick={() => router.push('/')} style={navInactive}><MapPin size={22} /><span>大观</span></div>
        <div style={navActive}><Compass size={22} /><span>路线</span></div>
        <div style={{ position: "relative", width: "50px", height: "50px" }}><div style={addBtnInner}>+</div></div>
        <div onClick={() => router.push('/walking')} style={navInactive}><Footprints size={22} /><span>游玩</span></div>
        <div onClick={() => router.push('/profile')} style={navInactive}><User size={22} /><span>我的</span></div>
      </div>

      <div style={iphoneNotch}></div>
    </div>
  );
}
