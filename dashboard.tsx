"use client"

import { useState } from "react"
import { AppSidebar } from "./components/app-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSection } from "./components/sections/dashboard-section"
import { ExpiringSection } from "./components/sections/expiring-section"
import { RechargeSection } from "./components/sections/recharge-section"
import { IncidentSection } from "./components/sections/incident-section"
import { EscalationsSection } from "./components/sections/escalations-section"
import { CurrentIncidentsSection } from "./components/sections/current-incidents-section"

const sectionTitles = {
  dashboard: "Dashboard Overview",
  expiring: "Expiring Plans",
  recharge: "Recharge Queue",
  incidents: "Current Incidents",
  incident: "Report New Incident",
  escalations: "Escalated Cases",
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [selectedRegion, setSelectedRegion] = useState("angamaly")

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />
      case "expiring":
        return <ExpiringSection />
      case "recharge":
        return <RechargeSection />
      case "incidents":
        return <CurrentIncidentsSection />
      case "incident":
        return <IncidentSection />
      case "escalations":
        return <EscalationsSection />
      default:
        return <DashboardSection />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <SidebarInset>
        {/* Top Bar */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b-2 px-6 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ABC ISP Operator Dashboard</h1>
              <p className="text-base text-gray-600">{sectionTitles[activeSection]}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-base font-medium">Region:</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40 h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="angamaly">Angamaly</SelectItem>
                <SelectItem value="kochi">Kochi</SelectItem>
                <SelectItem value="mannapuram">Mannapuram</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-50 min-h-screen">{renderActiveSection()}</div>

        {/* Powered by Bolt Badge - Bottom Right */}
        <div className="fixed bottom-4 right-4 z-50">
          <img
            src="/images/bolt-badge.png"
            alt="Powered by Bolt"
            className="w-16 h-16 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
