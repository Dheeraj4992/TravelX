"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, Star, Umbrella, Camera, Compass, Snowflake } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data
const upcomingBookings = [
  {
    id: "b1",
    itemName: "Canon EOS R5 Camera",
    category: "Photography",
    location: "Tokyo, Japan",
    startDate: "2023-08-15",
    endDate: "2023-08-20",
    hostName: "Akira Tanaka",
    hostImage: "/placeholder.svg?height=40&width=40",
    status: "confirmed",
    price: 250,
  },
  {
    id: "b2",
    itemName: "Mountain Bike - Trek X-Caliber",
    category: "Outdoor",
    location: "Vancouver, Canada",
    startDate: "2023-09-05",
    endDate: "2023-09-10",
    hostName: "Emma Wilson",
    hostImage: "/placeholder.svg?height=40&width=40",
    status: "pending",
    price: 120,
  },
]

const pastBookings = [
  {
    id: "b3",
    itemName: "Camping Tent - 4 Person",
    category: "Camping",
    location: "Yosemite, USA",
    startDate: "2023-06-10",
    endDate: "2023-06-15",
    hostName: "Michael Brown",
    hostImage: "/placeholder.svg?height=40&width=40",
    status: "completed",
    price: 85,
    rating: 5,
  },
  {
    id: "b4",
    itemName: "Surfboard - Beginner",
    category: "Water Sports",
    location: "Bali, Indonesia",
    startDate: "2023-05-20",
    endDate: "2023-05-25",
    hostName: "Sarah Johnson",
    hostImage: "/placeholder.svg?height=40&width=40",
    status: "completed",
    price: 70,
    rating: 4,
  },
]

const recommendations = [
  {
    id: "r1",
    name: "DSLR Camera with Lenses",
    category: "Photography",
    location: "Kyoto, Japan",
    price: 45,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=300",
    icon: Camera,
  },
  {
    id: "r2",
    name: "Trekking Poles",
    category: "Hiking",
    location: "Zurich, Switzerland",
    price: 15,
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300",
    icon: Compass,
  },
  {
    id: "r3",
    name: "Ski Equipment - Complete Set",
    category: "Winter Sports",
    location: "Aspen, USA",
    price: 60,
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=300",
    icon: Snowflake,
  },
  {
    id: "r4",
    name: "Camping Gear Bundle",
    category: "Camping",
    location: "Banff, Canada",
    price: 75,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    icon: Umbrella,
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground">Manage your bookings and discover new travel gear</p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingBookings.length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("bookings")}>
                    View all bookings
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$525</div>
                  <p className="text-xs text-muted-foreground">+$125 from last month</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    View spending history
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+5 new items added</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href="/wishlist">View wishlist</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("bookings")}>
                  View all
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{booking.itemName}</CardTitle>
                        <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>{booking.status}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {booking.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(booking.startDate).toLocaleDateString()} -{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">5 days</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.hostImage} alt={booking.hostName} />
                          <AvatarFallback>{booking.hostName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">{booking.hostName}</div>
                      </div>
                      <div className="font-semibold">${booking.price}</div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recommended for You</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("recommendations")}>
                  View all
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {recommendations.slice(0, 4).map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-video w-full relative">
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-background/80 hover:bg-background/70">${item.price}/day</Badge>
                      </div>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <item.icon className="h-3 w-3" /> {item.category}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-3 pt-0 flex justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-xs text-muted-foreground">({item.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{booking.itemName}</CardTitle>
                        <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>{booking.status}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {booking.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(booking.startDate).toLocaleDateString()} -{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">5 days</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.hostImage} alt={booking.hostName} />
                          <AvatarFallback>{booking.hostName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">{booking.hostName}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/messages?host=${booking.hostName}`}>Contact</Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/bookings/${booking.id}`}>View</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Past Bookings</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {pastBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{booking.itemName}</CardTitle>
                        <Badge variant="secondary">{booking.status}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {booking.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(booking.startDate).toLocaleDateString()} -{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-primary fill-primary" />
                          <span className="text-sm">{booking.rating}/5</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.hostImage} alt={booking.hostName} />
                          <AvatarFallback>{booking.hostName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">{booking.hostName}</div>
                      </div>
                      <div className="font-semibold">${booking.price}</div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recommended for Your Next Trip</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-video w-full relative">
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-background/80 hover:bg-background/70">${item.price}/day</Badge>
                      </div>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <item.icon className="h-3 w-3" /> {item.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{item.rating}</span>
                          <span className="text-xs text-muted-foreground">({item.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                      <Button className="w-full" asChild>
                        <Link href={`/items/${item.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
