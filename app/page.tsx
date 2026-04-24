"use client";
import { useState } from 'react';
// 修正图标名，确保编译通过
import { 
  Search, MapPin, Coffee, GalleryVertical, 
  Trees as Tree, Menu, Compass, Footprints, User 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 关键：修改为相对路径 ---
import AppContainer from '../components/AppContainer';

export default function AppMain() {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // 模拟地标数据
  const mapPoints = [
    { id: 1, x: 260, y: 380, title: "xx咖啡店一日游" },
    { id: 2, x: 100, y: 320, title: "武康路老建筑" },
    { id: 3, x: 180, y: 450, title: "隐秘艺术馆" },
  ];

  return (
    <AppContainer>
      <div className="relative w-full h-full overflow-hidden bg-[#FDFDFB]">
        
        {/* 1. 地图背景 - 铺满 iPhone 屏幕 */}
        <img 
          src="/shanghai-map.png" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Map"
          onClick={() => setSelectedPoint(null)}
        />

        {/* 2. 顶部搜索栏 - 一比一还原图 2 */}
        <div className="absolute top-12 left-4 right-4 z-30">
          <div className="bg-white rounded-2xl shadow-xl h-14 flex items-center px-4 gap-3 border border-black/5">
            <Menu size={22} className="text-gray-400" />
            <input 
              placeholder="搜索最近周末活动" 
              className="flex-1 text-[15px] font-medium outline-none placeholder:text-gray-400"
            />
            <Search size={22} className="text-gray-400" />
          </div>
        </div>

        {/* 3. 分类选项卡 */}
        <div className="absolute top-[115px] left-4 right-4 z-30 flex gap-2">
          <div className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-lg">
            <Coffee size={14} />
            <span className="text-[13px] font-bold">咖啡店</span>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-gray-600 px-5 py-2.5 rounded-full border border-black/5">
            <GalleryVertical size={14} />
            <span className="text-[13px] font-bold">展览</span>
          </div>
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-gray-600 px-5 py-2.5 rounded-full border border-black/5">
            <Tree size={14} />
            <span className="text-[13px] font-bold">自然</span>
          </div>
        </div>

        {/* 4. 红色地标点 */}
        {mapPoints.map((point) => (
          <div 
            key={point.id}
            onClick={(e) => {
              e.stopPropagation(); // 防止触发地图点击隐藏
              setSelectedPoint(point.id);
            }}
            className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-full active:scale-90 transition-transform"
            style={{ left: `${point.x}px`, top: `${point.y}px` }}
          >
            <MapPin 
              size={36} 
              className={`${selectedPoint === point.id ? 'text-red-600' : 'text-red-500'}`}
              fill="currentColor"
              stroke="white"
              strokeWidth={2}
            />
          </div>
        ))}

        {/* 5. 交互弹出卡片 - 还原图 3 */}
        <AnimatePresence>
          {selectedPoint && (
            <motion.div 
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              className="absolute bottom-[95px] left-4 right-4 z-40"
            >
              <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-black/5">
                <div className="h-44 w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800" 
                    className="w-full h-full object-cover"
                    alt="Place"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {mapPoints.find(p => p.id === selectedPoint)?.title}，沉浸式体验
                  </h3>
                  <p className="text-[12px] text-slate-500 mt-2 font-medium">
                    新开在武汉大学内部的这家咖啡店简直就是 citywalk 的不二去处...
                  </p>
                  <div className="flex justify-end gap-3 mt-6">
                    <button onClick={() => setSelectedPoint(null)} className="px-5 py-2 text-xs font-bold text-slate-400">Secondary</button>
                    <button className="px-8 py-2 text-xs font-black text-white bg-blue-600 rounded-xl">Primary</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. 底部导航栏 - 固定在 iPhone 壳内部底部 */}
        <div className="absolute bottom-0 left-0 right-0 h-[84px] bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center px-4 z-50 pb-5">
          <div className="flex flex-col items-center gap-1 text-blue-600">
            <MapPin size={22} fill="currentColor"/>
            <span className="text-[10px] font-black">大观</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-300">
            <Compass size={22}/>
            <span className="text-[10px] font-bold">路线</span>
          </div>
          <div className="relative w-12 h-12">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-600 rounded-full border-[6px] border-white shadow-lg flex items-center justify-center text-white text-3xl font-light">+</div>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-300">
            <Footprints size={22}/>
            <span className="text-[10px] font-bold">游玩</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-300">
            <User size={22}/>
            <span className="text-[10px] font-bold">我的</span>
          </div>
        </div>

      </div>
    </AppContainer>
  );
}
