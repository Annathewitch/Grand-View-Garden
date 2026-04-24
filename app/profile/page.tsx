"use client";
import { Settings, RefreshCw, Footprints, Map as MapIcon, Heart, Compass, User, MapPin } from 'lucide-react';
import AppContainer from '../../components/AppContainer';

export default function ProfilePage() {
  return (
    <AppContainer>
      <div className="relative w-full h-full bg-white overflow-y-auto no-scrollbar pb-24">
        {/* 顶部状态与设置 */}
        <div className="flex justify-between items-center p-6 pt-12">
          <Settings size={24} className="text-gray-800" />
        </div>

        {/* 头像与用户信息 */}
        <div className="px-6 space-y-4">
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <img src="/avatar.png" className="w-full h-full object-cover" alt="Profile" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">林深时见鹿</h1>
          <p className="text-gray-500 font-medium">Digital Nomad Explorer</p>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-600">
            <RefreshCw size={14} /> 切换至创作者视图
          </button>
        </div>

        {/* 数据统计 */}
        <div className="px-6 mt-10 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-800"><Footprints size={20}/> <span className="font-bold">Total Steps</span></div>
            <p className="text-3xl font-black tracking-tighter">124,890</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-800"><MapIcon size={20}/> <span className="font-bold">Routes</span></div>
            <p className="text-3xl font-black tracking-tighter">18 Entries</p>
          </div>

          <div className="pt-4">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">Health & Consumption</h2>
          </div>
        </div>

        {/* 底部导航栏 (需保持一致) */}
        <div className="absolute bottom-0 left-0 right-0 h-[84px] bg-white border-t border-gray-100 flex justify-around items-center px-4 z-50 pb-5 text-gray-300">
          <div className="flex flex-col items-center gap-1">
            <MapPin size={22} /><span className="text-[10px] font-bold">大观</span>
          </div>
          <div className="flex flex-col items-center gap-1"><Compass size={22}/><span className="text-[10px] font-bold">路线</span></div>
          <div className="relative w-12 h-12"><div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-600 rounded-full border-[6px] border-white shadow-lg flex items-center justify-center text-white text-3xl font-light">+</div></div>
          <div className="flex flex-col items-center gap-1"><Footprints size={22}/><span className="text-[10px] font-bold">游玩</span></div>
          <div className="flex flex-col items-center gap-1 text-blue-600">
            <User size={22} fill="currentColor"/><span className="text-[10px] font-black">我的</span>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}
