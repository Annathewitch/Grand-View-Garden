"use client";
import { useState } from 'react';
import { Search, MapPin, Coffee, ArtTrack, Trees as Tree, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppContainer from '../../components/AppContainer';

export default function MapPage() {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // 这里的坐标是相对于 390px 宽度的屏幕计算的
  const mapPoints = [
    { id: 1, x: 260, y: 380 },
    { id: 2, x: 100, y: 320 },
    { id: 3, x: 180, y: 420 },
    { id: 4, x: 210, y: 150 },
  ];

  return (
    <AppContainer>
      <div className="relative w-full h-full overflow-hidden bg-slate-100">
        
        {/* --- 地图层：一比一填充屏幕 --- */}
        <img 
          src="/shanghai-map.png" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Map Background"
        />

        {/* --- 搜索栏：悬浮在最上层 --- */}
        <div className="absolute top-16 left-4 right-4 z-30">
          <div className="bg-white rounded-2xl shadow-lg h-12 flex items-center px-4 gap-3 border border-black/5">
            <Menu size={20} className="text-gray-400" />
            <input 
              placeholder="搜索最近周末活动" 
              className="flex-1 text-[14px] outline-none placeholder:text-gray-400"
            />
            <Search size={20} className="text-gray-400" />
          </div>
        </div>

        {/* --- 分类 Tab 层 --- */}
        <div className="absolute top-[125px] left-4 right-4 z-30 flex gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md">
            <Coffee size={14} />
            <span className="text-xs font-bold">咖啡店</span>
          </div>
          <div className="flex items-center gap-2 bg-white text-gray-600 px-4 py-2 rounded-full shadow-sm border border-black/5">
            <ArtTrack size={14} />
            <span className="text-xs font-bold">展览</span>
          </div>
          <div className="flex items-center gap-2 bg-white text-gray-600 px-4 py-2 rounded-full shadow-sm border border-black/5">
            <Tree size={14} />
            <span className="text-xs font-bold">自然</span>
          </div>
        </div>

        {/* --- 红色地标点：直接定位在地图图片上 --- */}
        {mapPoints.map((point) => (
          <div 
            key={point.id}
            onClick={() => setSelectedPoint(point.id)}
            className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-full"
            style={{ left: `${point.x}px`, top: `${point.y}px` }}
          >
            <MapPin 
              size={32} 
              className={`${selectedPoint === point.id ? 'text-red-600 scale-125' : 'text-red-500'} transition-all`}
              fill="white"
              strokeWidth={2}
            />
          </div>
        ))}

        {/* --- 弹出卡片：点击地标后跳出（对应图3） --- */}
        <AnimatePresence>
          {selectedPoint && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-20 left-4 right-4 z-40"
            >
              <div className="bg-white rounded-[24px] shadow-2xl overflow-hidden border border-black/5">
                {/* 咖啡厅大图 */}
                <div className="h-44 w-full bg-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600" 
                    className="w-full h-full object-cover"
                    alt="Coffee Shop"
                  />
                </div>
                
                {/* 文字内容 */}
                <div className="p-5">
                  <h3 className="text-lg font-black text-slate-800">xx咖啡店一日游，沉浸式体验</h3>
                  <p className="text-[12px] text-slate-400 mt-2 leading-relaxed">
                    新开在武汉大学内部的这家咖啡店简直就是citywalk的不二去处
                  </p>
                  
                  {/* 按钮组 */}
                  <div className="flex justify-end gap-3 mt-6">
                    <button 
                      onClick={() => setSelectedPoint(null)}
                      className="px-6 py-2.5 text-sm font-bold text-slate-500 bg-slate-50 rounded-full"
                    >
                      Secondary
                    </button>
                    <button className="px-8 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-200">
                      Primary
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AppContainer>
  );
}
