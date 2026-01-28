"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Luggage } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("type") === "host" ? "host" : "tourist"

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (step < 2) {
      setStep(step + 1)
      setIsLoading(false)
      return
    }

    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Luggage className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">TravelX</span>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Join TravelX to start your travel adventure</p>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tourist">Tourist</TabsTrigger>
            <TabsTrigger value="host">Host</TabsTrigger>
          </TabsList>

          <TabsContent value="tourist">
            <Card>
              <CardHeader>
                <CardTitle>Tourist Signup</CardTitle>
                <CardDescription>Create an account to book travel gear</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  {step === 1 ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First name</Label>
                          <Input id="first-name" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input id="last-name" placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="hello@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip code</Label>
                          <Input id="zip" placeholder="10001" required />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Processing..." : step === 1 ? "Continue" : "Create account"}
                  </Button>
                  {step > 1 && (
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(step - 1)}>
                      Back
                    </Button>
                  )}
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="host">
            <Card>
              <CardHeader>
                <CardTitle>Host Signup</CardTitle>
                <CardDescription>Create an account to rent out your travel gear</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  {step === 1 ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="host-first-name">First name</Label>
                          <Input id="host-first-name" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="host-last-name">Last name</Label>
                          <Input id="host-last-name" placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="host-email">Email</Label>
                        <Input id="host-email" type="email" placeholder="hello@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="host-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="host-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="host-phone">Phone number</Label>
                        <Input id="host-phone" type="tel" placeholder="+1 (555) 000-0000" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="host-address">Address</Label>
                        <Input id="host-address" placeholder="123 Main St" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="host-city">City</Label>
                          <Input id="host-city" placeholder="New York" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="host-zip">Zip code</Label>
                          <Input id="host-zip" placeholder="10001" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="host-id">ID verification (Passport/ID number)</Label>
                        <Input id="host-id" placeholder="ID number" required />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="host-terms" required />
                        <Label htmlFor="host-terms" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Processing..." : step === 1 ? "Continue" : "Create account"}
                  </Button>
                  {step > 1 && (
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(step - 1)}>
                      Back
                    </Button>
                  )}
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
