import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { PlayerList } from '../components/PlayerList';
import { Play, Copy } from 'lucide-react';

export const Lobby = () => {
    const navigate = useNavigate();
    const { roomCode, players, currentPlayerId, isHost, startGame } = useGame();

    const handleStart = () => {
        if (startGame()) {
            navigate('/role');
        } else {
            alert("Need at least 3 players to start!");
        }
    };

    const copyRoomCode = () => {
        navigator.clipboard.writeText(roomCode);
        // Could add a toast here
    };

    if (!roomCode) {
        return <div className="text-white mt-20">No room joined. <button onClick={() => navigate('/')} className="text-indigo-400">Go Home</button></div>;
    }

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto py-10 px-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gray-800 rounded-2xl p-6 mb-10 text-center w-full shadow-lg border border-gray-700"
            >
                <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2">Room Code</h2>
                <div className="flex items-center justify-center gap-4">
                    <span className="text-5xl font-mono font-bold tracking-widest text-white">{roomCode}</span>
                    <button onClick={copyRoomCode} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors text-gray-300">
                        <Copy size={24} />
                    </button>
                </div>
            </motion.div>

            <div className="w-full mb-10">
                <div className="flex justify-between items-end mb-6 border-b border-gray-700 pb-2">
                    <h2 className="text-2xl font-bold text-gray-100">Players ({players.length})</h2>
                    {players.length < 3 && <span className="text-yellow-500 text-sm">Need {3 - players.length} more...</span>}
                </div>

                <PlayerList players={players} currentPlayerId={currentPlayerId} />
            </div>

            {isHost ? (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="w-full max-w-sm">
                    <Button onClick={handleStart} className="w-full py-4 text-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] disabled:shadow-none" disabled={players.length < 3}>
                        <Play className="mr-2" />
                        Start Game
                    </Button>
                </motion.div>
            ) : (
                <div className="text-gray-400 flex items-center gap-3 bg-gray-800/50 px-6 py-4 rounded-xl border border-gray-700/50">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                    Waiting for host to start...
                </div>
            )}
        </div>
    );
};
