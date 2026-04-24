"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Footprints, Clock, Flame, Play, Check, Compass, User, Settings } from "lucide-react";

export default function WalkingPage() {
  // --- 逻辑状态 ---
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checkedPoints, setCheckedPoints] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [journals, setJournals] = useState<string[]>([]);

  const routePoints = ["武康大楼", "老洋房", "梧桐街", "Manner Coffee"];

  // 逻辑函数
  const handleCheck = (index: number) => {
    if (!checkedPoints.includes(index)) {
      setCheckedPoints([...checkedPoints, index]);
      setProgress(Math.min(((checkedPoints.length + 1) / routePoints.length) * 100, 100));
    }
  };

  const handleFinish = () => {
    setFinished(true);
    setJournals([`手账 - ${new Date().toLocaleDateString()}`, ...journals]);
  };

  const resetAll = () => {
    setStarted(false);
    setFinished(false);
    setProgress(0);
    setCheckedPoints([]);
  };

  return (
    <div style={appContainerStyle}>
      <div style={contentAreaStyle}>
        
        {/* 顶部标题栏 */}
        <div style={{ padding: '60px 25px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>正在游玩</h1>
          <Settings size={20} color="#94a3b8" />
        </div>

        {/* 场景 1：未开始状态 */}
        {!started && (
          <div style={centerFlexColumn}>
            <div style={iconCircle}><Footprints size={40} color="#3B82F6" /></div>
            <p style={{ color: '#94a3b8', marginBottom: '25px', fontSize: '14px' }}>准备好开启今天的 CityWalk 吗？</p>
            <button onClick={() => setStarted(true)} style={primaryBtnStyle}>
              <Play size={16} fill="white" /> 开始路线
            </button>

            {/* 历史手账展示 */}
            {journals.length > 0 && (
              <div style={{ width: '100%', marginTop: '40px', padding: '0 25px' }}>
                <h3 style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>过往手账</h3>
                {journals.map((j, i) => (
                  <div key={i} style={journalItemStyle}>{j}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 场景 2：游玩进行中 */}
        {started && !finished && (
          <div style={{ padding: '0 25px' }}>
            {/* 进度条卡片 */}
            <div style={cardBase}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>当前进度</span>
                <span style={{ fontSize: '12px', color: '#3B82F6' }}>{Math.round(progress)}%</span>
              </div>
              <div style={progressBg}>
                <motion.div style={progressFill} animate={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* 打卡地点列表 */}
            <div style={{ marginTop: '20px', height: '350px', overflowY: 'auto', paddingBottom: '20px' }}>
              {routePoints.map((point, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCheck(index)}
                  style={checkedPoints.includes(index) ? pointCardActive : pointCardInactive}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={18} color={checkedPoints.includes(index) ? "#10B981" : "#94a3b8"} />
                    <span style={{ fontWeight: '600', fontSize: '15px' }}>{point}</span>
                  </div>
                  {checkedPoints.includes(index) && <Check size={18} color="#10B981" />}
                </motion.div>
              ))}
            </div>

            {/* 底部实时数据 */}
            <div style={statsRow}>
              <div style={statBox}><Clock size={14} /> 1.2h</div>
              <div style={statBox}><Footprints size={14} /> 3.2km</div>
              <div style={statBox}><Flame size={14} /> {Math.round(progress * 5)} kcal</div>
            </div>

            <button onClick={handleFinish} style={finishBtnStyle}>结束路线</button>
          </div>
        )}

        {/* 场景 3：结算手账弹出层 */}
        <AnimatePresence>
          {finished && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              style={journalOverlay}
            >
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ width: '40px', height: '4px', background: '#e2e8f0', borderRadius: '2px', margin: '0 auto 20px' }} />
                <h2 style={{ fontSize: '20px', fontWeight: '900' }}>CityWalk 手账已生成</h2>
              </div>
              
              <div style={journalPaper}>
                <p style={{ lineHeight: '1.8', color: '#475569', fontSize: '14px' }}>
                  📅 <b>{new Date().toLocaleDateString()}</b><br/>
                  今天在梧桐区漫步了 <b>3.2公里</b>，<br/>
                  一共打卡了 <b>{checkedPoints.length}</b> 个宝藏地点。<br/>
                  最高的成就感来自于：{routePoints[checkedPoints[0]] || "启程"}。
                </p>
              </div>

              <button onClick={resetAll} style={primaryBtnStyle}>保存并返回</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部导航栏 */}
      <div style={bottomNavStyle}>
        <div onClick={() => window.location.href='/'} style={navInactive}><MapPin size={22} /><span>大观</span></div>
        <div onClick={() => window.location.href='/routes'} style={navInactive}><Compass size={22} /><span>路线</span></div>
        <div style={addBtnOuter}><div style={addBtnInner}>+</div></div>
        <div style={navActive}><Footprints size={22} /><span>游玩</span></div>
        <div onClick={() => window.location.href='/profile'} style={navInactive}><User size={22} /><span>我的</span></div>
      </div>

      <div style={iphoneNotch}></div>
    </div>
  );
}

// ================= 样式表 (严格适配首页 UI) =================

const appContainerStyle: React.CSSProperties = { width: "390px", height: "844px", margin: "20px auto", background: "#F8FAFC", borderRadius: "45px", position: "relative", border: "10px solid #1e293b", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)" };
const contentAreaStyle: React.CSSProperties = { width: "100%", height: "100%", position: "relative" };

const centerFlexColumn: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', padding: '0 40px', textAlign: 'center' };
const iconCircle: React.CSSProperties = { width: '80px', height: '80px', background: '#EFF6FF', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' };

const primaryBtnStyle: React.CSSProperties = { width: '100%', background: '#3B82F6', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' };
const finishBtnStyle: React.CSSProperties = { ...primaryBtnStyle, background: '#1e293b', marginTop: '20px' };

const cardBase: React.CSSProperties = { background: '#fff', padding: '20px', borderRadius: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' };
const progressBg: React.CSSProperties = { width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' };
const progressFill: React.CSSProperties = { height: '100%', background: '#3B82F6' };

const pointCardInactive: React.CSSProperties = { background: '#fff', padding: '16px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', border: '1px solid #f1f5f9', cursor: 'pointer', transition: 'all 0.2s' };
const pointCardActive: React.CSSProperties = { ...pointCardInactive, background: '#ECFDF5', borderColor: '#10B981' };

const statsRow: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', marginTop: '20px', background: '#fff', padding: '15px', borderRadius: '16px' };
const statBox: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', fontWeight: '600' };

const journalOverlay: React.CSSProperties = { position: 'absolute', inset: 0, background: '#fff', zIndex: 300, padding: '60px 25px' };
const journalPaper: React.CSSProperties = { background: '#F8FAFC', padding: '25px', borderRadius: '24px', border: '1px dashed #cbd5e1', marginBottom: '40px' };
const journalItemStyle: React.CSSProperties = { background: '#fff', padding: '12px 15px', borderRadius: '12px', fontSize: '13px', color: '#64748b', marginBottom: '8px', border: '1px solid #f1f5f9' };

const bottomNavStyle: React.CSSProperties = { position: "absolute", bottom: 0, width: "100%", height: "85px", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", display: "flex", justifyContent: "space-around", alignItems: "center", paddingBottom: "15px", borderTop: "1px solid #f1f5f9", zIndex: 200 };
const navInactive: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: "#cbd5e1", fontSize: "10px", fontWeight: "700", cursor: "pointer" };
const navActive: React.CSSProperties = { ...navInactive, color: "#3B82F6" };
const addBtnOuter: React.CSSProperties = { position: "relative", width: "50px", height: "50px" };
const addBtnInner: React.CSSProperties = { position: "absolute", top: "-28px", left: "50%", transform: "translateX(-50%)", width: "54px", height: "54px", background: "#3B82F6", borderRadius: "50%", color: "#fff", fontSize: "28px", display: "flex", justifyContent: "center", alignItems: "center", border: "5px solid #fff", boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" };
const iphoneNotch: React.CSSProperties = { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "160px", height: "30px", background: "#1e293b", borderBottomLeftRadius: "18px", borderBottomRightRadius: "18px", zIndex: 1000 };
