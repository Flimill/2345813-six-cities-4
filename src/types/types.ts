export type OfferCardData ={
    name: string;
    type: string;
    id: number;
    price: number;
    rating: number;
    mark:boolean;
    features: string[];
    imageUrl: string;
  }

export type City = {
    title: string;
    lat: number;
    lng: number;
    zoom: number;
  };

export type Point = {
    name: string;
    lat: number;
    lng: number;
  };

export type Points = Point[];

export type Review = {
  user_name: string;
  text: string;
  rating: number;
}

export type Reviews = Review[]

export type MapSize = {
  height: string;
  width: string;

}
