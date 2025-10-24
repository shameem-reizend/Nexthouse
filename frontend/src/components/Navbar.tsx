// import { SearchIcon } from "lucide-react";

interface NavbarProps {
    onMenuClick:() => void;
}

const Navbar:React.FC<NavbarProps> = ({onMenuClick}) => {

  return (
    <nav className="h-16 flex justify-between items-center px-6 bg-zinc-900 text-white">
      {/* Menu button for mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-white hover:text-gray-400"
      >
        ☰
      </button>

      <h1 className="text-lg font-semibold hidden md:block">Hi User</h1>
      {/* <div className="rounded-2xl bg-white text-black w-50 sm:w-sm lg:w-md xl:w-xl p-2 flex gap-2 items-center" >
          <span className="text-black"><SearchIcon width={20} height={20}/></span>
          <input className="w-full border-white outline-0 text-lg" type="text" />
      </div> */}
      <div className="flex gap-4">
        <button className="hover:text-gray-400 font-bold">Profile</button>
        <button className="hover:text-red-400 font-semibold cursor-pointer">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar