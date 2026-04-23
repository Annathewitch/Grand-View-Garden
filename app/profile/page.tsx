"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, Footprints, Map as MapIcon, 
  Flame, Utensils, MessageSquare, 
  ArrowRightLeft, Wallet, Calendar, MapPin, User 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const [role, setRole] = useState<'walker' | 'creator'>('walker');

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
      
      {/* 内容滚动区：预留底部导航栏高度 */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* 1. 顶部背景与头像 (h-48 调整为更紧凑的手机比例) */}
        <div className="relative h-44 bg-[#8B2B2B] shrink-0">
          <div className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          {/* 避开手机状态栏 */}
          <div className="absolute top-10 right-6">
            <Settings className="text-white/80" size={20} />
          </div>
        </div>

        <div className="px-6 -mt-12 relative z-10 flex-1">
          {/* 个人基本信息卡片 */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden -mt-16 bg-gray-200">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-4 text-lg font-serif font-bold text-gray-800">林深时见鹿</h2>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Digital Nomad | City Explorer</p>
            
            {/* 身份切换按钮 */}
            <button 
              onClick={() => setRole(role === 'walker' ? 'creator' : 'walker')}
              className="mt-4 flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 transition active:scale-95"
            >
              <ArrowRightLeft size={12} className="text-[#8B2B2B]" />
              <span className="text-[10px] font-bold text-gray-600">
                切换至{role === 'walker' ? '创作者' : '散步者'}视图
              </span>
            </button>
          </div>

          {/* 动态内容区 */}
          <AnimatePresence mode="wait">
            {role === 'walker' ? (
              <motion.div 
                key="walker"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Footprints size={12} /> <span className="text-[9px] font-bold">累计步数</span>
                    </div>
                    <p className="text-xl font-serif font-bold tracking-tight">124,890</p>
                  </div>
                  <div className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <MapIcon size={12} /> <span className="text-[9px] font-bold">探索路线</span>
                    </div>
                    <p className="text-xl font-serif font-bold tracking-tight">18 条</p>
                  </div>
                </div>

                <div className="bg-black text-white p-6 rounded-[28px] shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xs font-bold opacity-70">健康与消耗</h3>
                    <Calendar size={14} className="opacity-50" />
                  </div>
                  <div className="flex justify-around items-end">
                    <div className="text-center">
                      <Flame className="mx-auto text-orange-500 mb-1.5" size={18} />
                      <p className="text-xs opacity-50 uppercase tracking-tighter text-[8px]">消耗</p>
                      <p className="text-sm font-bold font-serif">4,200</p>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="text-center">
                      <Utensils className="mx-auto text-green-500 mb-1.5" size={18} />
                      <p className="text-xs opacity-50 uppercase tracking-tighter text-[8px]">摄入</p>
                      <p className="text-sm font-bold font-serif">3,850</p>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="text-center">
                      <Wallet className="mx-auto text-blue-500 mb-1.5" size={18} />
                      <p className="text-xs opacity-50 uppercase tracking-tighter text-[8px]">消费</p>
                      <p className="text-sm font-bold font-serif">¥892</p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pb-4">
                  <h3 className="text-[10px] font-bold text-gray-400 mb-3 ml-2 uppercase tracking-widest">我的散步手账</h3>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-28 h-40 bg-white rounded-2xl shrink-0 shadow-sm border border-gray-100 overflow-hidden relative">
                        <img src={`https://images.unsplash.com/photo-${1500 + i}?w=200`} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white drop-shadow-md">04.23 武康路</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="creator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 space-y-4"
              >
                <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">路线影响力</h3>
                    <span className="text-[9px] text-green-500 bg-green-50 px-2 py-0.5 rounded-full font-bold">+12%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[8px] text-gray-400 uppercase">Uploaded</p>
                      <p className="text-base font-bold font-serif">5</p>
                    </div>
                    <div className="border-x border-gray-50">
                      <p className="text-[8px] text-gray-400 uppercase">Favs</p>
                      <p className="text-base font-bold font-serif">1.2k</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-gray-400 uppercase">Rating</p>
                      <p className="text-base font-bold font-serif">4.9</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#8B2B2B] text-white p-5 rounded-[28px] relative overflow-hidden">
                  <h3 className="text-[10px] font-bold opacity-60 mb-4 uppercase tracking-widest">路线评价词云</h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {['安静', '适合摄影', '建筑美学', '避开人流', '避暑', '咖啡好喝', '路线合理'].map((word, idx) => (
                      <span 
                        key={word} 
                        className="px-3 py-1 rounded-full border border-white/20 text-[10px]"
                        style={{ opacity: 0.6 + (idx * 0.05) }}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                  <div className="absolute -right-4 -bottom-4 text-white/5 rotate-12">
                     <MessageSquare size={100} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-50 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-xs font-bold">LV2</div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-700">资深拾荒者</p>
                      <p className="text-[8px] text-gray-400 font-medium">还差 12 人走过即可升级</p>
                    </div>
                  </div>
                  <ArrowRightLeft className="text-gray-200" size={14} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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

        <div style={bottomItemStyle} onClick={() => router.push('/walking')}>
          <Footprints size={22}/>
          <span>游玩</span>
        </div>
        
        <div style={bottomActiveStyle} onClick={() => router.push('/profile')}>
          <User size={22}/>
          <span>我的</span>
        </div>
      </div>

    </div>
  );
}
