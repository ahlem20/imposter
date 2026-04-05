import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { Ghost, Trophy, RefreshCw, LogOut, ArrowRight } from 'lucide-react';

export const Result = () => {
    const { gameResult, imposterIds, players, word, resetGame, t } = useGame();
    const [autoReturnSeconds, setAutoReturnSeconds] = useState(20);

    useEffect(() => {
        const timer = setInterval(() => {
            setAutoReturnSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    resetGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [resetGame]);

    // Show all imposters
    const imposters = players.filter(p => imposterIds.includes(p.id));

    const playersWin = gameResult === 'players_win';

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center max-w-3xl mx-auto w-full py-10">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.6 }}
                className={`p-12 rounded-[3.5rem] w-full mb-12 shadow-2xl border-8 ${playersWin ? 'bg-indigo-900/40 border-indigo-500 shadow-indigo-500/20' : 'bg-red-900/40 border-red-500 shadow-red-500/20'
                    }`}
            >
                <div className="flex justify-center mb-8">
                    {playersWin ? (
                        <Trophy size={120} className="text-yellow-400" />
                    ) : (
                        <Ghost size={120} className="text-red-500" />
                    )}
                </div>

                <h1 className={`text-6xl md:text-7xl font-black mb-4 tracking-tighter ${playersWin ? 'text-indigo-300' : 'text-red-400'}`}>
                    {playersWin ? t('winners') : t('imposterWin')}
                </h1>

                <div className="text-2xl text-gray-300 mb-10 font-medium leading-relaxed">
                    {t('theImposterWas')}<br />
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {imposters.map(imposter => (
                            <span key={imposter.id} className="text-4xl font-black text-white bg-gray-900/50 px-6 py-2 rounded-2xl border border-white/10 tracking-tight">
                                {imposter?.avatar} {imposter?.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900/80 p-8 rounded-[2rem] border-2 border-gray-700/50 mx-auto inline-block shadow-inner">
                    <div className="text-indigo-400 text-sm font-black uppercase tracking-[0.3em] mb-4">{t('secretWordLabel')}</div>
                    <div className="text-5xl font-black text-white px-8 py-3 tracking-[0.15em] uppercase">{word}</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-lg space-y-6"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Button onClick={resetGame} className="py-6 text-2xl font-black shadow-xl group">
                        <RefreshCw className="mr-3 group-hover:rotate-180 transition-transform duration-700" />
                        {t('playAgain')}
                    </Button>
                    <Button variant="secondary" onClick={resetGame} className="py-6 text-2xl font-black group border-2 border-gray-700 bg-transparent hover:bg-gray-800">
                        <LogOut className="mr-3" />
                        {t('backToHome')}
                    </Button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-500 font-bold uppercase tracking-widest text-sm bg-gray-800/30 py-3 rounded-2xl border border-gray-700/30">
                    <span>{t('returningToHome').replace('{seconds}', autoReturnSeconds)}</span>
                    <ArrowRight size={16} className="animate-bounce" />
                </div>
            </motion.div>
        </div>
    );
};
