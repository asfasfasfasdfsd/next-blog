import Main from './main';
import { Cuisine, PRICE, PrismaClient, Location, Review } from '@prisma/client';
const prisma = new PrismaClient();
export interface RestaurantCardType {
  id: number;
  name: String;
  main_image: String;
  price: PRICE;
  slug: String;
  cuisin: Cuisine;
  location: Location;
  review: Review[];
}
const getRestaurants = async (): Promise<RestaurantCardType[]> => {
  const data = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      price: true,
      slug: true,
      cuisin: true,
      location: true,
      review: true,
    },
  });

  return data;
};

export default async function Home() {
  const restaurantCard = await getRestaurants();
  return (
    <>
      <Main restaurantCard={restaurantCard} />
    </>
  );
}
