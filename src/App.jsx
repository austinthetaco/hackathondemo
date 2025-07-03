import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import WishlistNavbar from './components/WishlistNavbar';
import WishlistEntryForm from './components/WishlistEntryForm';
import Wishlist from './components/Wishlist';
import NameEntryPopup from './components/NameEntryPopup';

// Placeholder components for the routes
const Dashboard = () => {
  const handleNameSubmit = (name) => {
    // Name is stored in session storage, no need to keep it in state here
    console.log('User name submitted:', name);
  };

  return (
    <>
      <NameEntryPopup onNameSubmit={handleNameSubmit} />
      <div className="bg-slate-800 p-6 rounded-lg shadow-md text-slate-100">
        Dashboard Content
      </div>
    </>
  );
};

function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Toaster position="top-right" />
        <WishlistNavbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/add-item" element={<WishlistEntryForm />} />
          </Routes>
        </main>
        <footer className="bg-slate-800 text-slate-300 py-4">
          <div className="container mx-auto px-4 text-center">
            © 2024 Dev Team Mini Hackathon 
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

