"use client";
import { motion } from 'framer-motion';

export const AIRecommendation = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ y: 300 }} animate={{ y: 0 }}
    className="fixed bottom-20 left-4 right-4 bg-white rounded-3xl shadow-2xl p-6 z-50 border border-daguan-red/10"
  >
    <div className="flex justify-between items-center mb-4">
      <span className="bg-daguan-red/10 text-daguan-red px-3 py-1 rounded-full text-xs font-bold">AI 为您定制</span>
      <button onClick={onClose} className="text-gray-400">✕</button>
    </div>
    <h3 className="text-lg font-bold font-serif italic">“寒江雪影：后海滑冰与围炉煮茶”</h3>
    <div className="flex gap-6 my-4 text-sm">
      <div><p className="text-gray-400">预计时长</p><p className="font-bold">3.5h</p></div>
      <div><p className="text-gray-400">适宜人数</p><p className="font-bold">2-4人</p></div>
      <div><p className="text-gray-400">消耗</p><p className="font-bold">450kcal</p></div>
    </div>
    <button className="w-full bg-black text-white py-4 rounded-2xl font-bold tracking-widest">开启这段旅程</button>
  </motion.div>
);
