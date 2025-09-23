import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import timetable from "@/lib/timetableData.json"; // JSON default import
import {
  Menu,
  Bell,
  LayoutDashboard,
  Clock,
  Users,
  Target,
  BookOpen,
  User
} from "lucide-react";

const TimetablePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const classId = "ai-1a"; // Can be dynamic
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const todayTimetable = timetable[classId]?.[todayStr] || {};
  const periods = Object.keys(todayTimetable);

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/student-dashboard" },
    { icon: Users, label: "Attendance",  path: "/student/attendance" },
    { icon: Target, label: "Interests & Goals", path: "/student/interests" },
    { icon: BookOpen, label: "Programs", path: "/student/programs" },
    { icon: Clock, label: "Curriculum" ,active: true,path:"/student/curriculum"},
    { icon: User, label: "Profile & Settings", path: "/student/profile" },
  ];
  const notifications = [
    {
      id: 1,
      title: "Timetable Reminder",
      message: "Check your classes for today",
      time: "10 min ago",
      priority: "medium",
    },
  ];

  return (
    <div className="min-h-screen dashboard-background">
      {/* Top Navbar */}
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
          <h1 className="text-xl font-bold text-white">
            Smart Curriculum and Attendance Activity
          </h1>
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
                  X
                </Button>
              </div>
              <div className="divide-y">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 hover:bg-gray-50">
                    <h4 className="font-medium text-sm text-gray-900">{n.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{n.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{n.time}</p>
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
          sidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full w-64 md:translate-x-0 md:w-16"
        )}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-12",
                      item.active &&
                        "bg-blue-50 text-blue-600 hover:bg-blue-100",
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <br/><br/><br/><br/>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {classId.toUpperCase()} Timetable - {todayStr}
            </h2>
            <p className="text-gray-600">
              Overview of your classes for today.
            </p>
          </div>

          {/* Timetable Card */}
          <Card>
            <CardHeader>
              <CardTitle>Today’s Classes</CardTitle>
            </CardHeader>
            <CardContent>
              {!periods.length ? (
                <p className="text-gray-600 text-center">No classes scheduled for today.</p>
              ) : (
                <table className="w-full table-auto border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Period</th>
                      <th className="border px-4 py-2">Subject</th>
                      <th className="border px-4 py-2">Faculty</th>
                      <th className="border px-4 py-2">Room</th>
                      <th className="border px-4 py-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {periods.map((period) => {
                      const slot = todayTimetable[period];
                      return (
                        <tr key={period} className="text-center">
                          <td className="border px-4 py-2">{period}</td>
                          {slot.free ? (
                            <td colSpan={4} className="border px-4 py-2 text-green-600 font-semibold">
                              Free
                            </td>
                          ) : (
                            <>
                              <td className="border px-4 py-2">{slot.subjectId}</td>
                              <td className="border px-4 py-2">{slot.facultyId}</td>
                              <td className="border px-4 py-2">{slot.roomId}</td>
                              <td className="border px-4 py-2">{slot.type}</td>
                            </>
                          )}
                        </tr>
                      );
                    })}
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

export default TimetablePage;
