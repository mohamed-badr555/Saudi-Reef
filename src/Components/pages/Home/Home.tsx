'use client';

import DonutChart from '@/Components/ui/DonutChart';
import HorizontalBarChart from '@/Components/ui/HorizontalBarChart';
import GroupedBarChart from '@/Components/ui/GroupedBarChart';
import ScatterChart from '@/Components/ui/ScatterChart';
import DataTable from '@/Components/ui/DataTable';
import MetricCard from '@/Components/ui/MetricCard';
import StackedMetricCard from '@/Components/ui/StackedMetricCard';
import dashboardData from '@/data/dashboardData.json';
import { MdTrendingUp, MdCheckCircle, MdAccessTime, MdWarning } from 'react-icons/md';

const HomePage = () => {
  // Risk Management Table Columns
  const riskColumns = [
    { key: 'project', label: 'المشروع' },
    { key: 'risk', label: 'المخاطرة' },
    {
      key: 'level',
      label: 'المستوى',
      render: (value: string | number) => {
        const colors = { 'عالي': 'text-red-400', 'متوسط': 'text-yellow-400', 'منخفض': 'text-green-400' };
        return <span className={colors[value as keyof typeof colors] || 'text-gray-400'}>{value}</span>;
      },
    },
    { key: 'status', label: 'الحالة' },
  ];

  // Violating Projects Table Columns
  const violatingColumns = [
    { key: 'project', label: 'المشروع' },
    {
      key: 'deviation',
      label: 'الانحراف',
      render: (value: string | number) => {
        const val = value.toString();
        const color = val.startsWith('-') ? 'text-red-400' : 'text-green-400';
        return <span className={color}>{val}</span>;
      },
    },
    {
      key: 'impact',
      label: 'التأثير',
      render: (value: string | number) => {
        const colors = { 'عالي': 'text-red-400', 'متوسط': 'text-yellow-400', 'منخفض': 'text-green-400' };
        return <span className={colors[value as keyof typeof colors] || 'text-gray-400'}>{value}</span>;
      },
    },
  ];

  // Project Stats Table Columns
  const statsColumns = [
    { key: 'metric', label: 'المقياس' },
    { key: 'value', label: 'القيمة' },
    {
      key: 'trend',
      label: 'الاتجاه',
      render: (value: string | number) => {
        const val = value.toString();
        const color = val.startsWith('+') ? 'text-green-400' : 'text-red-400';
        return <span className={color}>{val}</span>;
      },
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="إجمالي المشاريع"
          value="350"
          trend="+5%"
          icon={<MdTrendingUp className="w-8 h-8" />}
          color="green"
        />
        <MetricCard
          title="المشاريع النشطة"
          value="156"
          trend="+12%"
          icon={<MdAccessTime className="w-8 h-8" />}
          color="blue"
        />
        <MetricCard
          title="المشاريع المكتملة"
          value="194"
          trend="+8%"
          icon={<MdCheckCircle className="w-8 h-8" />}
          color="purple"
        />
        <MetricCard
          title="نسبة الإنجاز"
          value="78%"
          trend="+3%"
          icon={<MdWarning className="w-8 h-8" />}
          color="yellow"
        />
      </div>

      {/* Top Row - 4 Donut Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <DonutChart
          data={dashboardData.projectTypes}
          title="توزيع أنواع المشاريع"
          centerValue="107"
          centerLabel="مشروع"
          height={280}
        />
        <DonutChart
          data={dashboardData.projectPhases}
          title="توزيع مراحل المشاريع"
          centerValue="107"
          centerLabel="مرحلة"
          height={280}
        />
        <DonutChart
          data={dashboardData.projectRegions}
          title="توزيع أنواع المشاريع"
          centerValue="107"
          centerLabel="منطقة"
          height={280}
        />
        <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-right">الخط الزمني للبرامج</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">نسبة الإنجاز للبرامج</span>
              <span className="text-green-400 font-bold">28%</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mt-6">
              {dashboardData.programTimeline.years.map((year, idx) => (
                <div key={year} className="bg-gray-800/50 rounded-lg p-2">
                  <div className="text-xs text-gray-400">{year}</div>
                  <div className="text-sm font-bold text-white mt-1">{dashboardData.programTimeline.actual[idx] || '-'}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row - Bar Chart + Stacked Metric Card */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <HorizontalBarChart
          data={dashboardData.geographicDistribution}
          title="التوزيع الجغرافي للمشاريع"
          dataKeys={['مبني', 'قيد الإنشاء', 'مخطط', 'متوقف']}
          colors={['#10b981', '#3b82f6', '#f59e0b', '#ef4444']}
          nameKey="region"
        />
        
        <StackedMetricCard
          title="إحصائيات وبرامج المشاريع"
          metrics={[
            { label: 'منتظم', value: 86, color: '#3b82f6' },
            { label: 'متأخر', value: 13, color: '#f59e0b' },
            { label: 'متوقف', value: 6, color: '#a855f7' },
          ]}
        />
      </div>

      {/* Quality & Compliance Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <DonutChart
          data={dashboardData.qualityClassifications.data}
          title="تصنيفات الجودة"
          centerValue={dashboardData.qualityClassifications.total}
          centerLabel="تصنيف"
          height={300}
        />
        <DonutChart
          data={dashboardData.complianceMetrics.data}
          title="مقاييس الامتثال"
          centerValue={dashboardData.complianceMetrics.total}
          centerLabel="مقياس"
          height={300}
        />
      </div>

      {/* Staff Timeline */}
      <div className="mb-6">
        <GroupedBarChart
          data={dashboardData.staffTimeline}
          title="الخط الزمني لأعداد الموظفين في البرامج"
          dataKeys={['المهندسون', 'الفنيون', 'الإداريون']}
          colors={['#10b981', '#3b82f6', '#f59e0b']}
          xKey="month"
        />
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <DataTable
          title="إدارة المخاطر"
          columns={riskColumns}
          data={dashboardData.riskManagement}
          maxHeight="300px"
        />

        <DataTable
          title="أعلى مشاريع مخالفة للخطة"
          columns={violatingColumns}
          data={dashboardData.violatingProjects}
          maxHeight="300px"
        />
      </div>

      {/* Last Row - Scatter + Stats Table + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <ScatterChart
          data={dashboardData.projectScatter}
          title="إحصائيات وتجميع المشاريع"
        />

        <DataTable
          title="إحصائيات المشاريع"
          columns={statsColumns}
          data={dashboardData.projectStats}
          maxHeight="300px"
        />

        <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 text-right">حالة المشاريع</h3>
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-green-400">{dashboardData.projectStatus.regular}%</div>
              <div className="text-sm text-gray-400 mt-2">منتظم</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-8 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${dashboardData.projectStatus.regular}%` }}
                  ></div>
                </div>
                <span className="text-sm text-white w-12 text-right">{dashboardData.projectStatus.regular}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-8 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${dashboardData.projectStatus.late}%` }}
                  ></div>
                </div>
                <span className="text-sm text-white w-12 text-right">{dashboardData.projectStatus.late}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-8 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 transition-all duration-500"
                    style={{ width: `${dashboardData.projectStatus.onHold}%` }}
                  ></div>
                </div>
                <span className="text-sm text-white w-12 text-right">{dashboardData.projectStatus.onHold}%</span>
              </div>
            </div>
            <div className="flex justify-around mt-6 text-xs">
              <div className="text-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                <div className="text-gray-400">متأخر</div>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-1"></div>
                <div className="text-gray-400">متوقف</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;