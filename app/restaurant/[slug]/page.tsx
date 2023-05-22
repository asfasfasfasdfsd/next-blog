import React from 'react';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import { PrismaClient } from '@prisma/client';
import getRating from '../../functions/getRating';
import Review from './components/Review';
import Star from '../../components/Star';

const prisma = new PrismaClient();
const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      images: true,
      location: true,
      name: true,
      description: true,
      review: true,
    },
  });
  return restaurant;
};

const page = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await getRestaurantBySlug(params.slug);
  return (
    <div>
      <main className='bg-gray-100 min-h-screen w-screen'>
        <main className='max-w-screen-2xl m-auto bg-white'>
          {/* NAVBAR */}
          <nav className='bg-white p-2 flex justify-between'>
            <Link href={'/'} className='font-bold text-gray-700 text-2xl'>
              OpenTable{''}
            </Link>
            <div>
              <div className='flex'>
                <button className='bg-blue-400 text-white border p-1 px-4 rounded mr-3'>
                  Sign in
                </button>
                <button className='border p-1 px-4 rounded'>Sign up</button>
              </div>
            </div>
          </nav>
          {/* NAVBAR */}
          {/* HEADER */}
          <div className='h-96 overflow-hidden'>
            <div className='bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center'>
              <h1 className='text-7xl text-white captitalize text-shadow text-center capitalize'>
                {params.slug.split('-').join(' ')}({restaurant?.location.name})
              </h1>
            </div>
          </div>
          {/* HEADER */}
          {/* DESCRIPTION PORTION */}
          <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
            <div className='bg-white w-[70%] rounded p-3 shadow'>
              {/* RESAURANT NAVBAR */}
              <nav className='flex text-reg border-b pb-2'>
                <Link href='/' className='mr-7'>
                  {' '}
                  Overview{' '}
                </Link>
                <a href={`${params.slug}/menu`} className='mr-7'>
                  {' '}
                  Menu{' '}
                </a>
              </nav>
              {/* RESAURANT NAVBAR */} {/* TITLE */}
              <div className='mt-4 border-b pb-6'>
                <h1 className='font-bold text-6xl'>{params.slug} </h1>
              </div>
              {/* TITLE */} {/* RATING */}
              <div className='flex items-end'>
                <div className='ratings mt-2 flex items-center'>
                  <Star {...restaurant} />

                  <p className='text-reg ml-3'>
                    {getRating(restaurant?.review || [])}
                  </p>
                </div>
                <div>
                  <p className='text-reg ml-4'>
                    {restaurant?.review.length} Reviews
                  </p>
                </div>
              </div>
              {/* RATING */} {/* DESCRIPTION */}
              <div className='mt-4'>
                <p className='text-lg font-light'>{restaurant?.description}</p>
              </div>
              {/* DESCRIPTION */} {/* IMAGES */}
              <div>
                <h1 className='font-bold text-3xl mt-10 mb-7 border-b pb-5'>
                  {restaurant?.images.length}photo
                  {restaurant ? (restaurant?.images.length > 1 ? 's' : '') : ''}
                </h1>
                <div className='flex flex-wrap'>
                  {restaurant?.images.map((ele, index) => {
                    return (
                      <img
                        src={ele}
                        key={index}
                        alt=''
                        className='w-56 h-44 mr-1 mb-1'
                      />
                    );
                  })}
                </div>
              </div>
              {/* IMAGES */} {/* REVIEWS */}
              <div>
                <h1 className='font-bold text-3xl mt-10 mb-7 borber-b pb-5'>
                  {!restaurant?.review
                    ? 'no Review published'
                    : restaurant?.review.length == 0
                    ? 'no Review published'
                    : restaurant?.review.length == 1
                    ? 'what 1 person is saying'
                    : `what ${restaurant?.review.length} peopel are saying`}
                </h1>
                <div>
                  {/* REVIEW CARD */}
                  {restaurant?.review.map((ele) => {
                    return <Review {...ele} />;
                  })}
                  {/* REVIEW CARD */}
                </div>
              </div>
              {/* REVIEWS */}
            </div>
            <div className='w-[27%] relative text-reg'>
              <div className='fixed w-[15%] bg-white rounded p-3 shadow'>
                <div className='text-center border-b pb-2 font-bold'>
                  <h4 className='mr-7 text-lg'>Make a Reservation</h4>
                </div>
                <div className='my-3 flex flex-col'>
                  <label htmlFor=''>Party size</label>
                  <select name='' className='py-3 border-b font-light' id=''>
                    <option value=''>1 person</option>
                    <option value=''>2 people</option>
                  </select>
                </div>
                <div className='flex justify-between'>
                  <div className='flex flex-col w-[48%]'>
                    <label htmlFor=''>Date</label>
                    <input
                      type='text'
                      className='py-3 border-b font-light w-28'
                    />
                  </div>
                  <div className='flex flex-col w-[48%]'>
                    <label htmlFor=''>Time</label>
                    <select name='' id='' className='py-3 border-b font-light'>
                      <option value=''>7:30 AM</option>
                      <option value=''>9:30 AM</option>
                    </select>
                  </div>
                </div>
                <div className='mt-5'>
                  <button className='bg-red-600 rounded w-full px-4 text-white font-bold h-16'>
                    Find a Time
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */}{' '}
          {/* RESERVATION
    CARD PORTION */}
        </main>
      </main>
    </div>
  );
};

export default page;
