// we need to calcualte the total rating;
//total rating is : sum of ratings divided by ratings number
//sum of ratings is the reduce function ,
// number of ratings is reviews.length

import { Review } from '@prisma/client';

export default function getRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  let rate = 0;
  reviews.forEach((ele) => {
    rate += ele.rating;
  });
  const finalRate = rate / reviews?.length;
  console.log(finalRate);
  return finalRate.toFixed(1);
}
