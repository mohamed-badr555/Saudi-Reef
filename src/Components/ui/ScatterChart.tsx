'use client';

import { memo } from 'react';
import { ScatterChart as RechartsScatter, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ScatterChartProps {
  data: { x: number; y: number; size: number; label: string; color: string }[];
  title: string;
}

const CustomTooltip = memo(({ active, payload }: { active?: boolean; payload?: { payload: { x: number; y: number; label: string } }[] }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold mb-1">المشروع {data.label}</p>
        <p className="text-sm text-gray-300">الجودة: {data.x}</p>
        <p className="text-sm text-gray-300">الأداء: {data.y}</p>
      </div>
    );
  }
  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

const ScatterChart: React.FC<ScatterChartProps> = memo(({ data, title }) => {
  return (
    <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-right">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsScatter margin={{ top: 20, right: 40, bottom: 40, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            type="number"
            dataKey="x"
            name="الجودة"
            stroke="#9ca3af"
            domain={[0, 5]}
            ticks={[1, 2, 3, 4, 5]}
            label={{
              value: "الجودة",
              position: "insideBottom",
              offset: -10,
              style: {
                textAnchor: "middle",
                fill: "#ffffff",
                fontSize: 12,
                fontFamily: 'Noto Kufi Arabic',
              },
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="الأداء"
            stroke="#9ca3af"
            domain={[0, 5]}
            ticks={[1, 2, 3, 4, 5]}
            label={{
              value: "الأداء",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: {
                textAnchor: "middle",
                fill: "#ffffff",
                fontSize: 12,
                fontFamily: 'Noto Kufi Arabic',
              },
            }}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="المشاريع" data={data} shape="circle" isAnimationActive={false}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} radius={entry.size * 3} />
            ))}
          </Scatter>
        </RechartsScatter>
      </ResponsiveContainer>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return (
    prevProps.title === nextProps.title &&
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
  );
});

ScatterChart.displayName = 'ScatterChart';

export default ScatterChart;
