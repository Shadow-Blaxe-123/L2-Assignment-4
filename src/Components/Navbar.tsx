import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggle } from "@/redux/navbarSlice";

function Navbar() {
  // const [isOpen, setIsOpen] = useState(false);
  const isOpen = useAppSelector((state) => state.navbar.isOpen);
  const dispatch = useAppDispatch();

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            MyLibrary
          </span>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => dispatch(toggle())}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Nav Items */}
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-900">
            <li className="py-2 px-3 rounded-md text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 transition-all cursor-pointer">
              All Books
            </li>
            <li className="py-2 px-3 rounded-md text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 transition-all cursor-pointer">
              Add Book
            </li>
            <li className="py-2 px-3 rounded-md text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 transition-all cursor-pointer">
              Borrow Books
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
