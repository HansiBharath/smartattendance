import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  Bell,
  LayoutDashboard,
  Users,
  Target,
  BookOpen,
  GraduationCap,
  User,
  X,
  LogOut,
  Settings,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigate = useNavigate();

  // ✅ Logged-in student state
  const [student, setStudent] = useState<any | null>(null);

  // ✅ Profile states
  const [fullName, setFullName] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");

  // ✅ Settings states
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("English");

  // ✅ Load student data on mount
  useEffect(() => {
    const storedStudent = localStorage.getItem("loggedInStudent");
    if (storedStudent) {
      const parsed = JSON.parse(storedStudent);
      setStudent(parsed);

      // Pre-fill form fields
      setFullName(parsed.name || "");
      setRegisterNo(parsed.regNo || "");
      setEmail(parsed.email || "");
      setMobile(parsed.phone || "");
      setDepartment(parsed.department || "");
      setDob(parsed.dob || "");
    } else {
      // If not logged in, redirect to login
      navigate("/");
    }
  }, [navigate]);

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/student-dashboard" },
    { icon: Users, label: "Attendance",  path: "/student/attendance" },
    { icon: Target, label: "Interests & Goals", path: "/student/interests" },
    { icon: BookOpen, label: "Programs", path: "/student/programs" },
    { icon: Clock, label: "Curriculum" ,path:"/student/curriculum"},
    { icon: User, label: "Profile & Settings",active: true, path: "/student/profile" },
  ];

  const notifications = [
    {
      id: 1,
      title: "Profile Update",
      message: "Don’t forget to update your mobile number if it has changed.",
      time: "10 min ago",
      priority: "medium",
    },
  ];

  // ✅ Save changes to localStorage
  const handleSaveChanges = () => {
    const updatedStudent = {
      ...student,
      name: fullName,
      regNo: registerNo,
      email,
      phone: mobile,
      department,
      dob,
    };
    localStorage.setItem("loggedInStudent", JSON.stringify(updatedStudent));
    setStudent(updatedStudent);
    alert("Profile updated successfully!");
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    sessionStorage.clear();
    navigate("/");
  };

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
          <h1 className="text-xl font-bold text-white">
            Smart Curriculum & Attendance
          </h1>
        </div>

        {/* Notifications */}
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
            <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border z-50">
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
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 hover:bg-gray-50 transition-colors">
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
            {navigationItems.map((item, index) => (
              <li key={index}>
                {item.path ? (
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
                ) : (
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
                )}
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
        <br /><br /><br />
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Info */}
          <Card>
            <CardHeader className="profile-header">
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <Button variant="outline">Edit Photo</Button>
              </div>

              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
              <Input value={registerNo} disabled placeholder="Register No" />
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
              <Input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" />
              <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department / Year" />
              <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

              <Button className="profile-btn" onClick={handleSaveChanges}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader className="profile-header">
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <br />
              <div>
                <Link to="/student/interests">
                  <Button className="profile-btn">Manage Interests & Goals</Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-teal-500 border">
                  <CardContent className="p-4 flex justify-between items-center">
                    <span>Attendance Report</span>
                    <Link to="/student/attendance">
                      <Button variant="outline">View</Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card className="border-teal-500 border">
                  <CardContent className="p-4 flex justify-between items-center">
                    <span>Academic Records</span>
                    <Button variant="outline">View</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="toggle-checkbox"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Notifications</span>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Language</span>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border rounded p-1"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Telugu</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
