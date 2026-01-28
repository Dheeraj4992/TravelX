"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, IndianRupee, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Booking {
  id: string
  itemName: string
  host: string
  location: string
  startDate: string
  endDate: string
  price: number
  status: "active" | "completed" | "cancelled"
  image: string
  duration: number
}

const mockBookings: Booking[] = [
  {
    id: "1",
    itemName: "Mountain Trekking Kit",
    host: "Raj Kumar",
    location: "Himachal Pradesh",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    price: 4500,
    status: "active",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    duration: 5,
  },
  {
    id: "2",
    itemName: "Scuba Diving Gear",
    host: "Marina Divers",
    location: "Goa",
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    price: 8000,
    status: "completed",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=500&fit=crop",
    duration: 5,
  },
  {
    id: "3",
    itemName: "Photography Equipment",
    host: "Alex Photos",
    location: "Kerala",
    startDate: "2024-02-01",
    endDate: "2024-02-08",
    price: 6000,
    status: "active",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    duration: 7,
  },
  {
    id: "4",
    itemName: "Camping Equipment",
    host: "Adventure Gear",
    location: "Uttarakhand",
    startDate: "2023-12-20",
    endDate: "2023-12-25",
    price: 3500,
    status: "completed",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&h=500&fit=crop",
    duration: 5,
  },
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "cancelled" | "all">("all")
  const [sortBy, setSortBy] = useState<"date" | "price">("date")

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    }
    return b.price - a.price
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">My Bookings</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage and track all your rental bookings</p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="flex-1">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button
              variant={sortBy === "date" ? "default" : "outline"}
              onClick={() => setSortBy("date")}
              className="gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Date</span>
            </Button>
            <Button
              variant={sortBy === "price" ? "default" : "outline"}
              onClick={() => setSortBy("price")}
              className="gap-2"
            >
              <IndianRupee className="h-4 w-4" />
              <span className="hidden sm:inline">Price</span>
            </Button>
          </div>
        </div>

        {/* Bookings Grid */}
        {sortedBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedBookings.map((booking) => (
              <Link key={booking.id} href={`/bookings/${booking.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-l-lg">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.itemName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                                {booking.itemName}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{booking.host}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusLabel(booking.status)}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400 mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{booking.duration} days</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                            <IndianRupee className="h-4 w-4" />
                            {booking.price.toLocaleString()}
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No bookings found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                You haven't made any {activeTab !== "all" ? activeTab : ""} bookings yet.
              </p>
              <Button asChild>
                <Link href="/explore">Start Exploring</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
