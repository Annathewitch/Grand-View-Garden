"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AIRecommendation } from '../../components/AIRecommendation';
import { 
  Sparkles, Navigation, 
  Compass, MapPin, Footprints, User, Search, Flame, Bookmark, Heart
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

  return (
    <div style={appContainerStyle}>
          <div style={contentAreaStyle}>
            {/* 顶部状态与设置 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '50px 20px 0' }}>
              <Settings size={24} color="#333" />
            </div>

        {/* 🔥 顶部（适配刘海） */}
        <div className="pt-6 px-6 pb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif font-black">探索路线</h1>
            <div className="p-2.5 bg-slate-100 rounded-full active:scale-90 transition">
              <Search size={18} className="text-slate-500" />
            </div>
          </div>

          {/* Tab */}
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
                  <motion.div 
                    layoutId="tabLine" 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B2B2B] rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* AI卡片 */}
        <div className="px-5 mb-4">
          <div className="bg-gradient-to-r from-[#1E1E1E] to-[#3A3A3A] rounded-3xl p-4 flex justify-between items-center shadow-xl">
            <div className="flex gap-3 items-center">
              <Sparkles className="text-blue-400" size={18}/>
              <div>
                <p className="text-xs text-white font-bold">AI 路线定制</p>
                <p className="text-[10px] text-white/50">输入心情生成路线</p>
              </div>
            </div>
            <button className="bg-blue-500 p-2 rounded-xl text-white active:scale-95">
              <Navigation size={14}/>
            </button>
          </div>
        </div>

        {/* 瀑布流 */}
        <div className="flex-1 overflow-y-auto px-5 space-y-8 pb-28">
          {posts.map(post => (
            <motion.div 
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="cursor-pointer"
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden shadow-lg">
                <img src={post.cover} className="w-full h-full object-cover"/>

                {/* 操作按钮 */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Heart size={16}/>
                  </div>
                  <div className="w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Bookmark size={16}/>
                  </div>
                </div>

                {/* 底部渐变 */}
                <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex gap-2 mb-2">
                    {post.hot && (
                      <span className="bg-red-500 text-white text-[8px] px-2 py-1 rounded-md flex items-center gap-1">
                        <Flame size={8}/> HOT
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold leading-tight">
                    {post.title}
                  </h3>
                </div>
              </div>

              {/* 作者 */}
              <div className="flex justify-between mt-3 text-sm items-center">
                <div className="flex items-center gap-2">
                  <img src={post.avatar} className="w-7 h-7 rounded-full"/>
                  <span className="text-xs text-gray-500">by {post.author}</span>
                </div>
                <span className="text-xs text-gray-400">{post.stats.walkCount}人</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔥 iOS底部弹窗 */}
        <AnimatePresence>
          {selectedPost && (
            <>
              <motion.div
                className="absolute inset-0 bg-black/30 backdrop-blur-md z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
              />

              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[30px] p-6 z-50"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"/>

                <img src={selectedPost.cover} className="rounded-xl mb-4"/>

                <h2 className="font-bold text-lg mb-2">{selectedPost.title}</h2>

                <p className="text-sm text-gray-500 mb-4">
                  这是一条适合周末散步的路线，结合咖啡与城市漫游体验。
                </p>

                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <span>🚶 {selectedPost.stats.distance}</span>
                  <span>⏱ {selectedPost.stats.time}</span>
                  <span>🔥 {selectedPost.stats.walkCount}</span>
                </div>

                <button
                  onClick={() => router.push('/walking')}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold"
                >
                  去游玩
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 🔥 iOS底部导航 */}
        <div className="absolute bottom-0 left-0 w-full h-[84px] bg-white/90 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center pb-5">
          
          <div onClick={() => router.push('/map')} className="flex flex-col items-center text-gray-400 text-[10px]">
            <MapPin size={22}/>
            大观
          </div>

          <div className="flex flex-col items-center text-blue-500 text-[10px]">
            <Compass size={22}/>
            路线
          </div>

          <div className="w-12 h-12 bg-blue-500 rounded-full text-white flex items-center justify-center mb-8 shadow-lg">
            +
          </div>

          <div onClick={() => router.push('/walking')} className="flex flex-col items-center text-gray-400 text-[10px]">
            <Footprints size={22}/>
            游玩
          </div>

          <div onClick={() => router.push('/profile')} className="flex flex-col items-center text-gray-400 text-[10px]">
            <User size={22}/>
            我的
          </div>
        </div>

      </div>
    </AppContainer>
  );
}
