import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export function FocusTimer() {
  const INITIAL_TIME = 45 * 60; // 45 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(INITIAL_TIME);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isWarning = timeLeft <= 5 * 60 && timeLeft > 0;
  const isCritical = timeLeft <= 1 * 60 && timeLeft > 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
          <Timer size={24} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Technical Interview Simulator</h3>
          <p className="text-sm text-slate-500">45-minute focus session for practice</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className={`text-4xl font-mono tracking-tight font-bold ${
          isCritical ? 'text-red-500 animate-pulse' : 
          isWarning ? 'text-amber-500' : 
          isActive ? 'text-blue-600' : 'text-slate-700'
        }`}>
          {timeString}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTimer}
            className={`p-3 rounded-full transition-colors ${
              isActive 
                ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            title={isActive ? "Pause" : "Start"}
          >
            {isActive ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
          </button>
          
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            title="Reset"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
