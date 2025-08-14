import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const activeClass = "text-blue-600 border-b-2 border-blue-600";
  const linkClass =
    "block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition";

  const navLinks = [
    { to: "/invoices", label: "Invoices" },
    { to: "/clients", label: "Clients" },
    { to: "/products", label: "Products" },
    { to: "/drivers", label: "Drivers" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 text-xl font-bold text-blue-700">
            InvoiceSys
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-blue-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-blue-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)} // close on click
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
