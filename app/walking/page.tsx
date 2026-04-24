"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Footprints, Clock, Flame, Check, Compass, User, Settings } from "lucide-react";

export default function WalkingPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [checkedPoints, setCheckedPoints] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const routePoints = ["武康大楼", "老洋房咖啡", "梧桐大道", "安福路买手店"];
  const progress = (checkedPoints.length / routePoints.length) * 100;

  const handleCheck = (index: number) => {
    if (!checkedPoints.includes(index)) setCheckedPoints([...checkedPoints, index]);
  };

  return (
    <div style={appContainerStyle}>
      <div style={contentAreaStyle}>
        <div style={headerStyle}>
          <h1 style={{ fontSize: '24px', fontWeight: '900' }}>正在游玩</h1>
          <Settings size={20} color="#94a3b8" />
        </div>

        {!started ? (
          <div style={centerFlex}>
            <div style={iconCircle}><Footprints size={40} color="#3B82F6" /></div>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>准备好开启 CityWalk 吗？</p>
            <button onClick={() => setStarted(true)} style={primaryBtn}>开始路线</button>
          </div>
        ) : (
          <div style={{ padding: '0 25px' }}>
            <div style={progressCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                <span style={{ fontWeight: 'bold' }}>完成进度</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div style={progressBg}><motion.div animate={{ width: `${progress}%` }} style={progressFill} /></div>
            </div>

            <div style={listScroll}>
              {routePoints.map((p, i) => (
                <div key={i} onClick={() => handleCheck(i)} style={checkedPoints.includes(i) ? itemActive : itemInactive}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={18} color={checkedPoints.includes(i) ? "#10B981" : "#cbd5e1"} />
                    <span style={{ fontWeight: '600' }}>{p}</span>
                  </div>
                  {checkedPoints.includes(i) && <Check size={18} color="#10B981" />}
                </div>
              ))}
            </div>

            <div style={statsRow}>
              <div style={statBox}><Clock size={14} /> 45min</div>
              <div style={statBox}><Footprints size={14} /> 1.8km</div>
              <div style={statBox}><Flame size={14} /> 120kcal</div>
            </div>
            <button onClick={() => setFinished(true)} style={finishBtn}>结束路线并生成手账</button>
          </div>
        )}

        <AnimatePresence>
          {finished && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} style={journalOverlay}>
              <div style={journalPaper}>
                <h2 style={{ textAlign: 'center', fontWeight: '900' }}>CityWalk 手账</h2>
                <p style={{ marginTop: '20px', lineHeight: '2' }}>
                  📅 <b>{new Date().toLocaleDateString()}</b><br/>
                  今天我在梧桐区漫步了 <b>1.8公里</b>。<br/>
                  打卡了 <b>{checkedPoints.length}</b> 个地点，感受到了春天的气息。🌸
                </p>
                <button onClick={() => router.push('/')} style={primaryBtn}>保存手账</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部导航栏 */}
      <div style={bottomNavStyle}>
        <div onClick={() => router.push('/')} style={navInactive}><MapPin size={22} /><span>大观</span></div>
        <div onClick={() => router.push('/routes')} style={navInactive}><Compass size={22} /><span>路线</span></div>
        <div style={addBtnOuter}><div style={addBtnInner}>+</div></div>
        <div style={navActive}><Footprints size={22} /><span>游玩</span></div>
        <div onClick={() => router.push('/profile')} style={navInactive}><User size={22} /><span>我的</span></div>
      </div>
      <div style={iphoneNotch}></div>
    </div>
  );
}

// 游玩页样式修复
const appContainerStyle: React.CSSProperties = { width: "390px", height: "844px", margin: "0 auto", background: "#fff", borderRadius: "45px", position: "relative", border: "10px solid #1e293b", overflow: "hidden", display: "flex", flexDirection: "column" };
const contentAreaStyle: React.CSSProperties = { flex: 1, position: "relative", overflowY: "auto" };
const headerStyle: React.CSSProperties = { padding: '60px 25px 20px', display: 'flex', justifyContent: 'space-between' };
const centerFlex: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' };
const iconCircle: React.CSSProperties = { width: '80px', height: '80px', background: '#f0f9ff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' };
const primaryBtn: React.CSSProperties = { width: '200px', background: '#3B82F6', color: '#fff', border: 'none', padding: '15px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' };
const progressCard: React.CSSProperties = { background: '#f8fafc', padding: '20px', borderRadius: '20px', marginBottom: '20px' };
const progressBg: React.CSSProperties = { width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px' };
const progressFill: React.CSSProperties = { height: '100%', background: '#3B82F6', borderRadius: '4px' };
const listScroll: React.CSSProperties = { maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' };
const itemInactive: React.CSSProperties = { padding: '15px', borderRadius: '15px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', marginBottom: '10px', cursor: 'pointer' };
const itemActive: React.CSSProperties = { ...itemInactive, background: '#f0fdf4', borderColor: '#10B981' };
const statsRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' };
const statBox: React.CSSProperties = { fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' };
const finishBtn: React.CSSProperties = { ...primaryBtn, width: '100%', background: '#1e293b' };
const journalOverlay: React.CSSProperties = { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' };
const journalPaper: React.CSSProperties = { background: '#fff', width: '320px', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' };
const bottomNavStyle: React.CSSProperties = { width: "100%", height: "85px", background: "#fff", display: "flex", justifyContent: "space-around", alignItems: "center", paddingBottom: "15px", borderTop: "1px solid #f1f5f9" };
const navInactive: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#cbd5e1", fontSize: "10px", fontWeight: "700", cursor: "pointer" };
const navActive: React.CSSProperties = { ...navInactive, color: "#3B82F6" };
const addBtnOuter: React.CSSProperties = { position: "relative", width: "50px", height: "50px" };
const addBtnInner: React.CSSProperties = { position: "absolute", top: "-28px", left: "50%", transform: "translateX(-50%)", width: "54px", height: "54px", background: "#3B82F6", borderRadius: "50%", color: "#fff", fontSize: "28px", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #fff" };
const iphoneNotch: React.CSSProperties = { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "160px", height: "30px", background: "#1e293b", borderBottomLeftRadius: "18px", borderBottomRightRadius: "18px" };
