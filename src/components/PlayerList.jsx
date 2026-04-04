import React from 'react';
import { motion } from 'framer-motion';

export const PlayerList = ({ players, currentPlayerId, activePlayerId = null, onPlayerClick = null, selectable = false }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {players.map((player, idx) => {
                const isMe = player.id === currentPlayerId;
                const isActive = player.id === activePlayerId;

                return (
                    <motion.div
                        key={player.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => selectable && onPlayerClick && onPlayerClick(player)}
                        className={`
              flex flex-col items-center p-4 rounded-xl transition-all
              ${selectable ? 'cursor-pointer hover:bg-gray-700' : ''}
              ${isActive ? 'bg-indigo-900/50 border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-gray-800 border border-gray-700'}
            `}
                    >
                        <div className="text-4xl mb-2">{player.avatar}</div>
                        <div className="font-medium text-gray-200">
                            {player.name} {isMe && <span className="text-indigo-400 text-sm">(You)</span>}
                        </div>
                        {player.isHost && (
                            <div className="text-xs text-yellow-500 mt-1 uppercase font-bold tracking-wider">Host</div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};
