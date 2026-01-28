"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const categories = [
  { value: "photography", label: "Photography" },
  { value: "camping", label: "Camping" },
  { value: "hiking", label: "Hiking" },
  { value: "water-sports", label: "Water Sports" },
  { value: "winter-sports", label: "Winter Sports" },
  { value: "outdoor", label: "Outdoor" },
]

export default function AddListingPage() {
  const [activeTab, setActiveTab] = useState("details")
  const [images, setImages] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const nextTab = () => {
    if (activeTab === "details") setActiveTab("photos")
    else if (activeTab === "photos") setActiveTab("pricing")
    else if (activeTab === "pricing") setActiveTab("preview")
  }

  const prevTab = () => {
    if (activeTab === "photos") setActiveTab("details")
    else if (activeTab === "pricing") setActiveTab("photos")
    else if (activeTab === "preview") setActiveTab("pricing")
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/host-dashboard">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back to dashboard</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Listing</h1>
            <p className="text-muted-foreground">List your travel gear and start earning</p>
          </div>
        </div>

        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="details" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input id="name" placeholder="e.g. Canon EOS R5 Camera" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail..."
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Features</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a feature..."
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddFeature()
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddFeature}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
                          <span>{feature}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 rounded-full p-0"
                            onClick={() => handleRemoveFeature(index)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. Tokyo, Japan" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="photos" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Upload Photos</Label>
                    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8">
                      <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <div className="text-lg font-medium">Drag & drop your photos here</div>
                        <div className="text-sm text-muted-foreground">or click to browse (max 5 photos)</div>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="image-upload"
                        onChange={handleImageUpload}
                      />
                      <Button asChild>
                        <label htmlFor="image-upload">Upload Photos</label>
                      </Button>
                    </div>
                  </div>

                  {images.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Photos</Label>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Uploaded image ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute right-1 top-1 h-6 w-6 rounded-full"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Day ($)</Label>
                    <Input id="price" type="number" min="1" placeholder="e.g. 45" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit">Security Deposit ($)</Label>
                    <Input id="deposit" type="number" min="0" placeholder="e.g. 100" />
                    <p className="text-xs text-muted-foreground">
                      This amount will be held as a security deposit and returned after the item is returned in good
                      condition.
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available" />
                        <Label htmlFor="available">Item is available for rent</Label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        You can toggle this off at any time to temporarily hide your listing.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Rental Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="hourly" />
                        <Label htmlFor="hourly">Allow hourly rentals</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="daily" defaultChecked />
                        <Label htmlFor="daily">Allow daily rentals</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="weekly" defaultChecked />
                        <Label htmlFor="weekly">Allow weekly rentals</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6">
                <div className="space-y-4">
                  <div className="rounded-lg border">
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      {images.length > 0 ? (
                        <img
                          src={images[0] || "/placeholder.svg"}
                          alt="Item preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <p className="text-muted-foreground">No images uploaded</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Canon EOS R5 Camera</h3>
                      <p className="text-sm text-muted-foreground">Photography • Tokyo, Japan</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-sm">$45 / day</div>
                        <div className="text-sm">Security Deposit: $100</div>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-2">
                        <h4 className="font-medium">Description</h4>
                        <p className="text-sm">
                          Professional DSLR camera with multiple lenses perfect for capturing the beautiful scenery of
                          Tokyo.
                        </p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {features.length > 0 ? (
                            features.map((feature, index) => (
                              <div key={index} className="rounded-full bg-muted px-3 py-1 text-xs">
                                {feature}
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">No features added</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Listing Summary</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Category:</span>
                        <span className="text-sm font-medium">Photography</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Price:</span>
                        <span className="text-sm font-medium">$45 / day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Security Deposit:</span>
                        <span className="text-sm font-medium">$100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Location:</span>
                        <span className="text-sm font-medium">Tokyo, Japan</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Photos:</span>
                        <span className="text-sm font-medium">{images.length} uploaded</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Features:</span>
                        <span className="text-sm font-medium">{features.length} added</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
            <CardFooter className="flex justify-between">
              {activeTab !== "details" && (
                <Button variant="outline" onClick={prevTab}>
                  Previous
                </Button>
              )}
              {activeTab !== "preview" ? (
                <Button className="ml-auto" onClick={nextTab}>
                  Next
                </Button>
              ) : (
                <Button className="ml-auto">Publish Listing</Button>
              )}
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
