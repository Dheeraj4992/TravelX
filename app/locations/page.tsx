"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MapPin,
  Search,
  Compass,
  Camera,
  MountainIcon as Mountains,
  Umbrella,
  Backpack,
  Thermometer,
  Utensils,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for Indian locations
const indianLocations = [
  {
    id: "l1",
    name: "Manali",
    state: "Himachal Pradesh",
    type: "Hill Station",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop",
    description:
      "A high-altitude Himalayan resort town in Himachal Pradesh, known for its natural beauty and adventure activities.",
    touristPlaces: [
      {
        name: "Solang Valley",
        image: "https://images.unsplash.com/photo-1591781914058-9e97f3bd4058?q=80&w=1974&auto=format&fit=crop",
        description: "Known for adventure sports like skiing and paragliding",
        recommendedItems: [
          { name: "Ski Equipment", icon: Mountains, price: 800 },
          { name: "Trekking Poles", icon: Mountains, price: 300 },
          { name: "Thermal Wear", icon: Thermometer, price: 500 },
          { name: "Binoculars", icon: Compass, price: 400 },
        ],
      },
      {
        name: "Rohtang Pass",
        image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=1935&auto=format&fit=crop",
        description: "A high mountain pass with snow-covered landscapes",
        recommendedItems: [
          { name: "Snow Boots", icon: Mountains, price: 600 },
          { name: "Winter Jacket", icon: Thermometer, price: 1200 },
          { name: "Gloves", icon: Thermometer, price: 300 },
          { name: "Trekking Backpack", icon: Backpack, price: 800 },
        ],
      },
    ],
  },
  {
    id: "l2",
    name: "Goa",
    state: "Goa",
    type: "Beach",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2074&auto=format&fit=crop",
    description: "India's smallest state known for its beaches, nightlife, and Portuguese-influenced architecture.",
    touristPlaces: [
      {
        name: "Calangute Beach",
        image: "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1974&auto=format&fit=crop",
        description: "Popular beach known as the 'Queen of Beaches'",
        recommendedItems: [
          { name: "Beach Umbrella", icon: Umbrella, price: 300 },
          { name: "Snorkeling Gear", icon: Compass, price: 700 },
          { name: "Waterproof Camera", icon: Camera, price: 1500 },
          { name: "Beach Mat", icon: Umbrella, price: 200 },
        ],
      },
      {
        name: "Dudhsagar Falls",
        image: "https://images.unsplash.com/photo-1629397586416-bdbc9e7aac67?q=80&w=1974&auto=format&fit=crop",
        description: "Four-tiered waterfall located in the Mandovi River",
        recommendedItems: [
          { name: "Hiking Shoes", icon: Mountains, price: 800 },
          { name: "Waterproof Bag", icon: Backpack, price: 500 },
          { name: "First Aid Kit", icon: Backpack, price: 300 },
          { name: "Water Bottle", icon: Utensils, price: 200 },
        ],
      },
    ],
  },
  {
    id: "l3",
    name: "Rishikesh",
    state: "Uttarakhand",
    type: "Adventure",
    image: "https://images.unsplash.com/photo-1544032527-042957c6f7ce?q=80&w=2070&auto=format&fit=crop",
    description: "A city in India's northern state of Uttarakhand, known as the 'Yoga Capital of the World'.",
    touristPlaces: [
      {
        name: "Laxman Jhula",
        image: "https://images.unsplash.com/photo-1584246805693-1e3ef01b4c49?q=80&w=1974&auto=format&fit=crop",
        description: "Famous suspension bridge across the river Ganges",
        recommendedItems: [
          { name: "DSLR Camera", icon: Camera, price: 1800 },
          { name: "Tripod", icon: Camera, price: 500 },
          { name: "Comfortable Shoes", icon: Mountains, price: 700 },
          { name: "Sun Hat", icon: Umbrella, price: 200 },
        ],
      },
      {
        name: "Rafting in Ganges",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop",
        description: "White water rafting in the holy river Ganges",
        recommendedItems: [
          { name: "Waterproof Bag", icon: Backpack, price: 500 },
          { name: "Waterproof Camera", icon: Camera, price: 1500 },
          { name: "Quick-dry Clothes", icon: Thermometer, price: 600 },
          { name: "Water Shoes", icon: Mountains, price: 400 },
        ],
      },
    ],
  },
  {
    id: "l4",
    name: "Jaipur",
    state: "Rajasthan",
    type: "Heritage",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070&auto=format&fit=crop",
    description: "The capital of Rajasthan, known as the 'Pink City' for its distinctive terracotta pink buildings.",
    touristPlaces: [
      {
        name: "Amber Fort",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1976&auto=format&fit=crop",
        description: "Magnificent fort overlooking Maota Lake",
        recommendedItems: [
          { name: "DSLR Camera", icon: Camera, price: 1800 },
          { name: "Wide Angle Lens", icon: Camera, price: 1200 },
          { name: "Sun Hat", icon: Umbrella, price: 200 },
          { name: "Water Bottle", icon: Utensils, price: 200 },
        ],
      },
      {
        name: "Hawa Mahal",
        image: "https://images.unsplash.com/photo-1599661046251-3c1dd09e4f44?q=80&w=2070&auto=format&fit=crop",
        description: "Palace of Winds with its unique honeycomb facade",
        recommendedItems: [
          { name: "Tripod", icon: Camera, price: 500 },
          { name: "Comfortable Shoes", icon: Mountains, price: 700 },
          { name: "Binoculars", icon: Compass, price: 400 },
          { name: "Umbrella", icon: Umbrella, price: 300 },
        ],
      },
    ],
  },
  {
    id: "l5",
    name: "Darjeeling",
    state: "West Bengal",
    type: "Hill Station",
    image: "https://images.unsplash.com/photo-1544032527-042957c6f7ce?q=80&w=2070&auto=format&fit=crop",
    description: "A town in India's West Bengal state, in the Himalayan foothills, known for its tea plantations.",
    touristPlaces: [
      {
        name: "Tiger Hill",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop",
        description: "Famous for sunrise views of Kanchenjunga and Mount Everest",
        recommendedItems: [
          { name: "Binoculars", icon: Compass, price: 400 },
          { name: "Thermal Wear", icon: Thermometer, price: 500 },
          { name: "Tripod", icon: Camera, price: 500 },
          { name: "Thermos Flask", icon: Utensils, price: 300 },
        ],
      },
      {
        name: "Darjeeling Himalayan Railway",
        image: "https://images.unsplash.com/photo-1591781914058-9e97f3bd4058?q=80&w=1974&auto=format&fit=crop",
        description: "UNESCO World Heritage toy train",
        recommendedItems: [
          { name: "DSLR Camera", icon: Camera, price: 1800 },
          { name: "Light Jacket", icon: Thermometer, price: 800 },
          { name: "Comfortable Shoes", icon: Mountains, price: 700 },
          { name: "Backpack", icon: Backpack, price: 600 },
        ],
      },
    ],
  },
]

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [selectedPlace, setSelectedPlace] = useState<any>(null)

  // Filter locations based on search query
  const filteredLocations = indianLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location)
    setSelectedPlace(null)
  }

  const handlePlaceSelect = (place: any) => {
    setSelectedPlace(place)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Explore Locations in India</h1>
          <p className="text-muted-foreground">
            Discover popular tourist destinations and find the perfect gear for your trip
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for locations, states, or types (e.g., Manali, Rajasthan, Beach)..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {!selectedLocation ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="h-48 w-full relative">
                    <img
                      src={location.image || "/placeholder.svg"}
                      alt={location.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/80 text-primary hover:bg-white/70">{location.type}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {location.state}, India
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{location.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Explore {location.name}</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold">No locations found</h2>
                <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setSelectedLocation(null)}>
                Back to All Locations
              </Button>
              <h2 className="text-2xl font-bold">
                {selectedLocation.name}, {selectedLocation.state}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <img
                  src={selectedLocation.image || "/placeholder.svg"}
                  alt={selectedLocation.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <Badge>{selectedLocation.type}</Badge>
                <h3 className="text-xl font-semibold">About {selectedLocation.name}</h3>
                <p className="text-muted-foreground">{selectedLocation.description}</p>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{selectedLocation.state}, India</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Popular Places in {selectedLocation.name}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {selectedLocation.touristPlaces.map((place: any) => (
                  <Card
                    key={place.name}
                    className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${selectedPlace?.name === place.name ? "ring-2 ring-primary" : ""}`}
                    onClick={() => handlePlaceSelect(place)}
                  >
                    <div className="h-40 w-full">
                      <img
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{place.name}</CardTitle>
                      <CardDescription>{place.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {selectedPlace && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Recommended Gear for {selectedPlace.name}</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {selectedPlace.recommendedItems.map((item: any) => (
                    <Card key={item.name}>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-base">{item.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold">₹{item.price}/day</div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href={`/items?search=${item.name}`}>Rent Now</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
