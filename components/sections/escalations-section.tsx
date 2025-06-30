"use client"

import { Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const escalatedCalls = [
  {
    id: "1",
    name: "Abdul Rahman",
    phone: "9876543214",
    issue: "Internet not working for 2 days",
    priority: "high",
    receivedAt: "2:30 PM",
  },
  {
    id: "2",
    name: "Meera Thomas",
    phone: "9876543215",
    issue: "Slow speed complaint - getting only 10 Mbps instead of 100 Mbps",
    priority: "medium",
    receivedAt: "1:45 PM",
  },
  {
    id: "3",
    name: "Rajesh Kumar",
    phone: "9876543216",
    issue: "Frequent disconnections during video calls",
    priority: "medium",
    receivedAt: "12:15 PM",
  },
]

export function EscalationsSection() {
  const { toast } = useToast()

  const assignTechnician = (callId: string, customerName: string) => {
    toast({
      title: "👨‍🔧 Technician Assigned",
      description: `Technician has been assigned to ${customerName}'s case and will contact them within 2 hours`,
    })
  }

  const markResolved = (callId: string, customerName: string) => {
    toast({
      title: "✅ Case Resolved",
      description: `${customerName}'s case has been successfully resolved`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Phone className="h-6 w-6" />
          Escalated Cases ({escalatedCalls.length} pending)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {escalatedCalls.map((call) => (
            <div key={call.id} className="p-6 border-2 rounded-lg bg-yellow-50 border-yellow-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="h-5 w-5" />
                    <p className="font-bold text-lg">{call.name}</p>
                    <Badge variant={call.priority === "high" ? "destructive" : "secondary"} className="text-sm">
                      {call.priority.toUpperCase()} PRIORITY
                    </Badge>
                  </div>
                  <p className="text-gray-700 text-base mb-2">📞 {call.phone}</p>
                  <p className="text-gray-600 text-sm mb-3">Escalated at: {call.receivedAt}</p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-white rounded-lg border">
                <p className="font-medium text-base mb-2">Issue Description:</p>
                <p className="text-gray-700">{call.issue}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => assignTechnician(call.id, call.name)}
                  className="flex-1 text-base"
                >
                  👨‍🔧 Assign Technician
                </Button>
                <Button size="lg" onClick={() => markResolved(call.id, call.name)} className="flex-1 text-base">
                  ✅ Mark Resolved
                </Button>
              </div>
            </div>
          ))}

          {escalatedCalls.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No escalated cases</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
