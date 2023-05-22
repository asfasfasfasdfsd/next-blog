import React from 'react';
import fullStar from '../../public/icons/full-star.png';
import halfStar from '../../public/icons/half-star.png';
import emptyStar from '../../public/icons/empty-star.png';
import errorIcon from '../../public/icons/error.png';
import Image from 'next/image';
import { Review } from '@prisma/client';
import getRating from '../functions/getRating';

export default function Star({
  review,
  rating,
}: {
  review: Review[];
  rating?: number;
}) {
  let rate = 0;
  if (review) rate = Number(getRating(review));
  if (rating) rate = rating;
  let star = [emptyStar, emptyStar, emptyStar, emptyStar, emptyStar];
  for (let i = 0; i < 5; i++) {
    if (rate - i >= 1) star[i] = fullStar;
    else if (rate - i >= 0.5) star[i] = halfStar;
    else star[i] = emptyStar;
  }

  return star.map((ele, index) => {
    return (
      <Image
        key={index}
        className='w-3'
        style={{ marginTop: '5px' }}
        src={ele}
        alt=''
      />
    );
  });
}
// rate : 4 , 4-1 => add a star
// 4-2 : star
// 4-3 :star
//4 -4 :star
// 4-5 : empty

// 2.5
//2.5 - 0 : star
//2.5 - 1: star
//2.5 - 2: star
//2.5 - 3: empty
