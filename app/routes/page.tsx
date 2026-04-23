"use client";
import { useState } from 'react';
import { Heart, MessageCircle, Map as MapIcon, Share2, Sparkles, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoutesPage() {
  const [activeTab, setActiveTab] = useState('推荐');

  const posts = [
    {
      id: 1,
      title: "静安寺转角：隐于闹市的半日闲处",
      author: "林深时见鹿",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      cover: "https://images.unsplash.com/photo-1541432901012-a76c76546ef3?w=800",
      tags: ["安静", "避暑", "宝藏咖啡馆"],
      stats: { distance: "3.2km", time: "1.5h", walkCount: 245 }
    },
    {
      id: 2,
      title: "武康路不只有大楼：老洋房深度巡礼",
      author: "城市拾荒者",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      cover: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800",
      tags: ["老建筑", "摄影", "梧桐区"],
      stats: { distance: "2.8km", time: "2h", walkCount: 890 }
    }
  ];

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* 1. 顶部 AI 搜索入口（常驻） */}
      <div className="px-4 py-3 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="bg-gray-100 rounded-full py-2 px-4 flex items-center gap-2 border border-black/5 shadow-inner">
          <Sparkles size={16} className="text-blue-500" />
          <span className="text-[10px] text-gray-400">告诉 AI 你的心情，定制一条路线...</span>
        </div>
      </div>

      {/* 2. 社区 Tab 切换 */}
      <div className="flex gap-6 px-6 py-2 text-sm border-b">
        {['推荐', '附近', '最新'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 relative ${activeTab === tab ? 'font-bold text-black' : 'text-gray-400'}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B2B2B]" />
            )}
          </button>
        ))}
      </div>

      {/* 3. 路线流内容 */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50 px-4 pt-4 space-y-6">
        {posts.map((post) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
          >
            {/* 封面图区域 */}
            <div className="relative aspect-[4/5]">
              <img src={post.cover} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg">
                  <Heart size={18} className="text-gray-400" />
                </button>
                <button className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg">
                  <Share2 size={18} className="text-gray-400" />
                </button>
              </div>
              {/* 路线预览悬浮窗 */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px]">
                <MapIcon size={12} />
                <span>预览路线轨迹</span>
              </div>
            </div>

            {/* 信息区域 */}
            <div className="p-4">
              <div className="flex gap-1.5 mb-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">#{tag}</span>
                ))}
              </div>
              <h3 className="font-serif font-bold text-lg leading-tight mb-3">
                {post.title}
              </h3>
              
              {/* 路线核心数据 */}
              <div className="flex items-center gap-4 py-3 border-y border-gray-50 mb-3">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-400 uppercase">Distance</span>
                  <span className="text-xs font-bold">{post.stats.distance}</span>
                </div>
                <div className="flex flex-col border-x px-4">
                  <span className="text-[8px] text-gray-400 uppercase">Time</span>
                  <span className="text-xs font-bold">{post.stats.time}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-400 uppercase">Adventurers</span>
                  <span className="text-xs font-bold">{post.stats.walkCount} 人走过</span>
                </div>
              </div>

              {/* 发布者信息 & 交互按钮 */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={post.avatar} className="w-6 h-6 rounded-full border border-gray-100" />
                  <span className="text-xs text-gray-600 font-medium">{post.author}</span>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition active:scale-95">
                  <Navigation size={12} fill="white" />
                  去散步
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {/* 底部填充，防止被导航栏遮挡 */}
        <div className="h-4" />
      </div>

      {/* 悬浮发布按钮 */}
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-black rounded-full shadow-2xl flex items-center justify-center text-white transition active:scale-90 border-4 border-white">
        <span className="text-2xl">+</span>
      </button>
    </div>
  );
}
