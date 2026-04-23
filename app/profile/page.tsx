"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, Footprints, Map as MapIcon, 
  Flame, Utensils, MessageSquare, 
  ArrowRightLeft, Wallet, Calendar, MapPin, User, Compass, ChevronRight 
} from 'lucide-react'; // 已修复 Compass 引用
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const [role, setRole] = useState<'walker' | 'creator'>('walker');

  const bottomBarStyle: React.CSSProperties = { 
    position: "absolute", bottom: 0, width: "100%", height: "84px", 
    background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)",
    display: "flex", justifyContent: "space-around", alignItems: "center", 
    borderTop: "1px solid rgba(0,0,0,0.05)", paddingBottom: "20px", zIndex: 1000
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F9F9F7] relative overflow-hidden text-slate-800">
      
      {/* 顶部背景：采用深色渐变与网格纹理叠加 */}
      <div className="relative h-56 bg-gradient-to-br from-[#8B2B2B] to-[#5D1D1D] shrink-0">
        <div className="absolute inset-0 opacity-20" 
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-12 right-6 p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10 active:scale-90 transition">
          <Settings className="text-white" size={20} />
        </div>
      </div>

      {/* 内容主体 */}
      <div className="px-5 -mt-16 relative z-10 flex-1 overflow-y-auto no-scrollbar pb-28">
        
        {/* 个人名片：增加投影与细腻边框 */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 rounded-full border-[5px] border-white shadow-2xl overflow-hidden -mt-16 bg-white"
          >
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" alt="Avatar" className="w-full h-full object-cover" />
          </motion.div>
          
          <h2 className="mt-4 text-xl font-serif font-black tracking-tight">林深时见鹿</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-bold tracking-widest uppercase">Digital Nomad</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-bold tracking-widest uppercase">Explorer</span>
          </div>
          
          {/* 角色切换：精致的胶囊按钮 */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setRole(role === 'walker' ? 'creator' : 'walker')}
            className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 text-white flex items-center justify-center gap-3 shadow-lg shadow-slate-200"
          >
            <ArrowRightLeft size={14} className="text-blue-400" />
            <span className="text-xs font-bold tracking-wide">切换至{role === 'walker' ? '创作者' : '散步者'}视图</span>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {role === 'walker' ? (
            <motion.div 
              key="walker"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="mt-6 space-y-5"
            >
              {/* 数据面板：使用非对称卡片设计 */}
              <div className="flex gap-4">
                <div className="flex-1 bg-white p-5 rounded-[28px] border border-white shadow-sm">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mb-3">
                    <Footprints size={16} className="text-orange-500" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Total Steps</p>
                  <p className="text-2xl font-serif font-black mt-1">124,890</p>
                </div>
                <div className="flex-1 bg-white p-5 rounded-[28px] border border-white shadow-sm">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                    <MapIcon size={16} className="text-blue-500" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Routes</p>
                  <p className="text-2xl font-serif font-black mt-1">18 <span className="text-xs">Entries</span></p>
                </div>
              </div>

              {/* 健康卡片：黑色磨砂质感 */}
              <div className="bg-[#1A1A1A] rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 blur-[50px]" />
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[11px] font-bold opacity-40 uppercase tracking-[0.2em]">Health & Consumption</h3>
                  <Calendar size={14} className="opacity-40" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: Flame, color: "text-orange-500", label: "Burn", val: "4,200" },
                    { icon: Utensils, color: "text-green-500", label: "Eat", val: "3,850" },
                    { icon: Wallet, color: "text-blue-400", label: "Spend", val: "¥892" }
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <item.icon className={`mx-auto ${item.color} mb-2`} size={20} />
                      <p className="text-[8px] opacity-30 font-bold uppercase mb-1">{item.label}</p>
                      <p className="text-sm font-black">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 手账预览：卡片堆叠感 */}
              <div>
                <div className="flex justify-between items-end mb-4 px-2">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Walking Journal</h3>
                  <ChevronRight size={14} className="text-slate-300" />
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  {[1, 2, 3].map(i => (
                    <motion.div 
                      key={i} whileTap={{ scale: 0.95 }}
                      className="w-32 h-44 bg-white rounded-2xl shrink-0 shadow-xl border-4 border-white overflow-hidden relative group"
                    >
                      <img src={`https://images.unsplash.com/photo-${1500 + i}?w=300`} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-[9px] font-black text-white">04.23 武康路</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="creator"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="mt-6 space-y-5"
            >
              {/* 创作者影响力：更通透的设计 */}
              <div className="bg-white p-6 rounded-[32px] border border-white shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Impact Factor</h3>
                  <span className="text-[10px] text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-black border border-green-100">+12%</span>
                </div>
                <div className="flex justify-around">
                  {[
                    { label: "Uploaded", val: "5" },
                    { label: "Favs", val: "1.2k" },
                    { label: "Rating", val: "4.9" }
                  ].map((st, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl font-serif font-black">{st.val}</p>
                      <p className="text-[8px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">{st.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 词云：采用磨砂玻璃彩色胶囊 */}
              <div className="bg-[#8B2B2B] p-6 rounded-[32px] relative overflow-hidden shadow-2xl">
                <h3 className="text-[10px] font-bold text-white/40 mb-4 uppercase tracking-[0.2em]">Route Feedback</h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['安静', '适合摄影', '建筑美学', '避开人流', '避暑'].map((word, idx) => (
                    <span key={word} className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold">
                      {word}
                    </span>
                  ))}
                </div>
                <MessageSquare className="absolute -right-4 -bottom-4 text-white/5" size={100} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部导航栏：修复 Compass 报错 */}
      <div style={bottomBarStyle}>
        <div style={{ color: "#999", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/map')}>
          <MapPin size={22}/>
          <span className="font-bold">大观</span>
        </div>
        <div style={{ color: "#999", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/routes')}>
          <Compass size={22}/>
          <span className="font-bold">路线</span>
        </div>
        <div className="w-12 h-12 bg-blue-500 rounded-full text-white text-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-8 border-4 border-white">+</div>
        <div style={{ color: "#999", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/walking')}>
          <Footprints size={22}/>
          <span className="font-bold">游玩</span>
        </div>
        <div style={{ color: "#3B82F6", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }} onClick={() => router.push('/profile')}>
          <User size={22}/>
          <span className="font-bold">我的</span>
        </div>
      </div>
    </div>
  );
}
