import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600",
        secondary: "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-700",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
        outline: "border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(clsx(baseStyles, variants[variant], className))}
            {...props}
        >
            {children}
        </motion.button>
    );
};
