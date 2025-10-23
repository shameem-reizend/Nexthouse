
interface NavbarProps {
    onMenuClick:() => void;
}

const Navbar:React.FC<NavbarProps> = ({onMenuClick}) => {

  return (
    <nav className="h-16 flex justify-between items-center px-6 bg-linear-to-r from-gray-950 to-gray-700 text-white">
      {/* Menu button for mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-white hover:text-gray-400"
      >
        ☰
      </button>

      <h1 className="text-lg font-semibold hidden md:block">Hi User</h1>

      <div className="flex gap-4">
        <button className="hover:text-gray-400 font-bold">Profile</button>
        <button className="hover:text-red-400 font-bold">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar