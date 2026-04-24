"use client";
import { useState } from "react";
import AppContainer from "@/components/AppContainer";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Footprints, Clock, Flame, Play, Check } from "lucide-react";

export default function WalkingPage() {
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checkedPoints, setCheckedPoints] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [journals, setJournals] = useState<string[]>([]);

  const routePoints = [
    "武康大楼",
    "老洋房",
    "梧桐街",
    "Manner Coffee"
  ];

  // 模拟打卡
  const handleCheck = (index: number) => {
    if (!checkedPoints.includes(index)) {
      setCheckedPoints([...checkedPoints, index]);
      setProgress((prev) => prev + 25);
    }
  };

  // 结束路线 → 生成“手账”
  const handleFinish = () => {
    const newJournal = `/journal-${Date.now()}`;
    setJournals([newJournal, ...journals]);
    setFinished(true);
  };

  return (
    <AppContainer>
      <div className="h-full w-full flex flex-col bg-[#FDFDFB]">

        {/* 顶部 */}
        <div className="pt-6 px-6 pb-4">
          <h1 className="text-xl font-bold">正在游玩</h1>
        </div>

        {/* 未开始 */}
        {!started && (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <p className="text-gray-400 mb-6">准备开始你的 CityWalk</p>
            <button
              onClick={() => setStarted(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <Play size={16}/> 开始路线
            </button>
          </div>
        )}

        {/* 游玩中 */}
        {started && !finished && (
          <>
            {/* 进度条 */}
            <div className="px-6 mb-4">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">{progress}% 完成</p>
            </div>

            {/* 路线点 */}
            <div className="flex-1 overflow-y-auto px-6 space-y-4">
              {routePoints.map((point, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCheck(index)}
                  className={`p-4 rounded-xl border flex justify-between items-center
                  ${checkedPoints.includes(index) ? 'bg-green-50 border-green-300' : 'bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={18}/>
                    <span>{point}</span>
                  </div>
                  {checkedPoints.includes(index) && (
                    <Check size={18} className="text-green-500"/>
                  )}
                </motion.div>
              ))}
            </div>

            {/* 数据统计 */}
            <div className="px-6 py-4 border-t flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16}/> 1.2h
              </div>
              <div className="flex items-center gap-2">
                <Footprints size={16}/> 3.2km
              </div>
              <div className="flex items-center gap-2">
                <Flame size={16}/> {progress * 5} kcal
              </div>
            </div>

            {/* 结束按钮 */}
            <div className="px-6 pb-6">
              <button
                onClick={handleFinish}
                className="w-full bg-black text-white py-3 rounded-xl"
              >
                结束路线
              </button>
            </div>
          </>
        )}

        {/* 完成后 */}
        <AnimatePresence>
          {finished && (
            <motion.div
              className="absolute inset-0 bg-white z-50 p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
            >
              <h2 className="text-lg font-bold mb-4">你的 CityWalk 手账</h2>

              {/* 模拟手账 */}
              <div className="bg-gray-100 rounded-2xl p-4 mb-4">
                <p className="text-sm text-gray-600">
                  今天走过 {routePoints.length} 个地点，
                  完成 {progress}% 路线。
                </p>
              </div>

              <button
                onClick={() => setFinished(false)}
                className="w-full bg-blue-500 text-white py-3 rounded-xl"
              >
                保存并返回
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 历史记录 */}
        {!started && journals.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-sm text-gray-400 mb-2">过往手账</h3>
            {journals.map((j, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded-xl mb-2">
                手账 #{i + 1}
              </div>
            ))}
          </div>
        )}

      </div>
    </AppContainer>
  );
}
