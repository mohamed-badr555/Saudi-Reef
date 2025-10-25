'use client';

interface GenericPageProps {
  pageName: string;
}

const GenericPage: React.FC<GenericPageProps> = ({ pageName }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-linear-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-8 sm:p-12 border border-gray-700/50 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            صفحة {pageName}
          </h1>
          <p className="text-gray-400 text-lg">
            هذه الصفحة قيد التطوير
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenericPage;
