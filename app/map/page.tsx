"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, MapPin, Coffee, Palette, Trees as Tree, Sparkles, User, Footprints } from 'lucide-react';

export default function MapPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // 模拟上海地图上的标点 (保持逻辑不变)
  const locations = {
    '咖啡店': [{ id: 1, x: 150, y: 300, name: 'Manner Coffee' }, { id: 2, x: 220, y: 350, name: 'Peets Coffee' }],
    '展览': [{ id: 3, x: 180, y: 200, name: '西岸美术馆' }, { id: 4, x: 100, y: 150, name: 'UCCA' }],
    '自然': [{ id: 5, x: 280, y: 400, name: '复兴公园' }],
  };

  // --- 您指定的苹果模型样式定义 ---
  const bottomBarStyle: React.CSSProperties = { 
    position: "absolute", 
    bottom: 0, 
    width: "100%", 
    height: "84px", // 适配 iPhone 底部安全区域
    background: "#fff", 
    display: "flex", 
    justifyContent: "space-around", 
    alignItems: "center", 
    borderTop: "1px solid #eee",
    paddingBottom: "20px", // 为苹果 Home 条预留位
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
    marginBottom: '35px', // 向上偏移，呈现苹果 App 经典的悬浮感
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
    border: '4px solid #fff'
  };

  return (
    <div className="h-full w-full relative flex flex-col overflow-hidden bg-white">
      
      {/* 1. AI 搜索栏 (尺寸微调，更符合手机触控) */}
      <div className="absolute top-12 w-full px-4 z-20">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-black/5 p-3.5 flex items-center">
          <Sparkles className="text-blue-500 mr-2" size={18} />
          <input 
            placeholder="AI 搜索: 2人, 3小时, 避暑..." 
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        
        {/* 2. 快捷分类栏 */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar py-1">
          {[
            { id: '咖啡店', icon: <Coffee size={14}/> },
            { id: '展览', icon: <Palette size={14}/> },
            { id: '自然', icon: <Tree size={14}/> },
            { id: '季节专题', icon: <Compass size={14}/> }
          ].map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[11px] font-bold transition shadow-sm border
                ${activeCategory === cat.id ? 'bg-black text-white' : 'bg-white text-gray-500 border-gray-100'}`}
            >
              {cat.icon} {cat.id}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 模拟地图交互区 (占据全部空间) */}
      <div className="absolute inset-0 bg-[#E5E2D9]">
        <svg className="w-full h-full opacity-40">
          <path d="M0,450 Q150,430 250,550 T400,500" stroke="#99b" strokeWidth="25" fill="none" />
          <rect x="120" y="300" width="100" height="120" fill="#ccc" />
          <rect x="50" y="500" width="80" height="80" fill="#cbd5e1" />
        </svg>

        {/* 动态显示的标点 */}
        {activeCategory && locations[activeCategory as keyof typeof locations]?.map(loc => (
          <div 
            key={loc.id}
            className="absolute transition-all duration-500 animate-bounce"
            style={{ left: loc.x, top: loc.y }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-white px-2.5 py-1 rounded-lg shadow-lg text-[10px] mb-1.5 whitespace-nowrap font-black text-black">
                {loc.name}
              </div>
              <MapPin size={28} className="text-red-500 fill-white" />
            </div>
          </div>
        ))}

        {/* 默认定位点 (上海) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 bg-blue-500 rounded-full border-[3px] border-white shadow-2xl animate-pulse" />
        </div>
      </div>

      {/* 4. 按照苹果模型定制的底部导航栏 */}
      <div style={bottomBarStyle}>
        <div style={bottomActiveStyle} onClick={() => router.push('/map')}>
          <MapPin size={22}/>
          <span>大观</span>
        </div>
        
        <div style={bottomItemStyle} onClick={() => router.push('/routes')}>
          <Compass size={22}/>
          <span>路线</span>
        </div>
        
        {/* 中间圆形加号按钮 */}
        <div style={bottomAddStyle}>+</div>

        <div style={bottomItemStyle} onClick={() => router.push('/walking')}>
          <Footprints size={22}/>
          <span>游玩</span>
        </div>
        
        <div style={bottomItemStyle} onClick={() => router.push('/profile')}>
          <User size={22}/>
          <span>我的</span>
        </div>
      </div>

    </div>
  );
}
