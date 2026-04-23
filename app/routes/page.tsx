"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, Map as MapIcon, Share2, Sparkles, Navigation, 
  Compass, MapPin, Footprints, User, Search, Flame, Bookmark
} from 'lucide-react';
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

  const bottomBarStyle: React.CSSProperties = { 
    position: "absolute", bottom: 0, width: "100%", height: "84px", 
    background: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(20px)",
    display: "flex", justifyContent: "space-around", alignItems: "center", 
    borderTop: "1px solid rgba(0,0,0,0.05)", paddingBottom: "20px", zIndex: 1000
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#FDFDFB] relative overflow-hidden text-slate-900">
      
      {/* 1. 沉浸式顶部：带模糊效果的标题区 */}
      <div className="pt-14 px-6 pb-4 bg-gradient-to-b from-[#FDFDFB] to-transparent z-30">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-serif font-black tracking-tight">探索发现</h1>
          <div className="p-2.5 bg-slate-100 rounded-full active:scale-90 transition">
            <Search size={18} className="text-slate-500" />
          </div>
        </div>
        
        {/* 2. 精致 Tab 切换：胶囊滑动感 */}
        <div className="flex gap-8 mt-6 overflow-x-auto no-scrollbar relative">
          {['推荐', '附近', '最新', '收藏'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-black transition-all relative ${activeTab === tab ? 'text-slate-900' : 'text-slate-300 hover:text-slate-400'}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B2B2B] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. AI 启发卡片：横向滑动提醒 */}
      <div className="px-5 mb-4">
        <div className="bg-gradient-to-r from-[#1E1E1E] to-[#3A3A3A] rounded-3xl p-4 flex items-center justify-between shadow-xl shadow-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Sparkles size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[11px] text-white font-black">AI 路线定制</p>
              <p className="text-[9px] text-white/50 font-medium">输入你的心情，生成专属轨迹</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded-xl active:scale-95 transition">
            <Navigation size={14} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* 4. 路线瀑布流：采用不对称边框和微妙阴影 */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 space-y-8 pb-32">
        {posts.map((post, idx) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* 封面图：圆角增加，引入微弱的浮雕阴影 */}
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-slate-200">
              <img src={post.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              {/* 悬浮操作：毛玻璃质感 */}
              <div className="absolute top-5 right-5 flex flex-col gap-3">
                <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm active:scale-90 transition">
                  <Heart size={18} className="text-slate-400 hover:text-red-500 transition-colors" />
                </button>
                <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm active:scale-90 transition">
                  <Bookmark size={18} className="text-slate-400" />
                </button>
              </div>

              {/* 底部渐变文字：增加排版仪式感 */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="flex gap-2 mb-3">
                  {post.hot && (
                    <span className="bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-md flex items-center gap-1">
                      <Flame size={8} fill="currentColor" /> HOT
                    </span>
                  )}
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-white/20 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-serif font-black text-white leading-tight">
                  {post.title}
                </h3>
              </div>
            </div>

            {/* 卡片下方的精致信息条 */}
            <div className="mt-4 px-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-0.5 border border-slate-100 rounded-full">
                  <img src={post.avatar} className="w-8 h-8 rounded-full object-cover" />
                </div>
                <span className="text-[10px] font-black text-slate-400 italic">by {post.author}</span>
              </div>
              
              <div className="flex items-center gap-4 text-slate-300">
                <div className="flex flex-col items-end leading-none">
                  <span className="text-[7px] font-black uppercase tracking-widest mb-1">Explore</span>
                  <span className="text-[11px] font-black text-slate-800">{post.stats.walkCount} 人</span>
                </div>
                <button 
                  onClick={() => router.push('/walking')}
                  className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-90 transition"
                >
                  <Navigation size={16} fill="white" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 底部导航栏：修复 Compass 引用并保持一致 */}
      <div style={bottomBarStyle}>
        <div style={{ color: "#999", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/map')}>
          <MapPin size={22}/>
          <span className="font-bold">大观</span>
        </div>
        <div style={{ color: "#3B82F6", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/routes')}>
          <Compass size={22}/>
          <span className="font-bold">路线</span>
        </div>
        <div className="w-12 h-12 bg-blue-500 rounded-full text-white text-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-8 border-4 border-white transition-transform active:scale-90">+</div>
        <div style={{ color: "#999", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/walking')}>
          <Footprints size={22}/>
          <span className="font-bold">游玩</span>
        </div>
        <div style={{ color: "#999", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/profile')}>
          <User size={22}/>
          <span className="font-bold">我的</span>
        </div>
      </div>

    </div>
  );
}
