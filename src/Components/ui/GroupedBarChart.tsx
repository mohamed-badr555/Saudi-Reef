'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GroupedBarChartProps {
  data: Record<string, string | number>[];
  title: string;
  dataKeys: string[];
  colors?: string[];
  xKey?: string;
}

const CustomTooltip = memo(({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold mb-2 text-right">{label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} className="text-sm text-right" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

const GroupedBarChart: React.FC<GroupedBarChartProps> = memo(({
  data,
  title,
  dataKeys,
  colors = ['#10b981', '#3b82f6', '#f59e0b'],
  xKey = 'month',
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 430;
    }
    return false;
  });

  const checkScreenSize = useCallback(() => {
    setIsSmallScreen(window.innerWidth < 430);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [checkScreenSize]);

  return (
    <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-right">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
          barSize={35}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey={xKey}
            tick={{
              fill: "#ffffff",
              fontSize: 8,
              fontWeight: 600,
              fontFamily: 'Noto Kufi Arabic',
            }}
            angle={-20}
            textAnchor="end"
            height={50}
            axisLine={{ stroke: '#374151' }}
            tickLine={false}
            interval={0}
            dy={3}
          />
          <YAxis
            tick={{ fill: "#ffffff", fontSize: 8 }}
            label={{
              value: "العدد",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: {
                textAnchor: "middle",
                fill: "#ffffff",
                fontSize: 9,
                fontFamily: 'Noto Kufi Arabic',
              },
            }}
            axisLine={false}
            tickLine={false}
            dx={-5}
            width={35}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(55, 65, 81, 0.3)' }} />
          <Legend
            wrapperStyle={{ 
              fontSize: '12px', 
              fontFamily: 'Noto Kufi Arabic', 
              marginTop: isSmallScreen ? '-50px' : '-15px' 
            }}
            iconType="square"
            iconSize={0}
          />
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return (
    prevProps.title === nextProps.title &&
    prevProps.xKey === nextProps.xKey &&
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.dataKeys) === JSON.stringify(nextProps.dataKeys) &&
    JSON.stringify(prevProps.colors) === JSON.stringify(nextProps.colors)
  );
});

GroupedBarChart.displayName = 'GroupedBarChart';

export default GroupedBarChart;
