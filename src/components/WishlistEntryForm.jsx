import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../configuration';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority').required('Priority is required'),
  estimatedTime: yup.number().positive('Must be a positive number').integer('Must be an integer').required('Estimated time is required'),
});

const WishlistEntryForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const wishlistData = {
        ...data,
        createdAt: new Date(),
        completed: false
      };

      await addDoc(collection(db, 'wishlist'), wishlistData);
      
      toast.success('Wishlist item added successfully!');
      reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to add wishlist item');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-lg shadow-md">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6 text-slate-100">Add Wishlist Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300">Title</label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-slate-100 shadow-sm focus:border-slate-500 focus:ring-slate-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300">Description</label>
          <textarea
            id="description"
            {...register('description')}
            rows="3"
            className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-slate-100 shadow-sm focus:border-slate-500 focus:ring-slate-500"
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-300">Priority</label>
          <select
            id="priority"
            {...register('priority')}
            className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-slate-100 shadow-sm focus:border-slate-500 focus:ring-slate-500"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="mt-1 text-sm text-red-400">{errors.priority.message}</p>}
        </div>

        <div>
          <label htmlFor="estimatedTime" className="block text-sm font-medium text-slate-300">Estimated Time (in hours)</label>
          <input
            type="number"
            id="estimatedTime"
            {...register('estimatedTime')}
            className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-slate-100 shadow-sm focus:border-slate-500 focus:ring-slate-500"
          />
          {errors.estimatedTime && <p className="mt-1 text-sm text-red-400">{errors.estimatedTime.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-900 bg-slate-200 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            Add to Wishlist
          </button>
        </div>
      </form>
    </div>
  );
};

export default WishlistEntryForm;

