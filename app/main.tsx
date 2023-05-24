'use client';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Card from './components/Card';
import { RestaurantCardType } from './page';
import { useRouter } from 'next/navigation';
import SearchBar from './components/SearchBar';

interface Props {
  restaurantCard: RestaurantCardType[];
}

export default function Main({ restaurantCard }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  return (
    <>
      <main>
        <main className='bg-gray-100 min-h-screen w-screen'>
          <main className='max-w-screen-2xl m-auto bg-white'>
            {/* NAVBAR */}
            <NavBar />
            {/* NAVBAR */}
            <main>
              {/* HEADER */}
              <div className='h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2'>
                <div className='text-center mt-10'>
                  <h1 className='text-white text-5xl font-bold mb-2'>
                    Find your table for any occasion
                  </h1>
                  {/* SEARCH BAR */}
                  <SearchBar />
                  {/* SEARCH BAR */}
                </div>
              </div>
              {/* HEADER */} {/* CARDS */}
              {/* CARD */}
              <div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
                {restaurantCard.map((ele) => {
                  return <Card key={ele.id} restaurant={ele} />;
                })}
              </div>
              {/* CARD */}
              {/* CARDS */}
            </main>
          </main>
        </main>
      </main>
    </>
  );
}
