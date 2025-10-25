import { SearchIcon , MenuIcon,UserRound} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    onMenuClick:() => void;
}

const Navbar:React.FC<NavbarProps> = ({onMenuClick}) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  const [isProfileOpen,setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout =() =>{
        localStorage.clear()
        navigate("/login");       
    }

    const handleProfileNavigate = () => {
      navigate('/profile');
      setIsProfileOpen(false);

    }


  return (
    <>

    <nav className="h-16 flex justify-between items-center relative  px-6 bg-zinc-900 text-white">
      {/* Menu button for mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-white hover:text-gray-400 pr-1"
      >
      <MenuIcon/>
      </button>

      <h1 className="text-lg font-semibold hidden md:block">Hi User</h1>
      {/* <div className="rounded-2xl bg-white text-black w-50 sm:w-sm lg:w-md xl:w-xl p-2 flex gap-2 items-center" >
          <span className="text-black"><SearchIcon width={20} height={20}/></span>
          <input className="w-full border-white outline-0 text-lg" type="text" />
      </div> */}
      <div className="flex gap-4">
        <button className="hover:text-gray-400 font-bold mr-10 ctext-lg "  onClick={()=>setIsProfileOpen(!isProfileOpen)}>Profile</button>
      </div>


      {/* Profile dropdown */}

      {isProfileOpen && (
        <>
          <div
          className=" fixed inset-0 bg-black/40 z-30 "
          onClick={()=>setIsProfileOpen(!isProfileOpen)}
          ></div>

          
            <div className="w-60 z-40 bg-white flex flex-col space-y-1 absolute top-14 right-10 rounded-lg border border-gray-200  transform transition-transform duration-600 ease-in-out">
              <div className=" bg-gray-100 flex gap-2 py-2 rounded-t-lg p-4 m-0">
                <div>
                  <div className="w-12 h-12 rounded-full bg-gray-200  text-black p-2.5"><UserRound size={32} /></div>
                </div>
                <div className="flex flex-col">
                  <h1 className=" text-black  font-semibold">{userData?.name}</h1>
                  <h1 className=" text-black font-extralight text-sm">{userData?.email}</h1>

                </div>
              </div>

              <div className="text-center  border-b border-gray-300 m-0  ">
                <button className="text-black w-full  p-2 h-12 font-semibold cursor-pointer hover:bg-gray-200" onClick={handleProfileNavigate}>
                  Profile
                </button>
              </div>

              <div className="text-center ">
                <button className=" text-black w-full h-12 font-semibold hover:text-red-500 hover:bg-gray-200 cursor-pointer" onClick={handleLogout} >Logout</button>
              </div>
            </div>
          </>
      )
      
      }
    </nav>
    </>
  );
}

export default Navbar