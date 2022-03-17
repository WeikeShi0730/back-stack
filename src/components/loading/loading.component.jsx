import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full">
      <div className="flex items-center justify-center backdrop-blur-sm w-full h-full">
        <div className="animate-spin text-6xl text-gray-700">
         <AiOutlineLoading3Quarters />
        </div>
      </div>
    </div>
  );
};

export default Loading;
