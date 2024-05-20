import { OfferCardData } from '../types/types';
const OFFERS: OfferCardData[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374031,
        longitude: 4.88969,
        zoom: 12,
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 14,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'img/apartment-01.jpg'
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374031,
        longitude: 4.88969,
        zoom: 12,
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 14,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: 'img/room.jpg'
  }
];

export default OFFERS;
