import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Menu, Bell, LayoutDashboard, Users, Target, BookOpen, GraduationCap, User,
  Check, Camera, QrCode, X, MapPin, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const AttendancePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [registerNo, setRegisterNo] = useState('');
  const [qrTimer, setQrTimer] = useState(15);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  // Dummy notifications
  const notifications = [
    { id: 1, type: 'system', title: 'Attendance Reminder', message: 'Mark your attendance before 11:00 AM', time: '30 minutes ago', priority: 'high' },
  ];

  // Sidebar navigation
  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/student-dashboard' },
    { icon: Users, label: 'Attendance', active: true, path: '/attendance' },
    { icon: Target, label: 'Interests & Goals' },
    { icon: BookOpen, label: 'Programs' },
    { icon: GraduationCap, label: 'Curriculum' },
    { icon: User, label: 'Profile & Settings' },
  ];

  // QR Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 2 && qrTimer > 0) {
      interval = setInterval(() => {
        setQrTimer(prev => (prev <= 1 ? 15 : prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep, qrTimer]);

  // Handlers
  const handleStep1Submit = () => { if (registerNo.trim()) setCurrentStep(2); };
  const handleQRScan = () => { setCurrentStep(3); };
  const handleFaceRecognition = () => { setCurrentStep(4); setAttendanceMarked(true); };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen dashboard-background">
      {/* Top Navigation */}
      <nav className="nav-bar h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-white/20">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-white">Smart Curriculum and Attendance Activity</h1>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setNotificationOpen(!notificationOpen)} className="text-white hover:bg-white/20 relative">
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
                {notifications.map(n => (
                  <div key={n.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", n.priority === 'high' && "bg-red-500", n.priority === 'medium' && "bg-yellow-500", n.priority === 'low' && "bg-green-500")} />
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
      <aside className={cn("fixed top-16 left-0 h-full bg-white shadow-lg border-r transition-transform duration-300 z-40", sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0 md:w-16")}>
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, idx) => (
              <li key={idx}>
                {item.path ? (
                  <Link to={item.path}>
                    <Button variant="ghost" className={cn("w-full justify-start gap-3 h-12", item.active && "bg-blue-50 text-blue-600 hover:bg-blue-100", !sidebarOpen && "md:justify-center md:px-0")}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {(sidebarOpen || window.innerWidth < 768) && <span className="truncate">{item.label}</span>}
                    </Button>
                  </Link>
                ) : (
                  <Button variant="ghost" className={cn("w-full justify-start gap-3 h-12", item.active && "bg-blue-50 text-blue-600 hover:bg-blue-100", !sidebarOpen && "md:justify-center md:px-0")}>
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {(sidebarOpen || window.innerWidth < 768) && <span className="truncate">{item.label}</span>}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={cn("pt-20 p-6 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-0 md:ml-16")}>
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Attendance Marking</h2>
            <p className="text-gray-600 mt-2">Complete the steps below to mark your attendance.</p>
          </div>

          {/* Step 1 */}
          <Card className={currentStep === 1 ? "ring-2 ring-blue-500" : ""}>
            <CardHeader>
              <CardTitle>Step 1: Enter Register Number</CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 ? (
                <div className="space-y-4">
                  <Input placeholder="Enter your register number" value={registerNo} onChange={e => setRegisterNo(e.target.value)} className="text-center text-lg py-3" />
                  <Button onClick={handleStep1Submit} disabled={!registerNo.trim()} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">Submit Register Number</Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span>Register number verified: {registerNo}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* === Step 2: QR Scan === */}
          {currentStep >= 2 && (
            <Card className={cn("attendance-step-card transition-all duration-500", currentStep === 2 ? "ring-2 ring-blue-500" : currentStep > 2 ? "opacity-75" : "")}>
              <CardHeader className="step-header">
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><QrCode className="h-4 w-4" /></div>
                  Scan QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {currentStep === 2 ? (
                  <div className="text-center space-y-4">
                    <div className="w-48 h-48 mx-auto border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white">
                      <div className="w-40 h-40 bg-black qr-pattern rounded"></div>
                    </div>
                    <p className="text-gray-600">Scan the live QR Code displayed to verify presence</p>
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                      <Clock className="h-4 w-4" />
                      <span className="font-mono">Refreshing in {qrTimer}s</span>
                    </div>
                    <Button onClick={handleQRScan} className="bg-teal-600 hover:bg-teal-700 text-white">QR Code Scanned</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span>QR Code successfully scanned</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* === Step 3: Face Recognition === */}
          {currentStep >= 3 && (
            <Card className={cn("attendance-step-card transition-all duration-500", currentStep === 3 ? "ring-2 ring-blue-500" : currentStep > 3 ? "opacity-75" : "")}>
              <CardHeader className="step-header">
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><Camera className="h-4 w-4" /></div>
                  Face Recognition Validation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {currentStep === 3 ? (
                  <div className="text-center space-y-4">
                    <div className="w-64 h-48 mx-auto border-2 border-blue-500 rounded-lg flex items-center justify-center bg-gray-100 relative">
                      <Camera className="h-12 w-12 text-gray-400" />
                      <div className="absolute inset-4 border-2 border-dashed border-blue-300 rounded-lg"></div>
                    </div>
                    <p className="text-gray-600">Align your face within the frame for verification</p>
                    <Button onClick={handleFaceRecognition} className="bg-teal-600 hover:bg-teal-700 text-white">Face Recognized</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span>Face recognition completed successfully</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Final Status */}
          {attendanceMarked && (
            <div className="mt-6 p-4 bg-green-50 border border-green-300 text-green-800 rounded-lg text-center">
              Attendance successfully marked!
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AttendancePage;
