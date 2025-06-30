"use client"

import { useState } from "react"
import { Search, Check, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
]

const activities = [
  "Fathima marked as paid - 2:30 PM",
  "Fiber cut reported in Mannapuram - 2:15 PM",
  "Shajahan recharged completed - 1:45 PM",
  "Power outage resolved in Kochi - 1:30 PM",
]

export function DashboardSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const { toast } = useToast()

  const handleSearch = () => {
    const user = sampleUsers.find(
      (u) =>
        u.phone.includes(searchQuery) ||
        u.id === searchQuery ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setSearchResult(user || null)
    if (!user) {
      toast({
        title: "User not found",
        description: "Please check the phone number or user ID",
        variant: "destructive",
      })
    }
  }

  const markAsPaid = (userId: string, userName: string) => {
    toast({
      title: "Payment Marked",
      description: `${userName} has been marked as paid`,
    })
    if (searchResult) {
      setSearchResult({ ...searchResult, status: "paid" })
    }
  }

  return (
    <div className="space-y-6">
      {/* User Search & Payment Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Search className="h-6 w-6" />
            Search & Mark Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-3">
            <Input
              placeholder="Search by Phone or User ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg h-14"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} size="lg" className="px-8 h-14 text-lg">
              Search
            </Button>
          </div>

          {searchResult && (
            <div className="border-2 rounded-lg p-6 bg-blue-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="font-bold text-xl mb-2">{searchResult.name}</p>
                  <p className="text-gray-700 flex items-center gap-2 mb-1">
                    <Phone className="h-5 w-5" />
                    <span className="text-lg">{searchResult.phone}</span>
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{searchResult.area}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 text-lg mb-1">
                    Plan: <span className="font-medium">{searchResult.plan}</span>
                  </p>
                  <p className="text-gray-700 text-lg mb-3">
                    Expires: <span className="font-medium">{searchResult.expiry}</span>
                  </p>
                  <Badge
                    variant={searchResult.status === "paid" ? "default" : "destructive"}
                    className="text-base px-4 py-2"
                  >
                    {searchResult.status === "paid" ? "✓ Paid" : "⚠ Unpaid"}
                  </Badge>
                </div>
              </div>
              {searchResult.status === "unpaid" && (
                <Button
                  onClick={() => markAsPaid(searchResult.id, searchResult.name)}
                  size="lg"
                  className="w-full md:w-auto text-lg px-8 py-4"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Mark as Paid
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border-l-4 border-blue-200 bg-blue-50 rounded-r-lg"
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <p className="text-base">{activity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
