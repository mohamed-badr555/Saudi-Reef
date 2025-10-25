'use client';

import { memo } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  icon?: React.ReactNode;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = memo(({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = 'green',
}) => {
  const colorClasses = {
    green: 'from-green-500/20 to-green-600/10 border-green-500/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    red: 'from-red-500/20 to-red-600/10 border-red-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  };

  return (
    <div
      className={`bg-linear-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.green} backdrop-blur-sm rounded-xl p-4 sm:p-6 border shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-right flex-1">
          <p className="text-xs sm:text-sm text-gray-300 mb-1">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="text-white opacity-60 mr-3">{icon}</div>}
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className={`text-xs ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {trend} من الشهر الماضي
          </p>
        </div>
      )}
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

export default MetricCard;
