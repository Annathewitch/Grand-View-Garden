"use client";
import { useState, useEffect } from 'react';
import { Camera, Map as MapIcon, Timer, Footprints, Flame, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WalkingPage() {
  const [isWalking, setIsWalking] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [stats, setStats] = useState({ time: 0, steps: 0, calories: 0 });

  // 模拟记录逻辑
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

  return (
    <div className="h-full flex flex-col bg-[#F8F7F2]">
      {/* 状态栏占位 */}
      <div className="p-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800">正在游玩</h1>
        <p className="text-xs text-gray-400 mt-1 italic">每一寸脚步都在阅读城市...</p>
      </div>

      <div className="flex-1 px-6 flex flex-col">
        {!isWalking && !showJournal ? (
          /* 待开始状态 */
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <div className="w-64 h-64 bg-white rounded-3xl shadow-xl border border-gray-100 p-4 flex flex-col">
              <div className="flex-1 bg-slate-100 rounded-xl overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                   <MapIcon size={48} />
                 </div>
                 <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">
                   当前计划：静安寺-武康路
                 </div>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-sm text-gray-700">梧桐影里的老洋房</h3>
                <p className="text-[10px] text-gray-400">预计时长：1.5h | 距离：2.4km</p>
              </div>
            </div>
            <button 
              onClick={() => setIsWalking(true)}
              className="w-full bg-[#8B2B2B] text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-900/20 flex items-center justify-center gap-2"
            >
              <Footprints size={20} /> 开始这段散步
            </button>
          </div>
        ) : isWalking ? (
          /* 记录中状态 */
          <div className="flex-1 flex flex-col py-4">
            <div className="bg-black rounded-[40px] p-8 text-white flex flex-col items-center shadow-2xl">
              <span className="text-xs opacity-50 mb-2 tracking-[0.2em]">正在记录您的旅程</span>
              <div className="text-6xl font-serif font-light mb-8 tabular-nums">
                {formatTime(stats.time)}
              </div>
              <div className="grid grid-cols-2 w-full gap-8">
                <div className="text-center">
                  <p className="text-[10px] opacity-40 uppercase tracking-widest mb-1">Steps</p>
                  <p className="text-xl font-bold">{stats.steps}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] opacity-40 uppercase tracking-widest mb-1">Calories</p>
                  <p className="text-xl font-bold">{stats.calories.toFixed(1)}</p>
                </div>
              </div>
            </div>

            {/* 途中照片流 */}
            <div className="mt-8 flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-gray-600">途中瞬态</h3>
                <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
                  <Camera size={18} className="text-daguan-red" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                   <ImageIcon size={24} />
                   <span className="text-[8px] mt-1 text-center px-4">拍下路过的店面<br/>自动识别打卡</span>
                </div>
                <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden opacity-50 grayscale">
                   <img src="https://images.unsplash.com/photo-1541432901012-a76c76546ef3?w=300" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setIsWalking(false); setShowJournal(true); }}
              className="w-full bg-black text-white py-4 rounded-2xl font-bold mt-4"
            >
              结束并生成手账
            </button>
          </div>
        ) : (
          /* 手账生成状态 */
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 bg-white p-6 rounded-[30px] shadow-2xl border border-gray-100 flex flex-col relative overflow-hidden"
          >
            {/* 装饰水印 */}
            <div className="absolute -right-4 -top-4 opacity-[0.03] text-8xl font-serif">大观</div>
            
            <div className="border-b-2 border-daguan-red/10 pb-4 mb-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-daguan-red font-bold">2026.04.23 SHANGHAI</p>
                  <h2 className="text-xl font-serif font-bold mt-1">梧桐影里的老洋房</h2>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-gray-400">天气：晴 18°C</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar">
              <p className="text-xs leading-relaxed text-gray-600 border-l-2 border-daguan-red pl-3 italic">
                “在武康路转角，遇见了一家不需要预约的咖啡馆，阳光刚好洒在木质窗沿上。”
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400" className="w-full h-full object-cover" />
                </div>
                <div className="h-40 bg-gray-100 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-4">
                <div className="text-center border-r pr-4">
                   <p className="text-[8px] text-gray-400">消耗</p>
                   <p className="font-bold text-sm">450 kcal</p>
                </div>
                <div className="text-center">
                   <p className="text-[8px] text-gray-400">经过地点</p>
                   <p className="font-bold text-sm tracking-tighter">武康大楼 - 老洋房 - Manner</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-daguan-red rounded-full flex items-center justify-center text-white text-[10px]">大观</div>
                  <span className="text-[10px] text-gray-400 italic">记录于 大观园 App</span>
               </div>
               <button 
                 onClick={() => setShowJournal(false)}
                 className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold"
               >
                 保存并分享
               </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
