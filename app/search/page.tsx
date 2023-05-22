import React from 'react';
import NavBar from '../components/NavBar';
import { PRICE, PrismaClient } from '@prisma/client';
import SearchBar from '../components/SearchBar';
import RestaurantCardSearch from '../components/RestaurantCardSearch';
import SearchSideBar from './components/SearchSideBar';
const prisma = new PrismaClient();
const getLocationsAndCuisins = async () => {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  const cuisins = await prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return {
    location: locations,
    cuisin: cuisins,
  };
};
async function getRestaurant(
  location?: string | undefined,
  cuisine?: string | undefined,
  Price?: PRICE | undefined
) {
  const item = await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: location,
        },
      },
      cuisin: {
        name: {
          equals: cuisine,
        },
      },
      price: {
        equals: Price,
      },
    },
    select: {
      id: true,
      name: true,
      main_image: true,
      location: true,
      cuisin: true,
      price: true,
      slug: true,
      review: true,
    },
  });
  return item;
}
const Search = async ({
  searchParams,
}: {
  searchParams: {
    location?: string;
    cuisin?: string;
    price?: PRICE;
  };
}) => {
  const restaurant = await getRestaurant(
    searchParams.location,
    searchParams.cuisin,
    searchParams.price
  );
  const data = await getLocationsAndCuisins();

  return (
    <>
      <main className='bg-gray-100 min-h-screen w-screen'>
        <main className='max-w-screen-2xl m-auto bg-white'>
          {/* NAVBAR */}
          <NavBar />
          {/* HEADER */}
          <div className='bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2'>
            <div className='text-left text-lg py-3 m-auto flex justify-center'>
              <SearchBar />
            </div>
          </div>
          <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
            {/* SEARCH SIDE BAR */}
            <>
              <SearchSideBar searchParams={searchParams} data={data} />
            </>
            {/* SEARCH SIDE BAR */}
            <div className='w-5/6'>
              {/* RESAURANT CAR */}
              {restaurant
                ? restaurant.map((ele) => {
                    return <RestaurantCardSearch key={ele.id} data={ele} />;
                  })
                : 'City Not Found'}
              {/* RESAURANT CAR */}
            </div>
          </div>
        </main>
      </main>
    </>
  );
};

export default Search;
