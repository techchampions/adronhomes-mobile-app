import { BsExclamationCircle } from "react-icons/bs";

const NoPropertyFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[300px] h-[80vh] mx-auto bg-red relative">
      <img
        src="/house-searching.svg"
        alt="No Property Found"
        width={300}
        height={300}
        className="w-[300px] h-[300px] object-cover"
      />
      <div className="">
        <div className="text-xl font-bold text-red-500 text-center flex items-center gap-2">
          <BsExclamationCircle className="inline-block text-red-500" /> No
          Property Found
        </div>
        <p className="text-center">Please try again later.</p>
      </div>
    </div>
  );
};
export default NoPropertyFound;
