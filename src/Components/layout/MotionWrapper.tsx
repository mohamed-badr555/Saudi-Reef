'use client';

import { motion } from 'framer-motion';
import { useAppContext } from '@/Context/AppContext';
import { memo } from 'react';

interface MotionWrapperProps {
  children: React.ReactNode;
}

const MotionWrapper: React.FC<MotionWrapperProps> = memo(({ children }) => {
  const { isMobile, isSidebarOpen } = useAppContext();

  const variants = {
    open: { marginRight: isMobile ? 0 : '16rem' }, // 256px = w-64
    closed: { marginRight: isMobile ? 0 : '5rem' }, // 80px = w-20
  };

  return (
    <motion.div
      initial={false}
      animate={isSidebarOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative flex-1 flex flex-col pt-20"
    >
      {children}
    </motion.div>
  );
});

MotionWrapper.displayName = 'MotionWrapper';

export default MotionWrapper;
