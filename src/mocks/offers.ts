export interface OfferCardData {
    name: string;
    type: string;
    id: number,
    price: number;
    rating: number;
    mark:boolean;
    features: string[];
    imageUrl: string;
  }
  
  const offers: OfferCardData[] = [
    {
      name: "Beautiful & luxurious studio at great location",
      type: "Apartment",
      id: 1,
      price: 120,
      rating: 4.8,
      mark: true,
      features: ["Wi-Fi", "Washing machine", "Towels", "Heating", "Coffee machine"],
      imageUrl: "img/apartment-01.jpg"
    },
    {
      name: "Wood and stone place",
      type: "Room",
      id: 2,
      price: 80,
      rating: 4.5,
      mark: false,
      features: ["Wi-Fi", "Heating", "Kitchen", "Fridge"],
      imageUrl: "img/room.jpg"
    },
    {
      name: "Canal View Prinsengracht",
      type: "Apartment",
      id: 3,
      price: 132,
      rating: 4.9,
      mark: false,
      features: ["Wi-Fi", "Washing machine", "Kitchen", "Dishwasher"],
      imageUrl: "img/apartment-02.jpg"
    },
    {
      name: "Nice, cozy, warm big bed apartment",
      type: "Apartment",
      id: 4,
      price: 180,
      rating: 5.0,
      mark: false,
      features: ["Wi-Fi", "Towels", "Heating", "Cabel TV"],
      imageUrl: "img/apartment-03.jpg"
    }
  ];
  
  export default offers;
  