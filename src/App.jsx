import React, { useState, useEffect } from 'react';
import cong from "./configuration"; // Assuming the correct path to your configuration file
import { getDatabase, ref, onValue } from "firebase/database";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import WishlistNavbar from './components/WishlistNavbar';
import WishlistEntryForm from './components/WishlistEntryForm';
import Wishlist from './components/Wishlist';

// Placeholder components for the routes
const Dashboard = () => <div className="bg-slate-800 p-6 rounded-lg shadow-md text-slate-100">Dashboard Content</div>;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(cong);
    
    // Reference to the specific collection in the database
    const collectionRef = ref(database, "your_collection");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const displayItem = Object.values(dataItem);
          setData(displayItem);
        }
      });
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

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

