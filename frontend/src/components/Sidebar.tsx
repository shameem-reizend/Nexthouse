import { Calendar, Heart, ShoppingCart,X} from "lucide-react"
import { Link } from "react-router-dom"


const menuItems = {
    user:[
        {name:"Products",path:"/products",icon:ShoppingCart},
        {name:"My Events",path:"/events",icon:Calendar},
        {name:"Favourites",path:"/likedProducts",icon:Heart},
    ],
    admin:[
        {name:"Products",path:"/products",icon:ShoppingCart},
        {name:"Events",path:"/events",icon:ShoppingCart},
        {name:"category",path:"/category",icon:ShoppingCart},            
    ]
}

interface SidebarProps {
    isOpen:boolean;
    onClose:()=> void;
}
const Sidebar:React.FC<SidebarProps> = ({isOpen,onClose}) => {
    
    const items = menuItems.user

  return (
    <>
      {/* Background overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-zinc-900
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="border-b-2 border-amber-50 flex justify-between items-center p-4">
          <h1 className="text-white text-2xl font-bold">NextHouse</h1>

          {/* Close icon (only visible on mobile) */}
          <button className="md:hidden" onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-3 mt-5">
          {items.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="p-2 rounded hover:bg-gray-700 flex items-center gap-3"
              >
                <IconComponent className="w-5 h-5 text-white" />
                <span className="text-md text-white">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );


}

export default Sidebar