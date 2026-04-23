"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Map as MapIcon, Share2, Sparkles, Navigation, Compass, MapPin, Footprints, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoutesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('推荐');

  const posts = [
    {
      id: 1,
      title: "静安寺转角：隐于闹市的半日闲处",
      author: "林深时见鹿",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      cover: "https://images.unsplash.com/photo-1541432901012-a76c76546ef3?w=800",
      tags: ["安静", "避暑", "宝藏咖啡馆"],
      stats: { distance: "3.2km", time: "1.5h", walkCount: 245 }
    },
    {
      id: 2,
      title: "武康路不只有大楼：老洋房深度巡礼",
      author: "城市拾荒者",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      cover: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800",
      tags: ["老建筑", "摄影", "梧桐区"],
      stats: { distance: "2.8km", time: "2h", walkCount: 890 }
    }
  ];

  // --- 您指定的苹果模型样式定义 ---
  const bottomBarStyle: React.CSSProperties = { 
    position: "absolute", 
    bottom: 0, 
    width: "100%", 
    height: "84px", 
    background: "#fff", 
    display: "flex", 
    justifyContent: "space-around", 
    alignItems: "center", 
    borderTop: "1px solid #eee",
    paddingBottom: "20px", 
    zIndex: 1000
  };

  const bottomItemStyle: React.CSSProperties = { 
    fontSize: "10px", 
    color: "#999", 
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  };

  const bottomActiveStyle: React.CSSProperties = { 
    ...bottomItemStyle, 
    color: "#3B82F6", 
    fontWeight: 'bold' 
  };

  const bottomAddStyle: React.CSSProperties = { 
    width: "48px", 
    height: "48px", 
    background: "#3B82F6", 
    borderRadius: "50%", 
    color: "#fff", 
    fontSize: "28px", 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    cursor: 'pointer',
    marginBottom: '35px', 
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
    border: '4px solid #fff'
  };

  return (
    <div className="h-full w-full flex flex-col bg-white relative overflow-hidden">
      
      {/* 1. 顶部 AI 搜索入口 (调整位置适配刘海屏) */}
      <div className="px-4 pt-12 pb-3 bg-white z-20">
        <div className="bg-gray-100 rounded-2xl py-2.5 px-4 flex items-center gap-2 border border-black/5">
          <Sparkles size={14} className="text-blue-500" />
          <span className="text-[11px] text-gray-400 font-medium">定制一条专属散步路线...</span>
        </div>
      </div>

      {/* 2. 社区 Tab 切换 (固定) */}
      <div className="flex gap-6 px-6 py-1 text-[13px] border-b border-gray-50 bg-white z-20">
        {['推荐', '附近', '最新'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 relative transition-colors ${activeTab === tab ? 'font-bold text-black' : 'text-gray-400'}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#8B2B2B] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 3. 路线流内容 (滚动区) */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-[#FBFBFB] px-4 pt-4 space-y-6 pb-28">
        {posts.map((post) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-100"
          >
            {/* 封面图区域 */}
            <div className="relative aspect-[4/5]">
              <img src={post.cover} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-md active:scale-90 transition">
                  <Heart size={18} className="text-gray-400" />
                </button>
                <button className="bg-white/90 backdrop-blur-md p-2.5 rounded-full shadow-md active:scale-90 transition">
                  <Share2 size={18} className="text-gray-400" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-[9px] font-bold">
                <MapIcon size={12} />
                <span>查看路线轨迹</span>
              </div>
            </div>

            {/* 信息区域 */}
            <div className="p-5">
              <div className="flex gap-1.5 mb-2.5">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[9px] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md text-gray-400 font-bold">#{tag}</span>
                ))}
              </div>
              <h3 className="font-serif font-black text-lg leading-tight mb-4 text-gray-800">
                {post.title}
              </h3>
              
              {/* 路线核心数据 (针对手机屏幕紧凑化) */}
              <div className="flex items-center justify-between py-3 border-y border-gray-50 mb-4 px-1">
                <div className="flex flex-col">
                  <span className="text-[7px] text-gray-300 uppercase font-bold tracking-tighter">Distance</span>
                  <span className="text-[11px] font-black">{post.stats.distance}</span>
                </div>
                <div className="h-6 w-[1px] bg-gray-50" />
                <div className="flex flex-col items-center">
                  <span className="text-[7px] text-gray-300 uppercase font-bold tracking-tighter">Time</span>
                  <span className="text-[11px] font-black">{post.stats.time}</span>
                </div>
                <div className="h-6 w-[1px] bg-gray-50" />
                <div className="flex flex-col items-end">
                  <span className="text-[7px] text-gray-300 uppercase font-bold tracking-tighter">Explorers</span>
                  <span className="text-[11px] font-black">{post.stats.walkCount} 人次</span>
                </div>
              </div>

              {/* 发布者信息 & 交互按钮 */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={post.avatar} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" />
                  <span className="text-[11px] text-gray-500 font-bold">{post.author}</span>
                </div>
                <button className="bg-black text-white px-5 py-2.5 rounded-full text-[11px] font-black flex items-center gap-2 active:scale-95 transition shadow-lg shadow-black/10">
                  <Navigation size={12} fill="white" />
                  去散步
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- 4. 按照苹果模型定制的底部导航栏 --- */}
      <div style={bottomBarStyle}>
        <div style={bottomItemStyle} onClick={() => router.push('/map')}>
          <MapPin size={22}/>
          <span>大观</span>
        </div>
        
        <div style={bottomActiveStyle} onClick={() => router.push('/routes')}>
          <Compass size={22}/>
          <span>路线</span>
        </div>
        
        {/* 中间圆形加号按钮：替代了原代码中的悬浮按钮 */}
        <div style={bottomAddStyle}>+</div>

        <div style={bottomItemStyle} onClick={() => router.push('/walking')}>
          <Footprints size={22}/>
          <span>游玩</span>
        </div>
        
        <div style={bottomItemStyle} onClick={() => router.push('/profile')}>
          <User size={22}/>
          <span>我的</span>
        </div>
      </div>

    </div>
  );
}
