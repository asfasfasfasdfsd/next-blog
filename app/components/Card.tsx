import calculateRating from '../functions/calculateRating';
import { RestaurantCardType } from '../page';
import Link from 'next/link';
import Star from './Star';
interface Props {
  restaurant: RestaurantCardType;
}

export default function Card({ restaurant }: Props) {
  return (
    <Link key={restaurant.id} href={`restaurant/${restaurant.slug}`}>
      <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
        <img src={'' + restaurant.main_image} alt='' className='w-full h-36' />
        <div className='p-1'>
          <h3 className='font-bold text-2xl mb-2'>{}</h3>
          <div className='flex items-start'>
            <div className='flex mb-2'>
              <Star {...restaurant} />
            </div>
            <p className='ml-2'>
              {restaurant.review.length} review
              {restaurant.review.length <= 1 ? '' : 's'}
            </p>
          </div>
          <div className='flex text-reg font-light capitalize'>
            <p className=' mr-3'>{restaurant.cuisin.name}</p>
            <p className='mr-3'>{restaurant.price}</p>
            <p>*{restaurant.location.name}*</p>
          </div>
          <p className='text-sm mt-1 font-bold'>Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
}
