import Link from 'next/link';
import React from 'react';
import { PRICE } from '@prisma/client';
interface Data {
  location: {
    id: number;
    name: string;
  }[];

  cuisin: {
    id: number;
    name: string;
  }[];
}
export default function SearchSideBar({
  data,
  searchParams,
}: {
  searchParams: {
    location?: string;
    cuisin?: string;
    price?: PRICE;
  };
  data: Data;
}) {
  console.log('searchParams');
  console.log(searchParams);
  return (
    <div className='w-1/5'>
      <div className='border-b pb-4'>
        {/* Region Component --------------------------------------------------------------------*/}
        <h1 className='mb-2'>Region</h1>
        {data.location ? (
          data.location.map((ele) => {
            return (
              <div className='flex flex-col'>
                <Link
                  href={{
                    pathname: '/search',
                    query: {
                      ...searchParams,
                      location: ele.name,
                    },
                  }}
                  className='font-light text-reg'
                >
                  {ele.name}
                </Link>
              </div>
            );
          })
        ) : (
          <h1>No Regions Found</h1>
        )}
      </div>
      <div className='border-b pb-4 mt-3  '>
        {/* Region Component --------------------------------------------------------------------*/}
        <h1 className='mb-2'>Cuisine</h1>
        {data.cuisin ? (
          data.cuisin.map((ele) => {
            return (
              <div className='flex flex-col'>
                <Link
                  href={{
                    pathname: '/search',
                    query: {
                      ...searchParams,
                      cuisin: ele.name,
                    },
                  }}
                  key={ele.id}
                  className='font-light text-reg'
                >
                  {ele.name}
                </Link>
              </div>
            );
          })
        ) : (
          <h1>No Cuisins Found</h1>
        )}
      </div>
      <div className='mt-3 pb-4'>
        {/* Region Component --------------------------------------------------------------------*/}
        <h1 className='mb-2'>Price</h1>
        <div className='flex'>
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                price: PRICE.cheap,
              },
            }}
            className='border w-full text-reg font-light rounded-l p-2'
          >
            $
          </Link>
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                price: PRICE.regular,
              },
            }}
            className='border-r border-t border-b w-full text-reg font-light p-2'
          >
            $$
          </Link>
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                price: PRICE.expensive,
              },
            }}
            className='border-r border-t border-b w-full text-reg font-light p-2 rounded-r'
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
}
