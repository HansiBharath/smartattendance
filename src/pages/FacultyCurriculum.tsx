import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Bell,
  LayoutDashboard,
  Users,
  BookOpen,
  User,
  Clock,
  Calendar,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import facultyTimetable from "@/lib/faculty_allocations.json"; // JSON with faculty schedule

const FacultyCurriculumPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const facultyId = "FAC009"; // later dynamic
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const allocations = facultyTimetable[facultyId]?.allocations || [];
  const todayAllocations = allocations.filter((a: any) => a.date === todayStr);

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/faculty/faculty-dashboard" },
    { icon: Users, label: "Attendance", path: "/faculty/attendance" },
    { icon: Clock, label: "Curriculum", active: true, path: "/faculty/curriculum" },
    { icon: GraduationCap, label: "Programs", path: "/faculty/programs" },
    { icon: User, label: "Profile & Settings", path: "/faculty/profile" },
  ];

  const notifications = [
    {
      id: 1,
      type: "system",
      title: "New Schedule Update",
      message: "Curriculum data synced successfully.",
      time: "30 mins ago",
      priority: "high",
    },
    {
      id: 2,
      type: "system",
      title: "Reminder",
      message: "Don’t forget to mark attendance after each class.",
      time: "2 hours ago",
      priority: "medium",
    },
  ];

  return (
    <div className="min-h-screen dashboard-background">
      {/* Top Navigation */}
      <nav className="nav-bar h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/20"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-white">Smart Curriculum & Attendance Activity</h1>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="text-white hover:bg-white/20 relative"
          >
            <Bell className="h-6 w-6" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </Button>

          {/* Notification Dropdown */}
          {notificationOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNotificationOpen(false)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                          notification.priority === "high" && "bg-red-500",
                          notification.priority === "medium" && "bg-yellow-500",
                          notification.priority === "low" && "bg-green-500"
                        )}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{notification.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 h-full bg-white shadow-lg border-r transition-transform duration-300 z-40",
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0 md:w-16"
        )}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-12",
                      item.active && "bg-blue-50 text-blue-600 hover:bg-blue-100",
                      !sidebarOpen && "md:justify-center md:px-0"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {(sidebarOpen || window.innerWidth < 768) && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "pt-20 p-6 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-0 md:ml-16"
        )}
      >
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <br /><br /><br /><br />
            <h2 className="text-3xl font-bold text-gray-900">Schedule for {facultyId}</h2>
            <p className="text-gray-600 mt-2">Date: {todayStr}</p>
          </div>

          {/* Curriculum Table */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today’s Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayAllocations.length === 0 ? (
                <p className="text-gray-600 text-center">
                  No classes scheduled for today ({todayStr})
                </p>
              ) : (
                <table className="w-full table-auto border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Period</th>
                      <th className="border px-4 py-2">Section</th>
                      <th className="border px-4 py-2">Subject</th>
                      <th className="border px-4 py-2">Room</th>
                      <th className="border px-4 py-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAllocations.map((slot: any, idx: number) => (
                      <tr key={idx} className="text-center">
                        <td className="border px-4 py-2">{slot.period}</td>
                        <td className="border px-4 py-2">{slot.sectionId}</td>
                        <td className="border px-4 py-2">{slot.subjectId}</td>
                        <td className="border px-4 py-2">{slot.roomId}</td>
                        <td className="border px-4 py-2 capitalize">{slot.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default FacultyCurriculumPage;
