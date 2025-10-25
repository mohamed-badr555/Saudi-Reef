'use client';

import Sidebar from '../Sidebar/Sidebar';
import TopBar from '../TopBar/TopBar';
import { useAppContext } from '@/Context/AppContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  showStaticBar?: boolean;
  currentPage?: string;
  currentSection?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  showStaticBar = true,
  currentPage,
  currentSection,
}) => {
  const { isMobile, isSidebarOpen, setIsSidebarOpen } = useAppContext();
  const pathname = usePathname();

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isSidebarOpen]);

  // Determine current page based on pathname
  const getCurrentPage = () => {
    if (currentPage) return currentPage;

    const pageMap: { [key: string]: string } = {
      // Dashboards
      '/dashboard': 'dashboards',
      '/analytics': 'dashboards',
      
      // New Request
      '/new-request': 'new-request',
      
      // Projects (السجلات)
      '/projects-log': 'projects',
      '/risks-log': 'projects',
      
      // Schedules
      '/schedules': 'schedules',
      
      // Letters
      '/incoming-letters': 'letters',
      '/outgoing-letters': 'letters',
      
      // Quality
      '/quality-control': 'quality',
      '/quality-reports': 'quality',
      
      // Budget
      '/budget-planning': 'budget',
      '/budget-tracking': 'budget',
    };

    return pageMap[pathname] || 'dashboards';
  };

  const dynamicCurrentPage = getCurrentPage();

  return (
    <main className="min-h-screen overflow-x-hidden" style={{
      background: `
        radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(22, 163, 74, 0.08) 0%, transparent 50%),
        #0f172a
      `
    }}>
      {showStaticBar && (
        <>
          <Sidebar currentPage={dynamicCurrentPage} />
          <TopBar currentPage={dynamicCurrentPage} currentSection={currentSection} />
        </>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`transition-all duration-300 overflow-x-hidden ${
          isMobile ? 'pt-16' : isSidebarOpen ? 'mr-64 pt-16' : 'mr-20 pt-16'
        }`}
      >
        {children}
      </div>
    </main>
  );
};

export default PageWrapper;