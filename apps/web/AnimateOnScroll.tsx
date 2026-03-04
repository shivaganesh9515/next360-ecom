// @ts-nocheck
'use client'
import { motion } from 'framer-motion'

const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
}

export default function AnimateOnScroll({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
}) {
    return (
        <motion.div
            variants={variants[variant]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-60px' }}
            transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
