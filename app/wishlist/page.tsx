"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MapPin, Star, Trash2, Camera, MountainIcon as Mountains, Tent, Umbrella } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock data for wishlist items
const wishlistItems = [
  {
    id: "w1",
    name: "DSLR Camera with Lenses",
    category: "Photography",
    location: "Delhi, India",
    price: 1800,
    rating: 4.8,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
    host: {
      name: "Rahul Sharma",
      image: "/placeholder.svg?height=40&width=40",
    },
    available: true,
    icon: Camera,
    addedOn: "2023-07-15",
  },
  {
    id: "w2",
    name: "Trekking Backpack - 60L",
    category: "Hiking",
    location: "Manali, India",
    price: 600,
    rating: 4.6,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=1964&auto=format&fit=crop",
    host: {
      name: "Priya Patel",
      image: "/placeholder.svg?height=40&width=40",
    },
    available: true,
    icon: Mountains,
    addedOn: "2023-08-02",
  },
  {
    id: "w3",
    name: "Camping Tent - 4 Person",
    category: "Camping",
    location: "Rishikesh, India",
    price: 800,
    rating: 4.7,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop",
    host: {
      name: "Vikram Singh",
      image: "/placeholder.svg?height=40&width=40",
    },
    available: false,
    icon: Tent,
    addedOn: "2023-08-10",
  },
  {
    id: "w4",
    name: "Beach Umbrella and Chairs Set",
    category: "Beach",
    location: "Goa, India",
    price: 500,
    rating: 4.5,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop",
    host: {
      name: "Anjali Nair",
      image: "/placeholder.svg?height=40&width=40",
    },
    available: true,
    icon: Umbrella,
    addedOn: "2023-09-05",
  },
]

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems)
  const [activeTab, setActiveTab] = useState("all")

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  // Filter items based on active tab
  const filteredItems =
    activeTab === "all"
      ? items
      : activeTab === "available"
        ? items.filter((item) => item.available)
        : items.filter((item) => !item.available)

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">Items you've saved for later</p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Items ({items.length})</TabsTrigger>
              <TabsTrigger value="available">Available ({items.filter((item) => item.available).length})</TabsTrigger>
              <TabsTrigger value="unavailable">
                Unavailable ({items.filter((item) => !item.available).length})
              </TabsTrigger>
            </TabsList>

            {items.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear your wishlist?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all items from your wishlist. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => setItems([])}>Clear All</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <TabsContent value="all" className="space-y-4">
            {renderWishlistItems(filteredItems, handleRemoveItem)}
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            {renderWishlistItems(filteredItems, handleRemoveItem)}
          </TabsContent>

          <TabsContent value="unavailable" className="space-y-4">
            {renderWishlistItems(filteredItems, handleRemoveItem)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function renderWishlistItems(items: any[], handleRemoveItem: (id: string) => void) {
  return items.length > 0 ? (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
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
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <item.icon className="h-3 w-3" /> {item.category}
                </CardDescription>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove from wishlist?</AlertDialogTitle>
                    <AlertDialogDescription>This will remove {item.name} from your wishlist.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleRemoveItem(item.id)}>Remove</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{item.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{item.rating}</span>
                <span className="text-xs text-muted-foreground">({item.reviews})</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Added on {new Date(item.addedOn).toLocaleDateString()}
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <Button className="w-full" asChild disabled={!item.available}>
              <Link href={`/items/${item.id}`}>{item.available ? "View Details" : "Not Available"}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Heart className="h-12 w-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
      <p className="text-muted-foreground mt-2 mb-6">Save items you like by clicking the heart icon</p>
      <Button asChild>
        <Link href="/explore">Explore Items</Link>
      </Button>
    </div>
  )
}
