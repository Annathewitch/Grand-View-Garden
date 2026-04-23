"use client";
import { useState } from 'react';

export default function Profile() {
  const [role, setRole] = useState('散步者');
  return (
    <div className="p-6">
      <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
        {['散步者', '创作者'].map(r => (
          <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2 rounded ${role === r ? 'bg-white shadow' : ''}`}>{r}</button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-lg font-bold">{role}数据</h2>
        <div className="mt-4 text-sm text-gray-600">本月累计步行: 42,000 步</div>
      </div>
    </div>
  );
}
