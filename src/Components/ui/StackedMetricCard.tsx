'use client';

interface StackedMetricCardProps {
  title: string;
  metrics: {
    label: string;
    value: number;
    color: string;
  }[];
}

const StackedMetricCard: React.FC<StackedMetricCardProps> = ({ title, metrics }) => {
  const total = metrics.reduce((sum, metric) => sum + metric.value, 0);

  return (
    <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-right">{title}</h3>
      
      <div className="border-2 border-white rounded-lg overflow-hidden">
        {/* Main Display - Top Metric */}
        <div 
          className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] transition-all duration-300"
          style={{ backgroundColor: metrics[0]?.color || '#3b82f6' }}
        >
          <div className="text-sm sm:text-base font-medium text-white/90 mb-1">
            {metrics[0]?.label}
          </div>
          <div className="text-4xl sm:text-5xl font-bold text-white">
            {metrics[0]?.value}
          </div>
        </div>

        {/* Bottom Metrics Grid */}
        <div className="grid grid-cols-2">
          {metrics.slice(1).map((metric, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[90px] transition-all duration-300 hover:brightness-110"
              style={{ 
                backgroundColor: metric.color,
                borderRight: idx === 0 ? '1px solid white' : 'none'
              }}
            >
              <div className="text-xs sm:text-sm font-medium text-white/90 mb-1 text-center">
                {metric.label}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackedMetricCard;
