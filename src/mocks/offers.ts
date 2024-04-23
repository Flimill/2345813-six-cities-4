import { OfferCardData } from '../types/types';
const OFFERS: OfferCardData[] = [
  {
    name: 'Beautiful & luxurious studio at great location',
    type: 'Apartment',
    id: 1,
    city: 'Amsterdam',
    price: 120,
    rating: 4,
    popularity: 100,
    mark: true,
    features: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine'],
    imageUrl: 'img/apartment-01.jpg',
    point:{
      name: 'Beautiful & luxurious studio at great location',
      lat: 52.3909553943508,
      lng: 4.85309666406198
    }
  },
  {
    name: 'Wood and stone place',
    type: 'Room',
    city: 'Amsterdam',
    id: 2,
    price: 80,
    rating: 4.5,
    popularity: 5,
    mark: false,
    features: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge'],
    imageUrl: 'img/room.jpg',
    point:{
      name: 'Wood and stone place',
      lat: 52.3609553943508,
      lng: 4.85309666406198
    }
  },
  {
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    id: 3,
    city: 'Amsterdam',
    price: 132,
    rating: 2.5,
    popularity: 10,
    mark: false,
    features: ['Wi-Fi', 'Washing machine', 'Kitchen', 'Dishwasher'],
    imageUrl: 'img/apartment-02.jpg',
    point:{
      name: 'Canal View Prinsengracht',
      lat: 52.3909553943508,
      lng: 4.929309666406198
    }
  },
  {
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    id: 4,
    city: 'Amsterdam',
    price: 180,
    popularity: 200,
    rating: 5.0,
    mark: false,
    features: ['Wi-Fi', 'Towels', 'Heating', 'Cabel TV'],
    imageUrl: 'img/apartment-03.jpg',
    point:{
      name: 'Nice, cozy, warm big bed apartment',
      lat: 52.3809553943508,
      lng: 4.939309666406198
    }
  }
];

export default OFFERS;
