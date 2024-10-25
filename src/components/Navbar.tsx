'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user : User = session?.user;

  return (
    <nav className="p-5 md:px-6 shadow-md bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href={user? '/dashboard': '/'} className="text-xl font-bold mb-4 md:mb-0">
          InsightHub
        </Link>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user.username || user.email}
            </span>
            <Button onClick={() => signOut()} className="w-auto md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/signin">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;