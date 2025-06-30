"use client"

import { useState } from "react"
import { Calendar, Check, Phone, MapPin, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const sampleUsers = [
  {
    id: "1",
    name: "Fathima Rasheed",
    phone: "9876543210",
    area: "Angamaly",
    plan: "Fiber 100",
    expiry: "2024-01-15",
    status: "unpaid",
  },
  {
    id: "2",
    name: "Shajahan Ali",
    phone: "9876543211",
    area: "Kochi",
    plan: "Fiber 50",
    expiry: "2024-01-16",
    status: "paid",
  },
  {
    id: "3",
    name: "Priya Nair",
    phone: "9876543212",
    area: "Mannapuram",
    plan: "Fiber 200",
    expiry: "2024-01-15",
    status: "unpaid",
  },
  {
    id: "4",
    name: "Ravi Kumar",
    phone: "9876543213",
    area: "Angamaly",
    plan: "Fiber 150",
    expiry: "2024-01-16",
    status: "unpaid",
  },
]

export function ExpiringSection() {
  const { toast } = useToast()
  const [copiedUserId, setCopiedUserId] = useState<string | null>(null)

  const markAsPaid = (userId: string, userName: string) => {
    toast({
      title: "Payment Marked",
      description: `${userName} has been marked as paid`,
    })
  }

  const copyMessage = async (user: any) => {
    const message = `Dear ${user.name}, your ${user.plan} plan is expiring on ${user.expiry}. Please recharge to continue uninterrupted service. Contact us at 0484-1234567 for assistance. - ABC ISP`

    try {
      await navigator.clipboard.writeText(message)
      setCopiedUserId(user.id)
      toast({
        title: "Message Copied!",
        description: `Reminder message for ${user.name} copied to clipboard`,
      })

      // Reset the copied state after 3 seconds
      setTimeout(() => {
        setCopiedUserId(null)
      }, 3000)
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const todayUsers = sampleUsers.filter((u) => u.expiry === "2024-01-15")
  const tomorrowUsers = sampleUsers.filter((u) => u.expiry === "2024-01-16")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Expiring Plans
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
            <TabsTrigger value="today" className="text-lg">
              Today ({todayUsers.length})
            </TabsTrigger>
            <TabsTrigger value="tomorrow" className="text-lg">
              Tomorrow ({tomorrowUsers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today">
            <div className="space-y-4">
              {todayUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-6 border-2 rounded-lg bg-red-50 border-red-200"
                >
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-2">{user.name}</p>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                      <p className="text-gray-700 flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {user.phone}
                      </p>
                      <span className="hidden md:inline">•</span>
                      <p className="text-gray-700 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {user.area}
                      </p>
                      <span className="hidden md:inline">•</span>
                      <p className="text-gray-700">{user.plan}</p>
                    </div>
                    <Badge variant={user.status === "paid" ? "default" : "destructive"} className="text-base px-3 py-1">
                      {user.status === "paid" ? "✓ Paid" : "⚠ Unpaid"}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 ml-4">
                    <Button onClick={() => copyMessage(user)} size="lg" variant="outline" className="text-base px-4">
                      {copiedUserId === user.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Message
                        </>
                      )}
                    </Button>
                    {user.status === "unpaid" && (
                      <Button onClick={() => markAsPaid(user.id, user.name)} size="lg" className="text-base px-6">
                        <Check className="h-5 w-5 mr-2" />
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tomorrow">
            <div className="space-y-4">
              {tomorrowUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-6 border-2 rounded-lg bg-yellow-50 border-yellow-200"
                >
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-2">{user.name}</p>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                      <p className="text-gray-700 flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {user.phone}
                      </p>
                      <span className="hidden md:inline">•</span>
                      <p className="text-gray-700 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {user.area}
                      </p>
                      <span className="hidden md:inline">•</span>
                      <p className="text-gray-700">{user.plan}</p>
                    </div>
                    <Badge variant={user.status === "paid" ? "default" : "destructive"} className="text-base px-3 py-1">
                      {user.status === "paid" ? "✓ Paid" : "⚠ Unpaid"}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 ml-4">
                    <Button onClick={() => copyMessage(user)} size="lg" variant="outline" className="text-base px-4">
                      {copiedUserId === user.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Message
                        </>
                      )}
                    </Button>
                    {user.status === "unpaid" && (
                      <Button onClick={() => markAsPaid(user.id, user.name)} size="lg" className="text-base px-6">
                        <Check className="h-5 w-5 mr-2" />
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
