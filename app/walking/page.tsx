"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Camera, Map as MapIcon, Footprints, 
  ImageIcon, MapPin, Compass, User 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WalkingPage() {
  const router = useRouter();
  const [isWalking, setIsWalking] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [stats, setStats] = useState({ time: 0, steps: 0, calories: 0 });

  // 模拟记录逻辑 (保持原代码功能不变)
  useEffect(() => {
    let timer: any;
    if (isWalking) {
      timer = setInterval(() => {
        setStats(prev => ({
          time: prev.time + 1,
          steps: prev.steps + Math.floor(Math.random() * 2) + 1,
          calories: prev.calories + 0.05
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isWalking]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="h-full w-full flex flex-col bg-[#F8F7F2] relative overflow-hidden">
      
      {/* 1. 顶部标题区 (适配 iPhone 状态栏高度) */}
      <div className="pt-14 px-6 pb-4">
        <h1 className="text-2xl font-serif font-black text-gray-800">正在游玩</h1>
        <p className="text-[10px] text-gray-400 mt-1 italic font-medium">每一寸脚步都在阅读城市...</p>
      </div>

      <div className="flex-1 px-6 flex flex-col pb-24 overflow-y-auto no-scrollbar">
        {!isWalking && !showJournal ? (
          /* 待开始状态 */
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 py-4">
            <div className="w-full aspect-square max-w-[280px] bg-white rounded-[32px] shadow-xl border border-gray-100 p-4 flex flex-col">
              <div className="flex-1 bg-slate-100 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <MapIcon size={48} />
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[9px] px-2.5 py-1.5 rounded-lg font-bold">
                  当前计划：静安寺 - 武康路
                </div>
              </div>
              <div className="mt-4 px-1">
                <h3 className="font-black text-sm text-gray-700">梧桐影里的老洋房</h3>
                <p className="text-[9px] text-gray-400 font-bold mt-0.5">预计时长：1.5h | 距离：2.4km</p>
              </div>
            </div>
            <button 
              onClick={() => setIsWalking(true)}
              className="w-full bg-[#8B2B2B] text-white py-4.5 rounded-2xl font-black shadow-lg shadow-red-900/10 flex items-center justify-center gap-3 active:scale-95 transition"
            >
              <Footprints size={20} /> 开始这段散步
            </button>
          </div>
        ) : isWalking ? (
          /* 记录中状态 */
          <div className="flex-1 flex flex-col py-2">
            <div className="bg-black rounded-[44px] p-8 text-white flex flex-col items-center shadow-2xl relative overflow-hidden">
              {/* 背景装饰感 */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
              
              <span className="text-[9px] font-bold opacity-40 mb-3 tracking-[0.3em] uppercase relative z-10">Tracking Journey</span>
              <div className="text-6xl font-serif font-light mb-10 tabular-nums relative z-10">
                {formatTime(stats.time)}
              </div>
              <div className="grid grid-cols-2 w-full gap-8 relative z-10">
                <div className="text-center">
                  <p className="text-[8px] opacity-30 uppercase tracking-widest mb-1.5 font-bold">Steps</p>
                  <p className="text-2xl font-black">{stats.steps}</p>
                </div>
                <div className="text-center border-l border-white/10">
                  <p className="text-[8px] opacity-30 uppercase tracking-widest mb-1.5 font-bold">Calories</p>
                  <p className="text-2xl font-black">{stats.calories.toFixed(1)}</p>
                </div>
              </div>
            </div>

            {/* 途中照片流 */}
            <div className="mt-8 flex-1">
              <div className="flex justify-between items-center mb-5 px-1">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">途中瞬态 / Snapshots</h3>
                <button className="p-2.5 bg-white rounded-full shadow-md border border-gray-50 active:scale-90 transition">
                  <Camera size={18} className="text-[#8B2B2B]" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white rounded-[24px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                   <ImageIcon size={24} />
                   <span className="text-[8px] mt-2 text-center px-4 font-bold leading-relaxed">拍下路过的店面<br/>自动识别打卡</span>
                </div>
                <div className="aspect-square bg-gray-200 rounded-[24px] overflow-hidden opacity-40 grayscale">
                   <img src="https://images.unsplash.com/photo-1541432901012-a76c76546ef3?w=300" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setIsWalking(false); setShowJournal(true); }}
              className="w-full bg-black text-white py-4.5 rounded-2xl font-black mt-6 active:scale-95 transition shadow-xl"
            >
              结束并生成手账
            </button>
          </div>
        ) : (
          /* 手账生成状态 */
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 bg-white p-7 rounded-[36px] shadow-2xl border border-gray-50 flex flex-col relative overflow-hidden mb-4"
          >
            <div className="absolute -right-6 -top-6 opacity-[0.04] text-9xl font-serif font-black select-none">大观</div>
            
            <div className="border-b-2 border-[#8B2B2B]/10 pb-5 mb-5 relative z-10">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] text-[#8B2B2B] font-black tracking-tighter">2026.04.23 · SHANGHAI</p>
                  <h2 className="text-xl font-serif font-black mt-1.5 text-gray-800">梧桐影里的老洋房</h2>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-gray-300 font-bold uppercase">Sunny 18°C</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto no-scrollbar relative z-10">
              <p className="text-[11px] leading-relaxed text-gray-500 border-l-[3px] border-[#8B2B2B] pl-4 italic font-medium py-1">
                “在武康路转角，遇见了一家不需要预约的咖啡馆，阳光刚好洒在木质窗沿上。”
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-44 bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <img src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400" className="w-full h-full object-cover" />
                </div>
                <div className="h-44 bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="bg-[#FBFBFB] p-4 rounded-[20px] flex items-center gap-4 border border-gray-50">
                <div className="text-center border-r border-gray-100 pr-5">
                   <p className="text-[7px] text-gray-300 font-bold uppercase mb-1">Burn</p>
                   <p className="font-black text-sm text-gray-700">450 kcal</p>
                </div>
                <div className="flex-1">
                   <p className="text-[7px] text-gray-300 font-bold uppercase mb-1">Checkpoints</p>
                   <p className="font-bold text-[10px] text-gray-600 tracking-tight leading-tight">武康大楼 · 老洋房 · Manner</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-dashed border-gray-100 flex justify-between items-center relative z-10">
               <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-[#8B2B2B] rounded-full flex items-center justify-center text-white text-[9px] font-black shadow-lg shadow-red-900/20">大观</div>
                  <span className="text-[9px] text-gray-300 italic font-medium">Recorded in GrandView</span>
               </div>
               <button 
                 onClick={() => setShowJournal(false)}
                 className="px-5 py-2.5 bg-black text-white rounded-full text-[11px] font-black shadow-xl active:scale-95 transition"
               >
                 保存并分享
               </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* --- 4. 按照苹果模型定制的底部导航栏 --- */}
      <div style={bottomBarStyle}>
        <div style={bottomItemStyle} onClick={() => router.push('/map')}>
          <MapPin size={22}/>
          <span>大观</span>
        </div>
        
        <div style={bottomItemStyle} onClick={() => router.push('/routes')}>
          <Compass size={22}/>
          <span>路线</span>
        </div>
        
        <div style={bottomAddStyle}>+</div>

        <div style={bottomActiveStyle} onClick={() => router.push('/walking')}>
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
