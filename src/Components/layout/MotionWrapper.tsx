'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/Context/AppContext';
import { memo } from 'react';

interface MotionWrapperProps {
  children: React.ReactNode;
}

const MotionWrapper: React.FC<MotionWrapperProps> = memo(({ children }) => {
  const { isMobile, isSidebarOpen } = useAppContext();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        layout
        initial={false}
        animate={{
          marginRight: isMobile ? 0 : isSidebarOpen ? '16rem' : '5rem',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className="relative flex-1 flex flex-col pt-20"
        style={{
          willChange: 'margin',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});

MotionWrapper.displayName = 'MotionWrapper';

export default MotionWrapper;
