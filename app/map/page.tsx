"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Compass, MapPin, Coffee, Palette, Trees as Tree, 
  Sparkles, User, Footprints, Navigation2, Search, Layers 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MapPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  // 模拟上海地图上的标点 (增加详细描述以提升精致感)
  const locations = {
    '咖啡店': [
      { id: 1, x: '35%', y: '42%', name: 'Manner Coffee (武康路店)', desc: '梧桐树下的冠军咖啡', rating: '4.8' },
      { id: 2, x: '58%', y: '48%', name: 'Peets Coffee (静安寺)', desc: '经典的皮爷手工冲煮', rating: '4.7' }
    ],
    '展览': [
      { id: 3, x: '45%', y: '25%', name: '上海博物馆', desc: '古代艺术博览', rating: '4.9' },
      { id: 4, x: '25%', y: '18%', name: '西岸美术馆', desc: '当代设计与江景', rating: '4.8' }
    ],
    '自然': [
      { id: 5, x: '65%', y: '60%', name: '复兴公园', desc: '法式浪漫的晨练圣地', rating: '4.6' },
      { id: 6, x: '20%', y: '75%', name: '徐家汇公园', desc: '城中心的黑天鹅湖', rating: '4.7' }
    ],
  };

  const bottomBarStyle: React.CSSProperties = { 
    position: "absolute", bottom: 0, width: "100%", height: "84px", 
    background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(15px)",
    display: "flex", justifyContent: "space-around", alignItems: "center", 
    borderTop: "1px solid rgba(0,0,0,0.05)", paddingBottom: "20px", zIndex: 1000
  };

  return (
    <div className="h-full w-full relative flex flex-col overflow-hidden bg-[#F2F2EE]">
      
      {/* 1. 顶部精致搜索栏与分类 */}
      <div className="absolute top-12 w-full px-4 z-30 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-3 flex items-center">
            <Search className="text-slate-400 mr-3" size={18} />
            <input 
              placeholder="寻找上海的散步灵感..." 
              className="flex-1 bg-transparent outline-none text-[13px] font-medium text-slate-600 placeholder:text-slate-300"
            />
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
              <Sparkles className="text-blue-500" size={14} />
            </div>
          </div>
          <button className="w-12 h-12 bg-white/80 backdrop-blur-xl rounded-[20px] shadow-sm border border-white flex items-center justify-center active:scale-90 transition">
            <Layers size={18} className="text-slate-600" />
          </button>
        </div>
        
        {/* 分类滑条 */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: '咖啡店', icon: <Coffee size={14}/>, color: 'text-orange-500' },
            { id: '展览', icon: <Palette size={14}/>, color: 'text-purple-500' },
            { id: '自然', icon: <Tree size={14}/>, color: 'text-green-500' }
          ].map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-black transition-all shadow-sm border
                ${activeCategory === cat.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white/90 text-slate-500 border-white'}`}
            >
              <span className={activeCategory === cat.id ? 'text-white' : cat.color}>{cat.icon}</span>
              {cat.id}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 模拟地图交互区 (精致分层渲染) */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {/* 背景底色与纹理 */}
        <div className="absolute inset-0 bg-[#F0EEE6]">
          {/* 模拟黄浦江 */}
          <svg className="w-full h-full opacity-60">
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2 }}
              d="M-50,800 Q150,750 300,550 T500,200" 
              stroke="#D4E4F7" strokeWidth="80" fill="none" 
            />
          </svg>
          
          {/* 模拟街道网格 (极浅色) */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} />
        </div>

        {/* 动态显示的精致标点 */}
        <AnimatePresence>
          {activeCategory && locations[activeCategory as keyof typeof locations]?.map(loc => (
            <motion.div 
              key={loc.id}
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute cursor-pointer z-20"
              style={{ left: loc.x, top: loc.y }}
              onClick={() => setSelectedPoint(loc)}
            >
              <div className="flex flex-col items-center group">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl border border-white text-[10px] mb-2 scale-90 group-hover:scale-100 transition-transform font-black">
                  {loc.name}
                </div>
                <div className="relative">
                  <MapPin size={32} className={`${activeCategory === '咖啡店' ? 'text-orange-500' : activeCategory === '展览' ? 'text-purple-500' : 'text-green-500'} fill-white`} />
                  <div className="absolute inset-0 animate-ping rounded-full bg-current opacity-20" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 核心定位点 (静安区) */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-[3px] border-white shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. 悬浮详情小卡片 (当点击标点时出现) */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-28 left-4 right-4 z-40 bg-white/90 backdrop-blur-2xl rounded-[32px] p-5 shadow-2xl border border-white flex gap-4"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
               <img src={`https://images.unsplash.com/photo-1501339819358-000c2834f82d?w=200`} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-black text-slate-800">{selectedPoint.name}</h4>
                <span className="text-[10px] font-black text-blue-500">★ {selectedPoint.rating}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-medium leading-relaxed">{selectedPoint.desc}</p>
              <button 
                onClick={() => router.push('/walking')}
                className="mt-3 flex items-center gap-2 text-[10px] font-black bg-slate-900 text-white px-4 py-2 rounded-full active:scale-95 transition"
              >
                <Navigation2 size={12} fill="white" /> 到这去
              </button>
            </div>
            <button onClick={() => setSelectedPoint(null)} className="absolute top-4 right-4 text-slate-300">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. 底部导航栏 (保持与 Profile/Routes 一致) */}
      <div style={bottomBarStyle}>
        <div style={{ color: "#3B82F6", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/map')}>
          <MapPin size={22}/>
          <span className="font-bold">大观</span>
        </div>
        <div style={{ color: "#999", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/routes')}>
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
