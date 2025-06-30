"use client"

import { Calendar, Home, AlertTriangle, Phone, Settings, LogOut, Zap } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Home,
  },
  {
    id: "expiring",
    title: "Expiring Plans",
    icon: Calendar,
  },
  {
    id: "recharge",
    title: "Recharge Queue",
    icon: Zap,
  },
  {
    id: "incidents",
    title: "Current Incidents",
    icon: AlertTriangle,
  },
  {
    id: "incident",
    title: "Report Incident",
    icon: AlertTriangle,
  },
  {
    id: "escalations",
    title: "Escalations",
    icon: Phone,
  },
]

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="font-bold text-lg text-center">ABC ISP</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    size="lg"
                    isActive={activeSection === item.id}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <div className="flex items-center gap-3 text-base">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex items-center gap-3">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
