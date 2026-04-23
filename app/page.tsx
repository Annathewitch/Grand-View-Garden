"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const router = useRouter();
  useEffect(() => { setTimeout(() => router.push('/map'), 3000); }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#F8F7F2]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <h1 className="text-4xl font-serif text-gray-800 tracking-[0.5em]">大观园</h1>
        <p className="mt-4 text-xs tracking-widest text-gray-400 uppercase">Grand View Garden</p>
      </motion.div>
    </div>
  );
}
