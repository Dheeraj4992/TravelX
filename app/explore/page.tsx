"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Camera,
  Filter,
  Luggage,
  MapPin,
  SearchIcon,
  Star,
  Umbrella,
  Compass,
  Snowflake,
  MountainIcon as Mountains,
  Tent,
  Backpack,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data with Indian locations
const items = [
  {
    id: "i1",
    name: "DSLR Camera with Lenses",
    category: "Photography",
    location: "Delhi, India",
    price: 1800,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
    host: {
      name: "Rahul Sharma",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    available: true,
    icon: Camera,
  },
  {
    id: "i2",
    name: "Trekking Poles",
    category: "Hiking",
    location: "Manali, India",
    price: 600,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=1964&auto=format&fit=crop",
    host: {
      name: "Priya Patel",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    available: true,
    icon: Mountains,
  },
  {
    id: "i3",
    name: "Ski Equipment - Complete Set",
    category: "Winter Sports",
    location: "Shimla, India",
    price: 2500,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2069&auto=format&fit=crop",
    host: {
      name: "Vikram Singh",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    available: false,
    icon: Snowflake,
  },
  {
    id: "i4",
    name: "Camping Tent - 4 Person",
    category: "Camping",
    location: "Rishikesh, India",
    price: 1200,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop",
    host: {
      name: "Anjali Nair",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    available: true,
    icon: Tent,
  },
  {
    id: "i5",
    name: "GoPro Hero 10",
    category: "Photography",
    location: "Goa, India",
    price: 1500,
    rating: 4.5,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop",
    host: {
      name: "Arjun Reddy",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.4,
    },
    available: true,
    icon: Camera,
  },
  {
    id: "i6",
    name: "Surfboard - Beginner",
    category: "Water Sports",
    location: "Goa, India",
    price: 800,
    rating: 4.3,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1531722569936-825d3dd91b15?q=80&w=2070&auto=format&fit=crop",
    host: {
      name: "Meera Desai",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
    },
    available: true,
    icon: Compass,
  },
  {
    id: "i7",
    name: "Trekking Backpack - 60L",
    category: "Hiking",
    location: "Darjeeling, India",
    price: 900,
    rating: 4.7,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=1964&auto=format&fit=crop",
    host: {
      name: "Sanjay Gupta",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    available: true,
    icon: Backpack,
  },
  {
    id: "i8",
    name: "Mountain Bike",
    category: "Outdoor",
    location: "Munnar, India",
    price: 1400,
    rating: 4.6,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop",
    host: {
      name: "Kiran Kumar",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
    },
    available: true,
    icon: Compass,
  },
]

const categories = [
  { name: "Photography", icon: Camera },
  { name: "Hiking", icon: Mountains },
  { name: "Winter Sports", icon: Snowflake },
  { name: "Camping", icon: Tent },
  { name: "Water Sports", icon: Compass },
  { name: "Outdoor", icon: Umbrella },
]

const locations = [
  "Delhi, India",
  "Mumbai, India",
  "Bangalore, India",
  "Manali, India",
  "Shimla, India",
  "Rishikesh, India",
  "Goa, India",
  "Darjeeling, India",
  "Munnar, India",
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [sortBy, setSortBy] = useState("recommended")

  // Filter items based on search criteria
  const filteredItems = items.filter((item) => {
    // Filter by search query
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by categories
    if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
      return false
    }

    // Filter by locations
    if (selectedLocations.length > 0 && !selectedLocations.includes(item.location)) {
      return false
    }

    // Filter by price range
    if (item.price < priceRange[0] || item.price > priceRange[1]) {
      return false
    }

    // Filter by availability
    if (showAvailableOnly && !item.available) {
      return false
    }

    return true
  })

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Explore Travel Gear</h1>
          <p className="text-muted-foreground">Find the perfect travel gear for your next adventure in India</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, category, or location..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your search results</SheetDescription>
                  </SheetHeader>

                  <div className="py-4 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Price Range (per day)</h3>
                      <div className="pt-4">
                        <Slider
                          defaultValue={[0, 3000]}
                          max={3000}
                          step={100}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">₹{priceRange[0]}</span>
                          <span className="text-sm">₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="categories">
                        <AccordionTrigger>Categories</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {categories.map((category) => (
                              <div key={category.name} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`category-${category.name}`}
                                  checked={selectedCategories.includes(category.name)}
                                  onCheckedChange={() => toggleCategory(category.name)}
                                />
                                <Label htmlFor={`category-${category.name}`} className="flex items-center gap-2">
                                  <category.icon className="h-4 w-4" />
                                  {category.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="locations">
                        <AccordionTrigger>Locations</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {locations.map((location) => (
                              <div key={location} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`location-${location}`}
                                  checked={selectedLocations.includes(location)}
                                  onCheckedChange={() => toggleLocation(location)}
                                />
                                <Label htmlFor={`location-${location}`} className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  {location}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="available-only"
                        checked={showAvailableOnly}
                        onCheckedChange={(checked) => setShowAvailableOnly(checked === true)}
                      />
                      <Label htmlFor="available-only">Show available items only</Label>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedCategories([])
                          setSelectedLocations([])
                          setPriceRange([0, 3000])
                          setShowAvailableOnly(false)
                        }}
                      >
                        Reset Filters
                      </Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => toggleCategory(category.name)}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedItems.length > 0 ? (
            sortedItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video w-full relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-background/80 hover:bg-background/70">₹{item.price}/day</Badge>
                  </div>
                  {!item.available && (
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg">
                        Not Available
                      </Badge>
                    </div>
                  )}
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
                </div>
                <CardHeader className="p-3">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <item.icon className="h-3 w-3" /> {item.category}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {item.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-xs text-muted-foreground">({item.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground">Hosted by</div>
                      <div className="flex items-center gap-1">
                        <img
                          src={item.host.image || "/placeholder.svg"}
                          alt={item.host.name}
                          className="h-5 w-5 rounded-full object-cover"
                        />
                        <span className="text-sm">{item.host.name}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 pt-0">
                  <Button className="w-full" asChild disabled={!item.available}>
                    <Link href={`/items/${item.id}`}>{item.available ? "View Details" : "Not Available"}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <Luggage className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">No items found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategories([])
                  setSelectedLocations([])
                  setPriceRange([0, 3000])
                  setShowAvailableOnly(false)
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
