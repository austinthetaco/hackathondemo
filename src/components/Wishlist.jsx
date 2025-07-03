import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../configuration';
import toast from 'react-hot-toast';
import NameEntryPopup from './NameEntryPopup';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = sessionStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleNameSubmit = (name) => {
    setUserName(name);
  };

  useEffect(() => {
    const q = query(collection(db, 'wishlist'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Ensure votes is always a number
        data.votes = typeof data.votes === 'number' ? data.votes : 0;
        // Defensive: if createdAt is missing or not a Timestamp, use Date.now()
        let createdAt;
        try {
          createdAt = data.createdAt && data.createdAt.toDate ? data.createdAt.toDate() : new Date();
        } catch {
          createdAt = new Date();
        }
        items.push({ id: doc.id, ...data, createdAt });
      });
      // Sort by votes (descending) then by creation date
      items.sort((a, b) => {
        if (b.votes !== a.votes) {
          return b.votes - a.votes;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setWishlistItems(items);
      // Debug output
      console.log('userName:', userName, 'wishlistItems:', items);
    });

    return () => unsubscribe();
  }, [userName]);

  const toggleCompleted = async (id, completed) => {
    const itemRef = doc(db, 'wishlist', id);
    await updateDoc(itemRef, { completed: !completed });
  };

  const handleVote = async (item) => {
    if (!userName) {
      toast.error('Please enter your name first');
      return;
    }

    const itemRef = doc(db, 'wishlist', item.id);
    const votedBy = item.votedBy || [];
    const hasVoted = votedBy.includes(userName);

    try {
      if (hasVoted) {
        // Remove vote
        const newVotedBy = votedBy.filter(name => name !== userName);
        const newVotes = (typeof item.votes === 'number' ? item.votes : 0) - 1;
        await updateDoc(itemRef, { 
          votes: newVotes, 
          votedBy: newVotedBy 
        });
      } else {
        // Add vote
        const newVotedBy = [...votedBy, userName];
        const newVotes = (typeof item.votes === 'number' ? item.votes : 0) + 1;
        await updateDoc(itemRef, { 
          votes: newVotes, 
          votedBy: newVotedBy 
        });
      }
    } catch (err) {
      console.error('Vote update error:', err);
      toast.error('Failed to update vote');
    }
  };

  const handleDelete = async (item) => {
    if (userName !== 'Au<>tin') {
      toast.error('Only Au<>tin can delete items');
      return;
    }

    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const itemRef = doc(db, 'wishlist', item.id);
        await deleteDoc(itemRef);
        toast.success('Item deleted successfully');
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error('Failed to delete item');
      }
    }
  };

  return (
    <>
      <NameEntryPopup onNameSubmit={handleNameSubmit} />
      <div className="max-w-4xl mx-auto bg-slate-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-100">Wishlist Items</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-slate-300">No items in the wishlist yet.</p>
      ) : (
        <ul className="space-y-4">
          {wishlistItems.map((item) => {
            const hasVoted = item.votedBy && item.votedBy.includes(userName);
            return (
              <li key={item.id} className="bg-slate-700 p-4 rounded-md shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleVote(item)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                        hasVoted
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                      }`}
                    >
                      <span>▲</span>
                      <span>{item.votes || 0}</span>
                    </button>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                      <p className="text-sm text-slate-400">Added by: {item.addedBy || 'Unknown'}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.priority === 'high' ? 'bg-red-600 text-white' :
                    item.priority === 'medium' ? 'bg-yellow-500 text-black' :
                    'bg-green-500 text-black'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-slate-300 mt-2">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-slate-400">Estimated Time: {item.estimatedTime} hours</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleCompleted(item.id, item.completed)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        item.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-500 text-white hover:bg-slate-400'
                      }`}
                    >
                      {item.completed ? 'Completed' : 'Mark as Complete'}
                    </button>
                    {userName === 'Au<>tin' && (
                      <button
                        onClick={() => handleDelete(item)}
                        className="px-3 py-1 rounded text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      </div>
    </>
  );
};

export default Wishlist;

