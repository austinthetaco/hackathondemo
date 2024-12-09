import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../configuration';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'wishlist'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setWishlistItems(items);
    });

    return () => unsubscribe();
  }, []);

  const toggleCompleted = async (id, completed) => {
    const itemRef = doc(db, 'wishlist', id);
    await updateDoc(itemRef, { completed: !completed });
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-100">Wishlist Items</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-slate-300">No items in the wishlist yet.</p>
      ) : (
        <ul className="space-y-4">
          {wishlistItems.map((item) => (
            <li key={item.id} className="bg-slate-700 p-4 rounded-md shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;

