/*export type OfferCardData ={
    name: string;
    type: string;
    id: string;
    city: string;
    price: number;
    rating: number;
    popularity: number;
    features: string[];
    imageUrl: string;
    point: Point;
    isFavorite: boolean;
    isPremium: boolean;
  }*/
  export type Location = {
    latitude: number
    longitude: number
    zoom: number
  }

  
export type City = {
  name: string;
  location: Location;
};

export type OfferCardData =  {
  id: string
  title: string
  type: string
  price: number
  city: City
  location: Location,
  isFavorite: boolean
  isPremium: boolean
  rating: number
  previewImage: string
};


export type CityPoints = {[city:string]:City};

export type OffersByCity = {
  [city: string]: OfferCardData[];
}

export type Point = {
    name:string;
    location: Location;
  };

export type Points = Point[];

export type Review = {
  userName: string;
  text: string;
  rating: number;
}

export type Reviews = Review[]

export type MapSize = {
  height: string;
  width: string;

}
