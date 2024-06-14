const Loader: React.FC = () => (
  <div className="flex justify-center items-center absolute top-[50%] left-[50%]">
    <div className="w-[20px] h-[20px] border-10 border-gray-600 rounded-full"></div>
    <div className="w-[20px] h-[20px] border-[2px] border-gray-400 border-t-white rounded-full absolute animate-spin"></div>
  </div>
);

export default Loader;
