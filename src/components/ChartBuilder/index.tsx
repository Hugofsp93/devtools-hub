import Layout from '../../components/Layout';

const ChartBuilder = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-12">
        <div className="relative flex flex-col items-center gap-6 pb-10">
          <h1 className="relative text-center text-4xl leading-[125%] font-bold text-icon-950 dark:text-icon-50">
            Chart Builder
          </h1>
          <span className="inline-flex flex-col items-center justify-center gap-2.5 text-center">
            <span className="inline text-xl text-icon-600 dark:text-icon-200">
              Create interactive charts and graphs with customizable data visualization
            </span>
          </span>
        </div>
        <div className="w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          {/* Add your chart builder content here */}
          <p className="text-icon-950 dark:text-icon-200">Chart Builder Content Coming Soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default ChartBuilder; 