export interface Listing {
  id: string;
  title: string;
  category: 'Apartment' | 'Hotel' | 'Office' | 'Event Space' | 'Studio';
  country: string;
  city: string;
  area: string;
  pricePerUnit: number;
  pricePeriod: 'hour' | 'day' | 'month';
  image: string;
  rating: number;
  hostName: string;
}

export const COUNTRIES_DATA: Record<string, Record<string, string[]>> = {
  "Nigeria": {
    "Lagos": ["Victoria Island", "Lekki Phase 1", "Ikoyi", "Ikeja GRA"],
    "Abuja": ["Maitama", "Wuse II", "Asokoro", "Garki"]
  },
  "Kenya": {
    "Nairobi": ["Westlands", "Kilimani", "Karen", "CBD"]
  },
  "United States": {
    "New York": ["Manhattan", "Brooklyn", "Queens"],
    "Los Angeles": ["Downtown LA", "Hollywood", "Santa Monica"]
  },
  "United Kingdom": {
    "London": ["Soho", "Camden", "Kensington", "Mayfair"]
  }
};

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: "list-1",
    title: "Luxury 3-Bedroom Waterfront Apartment",
    category: "Apartment",
    country: "Nigeria",
    city: "Lagos",
    area: "Victoria Island",
    pricePerUnit: 150,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    hostName: "Kemi Adebayo"
  },
  {
    id: "list-2",
    title: "Executive Penthouse Suite & Lounge",
    category: "Hotel",
    country: "Nigeria",
    city: "Lagos",
    area: "Ikoyi",
    pricePerUnit: 350,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    hostName: "Grand Continental"
  },
  {
    id: "list-3",
    title: "Modern Serviced Studio Apartment",
    category: "Apartment",
    country: "Nigeria",
    city: "Lagos",
    area: "Lekki Phase 1",
    pricePerUnit: 90,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    hostName: "Toluwani Benson"
  },
  {
    id: "list-4",
    title: "Cozy 2-Bedroom Suburban Home",
    category: "Apartment",
    country: "Nigeria",
    city: "Lagos",
    area: "Ikeja GRA",
    pricePerUnit: 110,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    hostName: "Chinedu Okafor"
  },
  {
    id: "list-5",
    title: "Diplomatic Villa & Private Pool",
    category: "Apartment",
    country: "Nigeria",
    city: "Abuja",
    area: "Maitama",
    pricePerUnit: 450,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    hostName: "Amina Yusuf"
  },
  {
    id: "list-6",
    title: "Smart Office Suite & Boardroom",
    category: "Office",
    country: "Nigeria",
    city: "Abuja",
    area: "Wuse II",
    pricePerUnit: 45,
    pricePeriod: "hour",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    hostName: "Nexus Hub"
  },
  {
    id: "list-7",
    title: "Luxury Hilltop Apartment",
    category: "Apartment",
    country: "Nigeria",
    city: "Abuja",
    area: "Asokoro",
    pricePerUnit: 200,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    hostName: "Emeka Obi"
  },
  {
    id: "list-8",
    title: "Executive Business Hotel Room",
    category: "Hotel",
    country: "Nigeria",
    city: "Abuja",
    area: "Garki",
    pricePerUnit: 120,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    hostName: "Capital Lodge"
  },
  {
    id: "list-9",
    title: "Silicon Savannah Loft Apartment",
    category: "Apartment",
    country: "Kenya",
    city: "Nairobi",
    area: "Westlands",
    pricePerUnit: 130,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    hostName: "Wanjiku Mwangi"
  },
  {
    id: "list-10",
    title: "Garden View Executive Apartment",
    category: "Apartment",
    country: "Kenya",
    city: "Nairobi",
    area: "Kilimani",
    pricePerUnit: 100,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    hostName: "Kariuki Kimani"
  },
  {
    id: "list-11",
    title: "Suburban Cottage Retreat",
    category: "Apartment",
    country: "Kenya",
    city: "Nairobi",
    area: "Karen",
    pricePerUnit: 180,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    hostName: "Achieng Otieno"
  },
  {
    id: "list-12",
    title: "Manhattan Skyline Luxury Condo",
    category: "Apartment",
    country: "United States",
    city: "New York",
    area: "Manhattan",
    pricePerUnit: 400,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b4da7c5d6?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    hostName: "Sarah Jenkins"
  },
  {
    id: "list-13",
    title: "Creative Arts Loft & Studio",
    category: "Studio",
    country: "United States",
    city: "New York",
    area: "Brooklyn",
    pricePerUnit: 75,
    pricePeriod: "hour",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    hostName: "Mark Sterling"
  },
  {
    id: "list-14",
    title: "Santa Monica Beachside Apartment",
    category: "Apartment",
    country: "United States",
    city: "Los Angeles",
    area: "Santa Monica",
    pricePerUnit: 320,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    hostName: "David Miller"
  },
  {
    id: "list-15",
    title: "Historic Mayfair Boutique Apartment",
    category: "Apartment",
    country: "United Kingdom",
    city: "London",
    area: "Mayfair",
    pricePerUnit: 380,
    pricePeriod: "day",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    hostName: "Victoria Thorne"
  }
];
    
