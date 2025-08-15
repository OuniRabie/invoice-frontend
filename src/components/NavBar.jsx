import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const activeClass = "text-blue-600 border-b-2 border-blue-600";
  const linkClass =
    "block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition";

  const navLinks = [
    { to: "/invoices", label: "Factures" },
    { to: "/clients", label: "Clients" },
    { to: "/products", label: "Produits" },
    { to: "/drivers", label: "Transporteur" },
  ];

  return (
    <nav className="bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Barre supérieure */}
        <div className="relative flex h-16 items-center justify-between">
          {/* Zone gauche: Logo */}
          <div className="flex flex-1 items-center">
            <span className="font-semibold text-lg">
              Systeme de Facture de Mr Bilel
            </span>
          </div>

          {/* Zone centre: message de bienvenue */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="hidden md:block text-sm text-gray-600">
              Bienvenue 👋
            </p>
            {/* Variante avec nom: */}
            {/* <p className="hidden md:block text-sm text-gray-600">Bienvenue, Karim 👋</p> */}
          </div>

          {/* Zone droite: menu desktop + bouton mobile */}
          <div className="flex flex-1 items-center justify-end">
            {/* Menu desktop */}
            <div className="hidden md:flex gap-1">
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

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-2 p-2 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Ouvrir le menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
