import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const NameEntryPopup = ({ onNameSubmit }) => {
  const [name, setName] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if name is already stored in session storage
    const storedName = sessionStorage.getItem('userName');
    if (!storedName) {
      setShowPopup(true);
    } else {
      onNameSubmit(storedName);
    }
  }, [onNameSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      sessionStorage.setItem('userName', name.trim());
      setShowPopup(false);
      onNameSubmit(name.trim());
    }
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">Welcome!</h2>
        <p className="text-slate-300 mb-6">
          Please enter your name to continue. This will be used to identify who added wishlist items.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-slate-200 text-slate-900 py-2 px-4 rounded-md font-medium hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

NameEntryPopup.propTypes = {
  onNameSubmit: PropTypes.func.isRequired,
};

export default NameEntryPopup; 