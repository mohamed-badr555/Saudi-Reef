'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/Context/AppContext';
import {
  MdSettings,
  MdAssignment,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdAddCircleOutline,
  MdCalendarToday,
  MdEmail,
  MdStar,
  MdScale,
  MdMenuOpen,
} from 'react-icons/md';
import { CiMinimize1 } from 'react-icons/ci';

interface SidebarProps {
  currentPage?: string;
}

interface MenuItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  link?: string;
  subItems?: Array<{
    key: string;
    label: string;
    link: string;
  }>;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage = 'Dashboard' }) => {
  const { isMobile, isSidebarOpen: isOpen, toggleSidebar: onToggle } = useAppContext();
  const pathname = usePathname();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [focusedItem, setFocusedItem] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define menu structure 
  const menuItems: MenuItem[] = [
    {
      key: 'dashboards',
      label: 'لوحات البيانات',
      icon: MdSettings,
      subItems: [
        { key: 'dashboard', label: 'الرئيسية', link: '/dashboard' },
        { key: 'analytics', label: 'التحليلات', link: '/analytics' },
      ],
    },
    {
      key: 'new-request',
      label: 'تقديم طلب جديد',
      icon: MdAddCircleOutline,
      link: '/new-request',
    },
    {
      key: 'projects',
      label: 'السجلات',
      icon: MdAssignment,
      subItems: [
        { key: 'projects-log', label: 'سجل المشاريع', link: '/projects-log' },
        { key: 'risks-log', label: 'سجل المخاطر', link: '/risks-log' },
      ],
    },
    {
      key: 'schedules',
      label: 'الجداول الزمنية',
      icon: MdCalendarToday,
      link: '/schedules',
    },
    {
      key: 'letters',
      label: 'الخطابات والمراسلات',
      icon: MdEmail,
      subItems: [
        { key: 'incoming-letters', label: 'الخطابات الواردة', link: '/incoming-letters' },
        { key: 'outgoing-letters', label: 'الخطابات الصادرة', link: '/outgoing-letters' },
      ],
    },
    {
      key: 'quality',
      label: 'الجودة',
      icon: MdStar,
      subItems: [
        { key: 'quality-control', label: 'مراقبة الجودة', link: '/quality-control' },
        { key: 'quality-reports', label: 'تقارير الجودة', link: '/quality-reports' },
      ],
    },
    {
      key: 'budget',
      label: 'الميزانية',
      icon: MdScale,
      subItems: [
        { key: 'budget-planning', label: 'تخطيط الميزانية', link: '/budget-planning' },
        { key: 'budget-tracking', label: 'تتبع الميزانية', link: '/budget-tracking' },
      ],
    },
  ];

  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) => {
      if (prev.includes(key)) {
        return prev.filter((item) => item !== key);
      }
      return [key];
    });
  };

  const handleMouseEnter = (e: React.MouseEvent, itemKey: string) => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: rect.left,
    });
    setHoveredItem(itemKey);
  };

  const handleMouseLeave = () => {
    // Add delay before hiding to allow moving to tooltip
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 300);
  };

  const handleTooltipMouseEnter = () => {
    // Clear hide timeout when hovering tooltip
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    // Hide tooltip when leaving
    setHoveredItem(null);
  };

  // Auto-expand parent menus when subItem is active
  useEffect(() => {
    menuItems.forEach((item) => {
      const isSubItemActive = item.subItems?.some((subItem) => pathname === subItem.link) || false;
      if (isSubItemActive && !expandedItems.includes(item.key)) {
        setExpandedItems((prev) => [...prev, item.key]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <aside
      className={`transition-all duration-300 flex flex-col shadow-lg z-50 fixed top-0 h-screen ${
        isMobile 
          ? `w-64 ${isOpen ? 'right-0' : '-right-full'} left-auto` 
          : `${isOpen ? 'w-64' : 'w-20'} right-0`
      } overflow-y-auto overflow-x-visible`}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.404) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(22, 163, 74, 0.1) 0%, transparent 50%),
          #0f172a
        `,
        overflow: 'visible',
        transition: isMobile ? 'right 0.3s ease-in-out' : undefined,
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center p-0 border-b border-gray-700 relative">
        {isOpen || isMobile ? (
          <div className="flex flex-col items-center p-6 space-y-2">
            <Link href="/dashboard">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={200}
                height={200}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
              style={{
                height: '3.5rem',
                padding: '.5rem',
                width: 'auto',
              }}
            />
          </div>
        
        )}
      </div>

      {/* Toggle Button - Hide on mobile */}
      {!isMobile && (
        <button
          onClick={onToggle}
          className={`absolute cursor-pointer top-[7%] ${isOpen ? 'left-[-5%]' : 'left-[-15%]'} z-50 bg-green-500/80 hover:bg-green-600/80 text-white rounded-md p-1 transition-colors duration-200`}
        >
          {isOpen ? <CiMinimize1 className="w-4 h-4" /> : <MdMenuOpen className="w-4 h-4" />}
        </button>
      )}

      {/* Navigation */}
      <nav className="list-none relative p-4 m-0 pt-6 pb-4 space-y-2 flex-1 overflow-y-auto overflow-x-hidden" dir="rtl" >
        {menuItems.map((item, index) => {
          const label = item.label;
          const Icon = item.icon;

          const isSubItemActive = item.subItems?.some((subItem) => pathname === subItem.link) || false;
          const isActive = currentPage === item.key || isSubItemActive || pathname === item.link;

          return (
            <div key={index} >
              {item.link ? (
                // Direct link item
                <Link href={item.link} >
                  <div
                    className={`group relative flex items-center px-3 py-2 text-white cursor-pointer transition-all duration-200 rounded-lg ${
                      isActive
                        ? 'bg-gray-800 text-white'
                        : 'hover:bg-gray-800 focus:bg-gray-800'
                    } ${!isOpen && !isMobile ? 'justify-center' : ''}`}
                    onFocus={() => setFocusedItem(item.key)}
                    onBlur={() => setFocusedItem('')}
                    onMouseEnter={(e) => !isOpen && !isMobile && handleMouseEnter(e, item.key)}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={0}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    {(isOpen || isMobile) && <span className="mr-3 text-sm">{label}</span>}
                  </div>
                </Link>
              ) : (
                // Menu item with subItems
                <>
                  <div
                    onClick={() => item.subItems && toggleExpanded(item.key)}
                    className={`group relative flex items-center px-3 py-2 text-white cursor-pointer transition-all duration-200 rounded-lg ${
                      isActive || focusedItem === item.key
                        ? 'bg-gray-800 text-white'
                        : 'hover:bg-gray-800 focus:bg-gray-800'
                    } ${!isOpen && !isMobile ? 'justify-center' : 'justify-between'}`}
                    onFocus={() => setFocusedItem(item.key)}
                    onBlur={() => setFocusedItem('')}
                    onMouseEnter={(e) => !isOpen && !isMobile && handleMouseEnter(e, item.key)}
                    onMouseLeave={handleMouseLeave}
                    tabIndex={0}
                  >
                    <div className="flex items-center">
                      <Icon className="w-[18px] h-[18px]" />
                      {(isOpen || isMobile) && <span className="mr-3 text-sm">{label}</span>}
                    </div>
                    {(isOpen || isMobile) && item.subItems && (
                      <>
                        {expandedItems.includes(item.key) ? (
                          <MdKeyboardArrowUp className="w-4 h-4 ml-4" />
                        ) : (
                          <MdKeyboardArrowDown className="w-4 h-4 ml-4" />
                        )}
                      </>
                    )}
                  </div>

                  {/* Subnav Items */}
                  {(isOpen || isMobile) &&
                    item.subItems &&
                    expandedItems.includes(item.key) && (
                      <div className="list-none p-0 m-0 bg-primary-50 overflow-hidden transition-all duration-300">
                        {item.subItems.map((subItem, subIndex) => {
                          const subLabel = subItem.label;
                          const isSubActive = pathname === subItem.link;

                          return (
                            <Link key={subIndex} href={subItem.link}>
                              <div
                                className={`flex items-center py-2 px-6 pr-12 text-gray-300 text-sm transition-all duration-200 rounded-xl hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white my-2 ${
                                  isSubActive
                                    ? 'text-green-400 font-semibold'
                                    : ''
                                }`}
                              >
                                <span>{subLabel}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                </>
              )}
            </div>
          );
        })}
      </nav>

      {/* Tooltip Portal - Rendered outside nav to avoid clipping */}
      {hoveredItem && !isOpen && !isMobile && (
        <div
          className="fixed bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-9999 transition-opacity duration-200"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left - 4}px`,
            transform: 'translate(-100%, -50%)',
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {menuItems.find((item) => item.key === hoveredItem)?.subItems ? (
            <div className="flex flex-col space-y-1">
              {menuItems
                .find((item) => item.key === hoveredItem)
                ?.subItems?.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.link}
                    className="py-1 hover:text-green-300 transition-colors duration-150"
                  >
                    {subItem.label}
                  </Link>
                ))}
            </div>
          ) : (
            <Link
              href={menuItems.find((item) => item.key === hoveredItem)?.link || '#'}
              className="hover:text-green-300 transition-colors duration-150"
            >
              {menuItems.find((item) => item.key === hoveredItem)?.label}
            </Link>
          )}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;