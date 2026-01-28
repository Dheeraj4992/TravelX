"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Camera, Clock, DollarSign, MapPin, Package, PlusCircle, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data
const earnings = [
  { month: "Jan", amount: 120 },
  { month: "Feb", amount: 240 },
  { month: "Mar", amount: 380 },
  { month: "Apr", amount: 450 },
  { month: "May", amount: 560 },
  { month: "Jun", amount: 780 },
  { month: "Jul", amount: 920 },
]

const listings = [
  {
    id: "l1",
    name: "Canon EOS R5 Camera",
    category: "Photography",
    location: "Tokyo, Japan",
    price: 45,
    bookings: 12,
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=100&width=150",
    status: "active",
    icon: Camera,
  },
  {
    id: "l2",
    name: "Mountain Bike - Trek X-Caliber",
    category: "Outdoor",
    location: "Tokyo, Japan",
    price: 35,
    bookings: 8,
    rating: 4.6,
    reviews: 16,
    image: "/placeholder.svg?height=100&width=150",
    status: "active",
    icon: Camera,
  },
  {
    id: "l3",
    name: "Camping Tent - 4 Person",
    category: "Camping",
    location: "Tokyo, Japan",
    price: 25,
    bookings: 5,
    rating: 4.7,
    reviews: 10,
    image: "/placeholder.svg?height=100&width=150",
    status: "inactive",
    icon: Camera,
  },
]

const bookingRequests = [
  {
    id: "br1",
    itemName: "Canon EOS R5 Camera",
    renterName: "John Smith",
    renterImage: "/placeholder.svg?height=40&width=40",
    startDate: "2023-08-15",
    endDate: "2023-08-20",
    status: "pending",
    price: 225,
  },
  {
    id: "br2",
    itemName: "Mountain Bike - Trek X-Caliber",
    renterName: "Emma Johnson",
    renterImage: "/placeholder.svg?height=40&width=40",
    startDate: "2023-08-22",
    endDate: "2023-08-25",
    status: "pending",
    price: 105,
  },
]

const confirmedBookings = [
  {
    id: "cb1",
    itemName: "Canon EOS R5 Camera",
    renterName: "Michael Brown",
    renterImage: "/placeholder.svg?height=40&width=40",
    startDate: "2023-09-05",
    endDate: "2023-09-10",
    status: "confirmed",
    price: 225,
  },
]

export default function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Host Dashboard</h1>
          <p className="text-muted-foreground">Manage your listings, bookings, and track your earnings</p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,450</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{listings.filter((l) => l.status === "active").length}</div>
                  <p className="text-xs text-muted-foreground">+2 new listings this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-muted-foreground">+5 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Based on 50 reviews</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your earnings over the last 7 months</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer
                    config={{
                      amount: {
                        label: "Amount ($)",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={earnings}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent bookings and reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">New booking request</p>
                        <p className="text-xs text-muted-foreground">
                          John Smith requested to book Canon EOS R5 Camera
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">2h ago</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">New review</p>
                        <p className="text-xs text-muted-foreground">
                          Emma Johnson left a 5-star review for Mountain Bike
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">1d ago</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Payment received</p>
                        <p className="text-xs text-muted-foreground">
                          You received $225 for Canon EOS R5 Camera rental
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">2d ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Booking Requests</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("bookings")}>
                  View all
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {bookingRequests.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{booking.itemName}</CardTitle>
                        <Badge variant="outline">{booking.status}</Badge>
                      </div>
                      <CardDescription>
                        {new Date(booking.startDate).toLocaleDateString()} -{" "}
                        {new Date(booking.endDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.renterImage} alt={booking.renterName} />
                          <AvatarFallback>{booking.renterName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">{booking.renterName}</div>
                        <div className="ml-auto font-semibold">${booking.price}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Decline
                      </Button>
                      <Button size="sm" className="flex-1">
                        Accept
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Listings</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("listings")}>
                  View all
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {listings.slice(0, 3).map((listing) => (
                  <Card key={listing.id}>
                    <CardHeader className="pb-2">
                      <div className="flex gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-md">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{listing.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <listing.icon className="h-3 w-3" /> {listing.category}
                          </CardDescription>
                          <div className="mt-1 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-xs">{listing.rating}</span>
                            <span className="text-xs text-muted-foreground">({listing.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{listing.location}</span>
                        </div>
                        <div className="font-semibold">${listing.price}/day</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`/listings/${listing.id}`}>Manage Listing</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <Card className="flex flex-col items-center justify-center p-6">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <PlusCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">Add New Listing</h3>
                  <p className="mb-4 text-center text-sm text-muted-foreground">
                    List your travel gear and start earning
                  </p>
                  <Button asChild>
                    <Link href="/add-listing">Add Listing</Link>
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Listings</h2>
              <Button asChild>
                <Link href="/add-listing">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Listing
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <Card key={listing.id}>
                  <CardHeader className="pb-2">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-md">
                        <img
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{listing.name}</CardTitle>
                          <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                            {listing.status}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          <listing.icon className="h-3 w-3" /> {listing.category}
                        </CardDescription>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span className="text-xs">{listing.rating}</span>
                          <span className="text-xs text-muted-foreground">({listing.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{listing.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${listing.price}/day</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{listing.bookings} bookings</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span>{listing.reviews} reviews</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/listings/${listing.id}`}>Manage</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Booking Requests</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {bookingRequests.length > 0 ? (
                  bookingRequests.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{booking.itemName}</CardTitle>
                          <Badge variant="outline">{booking.status}</Badge>
                        </div>
                        <CardDescription>
                          {new Date(booking.startDate).toLocaleDateString()} -{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={booking.renterImage} alt={booking.renterName} />
                            <AvatarFallback>{booking.renterName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">{booking.renterName}</div>
                          <div className="ml-auto font-semibold">${booking.price}</div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Decline
                        </Button>
                        <Button size="sm" className="flex-1">
                          Accept
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No booking requests</h3>
                    <p className="text-muted-foreground mt-2">
                      You don't have any pending booking requests at the moment
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Confirmed Bookings</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {confirmedBookings.length > 0 ? (
                  confirmedBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{booking.itemName}</CardTitle>
                          <Badge>{booking.status}</Badge>
                        </div>
                        <CardDescription>
                          {new Date(booking.startDate).toLocaleDateString()} -{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={booking.renterImage} alt={booking.renterName} />
                            <AvatarFallback>{booking.renterName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">{booking.renterName}</div>
                          <div className="ml-auto font-semibold">${booking.price}</div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Contact
                        </Button>
                        <Button size="sm" className="flex-1">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No confirmed bookings</h3>
                    <p className="text-muted-foreground mt-2">You don't have any confirmed bookings at the moment</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,450</div>
                  <p className="text-xs text-muted-foreground">Lifetime earnings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$920</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$350</div>
                  <p className="text-xs text-muted-foreground">Will be processed on Aug 15</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Per Item</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$115</div>
                  <p className="text-xs text-muted-foreground">Per item per month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Your earnings over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Amount ($)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={earnings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your recent payouts and earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payout Processed</p>
                        <p className="text-xs text-muted-foreground">July 31, 2023</p>
                      </div>
                    </div>
                    <div className="font-medium">$780.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Booking Payment</p>
                        <p className="text-xs text-muted-foreground">July 25, 2023 - Canon EOS R5 Camera</p>
                      </div>
                    </div>
                    <div className="font-medium">$225.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Booking Payment</p>
                        <p className="text-xs text-muted-foreground">July 18, 2023 - Mountain Bike</p>
                      </div>
                    </div>
                    <div className="font-medium">$105.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payout Processed</p>
                        <p className="text-xs text-muted-foreground">June 30, 2023</p>
                      </div>
                    </div>
                    <div className="font-medium">$560.00</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
