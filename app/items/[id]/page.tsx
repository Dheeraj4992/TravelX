"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Calendar,
  Camera,
  ChevronLeft,
  Heart,
  Info,
  MapPin,
  MessageSquare,
  Share2,
  Star,
  MountainIcon as Mountains,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Mock data with Indian locations and currency
const items = [
  {
    id: "i1",
    name: "DSLR Camera with Lenses",
    category: "Photography",
    location: "Delhi, India",
    price: 1800,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=2070&auto=format&fit=crop",
    ],
    description:
      "Professional DSLR camera with multiple lenses perfect for capturing the beautiful scenery of Delhi. Includes a 24-70mm lens, 70-200mm lens, and a 50mm prime lens. Battery life lasts all day and comes with 2 extra batteries and a charger.",
    features: ["24-70mm lens", "70-200mm lens", "50mm prime lens", "2 extra batteries", "Camera bag", "Tripod"],
    host: {
      id: "h1",
      name: "Rahul Sharma",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      responseRate: 98,
      responseTime: "within an hour",
      joined: "2020-05-15",
      verified: true,
    },
    available: true,
    icon: Camera,
    similarItems: ["i2", "i5"],
  },
  {
    id: "i2",
    name: "Trekking Poles",
    category: "Hiking",
    location: "Manali, India",
    price: 600,
    rating: 4.6,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
    ],
    description:
      "Lightweight and durable trekking poles perfect for hiking in the Himalayas. Adjustable height and comfortable grip handles. Folds down for easy packing and comes with a carrying case.",
    features: ["Adjustable height", "Lightweight aluminum", "Comfortable grip", "Foldable design", "Carrying case"],
    host: {
      id: "h2",
      name: "Priya Patel",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.7,
      responseRate: 95,
      responseTime: "within a day",
      joined: "2019-08-10",
      verified: true,
    },
    available: true,
    icon: Mountains,
    similarItems: ["i4", "i7"],
  },
  {
    id: "i5",
    name: "GoPro Hero 10",
    category: "Photography",
    location: "Goa, India",
    price: 1500,
    rating: 4.5,
    reviews: 78,
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525385444278-b7968b2b38f8?q=80&w=1974&auto=format&fit=crop",
    ],
    description:
      "Capture your beach adventures in Goa with this high-quality GoPro Hero 10. Waterproof up to 10 meters and comes with various mounts for different activities.",
    features: [
      "4K video recording",
      "Waterproof design",
      "Image stabilization",
      "Various mounts included",
      "Extra battery",
      "32GB SD card",
    ],
    host: {
      id: "h5",
      name: "Arjun Reddy",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.4,
      responseRate: 90,
      responseTime: "within a few hours",
      joined: "2021-03-20",
      verified: true,
    },
    available: true,
    icon: Camera,
    similarItems: ["i1", "i6"],
  },
  {
    id: "i7",
    name: "Trekking Backpack - 60L",
    category: "Hiking",
    location: "Darjeeling, India",
    price: 900,
    rating: 4.7,
    reviews: 95,
    images: [
      "https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501554728187-ce583db33af7?q=80&w=1973&auto=format&fit=crop",
    ],
    description:
      "Spacious 60L backpack perfect for multi-day treks in Darjeeling. Features multiple compartments, padded shoulder straps, and a rain cover.",
    features: [
      "60L capacity",
      "Multiple compartments",
      "Padded shoulder straps",
      "Hip belt",
      "Rain cover",
      "Hydration system compatible",
    ],
    host: {
      id: "h7",
      name: "Sanjay Gupta",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      responseRate: 97,
      responseTime: "within an hour",
      joined: "2020-01-15",
      verified: true,
    },
    available: true,
    icon: Mountains,
    similarItems: ["i2", "i4"],
  },
]

export default function ItemDetailsPage() {
  const params = useParams()
  const itemId = params.id as string

  // Find the item by ID
  const item = items.find((i) => i.id === itemId) || items[0] // Fallback to first item if not found

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 3)))
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Calculate rental duration in days
  const rentalDays = date && endDate ? Math.ceil((endDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)) : 0

  // Calculate total price
  const totalPrice = item.price * rentalDays * quantity

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/explore">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back to explore</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <item.icon className="h-4 w-4" />
                <span>{item.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>{item.rating}</span>
                <span>({item.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={isWishlisted ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500" : ""}`} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Carousel className="w-full">
              <CarouselContent>
                {item.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video overflow-hidden rounded-xl">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${item.name} - Image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="mt-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About this item</h2>
                <p className="text-muted-foreground">{item.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Features</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Meet your host</h2>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={item.host.image} alt={item.host.name} />
                    <AvatarFallback>{item.host.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{item.host.name}</h3>
                      {item.host.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span>{item.host.rating} rating</span>
                      </div>
                      <div>Response rate: {item.host.responseRate}%</div>
                      <div>Response time: {item.host.responseTime}</div>
                      <div>Joined in {new Date(item.host.joined).getFullYear()}</div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      Contact Host
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl">
                  ₹{item.price} <span className="text-sm font-normal text-muted-foreground">/ day</span>
                </CardTitle>
                <CardDescription>Book this item for your trip</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Start Date</span>
                    <span>End Date</span>
                  </div>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) => date < (new Date() || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      -
                    </Button>
                    <div className="w-12 text-center">{quantity}</div>
                    <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        ₹{item.price} x {rentalDays} days
                      </span>
                      <span>₹{item.price * rentalDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity</span>
                      <span>x {quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>₹{Math.round(totalPrice * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{totalPrice + Math.round(totalPrice * 0.1)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">Book Now</Button>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Info className="h-3 w-3" />
                  <span>You won't be charged yet</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Similar Items</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items
              .filter((i) => item.similarItems.includes(i.id))
              .map((similarItem) => (
                <Card key={similarItem.id} className="overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-background/80 hover:bg-background/70">₹{similarItem.price}/day</Badge>
                    </div>
                    <img
                      src={similarItem.images[0] || "/placeholder.svg"}
                      alt={similarItem.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="p-3">
                    <CardTitle className="text-base">{similarItem.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <similarItem.icon className="h-3 w-3" /> {similarItem.category}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-3 pt-0 flex justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{similarItem.rating}</span>
                      <span className="text-xs text-muted-foreground">({similarItem.reviews})</span>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/items/${similarItem.id}`}>View</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
