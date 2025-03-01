import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"

  import { MessageCircleQuestion, BatteryCharging } from "lucide-react"
  
  export function AppSidebar() {
    const items = [
        {
          title: "AI Assistant",
          url: "/chat",
          icon: MessageCircleQuestion,
        },
        {
          title: "RAG",
          url: "/rag",
          icon: BatteryCharging,
        },
      ]

    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                  >
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon size={24} />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  