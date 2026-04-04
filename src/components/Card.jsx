import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className={twMerge(clsx(
                "bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl",
                className
            ))}
        >
            {children}
        </motion.div>
    );
};
