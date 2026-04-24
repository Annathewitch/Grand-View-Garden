"use client";
import { useState } from 'react';
import AppContainer from "@/components/AppContainer";
import { MapPin, Coffee, Palette, Trees as Tree } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState('咖啡店');
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const mapPoints = [
    { id: 1, x: 230, y: 350, desc: "西岸美术馆" },
    { id: 2, x: 120, y: 310, desc: "Manner Coffee (武康路)" },
    { id: 3, x: 195, y: 220, desc: "上海博物馆" },
    { id: 4, x: 260, y: 195, desc: "外滩" },
  ];

  const categories = [
    { name: '咖啡店', icon: Coffee },
    { name: '展览', icon: Palette },
    { name: '自然', icon: Tree },
  ];

  return (
    <AppContainer>
      <div className="h-full w-full relative overflow-hidden">

        {/* 地图背景 */}
        <img
          src="/shanghai-map.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="Map background"
        />

        {/* 🔥 顶部搜索栏（避开刘海） */}
        <div className="absolute top-6 left-4 right-4 z-30">
          <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-gray-100 p-3 flex items-center gap-3">
            <MapPin className="text-gray-400" size={18} />
            <input
              placeholder="告诉 AI 你的心情，定制 CityWalk 路线..."
              className="flex-1 bg-transparent outline-none text-[13px] text-gray-800 placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* 分类 */}
        <div className="absolute top-[80px] left-4 right-4 z-30 flex gap-2">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs transition shadow-sm border
                ${activeCategory === cat.name ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <Icon size={14}/>
                <span className="font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* 地图点位 */}
        <AnimatePresence>
          {activeCategory === '咖啡店' && mapPoints.map(point => (
            <motion.div
              key={point.id}
              className="absolute z-20 cursor-pointer"
              style={{ left: `${point.x}px`, top: `${point.y}px` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setSelectedPoint(point.id)}
            >
              <div className={`p-1.5 rounded-full ${selectedPoint === point.id ? 'scale-125' : ''}`}>
                <MapPin size={24} className="text-red-500 fill-white"/>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 🔥 iOS 底部弹窗 */}
        <AnimatePresence>
          {selectedPoint && (
            <>
              {/* 背景遮罩 */}
              <motion.div
                className="absolute inset-0 bg-black/30 backdrop-blur-md z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPoint(null)}
              />

              {/* 卡片 */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[30px] p-6 z-50"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* 小拖拽条 */}
                <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"/>

                <div className="mb-4">
                  <p className="text-[10px] text-red-900 font-bold">2026.04.23 SHANGHAI</p>
                  <h2 className="text-lg font-black mt-1">梧桐影里的老洋房</h2>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  在武康路转角，遇见了一家不需要预约的咖啡馆，
                  阳光刚好洒在木质窗沿上。
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <img src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400" className="rounded-lg"/>
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" className="rounded-lg"/>
                </div>

                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <span>🔥 450 kcal</span>
                  <span>📍 武康路 - 老洋房</span>
                </div>

                <button
                  onClick={() => setSelectedPoint(null)}
                  className="w-full py-3 bg-black text-white rounded-xl font-bold"
                >
                  收起
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </AppContainer>
  );
}
