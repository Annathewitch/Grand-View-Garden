"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Camera, Map as MapIcon, Footprints, 
  ImageIcon, MapPin, Compass, User, Pause, Play, Square, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WalkingPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'walking' | 'journal'>('idle');
  const [stats, setStats] = useState({ time: 0, steps: 0, calories: 0 });

  useEffect(() => {
    let timer: any;
    if (status === 'walking') {
      timer = setInterval(() => {
        setStats(prev => ({
          time: prev.time + 1,
          steps: prev.steps + Math.floor(Math.random() * 2) + 1,
          calories: prev.calories + 0.05
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const bottomBarStyle: React.CSSProperties = { 
    position: "absolute", bottom: 0, width: "100%", height: "84px", 
    background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(20px)",
    display: "flex", justifyContent: "space-around", alignItems: "center", 
    borderTop: "1px solid rgba(0,0,0,0.05)", paddingBottom: "20px", zIndex: 1000
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#FDFDFB] relative overflow-hidden text-slate-900">
      
      {/* 顶部标题 - 随状态淡入淡出 */}
      <AnimatePresence mode="wait">
        {status !== 'walking' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="pt-14 px-8 pb-4 shrink-0"
          >
            <h1 className="text-2xl font-serif font-black tracking-tight">
              {status === 'idle' ? '开始游玩' : '散步手账'}
            </h1>
            <p className="text-[10px] text-slate-400 mt-1 font-bold tracking-widest uppercase italic opacity-60">
              Reading the city by feet
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 px-6 pb-24 overflow-y-auto no-scrollbar relative">
        <AnimatePresence mode="wait">
          
          {/* 状态1：待开始 (Idle) */}
          {status === 'idle' && (
            <motion.div 
              key="idle" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
              className="h-full flex flex-col justify-center space-y-10 py-6"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-50 to-orange-50 rounded-[48px] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-white rounded-[40px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white">
                  <div className="aspect-[1.2/1] bg-slate-50 rounded-[32px] overflow-hidden relative border border-slate-100">
                    <img src="https://images.unsplash.com/photo-1541432901012-a76c76546ef3?w=600" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                      <MapPin size={12} className="text-white" />
                      <span className="text-[10px] font-black text-white">静安 - 衡复区</span>
                    </div>
                  </div>
                  <div className="mt-5 px-2">
                    <h3 className="font-serif font-black text-lg text-slate-800">梧桐影里的老洋房</h3>
                    <div className="flex gap-4 mt-2">
                      <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Footprints size={12} /> 2.4km
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Compass size={12} /> 90 min
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setStatus('walking')}
                className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                <Play size={20} fill="white" /> 启动游玩记录
              </button>
            </motion.div>
          )}

          {/* 状态2：进行中 (Walking) - 精致黑调 */}
          {status === 'walking' && (
            <motion.div 
              key="walking" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="h-full flex flex-col pt-10"
            >
              <div className="bg-[#121212] rounded-[50px] p-10 text-white shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B2B2B]/10 blur-[80px]" />
                
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-[10px] font-black opacity-30 tracking-[0.4em] uppercase mb-6">Current Session</span>
                  <div className="text-7xl font-serif font-light tracking-tighter tabular-nums mb-12">
                    {formatTime(stats.time)}
                  </div>
                  
                  <div className="w-full grid grid-cols-2 gap-10 border-t border-white/5 pt-10">
                    <div className="text-center">
                      <p className="text-[9px] opacity-20 font-black uppercase tracking-widest mb-2">Steps Taken</p>
                      <p className="text-3xl font-black">{stats.steps}</p>
                    </div>
                    <div className="text-center border-l border-white/5">
                      <p className="text-[9px] opacity-20 font-black uppercase tracking-widest mb-2">Est. Calories</p>
                      <p className="text-3xl font-black">{stats.calories.toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex-1 px-2">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">瞬时快照 / Snapshot</h3>
                  <div className="h-px flex-1 mx-4 bg-slate-100" />
                  <Sparkles size={16} className="text-orange-300" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileTap={{ scale: 0.95 }}
                    className="aspect-square bg-white rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 active:bg-slate-50 transition-colors"
                  >
                    <Camera size={28} strokeWidth={1.5} />
                    <span className="text-[9px] font-black mt-3 text-center px-4 leading-relaxed">捕捉路边美学</span>
                  </motion.div>
                  <div className="aspect-square bg-slate-100 rounded-[32px] overflow-hidden group relative">
                    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300" className="w-full h-full object-cover grayscale opacity-50 transition-all group-hover:grayscale-0 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[8px] bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-md font-bold">已自动标记</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStatus('journal')}
                className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black mt-8 shadow-2xl flex items-center justify-center gap-3"
              >
                <Square size={16} fill="white" /> 结束并收录手账
              </button>
            </motion.div>
          )}

          {/* 状态3：手账生成 (Journal) - 模拟纸质质感 */}
          {status === 'journal' && (
            <motion.div 
              key="journal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="h-full py-2 flex flex-col"
            >
              <div className="flex-1 bg-white p-8 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-slate-50 flex flex-col relative overflow-hidden">
                {/* 装饰细节：模拟笔记本边缘 */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-r from-slate-100 to-transparent" />
                
                <div className="flex justify-between items-start border-b-2 border-slate-900/5 pb-6 mb-6">
                  <div>
                    <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">2026.04.23</span>
                    <h2 className="text-2xl font-serif font-black mt-2 leading-tight">梧桐影里的<br/>老洋房</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-slate-300 font-bold uppercase tracking-widest">Weather</p>
                    <p className="text-[11px] font-black text-slate-800">Sunny 18°C</p>
                  </div>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-1">
                  <p className="text-[12px] leading-loose text-slate-500 font-medium italic">
                    “在武康路转角，遇见了一家不需要预约的咖啡馆，阳光刚好洒在木质窗沿上。这大概就是散步的意义。”
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-40 rounded-[24px] overflow-hidden shadow-sm rotate-[-2deg]">
                      <img src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-40 rounded-[24px] overflow-hidden shadow-sm rotate-[2deg]">
                      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-[28px] border border-slate-100 flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-[8px] text-slate-300 font-bold uppercase mb-1">Total Burn</p>
                      <p className="font-black text-base text-slate-800">450 <span className="text-[10px]">kcal</span></p>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div className="flex-1">
                      <p className="text-[8px] text-slate-300 font-bold uppercase mb-1">Checkpoints</p>
                      <p className="font-bold text-[10px] text-slate-600 leading-tight">武康大楼 · 老洋房 · Manner Coffee</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-dashed border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-[10px] font-black shadow-lg">大观</div>
                    <span className="text-[9px] text-slate-400 italic">Reading City Session</span>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-full text-[11px] font-black shadow-xl shadow-blue-100 active:scale-95 transition"
                  >
                    保存并分享
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 底部导航栏 */}
      <div style={bottomBarStyle}>
        <div style={{ color: "#999", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/map')}>
          <MapPin size={22}/>
          <span className="font-bold">大观</span>
        </div>
        <div style={{ color: "#999", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/routes')}>
          <Compass size={22}/>
          <span className="font-bold">路线</span>
        </div>
        <div className="w-12 h-12 bg-blue-500 rounded-full text-white text-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-8 border-4 border-white transition-transform active:scale-90">+</div>
        <div style={{ color: "#3B82F6", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/walking')}>
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
