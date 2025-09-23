
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Icons
import {
  Menu,
  Bell,
  LayoutDashboard,
  Users,
  GraduationCap,
  User,
  QrCode,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  X,
  Clock,
} from "lucide-react";

// QR Generator
import QRCode from "react-qr-code";

interface Student {
  id: number;
  name: string;
  registerNo: string;
  present: boolean;
}

const FacultyAttendancePage: React.FC = () => {
  // ───────────────────────────────
  // State
  // ───────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [showListType, setShowListType] = useState<"present" | "absent" | null>(null);


  // Dummy students
const [students] = useState<Student[]>([
  { id: 1, name: "Ananya", registerNo: "AI2025-001", present: true },
  { id: 2, name: "Meera", registerNo: "AI2025-002", present: true },
  { id: 3, name: "Priya", registerNo: "AI2025-003", present: true },
  { id: 4, name: "Ishita", registerNo: "AI2025-004", present: true },
  { id: 5, name: "Kavya", registerNo: "AI2025-005", present: true },
  { id: 6, name: "Mounika", registerNo: "AI2025-006", present: true },
  { id: 7, name: "Harika", registerNo: "AI2025-007", present: true },
  { id: 8, name: "Lakshmi", registerNo: "AI2025-008", present: true },
  { id: 9, name: "Sushma", registerNo: "AI2025-009", present: true },
  { id: 10, name: "Meghana", registerNo: "AI2025-010", present: false },
  { id: 11, name: "Navya", registerNo: "AI2025-011", present: true },
  { id: 12, name: "Shreya", registerNo: "AI2025-012", present: true },
  { id: 13, name: "Divya", registerNo: "AI2025-013", present: true },
  { id: 14, name: "Soumya", registerNo: "AI2025-014", present: true },
  { id: 15, name: "Pavani", registerNo: "AI2025-015", present: false },
  { id: 16, name: "Bhavana", registerNo: "AI2025-016", present: true },
  { id: 17, name: "Harini", registerNo: "AI2025-017", present: true },
  { id: 18, name: "Sahithi", registerNo: "AI2025-018", present: false },
  { id: 19, name: "Anusha", registerNo: "AI2025-019", present: true },
  { id: 20, name: "Sindhu", registerNo: "AI2025-020", present: true },
  { id: 21, name: "Varsha", registerNo: "AI2025-021", present: true },
  { id: 22, name: "Chaitra", registerNo: "AI2025-022", present: true },
  { id: 23, name: "Keerthi", registerNo: "AI2025-023", present: true },
  { id: 24, name: "Roshini", registerNo: "AI2025-024", present: true },
  { id: 25, name: "Aishwarya", registerNo: "AI2025-025", present: true },
  { id: 26, name: "Vaishnavi", registerNo: "AI2025-026", present: true },
  { id: 27, name: "Tanuja", registerNo: "AI2025-027", present: true },
  { id: 28, name: "Sneha", registerNo: "AI2025-028", present: false },
  { id: 29, name: "Madhuri", registerNo: "AI2025-029", present: false },
  { id: 30, name: "Sangeetha", registerNo: "AI2025-030", present: true },
  { id: 31, name: "Jyothi", registerNo: "AI2025-031", present: true },
  { id: 32, name: "Anitha", registerNo: "AI2025-032", present: false },
  { id: 33, name: "Revathi", registerNo: "AI2025-033", present: true },
  { id: 34, name: "Usha", registerNo: "AI2025-034", present: true },
  { id: 35, name: "Rajitha", registerNo: "AI2025-035", present: true },
  { id: 36, name: "Bindu", registerNo: "AI2025-036", present: true },
  { id: 37, name: "Yamini", registerNo: "AI2025-037", present: false },
  { id: 38, name: "Sunitha", registerNo: "AI2025-038", present: true },
  { id: 39, name: "Manasa", registerNo: "AI2025-039", present: true },
  { id: 40, name: "Niharika", registerNo: "AI2025-040", present: false },
  { id: 41, name: "Swathi", registerNo: "AI2025-041", present: true },
  { id: 42, name: "Geetha", registerNo: "AI2025-042", present: false },
  { id: 43, name: "Ramya", registerNo: "AI2025-043", present: true },
  { id: 44, name: "Lavanya", registerNo: "AI2025-044", present: true },
  { id: 45, name: "Padma", registerNo: "AI2025-045", present: false },
  { id: 46, name: "Saritha", registerNo: "AI2025-046", present: true },
  { id: 47, name: "Indu", registerNo: "AI2025-047", present: true },
  { id: 48, name: "Tejaswini", registerNo: "AI2025-048", present: true },
  { id: 49, name: "Komal", registerNo: "AI2025-049", present: false },
  { id: 50, name: "Triveni", registerNo: "AI2025-050", present: false },
  { id: 51, name: "Soundarya", registerNo: "AI2025-051", present: true },
  { id: 52, name: "Pallavi", registerNo: "AI2025-052", present: true },
  { id: 53, name: "Kalyani", registerNo: "AI2025-053", present: true },
  { id: 54, name: "Neelima", registerNo: "AI2025-054", present: false },
  { id: 55, name: "Prasanna", registerNo: "AI2025-055", present: true },
  { id: 56, name: "Sruthi", registerNo: "AI2025-056", present: false },
  { id: 57, name: "Reshma", registerNo: "AI2025-057", present: true },
  { id: 58, name: "Sailaja", registerNo: "AI2025-058", present: true },
  { id: 59, name: "Rajeshwari", registerNo: "AI2025-059", present: true },
  { id: 60, name: "Vineetha", registerNo: "AI2025-060", present: false },
  { id: 61, name: "Lalitha", registerNo: "AI2025-061", present: true },
  { id: 62, name: "Sravya", registerNo: "AI2025-062", present: true },
  { id: 63, name: "Vasudha", registerNo: "AI2025-063", present: false },
  { id: 64, name: "Rupali", registerNo: "AI2025-064", present: true },
  { id: 65, name: "Shanthi", registerNo: "AI2025-065", present: true },
  { id: 66, name: "Gayathri", registerNo: "AI2025-066", present: false },
  { id: 67, name: "Madhavi", registerNo: "AI2025-067", present: false },
  { id: 68, name: "Vani", registerNo: "AI2025-068", present: true },
  { id: 69, name: "Amrutha", registerNo: "AI2025-069", present: true },
  { id: 70, name: "Suchitra", registerNo: "AI2025-070", present: true },
  { id: 71, name: "Aruna", registerNo: "AI2025-071", present: true },
  { id: 72, name: "Shalini", registerNo: "AI2025-072", present: true },
  { id: 73, name: "Rekha", registerNo: "AI2025-073", present: true },
  { id: 74, name: "Sita", registerNo: "AI2025-074", present: false },
  { id: 75, name: "Nandini", registerNo: "AI2025-075", present: false },
  { id: 76, name: "Karuna", registerNo: "AI2025-076", present: true },
  { id: 77, name: "Malathi", registerNo: "AI2025-077", present: true },
  { id: 78, name: "Poornima", registerNo: "AI2025-078", present: true },
  { id: 79, name: "Jahnavi", registerNo: "AI2025-079", present: true },
  { id: 80, name: "Nirmala", registerNo: "AI2025-080", present: false },
  { id: 81, name: "Kanchana", registerNo: "AI2025-081", present: true },
  { id: 82, name: "Savitha", registerNo: "AI2025-082", present: true },
  { id: 83, name: "Kusuma", registerNo: "AI2025-083", present: true },
  { id: 84, name: "Pushpa", registerNo: "AI2025-084", present: true },
  { id: 85, name: "Kamala", registerNo: "AI2025-085", present: true },
  { id: 86, name: "Rani", registerNo: "AI2025-086", present: false },
  { id: 87, name: "Bhargavi", registerNo: "AI2025-087", present: true },
  { id: 88, name: "Tulasi", registerNo: "AI2025-088", present: true },
  { id: 89, name: "Uma", registerNo: "AI2025-089", present: false },
  { id: 90, name: "Padmavathi", registerNo: "AI2025-090", present: true },
  { id: 91, name: "Sudha", registerNo: "AI2025-091", present: true },
  { id: 92, name: "Mahalakshmi", registerNo: "AI2025-092", present: true },
  { id: 93, name: "Devika", registerNo: "AI2025-093", present: true },
  { id: 94, name: "Sridevi", registerNo: "AI2025-094", present: false },
  { id: 95, name: "Indira", registerNo: "AI2025-095", present: true },
  { id: 96, name: "Hema", registerNo: "AI2025-096", present: true },
  { id: 97, name: "Roopa", registerNo: "AI2025-097", present: true },
  { id: 98, name: "Meera", registerNo: "AI2025-098", present: true },
  { id: 99, name: "Preethi", registerNo: "AI2025-099", present: true },
  { id: 100, name: "Aparna", registerNo: "AI2025-100", present: true },
  { id: 101, name: "Chandana", registerNo: "AI2025-101", present: true },
  { id: 102, name: "Suvarna", registerNo: "AI2025-102", present: false },
  { id: 103, name: "Mounica", registerNo: "AI2025-103", present: true },
  { id: 104, name: "Pooja", registerNo: "AI2025-104", present: true },
  { id: 105, name: "Prathyusha", registerNo: "AI2025-105", present: true },
  { id: 106, name: "Sravanthi", registerNo: "AI2025-106", present: true },
  { id: 107, name: "Mounisha", registerNo: "AI2025-107", present: true },
  { id: 108, name: "Rajani", registerNo: "AI2025-108", present: true },
  { id: 109, name: "Sirisha", registerNo: "AI2025-109", present: false },
  { id: 110, name: "Kalpana", registerNo: "AI2025-110", present: true },
  { id: 111, name: "Mounika Reddy", registerNo: "AI2025-111", present: false },
  { id: 112, name: "Snehalatha", registerNo: "AI2025-112", present: true },
  { id: 113, name: "Sindhura", registerNo: "AI2025-113", present: true },
  { id: 114, name: "Annapurna", registerNo: "AI2025-114", present: true },
  { id: 115, name: "Niveditha", registerNo: "AI2025-115", present: false },
  { id: 116, name: "Vijaya", registerNo: "AI2025-116", present: true },
  { id: 117, name: "Sumathi", registerNo: "AI2025-117", present: false },
  { id: 118, name: "Kousalya", registerNo: "AI2025-118", present: false },
  { id: 119, name: "Sulochana", registerNo: "AI2025-119", present: true },
  { id: 120, name: "Durga", registerNo: "AI2025-120", present: true },
]);
// Attendance stats
  const presentStudents = students.filter((s) => s.present);
  const absentStudents = students.filter((s) => !s.present);

  // Sidebar navigation
  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/faculty/faculty-dashboard" },
    { icon: Users, label: "Attendance", active: true, path: "/faculty/attendance" },
    { icon: Clock, label: "Curriculum", path: "/faculty/curriculum" },
    { icon: GraduationCap, label: "Programs", path: "/faculty/programs" },
    { icon: User, label: "Profile & Settings", path: "/faculty/profile" },
  ];

  // Notifications
  const notifications = [
    {
      id: 1,
      title: "Attendance Reminder",
      message: "Don’t forget to generate QR for today.",
      time: "10 min ago",
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
          <h1 className="text-xl font-bold text-white">Smart Curriculum and Attendance Activity</h1>
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
          {notificationOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <Button variant="ghost" size="icon" onClick={() => setNotificationOpen(false)} className="h-6 w-6">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="divide-y">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 hover:bg-gray-50">
                    <h4 className="font-medium text-sm text-gray-900">{n.title}</h4>
                    <p className="text-xs text-gray-600">{n.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.time}</p>
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
            {navigationItems.map((item, idx) => (
              <li key={idx}>
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
                    {(sidebarOpen || window.innerWidth < 768) && <span className="truncate">{item.label}</span>}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={cn("pt-20 p-6 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-0 md:ml-16")}>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* QR Section */}
          <br/><br/><br/><br/>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-blue-600" /> Attendance QR Control
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {!qrGenerated ? (
                <>
                  <Button onClick={() => setQrGenerated(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                    Generate Scanner QR
                  </Button>
                  <p className="text-gray-600">Click to generate QR for students to scan & mark attendance.</p>
                </>
              ) : (
                <>
                  <QRCode value="attendance-session-123" size={200} className="mx-auto" />
                  <p className="text-gray-600">Students can scan this QR code to mark attendance.</p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Attendance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-green-600" /> Present Students
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between p-4">
                <p className="text-2xl font-bold">{presentStudents.length}</p>
                <Button
                  variant="outline"
                  onClick={() => setShowListType(showListType === "present" ? null : "present")}
                >
                  {showListType === "present" ? "Hide" : "View"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserX className="h-5 w-5 text-red-600" /> Absent Students
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between p-4">
                <p className="text-2xl font-bold">{absentStudents.length}</p>
                <Button
                  variant="outline"
                  onClick={() => setShowListType(showListType === "absent" ? null : "absent")}
                >
                  {showListType === "absent" ? "Hide" : "View"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Students List */}
          {showListType && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {showListType === "present" ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" /> Present Students
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" /> Absent Students
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y">
                  {(showListType === "present" ? presentStudents : absentStudents).map((s) => (
                    <li key={s.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-900">{s.name}</p>
                        <p className="text-sm text-gray-600">{s.registerNo}</p>
                      </div>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          s.present ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}
                      >
                        {s.present ? "Present" : "Absent"}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default FacultyAttendancePage;
