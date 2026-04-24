"use client";
import { useState } from 'react';
import { Search, MapPin, Coffee, ArtTrack, Trees as Tree } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState('咖啡店');
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // 红色标点的绝对定位数据 (模拟 Figma 中的放置)
  const mapPoints = [
    { id: 1, x: 230, y: 350, desc: "西岸美术馆" },
    { id: 2, x: 120, y: 310, desc: "Manner Coffee (武康路)" },
    { id: 3, x: 195, y: 220, desc: "上海博物馆" },
    { id: 4, x: 260, y: 195, desc: "外滩" },
  ];

  const categories = [
    { name: '咖啡店', icon: <Coffee size={14}/> },
    { name: '展览', icon: <ArtTrack size={14}/> },
    { name: '自然', icon: <Tree size={14}/> },
  ];

  return (
    <div className="h-full w-full relative">
      
      {/* 自定义地图图片背景 */}
      <img 
        src="/shanghai-map.png" 
        className="absolute inset-0 w-full h-full object-cover z-10" 
        alt="Map background"
      />

      {/* 1. 顶部搜索栏 */}
      <div className="absolute top-10 left-4 right-4 z-30">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3.5 flex items-center gap-3">
          <MapPin className="text-gray-400" size={18} />
          <input 
            placeholder="告诉 AI 你的心情，定制 CityWalk 路线..." 
            className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* 2. 快捷分类栏 */}
      <div className="absolute top-[105px] left-4 right-4 z-30 flex gap-2">
        {categories.map(cat => (
          <button 
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs transition shadow-sm border
              ${activeCategory === cat.name ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
          >
            {cat.icon}
            <span className="font-medium">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* 3. 动态显示的标点 */}
      <AnimatePresence>
        {activeCategory === '咖啡店' && mapPoints.map(point => (
          <motion.div 
            key={point.id}
            className="absolute z-20 cursor-pointer animate-bounce"
            style={{ left: `${point.x}px`, top: `${point.y}px` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setSelectedPoint(point.id)}
          >
            <div className={`p-1.5 rounded-full transition-transform ${selectedPoint === point.id ? 'scale-125' : ''}`}>
              <MapPin size={24} className="text-red-500 fill-white"/>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 4. 浮动手账/推荐卡片 (图二中的弹窗效果) */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div 
            className="absolute bottom-24 left-4 right-4 z-40"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <div className="bg-white/80 backdrop-blur-md rounded-[30px] p-6 shadow-2xl border border-gray-100 flex flex-col relative overflow-hidden">
               
               {/* 装饰水印 */}
               <div className="absolute -right-4 -top-4 opacity-[0.03] text-7xl font-serif">大观</div>
               
               <div className="border-b-2 border-red-900/10 pb-4 mb-4">
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] text-red-900 font-bold">2026.04.23 SHANGHAI</p>
                     <h2 className="text-xl font-serif font-black mt-1">梧桐影里的老洋房</h2>
                   </div>
                   <div className="text-right">
                     <p className="text-[8px] text-gray-400">天气：晴 18°C</p>
                   </div>
                 </div>
               </div>

               <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-1">
                 <p className="text-xs leading-relaxed text-gray-600 border-l-2 border-red-900 pl-3 italic">
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
                      <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-[10px]">大观</div>
                      <span className="text-[10px] text-gray-400 italic">记录于 大观园 App</span>
                   </div>
                   <button 
                    onClick={() => setSelectedPoint(null)}
                    className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold"
                   >
                     收起推荐
                   </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
