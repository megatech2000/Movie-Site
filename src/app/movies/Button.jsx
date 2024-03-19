import { IoPlayOutline } from "react-icons/io5";

const Button = () => {
  return (
    <div>
      <button className="bg-transparent border-2 text-white px-12 py-2 rounded-lg flex items-center justify-between hover:bg-[#fff] hover:text-black hover:border-none">
        <IoPlayOutline className="mr-2 text-[30px]" />
        Play Trailler
      </button>
    </div>
  );
};

export default Button;
