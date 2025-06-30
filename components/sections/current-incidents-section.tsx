"use client"

import { AlertTriangle, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const incidents = [
  {
    id: "1",
    area: "Mannapuram",
    type: "Fiber Cut",
    status: "active",
    reportedAt: "9:45 AM",
    description: "Main fiber cable damaged near bus stand",
    affectedUsers: 45,
    priority: "high",
  },
  {
    id: "2",
    area: "Kochi",
    type: "Power Outage",
    status: "resolved",
    reportedAt: "8:30 AM",
    description: "Power supply restored after maintenance",
    affectedUsers: 12,
    priority: "medium",
  },
  {
    id: "3",
    area: "Angamaly",
    type: "Equipment Failure",
    status: "active",
    reportedAt: "1:15 PM",
    description: "Router malfunction at distribution point",
    affectedUsers: 23,
    priority: "high",
  },
  {
    id: "4",
    area: "Kochi",
    type: "Network Congestion",
    status: "active",
    reportedAt: "2:30 PM",
    description: "High traffic causing slow speeds",
    affectedUsers: 67,
    priority: "medium",
  },
]

export function CurrentIncidentsSection() {
  const { toast } = useToast()

  const markResolved = (incidentId: string, area: string, type: string) => {
    toast({
      title: "Incident Resolved",
      description: `${type} in ${area} has been marked as resolved`,
    })
  }

  const escalateIncident = (incidentId: string, area: string, type: string) => {
    toast({
      title: "Incident Escalated",
      description: `${type} in ${area} has been escalated to technical team`,
    })
  }

  const activeIncidents = incidents.filter((incident) => incident.status === "active")
  const resolvedIncidents = incidents.filter((incident) => incident.status === "resolved")

  return (
    <div className="space-y-6">
      {/* Active Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            Active Incidents ({activeIncidents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeIncidents.map((incident) => (
              <div key={incident.id} className="p-6 border-2 rounded-lg bg-red-50 border-red-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{incident.type}</h3>
                      <Badge variant={incident.priority === "high" ? "destructive" : "secondary"} className="text-sm">
                        {incident.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-gray-700">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{incident.area}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Reported: {incident.reportedAt}</span>
                      </div>
                      <div className="text-orange-600 font-medium">👥 {incident.affectedUsers} users affected</div>
                    </div>

                    <div className="mb-4 p-3 bg-white rounded border">
                      <p className="text-gray-700">{incident.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    onClick={() => markResolved(incident.id, incident.area, incident.type)}
                    className="flex-1 text-base"
                  >
                    ✅ Mark Resolved
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => escalateIncident(incident.id, incident.area, incident.type)}
                    className="flex-1 text-base"
                  >
                    🚨 Escalate to Tech Team
                  </Button>
                </div>
              </div>
            ))}

            {activeIncidents.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No active incidents</p>
                <p className="text-base">All systems are running normally</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recently Resolved Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            ✅ Recently Resolved ({resolvedIncidents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {resolvedIncidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium text-base">
                      {incident.type} - {incident.area}
                    </p>
                    <Badge variant="default" className="text-sm">
                      ✓ RESOLVED
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reported: {incident.reportedAt} • {incident.affectedUsers} users were affected
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{incident.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
