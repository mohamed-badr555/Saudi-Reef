'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

interface HorizontalBarChartProps {
  data: Record<string, string | number>[];
  title: string;
  dataKeys: string[];
  colors?: string[];
  nameKey?: string;
}

const CustomTooltip = ({ active, payload, nameKey }: { active?: boolean; payload?: { name: string; value: number; color: string; payload: Record<string, string | number> }[]; nameKey: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold mb-2 text-right">{payload[0].payload[nameKey]}</p>
        {payload.map((entry, index: number) => (
          <p key={index} className="text-sm text-right" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title,
  dataKeys,
  colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
  nameKey = 'region',
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 430);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-right">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            type="number"
            tick={{
              fill: "#ffffff",
              fontSize: 7,
              fontWeight: 600,
            }}
            axisLine={{ stroke: '#374151' }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey={nameKey}
            tick={{ fill: "#ffffff", fontSize: 7, fontFamily: 'Noto Kufi Arabic' }}
            width={120}
            interval={0}
            label={{
              value: "المنطقة",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: {
                textAnchor: "middle",
                fill: "#ffffff",
                fontSize: 10,
                fontFamily: 'Noto Kufi Arabic',
              },
            }}
            axisLine={false}
            tickLine={false}
            orientation="left"
            dx={-50}
          />
          <Tooltip content={<CustomTooltip nameKey={nameKey} />} cursor={{ fill: 'rgba(55, 65, 81, 0.3)' }} />
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
              stackId="a"
              fill={colors[index % colors.length]}
              radius={[4, 4, 4, 4]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart;
