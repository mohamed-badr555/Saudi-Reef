'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DonutChartProps {
  data: { name: string; value: number; percentage?: number }[];
  title: string;
  centerValue?: string | number;
  centerLabel?: string;
  height?: number;
  colors?: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  title,
  centerValue,
  centerLabel,
  height = 280,
  colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316'],
}) => {
  const series = data.map((item) => item.value);
  const labels = data.map((item) => item.name);

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'Noto Kufi Arabic, sans-serif',
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    labels,
    colors,
    legend: {
      position: 'bottom',
      fontSize: '12px',
      labels: {
        colors: colors,
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#10b981',
              offsetY: 5,
              formatter: () => centerValue?.toString() || series.reduce((a, b) => a + b, 0).toString(),
            },
            total: {
              show: true,
              label: centerLabel || '',
              fontSize: '14px',
              color: '#9ca3af',
              fontWeight: '400',
              formatter: () => centerValue?.toString() || series.reduce((a, b) => a + b, 0).toString(),
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        return val > 5 ? `${val.toFixed(1)}%` : '';
      },
      style: {
        fontSize: '11px',
        fontFamily: 'Noto Kufi Arabic, sans-serif',
        fontWeight: 'bold',
        colors: ['#fff'],
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.5,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#1f2937'],
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'Noto Kufi Arabic, sans-serif',
      },
      custom: function({ series, seriesIndex, w }) {
        const label = w.globals.labels[seriesIndex];
        const value = series[seriesIndex];
        const percentage = data[seriesIndex]?.percentage || ((value / series.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1);
        
        return `
          <div style="padding: 8px 12px; background: #1f2937; border-radius: 6px; border: 1px solid #374151;">
            <div style="display: flex; flex-direction: row-reverse; justify-content: flex-start; align-items: center; gap: 8px; white-space: nowrap;">
              <span style="color: #fff; font-weight: 500;">:${label}</span>
              <span style="color: #10b981; font-weight: bold;">(${percentage}%)</span>
            </div>
          </div>
        `;
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 250,
          },
          legend: {
            position: 'bottom',
            fontSize: '10px',
          },
        },
      },
    ],
  };

  return (
    <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-base sm:text-lg  font-semibold text-white mb-4 text-right">{title}</h3>
      <div className="w-full" dir="rtl">
        <Chart options={options} series={series} type="donut" height={height} />
      </div>
    </div>
  );
};

export default DonutChart;
