import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { Ghost, Eye, User, ChevronRight, ChevronLeft } from 'lucide-react';

export const RoleReveal = () => {
    const { players, imposterIds, word, nextPhase, t, lang } = useGame();
    const [playerIndex, setPlayerIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const currentPlayer = players[playerIndex];
    const isImposter = imposterIds.includes(currentPlayer.id);

    const handleNextPlayer = () => {
        setRevealed(false);
        if (playerIndex < players.length - 1) {
            setPlayerIndex(prev => prev + 1);
        } else {
            nextPhase();
        }
    };

    const ArrowIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 w-full max-w-xl mx-auto">
            <div className="text-center mb-8 bg-gray-800/50 p-4 rounded-3xl border border-gray-700/50 w-full flex items-center justify-between">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Player Review</span>
                <span className="bg-indigo-600 px-3 py-1 rounded-full text-white font-black text-xs">{playerIndex + 1} / {players.length}</span>
            </div>

            <AnimatePresence mode="wait">
                {!revealed ? (
                    <motion.div
                        key="hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                        className="flex flex-col items-center text-center w-full"
                    >
                        <div className="mb-8 p-12 bg-gray-800 rounded-3xl border-2 border-gray-700 shadow-2xl relative overflow-hidden group w-full">
                            <div className="text-8xl mb-4 group-hover:scale-110 transition-transform duration-500">{currentPlayer.avatar}</div>
                            <h2 className="text-4xl font-black text-white tracking-tight">{currentPlayer.name}</h2>
                            <p className="text-indigo-400 mt-2 font-bold uppercase tracking-widest text-xs">{t('passTo')}</p>
                        </div>

                        <Button onClick={() => setRevealed(true)} className="py-5 px-12 text-2xl w-full">
                            {t('revealRole')}
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="revealed"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center text-center w-full"
                    >
                        {isImposter ? (
                            <div className="bg-red-900/30 border-2 border-red-500/50 p-12 rounded-[2rem] w-full shadow-[0_0_80px_rgba(239,68,68,0.3)]">
                                <Ghost size={100} className="text-red-500 mx-auto mb-6" />
                                <h2 className="text-5xl font-black text-red-500 mb-4 tracking-tighter">{t('roleImposter')}</h2>
                                <div className="h-1 w-20 bg-red-500/50 mx-auto mb-6 rounded-full" />
                                <p className="text-xl text-red-100 font-medium leading-relaxed">{t('imposterDesc')}</p>
                            </div>
                        ) : (
                            <div className="bg-indigo-900/30 border-2 border-indigo-500/50 p-12 rounded-[2rem] w-full shadow-[0_0_80px_rgba(99,102,241,0.3)]">
                                <div className="text-8xl mb-6 flex justify-center">🎯</div>
                                <h2 className="text-2xl font-bold text-indigo-300 mb-2 uppercase tracking-widest">{t('secretWordLabel')}</h2>
                                <div className="h-1 w-20 bg-indigo-500/50 mx-auto mb-8 rounded-full" />
                                <div className="bg-gray-900/80 border border-indigo-500/30 py-6 px-10 rounded-2xl text-4xl font-black text-white tracking-[0.2em] uppercase">
                                    {word}
                                </div>
                            </div>
                        )}

                        <Button onClick={handleNextPlayer} variant="secondary" className="mt-12 w-full py-5 text-xl font-bold group">
                            {t('nextPlayer')}
                            <ArrowIcon size={24} className={lang === 'ar' ? 'mr-2 ml-0' : 'ml-2'} />
                        </Button>
                        <p className="mt-4 text-gray-500 text-sm">{t('dontShow')}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
