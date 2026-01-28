"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Camera, Edit, MapPin, Star, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data
const user = {
  id: "u1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  bio: "Avid traveler and photography enthusiast. Love exploring new places and capturing memories.",
  image: "/placeholder.svg?height=200&width=200",
  joinedDate: "2022-05-15",
  type: "tourist",
  verified: true,
}

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
    image: "/placeholder.svg?height=100&width=150",
    icon: Camera,
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
    image: "/placeholder.svg?height=100&width=150",
    icon: Camera,
  },
]

const reviews = [
  {
    id: "r1",
    itemName: "Camping Tent - 4 Person",
    hostName: "Michael Brown",
    hostImage: "/placeholder.svg?height=40&width=40",
    date: "2023-06-16",
    rating: 5,
    comment:
      "Great tent! It was spacious, easy to set up, and kept us dry during a light rain. Michael was very helpful and provided clear instructions.",
  },
  {
    id: "r2",
    itemName: "Surfboard - Beginner",
    hostName: "Sarah Johnson",
    hostImage: "/placeholder.svg?height=40&width=40",
    date: "2023-05-26",
    rating: 4,
    comment:
      "The surfboard was perfect for a beginner like me. Sarah gave me some tips which were really helpful. Would rent again!",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(user)

  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to the server
    setIsEditing(false)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.image} alt={profileData.name} />
                    <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {profileData.verified && (
                    <div className="absolute -right-2 bottom-0">
                      <Badge className="bg-primary">Verified</Badge>
                    </div>
                  )}
                </div>
                <CardTitle>{profileData.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span className="capitalize">{profileData.type}</span>
                </CardDescription>
                <div className="mt-2 text-sm text-muted-foreground">
                  Member since {new Date(profileData.joinedDate).toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button className="w-full" onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Contact Information</h3>
                    <div className="text-sm">
                      <div>{profileData.email}</div>
                      <div>{profileData.phone}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Address</h3>
                    <div className="text-sm">{profileData.address}</div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">About Me</h3>
                    <div className="text-sm">{profileData.bio}</div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings">Account Settings</Link>
              </Button>
              <Button variant="outline" className="w-full text-destructive hover:text-destructive" asChild>
                <Link href="/logout">Log Out</Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="md:col-span-2">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bookings">Booking History</TabsTrigger>
                <TabsTrigger value="reviews">My Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-4 pt-4">
                <h2 className="text-xl font-semibold">Past Bookings</h2>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex gap-4">
                          <div className="h-16 w-16 overflow-hidden rounded-md">
                            <img
                              src={booking.image || "/placeholder.svg"}
                              alt={booking.itemName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-base">{booking.itemName}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <booking.icon className="h-3 w-3" /> {booking.category}
                            </CardDescription>
                            <div className="mt-1 flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{booking.location}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(booking.startDate).toLocaleDateString()} -{" "}
                              {new Date(booking.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < booking.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{booking.rating}/5</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={booking.hostImage} alt={booking.hostName} />
                            <AvatarFallback>{booking.hostName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">{booking.hostName}</div>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/bookings/${booking.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4 pt-4">
                <h2 className="text-xl font-semibold">Reviews I've Written</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{review.itemName}</CardTitle>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <CardDescription>Reviewed on {new Date(review.date).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={review.hostImage} alt={review.hostName} />
                            <AvatarFallback>{review.hostName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">Host: {review.hostName}</div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              Edit Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Your Review</DialogTitle>
                              <DialogDescription>Update your review for {review.itemName}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex justify-center space-x-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Button key={i} variant="ghost" size="icon" className="h-8 w-8">
                                    <Star
                                      className={`h-6 w-6 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                                    />
                                  </Button>
                                ))}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="comment">Your Review</Label>
                                <Textarea id="comment" defaultValue={review.comment} className="min-h-[100px]" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
