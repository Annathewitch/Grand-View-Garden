"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, Navigation, Compass, MapPin, 
  Footprints, User, Search, Flame, Bookmark, Heart, Settings 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 样式定义（移至函数外，防止构建时解析冲突） ---
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
const contentAreaStyle: React.CSSProperties = { width: "100%", height: "100%", position: "relative", display: 'flex', flexDirection: 'column' };
const headerContainer: React.CSSProperties = { padding: '60px 20px 20px' };
const searchCircle: React.CSSProperties = { width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const tabRow: React.CSSProperties = { display: 'flex', gap: '25px', marginTop: '25px' };
const tabInactive: React.CSSProperties = { fontSize: '14px', fontWeight: '800', color: '#cbd5e1', cursor: 'pointer', position: 'relative', paddingBottom: '8px' };
const tabActive: React.CSSProperties = { ...tabInactive, color: '#1e293b' };
const tabUnderline: React.CSSProperties = { position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: '#3B82F6', borderRadius: '2px' };
const aiCardStyle: React.CSSProperties = { background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)', borderRadius: '24px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' };
const aiIconBg: React.CSSProperties = { width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const aiActionBtn: React.CSSProperties = { background: '#3B82F6', border: 'none', width: '32px', height: '32px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' };
const scrollArea: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '0 20px 100px' };
const postCardContainer: React.CSSProperties = { marginBottom: '30px', cursor: 'pointer' };
const imageWrapper: React.CSSProperties = { position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' };
const fullImg: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };
const postOverlay: React.CSSProperties = { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' };
const hotBadge: React.CSSProperties = { background: '#EF4444', color: '#fff', fontSize: '8px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', width: 'fit-content', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' };
const postTitleText: React.CSSProperties = { color: '#fff', fontSize: '16px', fontWeight: '800', lineHeight: '1.4' };
const actionFloat: React.CSSProperties = { position: 'absolute', top: '15px', right: '15px', display: 'flex', flexDirection: 'column', gap: '10px' };
const iconBtnSmall: React.CSSProperties = { width: '34px', height: '34px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#1e293b' };
const postFooter: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '0 5px' };
const authorAvatar: React.CSSProperties = { width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' };
const authorName: React.CSSProperties = { fontSize: '12px', color: '#64748b', fontWeight: '500' };
const walkStat: React.CSSProperties = { fontSize: '11px', color: '#94a3b8' };
const backdropOverlay: React.CSSProperties = { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 300 };
const bottomSheet: React.CSSProperties = { position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '32px 32px 0 0', padding: '10px 25px 40px', zIndex: 400 };
const sheetHandle: React.CSSProperties = { width: '40px', height: '5px', background: '#e2e8f0', borderRadius: '3px', margin: '0 auto 20px' };
const sheetImg: React.CSSProperties = { width: '100%', height: '160px', objectFit: 'cover', borderRadius: '20px', marginBottom: '20px' };
const sheetStatsRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8', marginBottom: '25px', background: '#f8fafc', padding: '12px', borderRadius: '15px' };
const startWalkBtn: React.CSSProperties = { width: '100%', background: '#3B82F6', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' };
const bottomNavStyle: React.CSSProperties = { position: "absolute", bottom: 0, width: "100%", height: "85px", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", display: "flex", justifyContent: "space-around", alignItems: "center", paddingBottom: "15px", borderTop: "1px solid #f1f5f9", zIndex: 200 };
const navInactive: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#cbd5e1", fontSize: "10px", fontWeight: "700", cursor: "pointer" };
const navActive: React.CSSProperties = { ...navInactive, color: "#3B82F6" };
const addBtnOuter: React.CSSProperties = { position: "relative", width: "50px", height: "50px" };
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
      tags: ["安静", "避暑"],
      stats: { distance: "3.2km", time: "1.5h", walkCount: 245 },
      hot: true
    },
    {
      id: 2,
      title: "武康路不只有大楼：老洋房深度巡礼",
      author: "城市拾荒者",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      cover: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800",
      tags: ["老建筑", "摄影"],
      stats: { distance: "2.8km", time: "2h", walkCount: 890 },
      hot: false
    }
  ];

  return (
    <div style={appContainerStyle}>
      <div style={contentAreaStyle}>
        
        <div style={headerContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '-1px' }}>探索路线</h1>
            <div style={searchCircle}><Search size={18} color="#64748b" /></div>
          </div>

          <div style={tabRow}>
            {['推荐', '附近', '最新', '收藏'].map(tab => (
              <div 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={activeTab === tab ? tabActive : tabInactive}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="underline" style={tabUnderline} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 20px', marginBottom: '25px' }}>
          <div style={aiCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={aiIconBg}><Sparkles size={16} color="#60A5FA" /></div>
              <div>
                <div style={{ color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>AI 路线定制</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>输入心情，即刻出发</div>
              </div>
            </div>
            <button style={aiActionBtn}><Navigation size={14} color="white" /></button>
          </div>
        </div>

        <div style={scrollArea}>
          {posts.map(post => (
            <motion.div 
              key={post.id} 
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPost(post)}
              style={postCardContainer}
            >
              <div style={imageWrapper}>
                <img src={post.cover} alt="cover" style={fullImg} />
                <div style={postOverlay}>
                  {post.hot && (
                    <div style={hotBadge}><Flame size={10} /> HOT</div>
                  )}
                  <h3 style={postTitleText}>{post.title}</h3>
                </div>
                <div style={actionFloat}>
                   <div style={iconBtnSmall}><Heart size={14} /></div>
                   <div style={iconBtnSmall}><Bookmark size={14} /></div>
                </div>
              </div>
              
              <div style={postFooter}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={post.avatar} alt="avatar" style={authorAvatar} />
                  <span style={authorName}>by {post.author}</span>
                </div>
                <span style={walkStat}>{post.stats.walkCount} 人走过</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedPost && (
            <React.Fragment key="modal-group">
              <motion.div 
                key="backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                style={backdropOverlay}
              />
              <motion.div 
                key="sheet"
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                style={bottomSheet}
              >
                <div style={sheetHandle} />
                <img src={selectedPost.cover} alt="detail" style={sheetImg} />
                <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>{selectedPost.title}</h2>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
                  这条路线将带你领略海派文化的精髓。
                </p>
                <div style={sheetStatsRow}>
                  <span>🚶 {selectedPost.stats.distance}</span>
                  <span>⏱ {selectedPost.stats.time}</span>
                  <span>🔥 {selectedPost.stats.walkCount} 人</span>
                </div>
                <button onClick={() => router.push('/walking')} style={startWalkBtn}>
                  开启这段旅程
                </button>
              </motion.div>
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>

      <div style={bottomNavStyle}>
        <div onClick={() => router.push('/')} style={navInactive}><MapPin size={22} /><span>大观</span></div>
        <div style={navActive}><Compass size={22} /><span>路线</span></div>
        <div style={addBtnOuter}><div style={addBtnInner}>+</div></div>
        <div onClick={() => router.push('/walking')} style={navInactive}><Footprints size={22} /><span>游玩</span></div>
        <div onClick={() => router.push('/profile')} style={navInactive}><User size={22} /><span>我的</span></div>
      </div>

      <div style={iphoneNotch}></div>
    </div>
  );
}
