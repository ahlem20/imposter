import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { MessageSquare, ChevronRight, ChevronLeft, Clock } from 'lucide-react';

export const GamePhase = () => {
    const { players, turnIndex, submitDescription, descriptions, nextPhase, t, lang } = useGame();
    const [descInput, setDescInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const activePlayer = players[turnIndex];

    const handleSubmit = () => {
        if (descInput.trim()) {
            submitDescription(descInput);
            setDescInput('');
        }
    };

    const ArrowIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto py-8 px-4 h-full">
            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex justify-between items-center bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-indigo-500/5 transition-colors group-hover:bg-indigo-500/10" />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="text-5xl animate-bounce">{activePlayer.avatar}</div>
                        <div>
                            <h2 className="text-2xl font-black text-white leading-tight">
                                {t('itsTurn').replace('{name}', activePlayer.name)}
                            </h2>
                            <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">{t('speakAloud')}</p>
                        </div>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 px-5 py-2 rounded-2xl text-white font-black text-lg relative z-10 shadow-inner">
                        {turnIndex + 1} / {players.length}
                    </div>
                </div>

                <div className="flex justify-between items-center bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-red-500/5 transition-colors group-hover:bg-red-500/10" />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className={`p-3 rounded-2xl ${timeLeft < 10 ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gray-700 text-indigo-400'}`}>
                            <Clock size={24} />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                                {t('timerLabel')}
                            </h2>
                            <div className={`text-3xl font-black tabular-nums ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>
                                {timeLeft}{t('seconds')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 overflow-hidden">
                {/* Timeline of descriptions */}
                <div className="lg:col-span-2 flex flex-col h-full min-h-[400px] overflow-hidden">
                    <div className="bg-gray-800/40 rounded-[2rem] p-8 border border-gray-700/50 mb-6 flex-grow flex flex-col justify-end overflow-y-auto space-y-6">
                        <AnimatePresence>
                            {Object.entries(descriptions).map(([playerId, desc]) => {
                                const player = players.find(p => p.id === playerId);
                                if (!player) return null;

                                return (
                                    <motion.div
                                        key={playerId}
                                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="text-4xl bg-gray-700/30 w-16 h-16 flex items-center justify-center rounded-3xl border border-gray-600 shadow-md flex-shrink-0 transition-transform hover:scale-110">
                                            {player.avatar}
                                        </div>
                                        <div className="bg-gray-800 border-2 border-gray-700 py-4 px-6 rounded-3xl rounded-tl-none relative shadow-xl">
                                            <div className="text-sm font-black text-indigo-400 mb-1 flex items-center gap-2">
                                                {player.name}
                                            </div>
                                            <div className="text-white text-lg leading-relaxed italic">"{desc}"</div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Typing placeholder for current player */}
                        {players.length > turnIndex && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4">
                                <div className="text-4xl animate-pulse">{activePlayer.avatar}</div>
                                <div className="py-4 px-6 rounded-3xl bg-gray-800/50 text-gray-500 italic border border-gray-700 flex items-center gap-2 shadow-inner">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Action area */}
                <div className="lg:col-span-1 flex flex-col justify-center">
                    <Card className="p-8 border-2 border-indigo-500/50 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <MessageSquare className="text-indigo-400" /> {t('whatSay')}
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={descInput}
                                onChange={(e) => setDescInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                placeholder={t('descPlaceholder')}
                                className="w-full bg-gray-900 border-2 border-gray-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium shadow-inner"
                                autoFocus
                            />
                            <Button onClick={handleSubmit} disabled={!descInput.trim()} className="w-full py-5 text-xl font-black group">
                                {t('submitPass')}
                                <ArrowIcon className={lang === 'ar' ? 'mr-2' : 'ml-2'} size={24} />
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
