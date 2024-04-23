export type OfferCardData ={
    name: string;
    type: string;
    id: number;
    city: string;
    price: number;
    rating: number;
    popularity: number;
    mark:boolean;
    features: string[];
    imageUrl: string;
    point: Point;
  }

export type City = {
    title: string;
    lat: number;
    lng: number;
    zoom: number;
  };

export type CityPoints = {[city:string]:City};

export type OffersByCity = {
  [city: string]: OfferCardData[];
}

export type Point = {
    name:string;
    lat: number;
    lng: number;
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
