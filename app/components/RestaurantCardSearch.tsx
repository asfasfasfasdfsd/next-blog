'use client';
import Link from 'next/link';
import calculateRating from '../functions/calculateRating';
import Star from './Star';
import getRating from '../functions/getRating';

export default function RestaurantCardSearch({ data }: { data: any }) {
  // const temp = data;
  // console.log('data---');
  // console.log(temp);
  // console.log('data');
  const getPrice = () => {
    switch (data.price) {
      case 'cheap':
        return '$';
        break;
      case 'regular':
        return '$$';
        break;
      case 'expensive':
        return '$$$';
        break;
    }
  };
  return (
    <div className='border-b flex pb-5 ml-4'>
      <img src={data.main_image} alt='' className='w-44 rounded h-36' />
      <div className='pl-5'>
        <h2 className='text-3xl'>{data.name}</h2>
        <div className='flex items-start'>
          <div className='flex mb-2'>
            <Star {...data} />
          </div>
          <p className='ml-2 text-sm'>{calculateRating(data.review)}</p>
        </div>
        <div className='mb-9'>
          <div className='font-light flex text-reg'>
            <p className='mr-4'>{getPrice()}</p>
            <p className='mr-4'>{data.cuisin.name}</p>
            <p className='mr-4'>{data.location.name}</p>
          </div>
        </div>
        <div className='text-red-600'>
          <Link href={`restaurant/${data.slug}`}>see more infromation</Link>
        </div>
      </div>
    </div>
  );
}
