// we need to calcualte the total rating;
//total rating is : sum of ratings divided by ratings number
//sum of ratings is the reduce function ,
// number of ratings is reviews.length

import { Review } from '@prisma/client';
import getRating from './getRating';

export default function calculateRating(reviews: Review[]) {
  if (!reviews.length) return 'not-rated';
  const rate = getRating(reviews);
  if (rate > 4) return 'Fantastic';
  else if (rate > 3) return 'good';
  else if (rate > 2) return 'not worth it';
  else if (rate > 1) return 'shity Place';
}
