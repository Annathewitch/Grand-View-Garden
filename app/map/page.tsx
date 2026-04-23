"use client";
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="relative h-screen">
      <div className="absolute top-4 w-full px-4 z-10">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center border">
          <Search className="text-gray-400 mr-2" />
          <input placeholder="AI规划：3人/看展/2小时" className="flex-1 outline-none text-sm" />
        </div>
      </div>
      <div className="h-full bg-slate-200 flex items-center justify-center text-gray-500">
        地图占位区域 (接入 Mapbox)
      </div>
    </div>
  );
}
