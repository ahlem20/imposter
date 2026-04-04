import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { AlertCircle, Target, Ghost, ChevronRight, ChevronLeft } from 'lucide-react';

export const Voting = () => {
    const { players, castVote, tallyVotes, t, lang } = useGame();

    const [voterIndex, setVoterIndex] = useState(0);
    const [selectedSuspectId, setSelectedSuspectId] = useState(null);

    const currentVoter = players[voterIndex];

    const handleVote = () => {
        if (selectedSuspectId) {
            castVote(currentVoter.id, selectedSuspectId);
            setSelectedSuspectId(null);

            if (voterIndex < players.length - 1) {
                setVoterIndex(prev => prev + 1);
            } else {
                tallyVotes();
            }
        }
    };

    const ArrowIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-10 px-4">
            {/* Header Info */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-red-900/30 border-2 border-red-500/50 p-8 rounded-[2rem] mb-12 w-full text-center flex flex-col items-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            >
                <div className="flex justify-center mb-6">
                    <AlertCircle size={64} className="text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,1)]" />
                </div>
                <h2 className="text-5xl font-black text-white mb-2 tracking-tighter">{t('huntOn')}</h2>
                <p className="text-red-400 font-bold uppercase tracking-[0.34em] text-xs">{t('voteOrVoted')}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
                {/* Current Voter Card */}
                <div className="flex flex-col items-center justify-center space-y-6">
                    <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <Target size={18} /> {t('currentVoter')}
                    </h3>
                    <div className="bg-gray-800 border-4 border-indigo-600 p-8 rounded-[3rem] w-full max-w-sm flex flex-col items-center text-center shadow-2xl relative group">
                        <div className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black absolute -top-3 shadow-lg">
                            {voterIndex + 1} / {players.length}
                        </div>
                        <div className="text-9xl mb-6 group-hover:scale-110 transition-transform duration-500">{currentVoter.avatar}</div>
                        <h3 className="text-4xl font-black text-white tracking-tight">{currentVoter.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm italic">{t('passTo')}</p>
                </div>

                {/* Selection Grid */}
                <div className="space-y-6">
                    <h3 className="text-red-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <Ghost size={18} /> {t('selectSuspect')}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {players.map(p => {
                            const isVoter = p.id === currentVoter.id;
                            const isSelected = p.id === selectedSuspectId;
                            return (
                                <button
                                    key={p.id}
                                    disabled={isVoter}
                                    onClick={() => setSelectedSuspectId(p.id)}
                                    className={`
                        p-6 rounded-[2rem] border-4 transition-all duration-300 flex flex-col items-center group relative
                        ${isVoter ? 'opacity-30 grayscale cursor-not-allowed scale-95' : 'hover:scale-[1.02] active:scale-95'}
                        ${isSelected ? 'bg-red-900/40 border-red-500 shadow-xl' : 'bg-gray-800 border-gray-700 hover:border-gray-600 shadow-xl'}
                      `}
                                >
                                    <div className="text-5xl mb-2 group-hover:rotate-12 transition-transform">{p.avatar}</div>
                                    <span className={`font-black text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}>{p.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    <Button onClick={handleVote} disabled={!selectedSuspectId} variant="danger" className="w-full py-6 text-2xl font-black mt-8 group shadow-2xl">
                        {t('lockVote')}
                        <ArrowIcon size={24} className={lang === 'ar' ? 'mr-2' : 'ml-2'} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
