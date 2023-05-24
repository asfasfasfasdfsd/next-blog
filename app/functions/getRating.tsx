// we need to calcualte the total rating;
//total rating is : sum of ratings divided by ratings number
//sum of ratings is the reduce function ,
// number of ratings is reviews.length

import { Review } from '@prisma/client';

export default function getRating(reviews: Review[]): number {
  if (!reviews.length) return 0;
  let rate = 0;
  reviews.forEach((ele) => {
    rate += ele.rating;
  });
  const finalRate = rate / reviews?.length;
  return Number(finalRate.toFixed(1));
}
