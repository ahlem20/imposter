import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { categories } from '../data/mockData';
import { Plus, X, Play, Tag, Users, Languages, Ghost, Minus } from 'lucide-react';

export const Home = () => {
    const {
        players,
        addPlayer,
        removePlayer,
        selectedCategory,
        setSelectedCategory,
        impostersCount,
        setImpostersCount,
        startGame,
        lang,
        setLang,
        t
    } = useGame();

    const [nameInput, setNameInput] = useState('');

    const handleAddPlayer = () => {
        if (nameInput.trim()) {
            if (addPlayer(nameInput.trim())) {
                setNameInput('');
            } else {
                alert("Max players reached!");
            }
        }
    };

    const handleStart = () => {
        if (players.length >= 3) {
            startGame();
        }
    };

    // Max imposters allowed is 1/3 of players
    const maxImposters = Math.max(1, Math.floor(players.length / 3));

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-8 px-4 h-full">
            {/* Language Toggle */}
            <div className="w-full flex justify-end mb-4">
                <button
                    onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                    className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-indigo-400 font-bold hover:bg-gray-700 transition-colors"
                >
                    <Languages size={18} />
                    {lang === 'en' ? 'العربية' : 'English'}
                </button>
            </div>

            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-10"
            >
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 tracking-tight pb-2">
                    {t('title')}
                </h1>
                <p className="text-gray-400 text-lg uppercase tracking-widest text-sm font-bold">{t('subtitle')}</p>
            </motion.div>

            <div className="w-full space-y-8">
                {/* Category Selection */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold uppercase tracking-wider text-xs">
                        <Tag size={16} /> {t('selectCategory')}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.keys(categories).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`py-3 px-2 rounded-xl font-bold border-2 transition-all ${selectedCategory === cat
                                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                                    }`}
                            >
                                {t(cat.toLowerCase())}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Imposter Count Setting */}
                <section className="bg-gray-800/40 p-6 rounded-3xl border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider text-xs">
                            <Ghost size={16} /> {t('impostersCount')}
                        </div>
                        <div className="flex items-center gap-4 bg-gray-900 border border-gray-700 p-2 rounded-2xl">
                            <button
                                onClick={() => setImpostersCount(Math.max(1, impostersCount - 1))}
                                className="bg-gray-800 p-2 rounded-xl hover:text-red-400 disabled:opacity-30 disabled:hover:text-gray-400"
                                disabled={impostersCount <= 1}
                            >
                                <Minus size={20} />
                            </button>
                            <span className="text-2xl font-black text-white w-8 text-center">{impostersCount}</span>
                            <button
                                onClick={() => setImpostersCount(Math.min(maxImposters, impostersCount + 1))}
                                className="bg-gray-800 p-2 rounded-xl hover:text-indigo-400 disabled:opacity-30 disabled:hover:text-gray-400"
                                disabled={impostersCount >= maxImposters}
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs italic">
                        Max imposters for {players.length} players is {maxImposters}.
                    </p>
                </section>

                {/* Player Entry */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold uppercase tracking-wider text-xs">
                        <Users size={16} /> {t('playersList')} ({players.length})
                    </div>
                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
                            placeholder={t('enterName')}
                            className="flex-grow bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
                        />
                        <Button onClick={handleAddPlayer} className="px-5">
                            <Plus />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <AnimatePresence>
                            {players.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="flex items-center justify-between bg-gray-800 border border-gray-700 p-3 rounded-xl shadow-md"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{p.avatar}</span>
                                        <span className="font-bold text-gray-200 truncate max-w-[80px]">{p.name}</span>
                                    </div>
                                    <button
                                        onClick={() => removePlayer(p.id)}
                                        className="text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Start Button */}
                <div className="pt-8">
                    <Button
                        onClick={handleStart}
                        disabled={players.length < 3}
                        className="w-full py-5 text-xl font-black shadow-2xl group"
                    >
                        <Play className={`mr-2 group-hover:scale-110 transition-transform ${lang === 'ar' ? 'rotate-180 ml-2' : ''}`} fill="currentColor" />
                        {t('startRound')}
                    </Button>
                    {players.length < 3 && (
                        <p className="text-center text-gray-500 mt-4 text-sm italic">{t('minPlayersNeeded')}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
