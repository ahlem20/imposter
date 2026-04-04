import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-gray-800 border border-gray-700 w-full max-w-md p-6 rounded-2xl shadow-2xl pointer-events-auto"
                        >
                            {title && (
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-100">{title}</h3>
                                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                        ✕
                                    </button>
                                </div>
                            )}
                            {children}
                        </motion.div>
                    </div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
};
