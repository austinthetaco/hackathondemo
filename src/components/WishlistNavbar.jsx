import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WishlistNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-800 w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-slate-100 font-bold text-xl">Dev Wishlist</div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-100 hover:text-slate-300 focus:outline-none focus:text-slate-300"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
          <ul className={`md:flex md:space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
            <li>
              <Link to="/" className="block mt-4 md:inline-block md:mt-0 text-slate-300 hover:text-slate-100">Dashboard</Link>
            </li>
            <li>
              <Link to="/wishlist" className="block mt-4 md:inline-block md:mt-0 text-slate-300 hover:text-slate-100">View Wishlist</Link>
            </li>
            <li>
              <Link to="/add-item" className="block mt-4 md:inline-block md:mt-0 text-slate-300 hover:text-slate-100">Add Item</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default WishlistNavbar;

