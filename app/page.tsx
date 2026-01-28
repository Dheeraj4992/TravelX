import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Star, Camera, MountainIcon as Mountains, Tent } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <section className="relative h-[500px] rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=2073&auto=format&fit=crop')",
          }}
        />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white p-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore Like a Local</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Rent travel gear from locals and experience destinations like never before
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/explore">Find Gear</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
              <Link href="/host-dashboard">Become a Host</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Camping Gear",
              icon: Tent,
              image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop",
            },
            {
              title: "Photography",
              icon: Camera,
              image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
            },
            {
              title: "Trekking",
              icon: Mountains,
              image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
            },
            {
              title: "Winter Sports",
              icon: Star,
              image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2069&auto=format&fit=crop",
            },
          ].map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find the best {category.title.toLowerCase()} from locals near your destination.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={`/explore?category=${category.title.toLowerCase()}`}>Browse {category.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Popular Destinations in India</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Manali",
              image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop",
              description: "Explore the beautiful mountains and valleys",
            },
            {
              name: "Goa",
              image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2074&auto=format&fit=crop",
              description: "Enjoy beaches and water activities",
            },
            {
              name: "Rishikesh",
              image: "https://images.unsplash.com/photo-1544032527-042957c6f7ce?q=80&w=2070&auto=format&fit=crop",
              description: "Adventure sports and spiritual experiences",
            },
          ].map((destination, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 w-full relative">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm">{destination.description}</p>
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">India</span>
                </div>
                <Button size="sm" asChild>
                  <Link href={`/locations?search=${destination.name}`}>Explore</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Search & Book",
              description: "Find the perfect gear for your adventure and book it in seconds.",
              image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f2?q=80&w=2070&auto=format&fit=crop",
            },
            {
              title: "Scan QR Code",
              description: "Meet the local host and scan the QR code to start your rental.",
              image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=2070&auto=format&fit=crop",
            },
            {
              title: "Return & Review",
              description: "Return the gear when you're done and share your experience.",
              image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
            },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
                <img src={step.image || "/placeholder.svg"} alt={step.title} className="h-full w-full object-cover" />
              </div>
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-muted p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Ready for your next adventure?</h2>
            <p className="text-lg mb-6">
              Join TravelX today and discover a new way to travel across India. Rent gear from locals and travel
              lighter.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/explore">Explore Gear</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop"
              alt="Adventure"
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
