"use client";
import { useState } from 'react';
import { Search, Compass, MapPin, Coffee, ArtTrack, Trees as Tree, Sparkles } from 'lucide-react';

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // 模拟上海地图上的标点 (静安、徐汇区域)
  const locations = {
    '咖啡店': [{ id: 1, x: 150, y: 300, name: 'Manner Coffee' }, { id: 2, x: 220, y: 350, name: 'Peets Coffee' }],
    '展览': [{ id: 3, x: 180, y: 200, name: '西岸美术馆' }, { id: 4, x: 100, y: 150, name: 'UCCA' }],
    '自然': [{ id: 5, x: 280, y: 400, name: '复兴公园' }],
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* 1. AI 搜索栏 */}
      <div className="absolute top-4 w-full px-4 z-20">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white p-3 flex items-center">
          <Sparkles className="text-blue-500 mr-2" size={18} />
          <input 
            placeholder="AI 搜索: 2人, 3小时, 避暑..." 
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        
        {/* 2. 快捷分类栏 */}
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar py-1">
          {[
            { id: '咖啡店', icon: <Coffee size={14}/> },
            { id: '展览', icon: <ArtTrack size={14}/> },
            { id: '自然', icon: <Tree size={14}/> },
            { id: '季节专题', icon: <Compass size={14}/> }
          ].map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition shadow-sm border
                ${activeCategory === cat.id ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
            >
              {cat.icon} {cat.id}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 模拟地图交互区 */}
      <div className="flex-1 bg-[#E5E2D9] relative overflow-hidden">
        {/* 这里是一个上海地图的模拟示意图 */}
        <svg className="w-full h-full opacity-40">
          <path d="M0,400 Q150,380 250,500 T400,450" stroke="#99b" strokeWidth="20" fill="none" /> {/* 模拟黄浦江 */}
          <rect x="120" y="250" width="80" height="100" fill="#ccc" /> {/* 模拟建筑群 */}
        </svg>

        {/* 动态显示的标点 */}
        {activeCategory && locations[activeCategory as keyof typeof locations]?.map(loc => (
          <div 
            key={loc.id}
            className="absolute transition-all duration-500 animate-bounce"
            style={{ left: loc.x, top: loc.y }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-white px-2 py-1 rounded shadow text-[10px] mb-1 whitespace-nowrap font-bold">
                {loc.name}
              </div>
              <MapPin size={24} className="text-red-500 fill-red-200" />
            </div>
          </div>
        ))}

        {/* 默认定位点 (上海) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
        </div>
      </div>

      {/* 4. 底部主导航 - 固定在手机底部 */}
      <nav className="h-16 bg-white/90 backdrop-blur-md border-t flex justify-around items-center px-2 shrink-0">
        <button className="flex flex-col items-center gap-0.5 text-black">
          <MapPin size={20}/><span className="text-[10px] font-medium">大观</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-gray-400">
          <Compass size={20}/><span className="text-[10px]">路线</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-gray-400">
          <Footprints size={20}/><span className="text-[10px]">游玩</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 text-gray-400">
          <User size={20}/><span className="text-[10px]">我的</span>
        </button>
      </nav>
    </div>
  );
}
