"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart, Sparkles, Navigation, 
  Compass, MapPin, Footprints, User, Search, Flame, Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RoutesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('推荐');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const posts = [
    {
      id: 1,
      title: "静安寺转角：隐于闹市的半日闲处",
      author: "林深时见鹿",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      cover: "https://images.unsplash.com/photo-1541432901012-a76c76546ef3?w=800",
      tags: ["安静", "避暑"],
      stats: { distance: "3.2km", time: "1.5h", walkCount: 245 },
      hot: true
    },
    {
      id: 2,
      title: "武康路不只有大楼：老洋房深度巡礼",
      author: "城市拾荒者",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      cover: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800",
      tags: ["老建筑", "摄影"],
      stats: { distance: "2.8km", time: "2h", walkCount: 890 },
      hot: false
    }
  ];

  const bottomBarStyle: React.CSSProperties = { 
    position: "absolute", bottom: 0, width: "100%", height: "84px", 
    background: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(20px)",
    display: "flex", justifyContent: "space-around", alignItems: "center", 
    borderTop: "1px solid rgba(0,0,0,0.05)", paddingBottom: "20px", zIndex: 1000
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#FDFDFB] relative overflow-hidden text-slate-900">

      {/* 顶部 */}
      <div className="pt-14 px-6 pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-serif font-black">探索路线</h1>
          <div className="p-2.5 bg-slate-100 rounded-full active:scale-90 transition">
            <Search size={18} className="text-slate-500" />
          </div>
        </div>

        <div className="flex gap-8 mt-6">
          {['推荐', '附近', '最新', '收藏'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-black relative ${
                activeTab === tab ? 'text-slate-900' : 'text-slate-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B2B2B] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* AI卡片 */}
      <div className="px-5 mb-4">
        <div className="bg-gradient-to-r from-[#1E1E1E] to-[#3A3A3A] rounded-3xl p-4 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Sparkles className="text-blue-400" size={18}/>
            <div>
              <p className="text-xs text-white font-bold">AI 路线定制</p>
              <p className="text-[10px] text-white/50">输入心情生成路线</p>
            </div>
          </div>
          <button className="bg-blue-500 p-2 rounded-xl text-white">
            <Navigation size={14}/>
          </button>
        </div>
      </div>

      {/* 瀑布流 */}
      <div className="flex-1 overflow-y-auto px-5 space-y-8 pb-32">
        {posts.map(post => (
          <motion.div 
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="cursor-pointer"
          >
            <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden">
              <img src={post.cover} className="w-full h-full object-cover"/>

              <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white font-bold">{post.title}</h3>
              </div>
            </div>

            <div className="flex justify-between mt-3 text-sm">
              <span>{post.author}</span>
              <span>{post.stats.walkCount}人</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 弹窗 */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="bg-white rounded-[30px] p-6 w-full max-w-md"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPost.cover} className="rounded-xl mb-4"/>

              <h2 className="font-bold text-lg mb-2">{selectedPost.title}</h2>

              <p className="text-sm text-gray-500 mb-4">
                这是一条适合周末散步的路线，结合咖啡与城市漫游体验。
              </p>

              <button
                onClick={() => router.push('/walking')}
                className="w-full bg-blue-500 text-white py-3 rounded-xl"
              >
                去游玩
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部导航 */}
      <div style={bottomBarStyle}>
        <div onClick={() => router.push('/map')}>
          <MapPin size={22}/>
        </div>
        <div>
          <Compass size={22} color="#3B82F6"/>
        </div>
        <div className="w-12 h-12 bg-blue-500 rounded-full text-white flex items-center justify-center mb-8">+</div>
        <div onClick={() => router.push('/walking')}>
          <Footprints size={22}/>
        </div>
        <div onClick={() => router.push('/profile')}>
          <User size={22}/>
        </div>
      </div>

    </div>
  );
}
