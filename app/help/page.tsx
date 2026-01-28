"use client"

import { useState } from "react"
import Link from "next/link"
import { HelpCircle, Mail, MessageSquare, Phone, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Mock data for FAQs
const faqs = [
  {
    category: "Account",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. You can sign up as either a tourist or a host. Fill in your details, verify your email address, and you're good to go!",
      },
      {
        question: "How do I reset my password?",
        answer:
          "If you've forgotten your password, click on the 'Login' button, then select 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password.",
      },
      {
        question: "Can I change my account type from tourist to host?",
        answer:
          "Yes, you can change your account type. Go to your profile settings, and under the 'Account' tab, you'll find an option to switch between tourist and host accounts.",
      },
    ],
  },
  {
    category: "Bookings",
    questions: [
      {
        question: "How do I book an item?",
        answer:
          "To book an item, browse through the available listings, select the item you want to rent, choose your rental dates, and click 'Book Now'. You'll be prompted to complete the payment process to confirm your booking.",
      },
      {
        question: "Can I cancel my booking?",
        answer:
          "Yes, you can cancel your booking. Go to your 'Bookings' page, find the booking you want to cancel, and click on 'Cancel Booking'. Please note that cancellation policies vary depending on the host and how close you are to the rental date.",
      },
      {
        question: "What happens if the item is damaged during my rental period?",
        answer:
          "If an item is damaged during your rental period, you may be responsible for the repair or replacement costs. We recommend taking photos of the item before and after your rental period as documentation.",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept various payment methods including credit/debit cards, UPI, and net banking. All payments are processed securely through our payment gateway.",
      },
      {
        question: "When will I be charged for my booking?",
        answer:
          "You'll be charged the full amount when you confirm your booking. For some high-value items, a security deposit may also be required, which will be refunded after the rental period if the item is returned in good condition.",
      },
      {
        question: "How do refunds work?",
        answer:
          "If you cancel a booking, the refund amount depends on the host's cancellation policy. Refunds are typically processed within 5-7 business days and will be credited back to your original payment method.",
      },
    ],
  },
  {
    category: "Hosting",
    questions: [
      {
        question: "How do I list an item for rent?",
        answer:
          "To list an item, sign in as a host, go to your dashboard, and click on 'Add Listing'. Fill in the details about your item, upload photos, set your pricing, and publish your listing.",
      },
      {
        question: "How much can I charge for my items?",
        answer:
          "You have complete freedom to set your own prices. We recommend researching similar items in your area to determine competitive pricing. You can also offer discounts for longer rental periods.",
      },
      {
        question: "When will I receive payment for my rentals?",
        answer:
          "Payments are released to hosts 24 hours after the rental period begins. This allows time for the renter to confirm that the item is as described. Funds will be transferred to your linked bank account.",
      },
    ],
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter FAQs based on search query and active category
  const filteredFaqs = faqs.flatMap((category) => {
    const filteredQuestions = category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    if (filteredQuestions.length === 0) return []

    if (activeCategory !== "all" && category.category !== activeCategory) return []

    return [
      {
        ...category,
        questions: filteredQuestions,
      },
    ]
  })

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Find answers to common questions or contact our support team</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("all")}
              >
                All
              </Button>
              {faqs.map((category) => (
                <Button
                  key={category.category}
                  variant={activeCategory === category.category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.category)}
                >
                  {category.category}
                </Button>
              ))}
            </div>

            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((category) => (
                <div key={category.category} className="space-y-2">
                  <h2 className="text-xl font-semibold">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.category}-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold">No results found</h2>
                <p className="text-muted-foreground mt-2 mb-6">We couldn't find any FAQs matching your search</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Chat Support</CardTitle>
                    <CardDescription>Chat with our support team</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get instant help from our support team through live chat. Available 24/7.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Chat</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Email Support</CardTitle>
                    <CardDescription>Send us an email</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Email us at support@travelx.com for any questions or concerns. We'll respond within 24 hours.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href="mailto:support@travelx.com">Send Email</a>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Phone Support</CardTitle>
                    <CardDescription>Call our support team</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Call us at +91 1800-123-4567 for immediate assistance. Available Mon-Fri, 9 AM - 6 PM IST.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href="tel:+911800123456">Call Now</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>Send us a message and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Popular Articles</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "How to Use QR Codes for Rentals",
                description: "Learn how our QR code system makes rentals seamless and secure",
                link: "/help/articles/qr-codes",
              },
              {
                title: "Safety Tips for Renters",
                description: "Important safety guidelines to follow when renting gear from hosts",
                link: "/help/articles/safety-tips",
              },
              {
                title: "Host Verification Process",
                description: "Understanding how we verify hosts to ensure quality and trust",
                link: "/help/articles/host-verification",
              },
            ].map((article, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{article.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href={article.link}>Read Article</Link>
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
