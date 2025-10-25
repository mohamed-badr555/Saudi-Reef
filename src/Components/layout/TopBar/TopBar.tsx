'use client';

import { memo, useState } from 'react';
import { useAppContext } from '@/Context/AppContext';
import { MdMenu, MdSettings, MdNotifications, MdFullscreen, MdFullscreenExit } from 'react-icons/md';

interface TopBarProps {
  currentPage?: string;
  currentSection?: string;
}

const TopBar: React.FC<TopBarProps> = memo(() => {
  const { isMobile, isSidebarOpen, toggleSidebar } = useAppContext();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        // Silently handle fullscreen errors
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  return (
    <div
      className={`fixed top-0 min-h-16 border-b border-gray-700 transition-all duration-300 z-30 flex items-center justify-between px-2 sm:px-4 gap-2 sm:gap-4 py-2 ${
        isMobile
          ? 'left-0 right-0'
          : isSidebarOpen
          ? 'left-0 right-64'
          : 'left-0 right-20'
      }`}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.404) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(22, 163, 74, 0.1) 0%, transparent 50%),
          #0f172a
        `,
      }}
    >
      {/* Right Side - Mobile Menu Button & Welcome */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 min-w-0">
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 cursor-pointer rounded-lg hover:bg-green-400 transition-colors shrink-0"
          >
            <MdMenu className="w-6 h-6 text-white" />
          </button>
        )}
        
        {/* Full Screen button */}
        <button
          onClick={toggleFullscreen}
          className="p-2 cursor-pointer rounded-lg hover:bg-green-400 transition-colors shrink-0"
       
        >
          {isFullscreen ? (
            <MdFullscreenExit className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <MdFullscreen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          )}
        </button>

        {/* Welcome and Date */}
        <div className="block min-w-0 flex-1 text-right">
          <div className="text-xs sm:text-sm md:text-base lg:text-xl font-semibold text-white leading-tight">
           لوحة بيانات المشاريع
          </div>
        </div>
      </div>

      {/* Left Side - Icons */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Notifications Icon */}
        <button
          className="relative p-2 rounded-lg cursor-pointer hover:bg-green-400 transition-colors"
         
        >
          <MdNotifications className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          {/* Notification badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings Icon */}
        <button
          className="p-2 rounded-lg hover:bg-green-400 cursor-pointer transition-colors"
         
        >
          <MdSettings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>
    </div>
  );
});

TopBar.displayName = 'TopBar';

export default TopBar;