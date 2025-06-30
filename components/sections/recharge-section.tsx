"use client"

import { Zap, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const rechargeQueue = [
  { id: "1", name: "Shajahan Ali", phone: "9876543211", area: "Kochi", markedAt: "10:30 AM", status: "pending" },
  { id: "2", name: "Ravi Kumar", phone: "9876543213", area: "Angamaly", markedAt: "11:15 AM", status: "pending" },
  { id: "3", name: "Meera Thomas", phone: "9876543215", area: "Mannapuram", markedAt: "12:00 PM", status: "pending" },
  { id: "4", name: "Abdul Rahman", phone: "9876543214", area: "Kochi", markedAt: "12:30 PM", status: "pending" },
]

export function RechargeSection() {
  const { toast } = useToast()

  const markRechargeComplete = (userId: string, userName: string) => {
    toast({
      title: "✅ Recharge Complete",
      description: `${userName}'s recharge has been completed successfully`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Zap className="h-6 w-6" />
          Recharge Queue ({rechargeQueue.length} pending)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rechargeQueue.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-6 border-2 rounded-lg bg-orange-50 border-orange-200"
            >
              <div className="flex-1">
                <p className="font-bold text-lg mb-2">{item.name}</p>
                <p className="text-gray-700 text-base mb-1">{item.phone}</p>
                <p className="text-gray-700 text-base mb-3">
                  {item.area} • Marked at {item.markedAt}
                </p>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Pending Recharge
                </Badge>
              </div>
              <Button
                size="lg"
                onClick={() => markRechargeComplete(item.id, item.name)}
                className="ml-4 text-lg px-6 bg-green-600 hover:bg-green-700"
              >
                <Check className="h-5 w-5 mr-2" />
                Mark Done
              </Button>
            </div>
          ))}

          {rechargeQueue.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No pending recharges</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
