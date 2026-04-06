'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User } from '@/store/useStore';

export default function UserListClient({ initialUsers }: { initialUsers: User[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = initialUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search by name or email..." 
        className="border-2 border-gray-300 p-3 mb-6 w-full rounded-lg focus:outline-none focus:border-blue-500 text-black"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="grid gap-4">
        {filteredUsers.map(user => (
          <div key={user.id} className="border p-5 rounded-xl flex justify-between items-center bg-white shadow-md">
            <div>
              <p className="font-bold text-lg text-black">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-blue-500 font-medium">{user.company.name}</p>
            </div>
            <Link 
              href={`/users/${user.id}`} 
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              View Posts
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}