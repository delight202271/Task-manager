
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the mobile menu after clicking a link
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative w-full border-b border-gray-200 bg-[#FAF8FB]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={handleNavClick}
          className="flex items-center gap-1.5"
        >
          <img
            src="/Group 1.svg"
            alt="TaskDuty Logo"
            className="h-7 w-8"
          />

          <h1 className="font-Signika Negative text-[27.27px] font-semibold leading-[100%] tracking-normal text-[#2D005A]">
            TaskDuty
          </h1>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/new-tasks"
                className="text-[20px] leading-[100%] tracking-normal text-[#292929] transition-colors hover:text-purple-600"
              >
                New Task
              </Link>
            </li>

            <li>
              <Link
                to="/all-tasks"
                className="text-[20px] leading-[100%] tracking-normal text-[#292929] transition-colors hover:text-purple-600"
              >
                All Tasks
              </Link>
            </li>
          </ul>

          {/* Profile */}
          <img
            src="/Group 6.png"
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#2D0050] md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X size={28} strokeWidth={2} />
          ) : (
            <Menu size={28} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-t border-gray-200 bg-[#FAF8FB] px-6 py-5 shadow-md md:hidden">
          <ul className="flex flex-col gap-5">

            <li>
              <Link
                to="/new-task"
                onClick={handleNavClick}
                className="block text-[18px] leading-[100%] text-[#292929] transition-colors hover:text-purple-600"
              >
                New Task
              </Link>
            </li>

            <li>
              <Link
                to="/all-tasks"
                onClick={handleNavClick}
                className="block text-[18px] leading-[100%] text-[#292929] transition-colors hover:text-purple-600"
              >
                All Tasks
              </Link>
            </li>

            <li className="border-t border-gray-200 pt-5">
              <Link
                to="/"
                
                className="flex items-center gap-3 text-[18px] text-[#292929]"
              >
                <img
                  src="/Group 6.png"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />

                <span>Profile</span>
              </Link>
            </li>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

