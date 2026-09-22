import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, Lock, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1313') {
      onLogin();
      onClose();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#16161E] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-purple-600/10 border-b border-white/5 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/20">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">관리자 로그인</h3>
                  <p className="text-xs text-purple-300/70">CMS 콘솔 접속을 위해 암호를 입력하세요.</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">관리자 비밀번호</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 ${error ? 'text-red-400' : 'text-slate-500'}`} />
                    </div>
                    <input
                      autoFocus
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError(false);
                      }}
                      placeholder="비밀번호 입력"
                      className={`w-full bg-white/5 border ${error ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-purple-500/50'} rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 outline-none transition-all`}
                    />
                  </div>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-400 text-xs mt-2 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      비밀번호가 일치하지 않습니다. 다시 입력해 주세요.
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-xl shadow-purple-600/20 active:scale-95"
                >
                  로그인하기
                </button>
              </form>
            </div>
            
            <div className="bg-white/5 p-4 text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Authorized Personnel Only</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
