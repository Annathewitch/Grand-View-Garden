"use client";
import { useState } from 'react';
// 修正图标名称：ArtTrack 改为 GalleryVertical
import { Search, MapPin, Coffee, GalleryVertical, Trees as Tree, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppContainer from '../../components/AppContainer';

export default function MapPage() {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // 这里的坐标是相对于 390px 宽度的屏幕计算的
  // 你可以根据 shanghai-map.png 的实际位置微调这些数值
  const mapPoints = [
    { id: 1, x: 260, y: 380 },
    { id: 2, x: 100, y: 320 },
    { id: 3, x: 180, y: 420 },
    { id: 4, x: 210, y: 150 },
  ];

  const categories = [
    { name: '咖啡店', icon: <Coffee size={14} />, active: true },
    { name: '展览', icon: <GalleryVertical size={14} />, active: false },
    { name: '自然', icon: <Tree size={14} />, active: false },
  ];

  return (
    <AppContainer>
      <div className="relative w-full h-full overflow-hidden bg-[#FDFDFB]">
        
        {/* 1. 地图背景层 - 确保图片铺满手机屏幕 */}
        <img 
          src="/shanghai-map.png" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Map Background"
          onClick={() => setSelectedPoint(null)} // 点击地图空白处关闭卡片
        />

        {/* 2. 搜索栏 - 悬浮在最上层 */}
        <div className="absolute top-14 left-4 right-4 z-30">
          <div className="bg-white rounded-2xl shadow-xl h-14 flex items-center px-4 gap-3 border border-black/5">
            <Menu size={22} className="text-gray-400" />
            <input 
              placeholder="搜索最近周末活动" 
              className="flex-1 text-[15px] font-medium outline-none placeholder:text-gray-400"
            />
            <Search size={22} className="text-gray-400" />
          </div>
        </div>

        {/* 3. 分类选项卡 - 增加阴影和模糊感 */}
        <div className="absolute top-[135px] left-4 right-4 z-30 flex gap-2">
          {categories.map((cat) => (
            <div 
              key={cat.name}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all
                ${cat.active ? 'bg-blue-600 text-white' : 'bg-white/90 text-gray-600 border border-black/5'}`}
            >
              {cat.icon}
              <span className="text-[13px] font-bold tracking-tight">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* 4. 红色地标点 */}
        {mapPoints.map((point) => (
          <div 
            key={point.id}
            onClick={() => setSelectedPoint(point.id)}
            className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-full active:scale-90 transition-transform"
            style={{ left: `${point.x}px`, top: `${point.y}px` }}
          >
            <div className="relative">
              {/* 地标主体的红色水滴感 */}
              <MapPin 
                size={36} 
                className={`${selectedPoint === point.id ? 'text-red-600' : 'text-red-500'}`}
                fill="currentColor"
                stroke="white"
                strokeWidth={2}
              />
              {/* 选中时的呼吸灯效果 */}
              {selectedPoint === point.id && (
                <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-20"></span>
              )}
            </div>
          </div>
        ))}

        {/* 5. 底部弹出卡片 - 严格还原图 3 */}
        <AnimatePresence>
          {selectedPoint && (
            <motion.div 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="absolute bottom-6 left-4 right-4 z-40"
            >
              <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-black/5">
                {/* 咖啡厅封面图 */}
                <div className="h-48 w-full relative">
                  <img 
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80" 
                    className="w-full h-full object-cover"
                    alt="Cafe Exhibit"
                  />
                  <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-white text-[10px] font-bold">已收录</span>
                  </div>
                </div>
                
                {/* 文字内容区 */}
                <div className="p-6">
                  <h3 className="text-[19px] font-black text-slate-900 tracking-tight leading-tight">
                    xx咖啡店一日游，沉浸式体验
                  </h3>
                  <p className="text-[13px] text-slate-500 mt-3 font-medium leading-relaxed">
                    新开在武汉大学内部的这家咖啡店简直就是 citywalk 的不二去处，窗外阳光极好...
                  </p>
                  
                  {/* 操作按钮 */}
                  <div className="flex justify-end gap-3 mt-8">
                    <button 
                      onClick={() => setSelectedPoint(null)}
                      className="px-6 py-3 text-sm font-bold text-slate-400 active:scale-95 transition-transform"
                    >
                      Secondary
                    </button>
                    <button className="px-10 py-3 text-sm font-black text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
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
