import React from 'react';
import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const getItemsBySlug = async (slug: string) => {
  const items = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      Item: true,
    },
  });
  if (!items) throw new Error('Slug not Found');
  return items;
};
const page = async ({ params }: { params: { slug: string } }) => {
  const items = await getItemsBySlug(params.slug);
  console.log(items);
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
          {/* NAVBAR */} {/* HEADER */}
          <div className='h-96 overflow-hidden'>
            <div className='bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center'>
              <h1 className='text-7xl text-white captitalize text-shadow text-center'>
                welcome
                {} ()
              </h1>
            </div>
          </div>
          {/* HEADER */} {/* DESCRIPTION PORTION */}
          <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
            <div className='bg-white w-[100%] rounded p-3 shadow'>
              {/* RESAURANT NAVBAR */}
              <NavBar />
              {/* RESAURANT NAVBAR */} {/* MENU */}
              <main className='bg-white mt-5'>
                <div>
                  <div className='mt-4 pb-1 mb-1'>
                    <h1 className='font-bold text-4xl'>Menu</h1>
                  </div>
                  <div className='flex flex-wrap justify-between'>
                    {/* MENU CARD */}
                    {items.Item.length
                      ? items.Item.map((ele) => {
                          return (
                            <div
                              key={ele.id}
                              className=' border rounded p-3 w-[49%] mb-3'
                            >
                              <h3 className='font-bold text-lg'>{ele.name}</h3>
                              <p className='font-light mt-1 text-sm'>
                                {ele.description}
                              </p>
                              <p className='mt-7'>{ele.price}</p>
                            </div>
                          );
                        })
                      : 'coming soon '}
                    {/* MENU CARD */}
                  </div>
                </div>
              </main>
              {/* MENU */}
            </div>
          </div>
          {/* DESCRIPTION PORTION */}
        </main>
      </main>
    </div>
  );
};

export default page;
