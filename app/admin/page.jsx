import React from 'react';
import Link from 'next/link';

const Admin = () => {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <div className='w-full max-w-3xl p-6'>
        <h1 className='text-3xl font-bold text-center mb-6'>Admin Panel</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <Link href='/admin/addvendor'>
            <div className='border border-gray-600 hover:bg-gray-200 p-4 rounded-lg cursor-pointer block text-center'>
              Add Vendor
            </div>
          </Link>
          <Link href='/admin/add-delivery-person'>
            <div className='border border-gray-600 hover:bg-gray-200 p-4 rounded-lg cursor-pointer block text-center'>
              Add Delivery Person
            </div>
          </Link>
          <Link href='/admin/show-all-orders'>
            <div className='border border-gray-600 hover:bg-gray-200 p-4 rounded-lg cursor-pointer block text-center'>
              Orders
            </div>
          </Link>
          <Link href='/admin/vendordetails'>
            <div className='border border-gray-600 hover:bg-gray-200 p-4 rounded-lg cursor-pointer block text-center'>
              Vendor Details
            </div>
          </Link>
          <Link href='/admin/delivery-person-details'>
            <div className='border border-gray-600 hover:bg-gray-200 p-4 rounded-lg cursor-pointer block text-center'>
              Delivery Person Details
            </div>
          </Link>
          <div className='border border-gray-600 hover:bg-gray-200 p-4 rounded-lg cursor-pointer block text-center'>
            Money
          </div>
          <div className='border border-gray-600 hover:bg-gray-200 p-4 rounded-lg cursor-pointer block text-center'>
            Delivery
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
