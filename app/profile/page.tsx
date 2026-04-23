"use client";
import { useState } from 'react';
import { 
  Settings, User, Footprints, Map as MapIcon, 
  Flame, Utensils, Heart, MessageSquare, 
  ArrowRightLeft, Wallet, Calendar 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const [role, setRole] = useState<'walker' | 'creator'>('walker');

  return (
    <div className="h-full flex flex-col bg-[#F8F7F2] overflow-y-auto no-scrollbar">
      {/* 1. 顶部背景与头像 */}
      <div className="relative h-48 bg-[#8B2B2B] shrink-0">
        <div className="absolute inset-0 opacity-10" 
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', size: '20px' }} />
        <div className="absolute top-12 right-6">
          <Settings className="text-white/80" size={20} />
        </div>
      </div>

      <div className="px-6 -mt-12 relative z-10 flex-1">
        {/* 个人基本信息卡片 */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden -mt-16 bg-gray-200">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-4 text-xl font-serif font-bold text-gray-800">林深时见鹿</h2>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Digital Nomad | City Explorer</p>
          
          {/* 身份切换按钮 */}
          <button 
            onClick={() => setRole(role === 'walker' ? 'creator' : 'walker')}
            className="mt-4 flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 transition active:scale-95"
          >
            <ArrowRightLeft size={14} className="text-daguan-red" />
            <span className="text-[10px] font-bold text-gray-600">
              切换至{role === 'walker' ? '创作者' : '散步者'}视图
            </span>
          </button>
        </div>

        {/* 动态内容区 */}
        <AnimatePresence mode="wait">
          {role === 'walker' ? (
            /* 散步者视图：数据看板 */
            <motion.div 
              key="walker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Footprints size={14} /> <span className="text-[10px]">累计步数</span>
                  </div>
                  <p className="text-2xl font-serif font-bold">124,890</p>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <MapIcon size={14} /> <span className="text-[10px]">探索路线</span>
                  </div>
                  <p className="text-2xl font-serif font-bold">18 条</p>
                </div>
              </div>

              {/* 核心生理数据卡片 */}
              <div className="bg-black text-white p-6 rounded-[32px] shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold opacity-70">健康与消耗</h3>
                  <Calendar size={14} className="opacity-50" />
                </div>
                <div className="flex justify-around items-end">
                  <div className="text-center">
                    <Flame className="mx-auto text-orange-500 mb-2" />
                    <p className="text-xs opacity-50 uppercase tracking-tighter text-[8px]">消耗</p>
                    <p className="text-lg font-bold font-serif">4,200</p>
                  </div>
                  <div className="h-12 w-[1px] bg-white/10" />
                  <div className="text-center">
                    <Utensils className="mx-auto text-green-500 mb-2" />
                    <p className="text-xs opacity-50 uppercase tracking-tighter text-[8px]">摄入</p>
                    <p className="text-lg font-bold font-serif">3,850</p>
                  </div>
                  <div className="h-12 w-[1px] bg-white/10" />
                  <div className="text-center">
                    <Wallet className="mx-auto text-blue-500 mb-2" />
                    <p className="text-xs opacity-50 uppercase tracking-tighter text-[8px]">消费</p>
                    <p className="text-lg font-bold font-serif">¥892</p>
                  </div>
                </div>
              </div>

              {/* 我的手账预览 */}
              <div className="mt-4 pb-12">
                <h3 className="text-xs font-bold text-gray-500 mb-3 ml-2">我的散步手账</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-32 h-48 bg-white rounded-2xl shrink-0 shadow-sm border border-gray-100 overflow-hidden relative">
                      <img src={`https://images.unsplash.com/photo-${1500 + i}?w=200`} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white drop-shadow-md">04.23 武康路</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* 创作者视图：影响力看板 */
            <motion.div 
              key="creator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 space-y-4"
            >
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-700">路线影响力</h3>
                  <span className="text-[10px] text-green-500 bg-green-50 px-2 py-0.5 rounded-full">+12%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[8px] text-gray-400">已上传</p>
                    <p className="text-lg font-bold">5 条</p>
                  </div>
                  <div className="border-x">
                    <p className="text-[8px] text-gray-400">被收藏</p>
                    <p className="text-lg font-bold">1.2k</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-gray-400">评分</p>
                    <p className="text-lg font-bold">4.9</p>
                  </div>
                </div>
              </div>

              {/* 评价词云模拟 */}
              <div className="bg-[#8B2B2B] text-white p-6 rounded-[32px] relative overflow-hidden">
                <h3 className="text-xs font-bold opacity-60 mb-4">路线评价词云</h3>
                <div className="flex flex-wrap gap-2">
                  {['安静', '适合摄影', '建筑美学', '避开人流', '避暑', '咖啡好喝', '路线合理'].map((word, idx) => (
                    <span 
                      key={word} 
                      className={`px-3 py-1 rounded-full border border-white/20 text-[${Math.random() > 0.5 ? '12px' : '10px'}]`}
                      style={{ opacity: 0.6 + (idx * 0.05) }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <div className="absolute -right-4 -bottom-4 text-white/5 rotate-12">
                   <MessageSquare size={120} />
                </div>
              </div>

              {/* 创作者成就卡片 */}
              <div className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">LV2</div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">资深拾荒者</p>
                    <p className="text-[8px] text-gray-400">还差 12 人走过即可升级</p>
                  </div>
                </div>
                <ArrowRightLeft className="text-gray-200" size={16} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
