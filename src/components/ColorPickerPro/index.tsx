import Layout from '../../components/Layout';

const ColorPickerPro = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-12">
        <div className="relative flex flex-col items-center gap-6 pb-10">
          <h1 className="relative text-center text-4xl leading-[125%] font-bold text-icon-950 dark:text-icon-50">
            Color Picker Pro
          </h1>
          <span className="inline-flex flex-col items-center justify-center gap-2.5 text-center">
            <span className="inline text-xl text-icon-600 dark:text-icon-200">
              Advanced color selection with hex, RGB, and HSL values
            </span>
          </span>
        </div>
        <div className="w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          {/* Add your color picker content here */}
          <p className="text-icon-950 dark:text-icon-200">Color Picker Pro Content Coming Soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default ColorPickerPro; 