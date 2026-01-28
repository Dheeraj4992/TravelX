"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { Search, Send, Image, Paperclip, MoreVertical, Phone, Video, Info, Check, CheckCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for conversations
const conversations = [
  {
    id: "c1",
    user: {
      id: "u1",
      name: "Rahul Sharma",
      image: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastSeen: new Date(),
    },
    lastMessage: {
      text: "Yes, the camera is available for your dates. When would you like to pick it up?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isRead: false,
      sender: "them",
    },
    unreadCount: 1,
    item: {
      id: "i1",
      name: "DSLR Camera with Lenses",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
    },
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "Priya Patel",
      image: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    lastMessage: {
      text: "I've confirmed your booking for the trekking backpack. Your pickup code is TRX-5678.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: true,
      sender: "them",
    },
    unreadCount: 0,
    item: {
      id: "i2",
      name: "Trekking Backpack - 60L",
      image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=1964&auto=format&fit=crop",
    },
  },
  {
    id: "c3",
    user: {
      id: "u3",
      name: "Vikram Singh",
      image: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    lastMessage: {
      text: "I'm sorry, the tent is not available for those dates. Would you like to check other dates?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
      sender: "them",
    },
    unreadCount: 0,
    item: {
      id: "i3",
      name: "Camping Tent - 4 Person",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop",
    },
  },
]

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: "m1",
    text: "Hi, I'm interested in renting your DSLR camera for my trip to Delhi next week.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    sender: "me",
    status: "read",
  },
  {
    id: "m2",
    text: "Hello! Thanks for your interest. When exactly do you need it?",
    timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
    sender: "them",
    status: "read",
  },
  {
    id: "m3",
    text: "I need it from the 15th to the 20th of this month. Is it available?",
    timestamp: new Date(Date.now() - 1000 * 60 * 50), // 50 minutes ago
    sender: "me",
    status: "read",
  },
  {
    id: "m4",
    text: "Let me check my calendar...",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    sender: "them",
    status: "read",
  },
  {
    id: "m5",
    text: "Yes, the camera is available for your dates. When would you like to pick it up?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    sender: "them",
    status: "delivered",
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<any>(conversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)
  const [showConversationList, setShowConversationList] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Handle conversation selection
  const handleSelectConversation = (conversation: any) => {
    setActiveConversation(conversation)
    if (isMobileView) {
      setShowConversationList(false)
    }
  }

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim()) {
      const newMsg = {
        id: `m${messages.length + 1}`,
        text: newMessage,
        timestamp: new Date(),
        sender: "me",
        status: "sent",
      }

      setMessages([...messages, newMsg])
      setNewMessage("")

      // Simulate reply after 2 seconds
      setTimeout(() => {
        const replyMsg = {
          id: `m${messages.length + 2}`,
          text: "I can meet you at the hotel lobby at 10 AM on the 15th. Does that work for you?",
          timestamp: new Date(),
          sender: "them",
          status: "delivered",
        }

        setMessages((prev) => [...prev, replyMsg])
      }, 2000)
    }
  }

  // Format timestamp
  const formatMessageTime = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return format(date, "h:mm a")
    } else if (diffInDays === 1) {
      return "Yesterday"
    } else if (diffInDays < 7) {
      return format(date, "EEEE")
    } else {
      return format(date, "MMM d")
    }
  }

  return (
    <div className="container h-[calc(100vh-4rem)] py-4">
      <div className="flex h-full rounded-lg border overflow-hidden">
        {/* Conversation List */}
        {(showConversationList || !isMobileView) && (
          <div className="w-full md:w-1/3 border-r flex flex-col">
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${activeConversation?.id === conversation.id ? "bg-muted" : ""}`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.user.image} alt={conversation.user.name} />
                          <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.user.status === "online" && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium truncate">{conversation.user.name}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatMessageTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage.sender === "me" && "You: "}
                            {conversation.lastMessage.text}
                          </p>
                          {conversation.unreadCount > 0 && <Badge className="ml-2">{conversation.unreadCount}</Badge>}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground truncate">Re: {conversation.item.name}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <p className="text-muted-foreground mb-2">No conversations found</p>
                  <Button variant="outline" size="sm">
                    Start a New Conversation
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Conversation */}
        {activeConversation && (!isMobileView || !showConversationList) ? (
          <div className="w-full md:w-2/3 flex flex-col">
            {/* Conversation Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isMobileView && (
                  <Button variant="ghost" size="icon" onClick={() => setShowConversationList(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-left"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span className="sr-only">Back</span>
                  </Button>
                )}
                <Avatar>
                  <AvatarImage src={activeConversation.user.image} alt={activeConversation.user.name} />
                  <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{activeConversation.user.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {activeConversation.user.status === "online"
                      ? "Online"
                      : `Last seen ${format(activeConversation.user.lastSeen, "h:mm a")}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                  <span className="sr-only">Call</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                  <span className="sr-only">Video</span>
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Conversation Details</SheetTitle>
                      <SheetDescription>Information about this conversation</SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                      <div className="flex flex-col items-center gap-2 mb-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={activeConversation.user.image} alt={activeConversation.user.name} />
                          <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium text-lg">{activeConversation.user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {activeConversation.user.status === "online"
                            ? "Online"
                            : `Last seen ${format(activeConversation.user.lastSeen, "h:mm a")}`}
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">About the Item</h4>
                          <div className="flex items-center gap-3">
                            <div className="h-16 w-16 rounded overflow-hidden">
                              <img
                                src={activeConversation.item.image || "/placeholder.svg"}
                                alt={activeConversation.item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{activeConversation.item.name}</p>
                              <Button variant="link" className="p-0 h-auto text-sm" asChild>
                                <a href={`/items/${activeConversation.item.id}`}>View Item</a>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="text-sm font-medium mb-2">Actions</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start" asChild>
                              <a href={`/bookings?host=${activeConversation.user.id}`}>View Bookings</a>
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-destructive hover:text-destructive"
                            >
                              Block User
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>View item</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Mute conversation</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Item Info */}
            <div className="p-3 bg-muted/30 border-b flex items-center gap-3">
              <div className="h-10 w-10 rounded overflow-hidden">
                <img
                  src={activeConversation.item.image || "/placeholder.svg"}
                  alt={activeConversation.item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Regarding: {activeConversation.item.name}</p>
                <Button variant="link" className="p-0 h-auto text-xs" asChild>
                  <a href={`/items/${activeConversation.item.id}`}>View Item Details</a>
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p>{message.text}</p>
                    <div
                      className={`flex items-center gap-1 text-xs mt-1 ${
                        message.sender === "me" ? "text-primary-foreground/70 justify-end" : "text-muted-foreground"
                      }`}
                    >
                      <span>{format(message.timestamp, "h:mm a")}</span>
                      {message.sender === "me" &&
                        (message.status === "read" ? (
                          <CheckCheck className="h-3 w-3" />
                        ) : (
                          <Check className="h-3 w-3" />
                        ))}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button type="button" variant="ghost" size="icon">
                  <Image className="h-5 w-5" />
                  <span className="sr-only">Attach image</span>
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-md">
              <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
              <p className="text-muted-foreground mb-6">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
