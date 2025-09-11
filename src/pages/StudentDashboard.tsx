import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Menu, 
  Bell, 
  LayoutDashboard, 
  Users, 
  Target, 
  BookOpen, 
  GraduationCap, 
  User,
  Clock,
  Calendar,
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true, path: '/student-dashboard' },
    { icon: Users, label: 'Attendance', path: '/attendance' },
    { icon: Target, label: 'Interests & Goals', path: '/interests-goals' },
    { icon: BookOpen, label: 'Programs', path: '/programs' },
    { icon: GraduationCap, label: 'Curriculum', path: '/curriculum' },
    { icon: User, label: 'Profile & Settings', path: '/profile' },
  ];

  const notifications = [
    {
      id: 1,
      type: 'faculty',
      title: 'Assignment Due Tomorrow',
      message: 'Complete your Machine Learning project submission',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'system',
      title: 'Attendance Reminder',
      message: 'You have missed 2 classes this week',
      time: '1 day ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'task',
      title: 'Free Period Suggestion',
      message: 'Complete AI & ML Program in Progress',
      time: '3 days ago',
      priority: 'low'
    },
  ];

  const todaysClasses = [
    { time: '9:00 AM', subject: 'Machine Learning', room: 'Lab 101', status: 'completed' },
    { time: '11:00 AM', subject: 'Data Structures', room: 'Room 205', status: 'current' },
    { time: '2:00 PM', subject: 'Database Systems', room: 'Room 301', status: 'upcoming' },
    { time: '4:00 PM', subject: 'Software Engineering', room: 'Lab 102', status: 'upcoming' },
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
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                        notification.priority === 'high' && "bg-red-500",
                        notification.priority === 'medium' && "bg-yellow-500",
                        notification.priority === 'low' && "bg-green-500"
                      )} />
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
      <aside className={cn(
        "fixed top-16 left-0 h-full bg-white shadow-lg border-r transition-transform duration-300 z-40",
        sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0 md:w-16"
      )}>
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
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "pt-20 p-6 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-0 md:ml-16"
      )}>
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mt-2">Welcome back! Here's your learning overview.</p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Today's Classes Card */}
            <Card className="dashboard-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Today's Classes & Timetable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysClasses.map((cls, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          cls.status === 'completed' && "bg-green-500",
                          cls.status === 'current' && "bg-blue-500",
                          cls.status === 'upcoming' && "bg-gray-400"
                        )} />
                        <div>
                          <div className="font-medium text-gray-900">{cls.subject}</div>
                          <div className="text-sm text-gray-600">{cls.room}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-700">{cls.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Attendance Percentage Card */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="85, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">85%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Overall Attendance</p>
                  <Progress value={85} className="mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* Notifications Summary Card */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Latest Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start gap-2 p-2 rounded border border-gray-100">
                      <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                        <p className="text-xs text-gray-600">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Free Period Suggestion Card */}
            <Card className="dashboard-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Free Period Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Complete AI & ML Program</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        You have a free period from 3:00 PM - 4:00 PM. Perfect time to work on your AI & ML certification program.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-purple-700">
                          In Progress
                        </div>
                        <span className="text-xs text-gray-500">Progress: 65%</span>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

export default StudentDashboard;