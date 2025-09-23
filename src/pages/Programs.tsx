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
  CheckCircle,
  BarChart2,
  Clock,
  Hourglass,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Programs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/student-dashboard" },
    { icon: Users, label: "Attendance",  path: "/student/attendance" },
    { icon: Target, label: "Interests & Goals", path: "/student/interests" },
    { icon: BookOpen, label: "Programs",active: true, path: "/student/programs" },
    { icon: Clock, label: "Curriculum" ,path:"/student/curriculum"},
    { icon: User, label: "Profile & Settings", path: "/student/profile" },
  ];

  const notifications = [
    {
      id: 1,
      type: 'system',
      title: 'Program Reminder',
      message: 'Continue your Data & AI Program today.',
      time: '1 hour ago',
      priority: 'high',
    },
  ];

  // Program data
  const programs = [
    {
      title: 'Web Development',
      duration: '1 week',
      skills: ['HTML', 'CSS', 'JavaScript'],
      status: 'Completed',
    },
    {
      title: 'Data & Artificial Intelligence',
      duration: '6 weeks',
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
      status: 'In Progress',
    },
    {
      title: 'Cloud Computing',
      duration: '4 weeks',
      skills: ['AWS', 'Docker', 'CI/CD'],
      status: 'Remaining',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'bg-green-100 text-green-700';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const getActionLabel = (status: string) => {
    if (status === 'Completed') return 'View Certificate';
    if (status === 'In Progress') return 'Continue Learning';
    return 'Start Program';
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
            <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border z-50">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNotificationOpen(false)}
                  className="h-6 w-6"
                >
                  ✕
                </Button>
              </div>
              <div className="divide-y">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                          n.priority === 'high' && 'bg-red-500',
                          n.priority === 'medium' && 'bg-yellow-500',
                          n.priority === 'low' && 'bg-green-500'
                        )}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{n.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{n.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{n.time}</p>
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
          'fixed top-16 left-0 h-full bg-white shadow-lg border-r transition-transform duration-300 z-40',
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 md:translate-x-0 md:w-16'
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
                        'w-full justify-start gap-3 h-12',
                        item.active && 'bg-blue-50 text-blue-600 hover:bg-blue-100',
                        !sidebarOpen && 'md:justify-center md:px-0'
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
                      'w-full justify-start gap-3 h-12',
                      item.active && 'bg-blue-50 text-blue-600 hover:bg-blue-100',
                      !sidebarOpen && 'md:justify-center md:px-0'
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
          'pt-20 p-6 transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-0 md:ml-16'
        )}
      >
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <br/><br/><br/><br/>
            <h2 className="text-3xl font-bold text-gray-900">National Education Policy Programs</h2>
            <p className="text-gray-600 mt-2">
              Develop essential 21st-century skills through learning programs.
            </p>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="p-4">
              <CardContent className="flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-lg font-bold">1</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardContent className="flex items-center gap-4">
                <BarChart2 className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-gray-500 text-sm">In Progress</p>
                  <p className="text-lg font-bold">1</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardContent className="flex items-center gap-4">
                <Hourglass className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-gray-500 text-sm">Remaining</p>
                  <p className="text-lg font-bold">1</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardContent className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-2">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="66, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">66%</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Overall Progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Program List */}
          <div className="grid gap-6">
            {programs.map((program, idx) => (
              <Card
                key={idx}
                className="p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{program.title}</span>
                    <span className={cn('px-3 py-1 rounded-full text-xs font-medium', getStatusColor(program.status))}>
                      {program.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" /> Duration: {program.duration}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    {getActionLabel(program.status)}
                  </Button>
                </CardContent>
              </Card>
            ))}
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

export default Programs;
