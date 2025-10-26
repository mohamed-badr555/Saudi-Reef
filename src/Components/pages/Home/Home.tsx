'use client';

import dynamic from 'next/dynamic';
import HomeContent from './HomeContent';

// Chart Loading Skeleton
const ChartSkeleton = () => (
  <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-40 mb-4"></div>
      <div className="h-64 bg-gray-700/50 rounded"></div>
    </div>
  </div>
);

// Dynamic imports for chart components
const DonutChart = dynamic(() => import('@/Components/ui/DonutChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
});

const HorizontalBarChart = dynamic(() => import('@/Components/ui/HorizontalBarChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
});

const GroupedBarChart = dynamic(() => import('@/Components/ui/GroupedBarChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
});

const ScatterChart = dynamic(() => import('@/Components/ui/ScatterChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
});

export default function HomePage() {
  return (
    <HomeContent
      DonutChart={DonutChart}
      HorizontalBarChart={HorizontalBarChart}
      GroupedBarChart={GroupedBarChart}
      ScatterChart={ScatterChart}
    />
  );
}