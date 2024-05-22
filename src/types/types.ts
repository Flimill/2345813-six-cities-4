
export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
  }


export type City = {
  name: string;
  location: Location;
};

export type OfferCardData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type FullOfferCardData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: [string];
  host: Host;
  images: [string];
  maxAdults: number;
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
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
  }

export type Reviews = Review[]

export type MapSize = {
  height: string;
  width: string;

}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
  }

export type LoginData = {
  email:string;
  password:string;
}

export type ReviewData = {
  offerId:string;
  comment:string;
  rating:number;
}


export type updateFavoriteData = {
  offerId:string;
  status:number;
}
