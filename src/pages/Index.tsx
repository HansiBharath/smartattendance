import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, BookOpen, Settings } from 'lucide-react';
import StudentSignupModal from '@/components/StudentSignupModal';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type UserRole = 'student' | 'faculty' | 'admin';

const Index = () => {
  const [activeTab, setActiveTab] = useState<UserRole>('student');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const tabs = [
    { id: 'student' as const, label: 'Student', icon: GraduationCap },
    { id: 'faculty' as const, label: 'Faculty', icon: BookOpen },
    { id: 'admin' as const, label: 'Admin', icon: Settings },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'student') {
      // Navigate to student dashboard
      navigate('/student-dashboard');
      return;
    }
    
    toast({
      title: "Login Attempted",
      description: `Attempting to log in as ${activeTab}...`,
    });
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset link will be sent to your registered email.",
    });
  };

  const renderLoginForm = () => {
    switch (activeTab) {
      case 'student':
        return (
          <div className="space-y-6 fade-in">
            <div className="text-center mb-6">
              <p className="text-muted-foreground">Ready to dive into your studies?</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-no">Register Number</Label>
                <Input 
                  id="register-no" 
                  type="text" 
                  placeholder="Enter your register number"
                  required
                  className="transition-all duration-200 focus:scale-[1.01]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <Input 
                  id="student-password" 
                  type="password" 
                  placeholder="Enter your password"
                  required
                  className="transition-all duration-200 focus:scale-[1.01]"
                />
              </div>
              <Button type="submit" className="w-full academic-button">
                Login as Student
              </Button>
            </form>
            <div className="text-center space-y-2">
              <button 
                onClick={() => setShowSignupModal(true)}
                className="text-primary hover:text-primary-hover underline transition-colors"
              >
                New student? Sign up here
              </button>
              <br />
              <button 
                onClick={handleForgotPassword}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        );

      case 'faculty':
        return (
          <div className="space-y-6 fade-in">
            <div className="text-center mb-6">
              <p className="text-muted-foreground">Empower your class, guide your students.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faculty-id">Faculty ID</Label>
                <Input 
                  id="faculty-id" 
                  type="text" 
                  placeholder="Enter your faculty ID"
                  required
                  className="transition-all duration-200 focus:scale-[1.01]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faculty-password">Password</Label>
                <Input 
                  id="faculty-password" 
                  type="password" 
                  placeholder="Enter your password"
                  required
                  className="transition-all duration-200 focus:scale-[1.01]"
                />
              </div>
              <Button type="submit" className="w-full academic-button">
                Login as Faculty
              </Button>
            </form>
            <div className="text-center">
              <button 
                onClick={handleForgotPassword}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        );

      case 'admin':
        return (
          <div className="space-y-6 fade-in">
            <div className="text-center mb-6">
              <p className="text-muted-foreground text-sm">
                Restricted access — authorized administrators only.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-id">Admin ID</Label>
                <Input 
                  id="admin-id" 
                  type="text" 
                  placeholder="Enter your admin ID"
                  required
                  className="transition-all duration-200 focus:scale-[1.01]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input 
                  id="admin-password" 
                  type="password" 
                  placeholder="Enter your password"
                  required
                  className="transition-all duration-200 focus:scale-[1.01]"
                />
              </div>
              <Button type="submit" className="w-full academic-button">
                Login as Admin
              </Button>
            </form>
            <div className="text-center">
              <button 
                onClick={handleForgotPassword}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen academic-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Smart Curriculum
          </h1>
          <p className="text-white/80 text-lg">
            Welcome back! Let's make learning smarter.
          </p>
        </div>

        {/* Main Card */}
        <Card className="glass-card rounded-3xl overflow-hidden">
          <CardHeader className="pb-0">
            {/* Tabs */}
            <div className="flex rounded-2xl bg-muted/50 p-1 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id ? 'tab-active' : 'tab-inactive'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div key={activeTab} className="slide-in">
              {renderLoginForm()}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Smart Curriculum Activity & Attendance System
          </p>
        </div>
      </div>

      <StudentSignupModal 
        open={showSignupModal} 
        onOpenChange={setShowSignupModal}
      />
    </div>
  );
};

export default Index;