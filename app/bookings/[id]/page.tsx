"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Calendar, Camera, ChevronLeft, Clock, Download, MapPin, MessageSquare, QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const bookings = [
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
    itemImage: "/placeholder.svg?height=200&width=300",
    bookingCode: "TRX-12345",
    pickupInstructions: "Meet at the hotel lobby. I'll bring the camera with all accessories.",
    returnInstructions: "Return to the same location. Please make sure all items are included.",
    icon: Camera,
  },
]

export default function BookingDetailsPage() {
  const params = useParams()
  const bookingId = params.id as string

  // Find the booking by ID
  const booking = bookings.find((b) => b.id === bookingId) || bookings[0] // Fallback to first booking if not found

  const [showQRCode, setShowQRCode] = useState(false)

  // Format dates
  const startDate = new Date(booking.startDate).toLocaleDateString()
  const endDate = new Date(booking.endDate).toLocaleDateString()

  // Calculate rental duration in days
  const rentalDays = Math.ceil(
    (new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/bookings">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back to bookings</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Booking #{booking.bookingCode}</span>
              <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>{booking.status}</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={booking.itemImage || "/placeholder.svg"}
                      alt={booking.itemName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{booking.itemName}</CardTitle>
                    <CardDescription className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <booking.icon className="h-3 w-3" /> {booking.category}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {booking.location}
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Rental Period</div>
                      <div className="text-sm text-muted-foreground">
                        {startDate} - {endDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">{rentalDays} days</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Host Information</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={booking.hostImage} alt={booking.hostName} />
                      <AvatarFallback>{booking.hostName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">{booking.hostName}</div>
                    <Button variant="outline" size="sm" className="ml-auto gap-1">
                      <MessageSquare className="h-4 w-4" />
                      Contact Host
                    </Button>
                  </div>
                </div>

                <Separator />

                <Tabs defaultValue="pickup">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pickup">Pickup Instructions</TabsTrigger>
                    <TabsTrigger value="return">Return Instructions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pickup" className="space-y-4 pt-4">
                    <p className="text-sm">{booking.pickupInstructions}</p>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-sm font-medium">Pickup QR Code</h4>
                      <p className="text-xs text-muted-foreground">
                        Show this QR code to the host when picking up the item
                      </p>
                      <Button onClick={() => setShowQRCode(true)} className="gap-2">
                        <QrCode className="h-4 w-4" />
                        Show QR Code
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="return" className="space-y-4 pt-4">
                    <p className="text-sm">{booking.returnInstructions}</p>
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="text-sm font-medium">Return Deadline</h4>
                      <p className="text-sm text-muted-foreground">Please return by 6:00 PM on {endDate}</p>
                      <p className="text-xs text-muted-foreground mt-2">Late returns will incur additional charges</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <QrCode className="h-4 w-4" />
                      View QR Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Booking QR Code</DialogTitle>
                      <DialogDescription>Show this QR code to the host when picking up the item</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center gap-4 py-4">
                      <div className="h-64 w-64 bg-white p-4">
                        <img src="/placeholder.svg?height=200&width=200" alt="QR Code" className="h-full w-full" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Booking #{booking.bookingCode}</div>
                        <div className="text-sm text-muted-foreground">{booking.itemName}</div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button className="gap-2 ml-auto">
                  <MessageSquare className="h-4 w-4" />
                  Message Host
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Booking #{booking.bookingCode}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Rental fee ({rentalDays} days)</span>
                    <span>${booking.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${Math.round(booking.price * 0.1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance</span>
                    <span>${Math.round(booking.price * 0.05)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${booking.price + Math.round(booking.price * 0.15)}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h4 className="text-sm font-medium">Payment Method</h4>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-8 w-12 rounded bg-background" />
                    <div className="text-sm">
                      <div>Visa ending in 4242</div>
                      <div className="text-xs text-muted-foreground">Expires 12/25</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download Invoice
                </Button>
                <div className="text-center text-xs text-muted-foreground">
                  Need help?{" "}
                  <Link href="/help" className="underline">
                    Contact support
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
