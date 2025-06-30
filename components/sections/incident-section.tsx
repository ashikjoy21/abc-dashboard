"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const incidents = [
  { id: "1", area: "Mannapuram", type: "Fiber Cut", status: "active", reportedAt: "9:45 AM" },
  { id: "2", area: "Kochi", type: "Power Outage", status: "resolved", reportedAt: "8:30 AM" },
  { id: "3", area: "Angamaly", type: "Equipment Failure", status: "active", reportedAt: "1:15 PM" },
]

export function IncidentSection() {
  const { toast } = useToast()

  const reportIncident = () => {
    toast({
      title: "🚨 Incident Reported",
      description: "Incident has been reported successfully and assigned to technical team",
    })
  }

  const markResolved = (incidentId: string, area: string) => {
    toast({
      title: "✅ Incident Resolved",
      description: `${area} incident has been marked as resolved`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Report New Incident */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Report New Incident
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium mb-2">Area</label>
              <Select>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="angamaly">Angamaly</SelectItem>
                  <SelectItem value="kochi">Kochi</SelectItem>
                  <SelectItem value="mannapuram">Mannapuram</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-base font-medium mb-2">Issue Type</label>
              <Select>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Issue Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fiber-cut">Fiber Cut</SelectItem>
                  <SelectItem value="power-outage">Power Outage</SelectItem>
                  <SelectItem value="equipment-failure">Equipment Failure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium mb-2">Additional Details</label>
            <Textarea placeholder="Describe the issue in detail..." className="min-h-24 text-base" />
          </div>

          <Button onClick={reportIncident} className="w-full" size="lg">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Report Incident
          </Button>
        </CardContent>
      </Card>

      {/* Current Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Current Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between p-6 border-2 rounded-lg bg-red-50 border-red-200"
              >
                <div className="flex-1">
                  <p className="font-bold text-lg mb-2">
                    {incident.area} - {incident.type}
                  </p>
                  <p className="text-gray-700 text-base mb-3">Reported: {incident.reportedAt}</p>
                  <Badge
                    variant={incident.status === "resolved" ? "default" : "destructive"}
                    className="text-base px-3 py-1"
                  >
                    {incident.status === "resolved" ? "✓ Resolved" : "⚠ Active"}
                  </Badge>
                </div>
                {incident.status === "active" && (
                  <Button
                    onClick={() => markResolved(incident.id, incident.area)}
                    size="lg"
                    className="ml-4 text-lg px-6"
                  >
                    Mark Resolved
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
