import students from "@/lib/students.json";
import facultyList from "@/lib/faculty.json";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, BookOpen, Settings } from "lucide-react";
import StudentSignupModal from "@/components/StudentSignupModal";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type UserRole = "student" | "faculty" | "admin";

const Index = () => {
  const [activeTab, setActiveTab] = useState<UserRole>("student");
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const tabs = [
    { id: "student" as const, label: "Student", icon: GraduationCap },
    { id: "faculty" as const, label: "Faculty", icon: BookOpen },
    { id: "admin" as const, label: "Admin", icon: Settings },
  ];

  // ✅ handleLogin
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // --- Student Login ---
    if (activeTab === "student") {
      const regNoInput = (document.getElementById("register-no") as HTMLInputElement)?.value;
      const passwordInput = (document.getElementById("student-password") as HTMLInputElement)?.value;

      const student = students.find(
        (s) => s.regNo === regNoInput && s.firstName === passwordInput
      );

      if (student) {
        localStorage.setItem("loggedInStudent", JSON.stringify(student));
        navigate("/student/student-dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid Register Number or Password",
          variant: "destructive",
        });
      }
      return;
    }

    // --- Faculty Login ---
    if (activeTab === "faculty") {
      const facultyIdInput = (document.getElementById("faculty-id") as HTMLInputElement)?.value;
      const facultyPasswordInput = (document.getElementById("faculty-password") as HTMLInputElement)?.value;

      const faculty = facultyList.find(
        (f) => f.facultyId === facultyIdInput && f.department === facultyPasswordInput
      );

      if (faculty) {
        localStorage.setItem("loggedInFaculty", JSON.stringify(faculty));
        navigate("/faculty/Faculty-dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid Faculty ID or Department",
          variant: "destructive",
        });
      }
      return;
    }

    // --- Admin Login ---
    if (activeTab === "admin") {
      toast({
        title: "Login Attempted",
        description: "Admin login not implemented yet.",
      });
      return;
    }
  };

  // ✅ renderLoginForm
  const renderLoginForm = () => {
    if (activeTab === "student") {
      return (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="register-no">Register No</Label>
            <Input id="register-no" type="text" required />
          </div>
          <div>
            <Label htmlFor="student-password">Password</Label>
            <Input id="student-password" type="password" required />
          </div>
          <Button type="submit" className="w-full">Login</Button>
          <Button
            variant="link"
            className="w-full"
            onClick={() => setShowSignupModal(true)}
          >
            Sign Up
          </Button>
        </form>
      );
    }

    if (activeTab === "faculty") {
      return (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="faculty-id">Faculty ID</Label>
            <Input id="faculty-id" type="text" required />
          </div>
          <div>
            <Label htmlFor="faculty-password">Password (Department)</Label>
            <Input id="faculty-password" type="password" required />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      );
    }

    if (activeTab === "admin") {
      return (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="admin-username">Admin Username</Label>
            <Input id="admin-username" type="text" required />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      );
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
          <h1 className="text-3xl font-bold text-white mb-2">Smart Curriculum</h1>
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
                      activeTab === tab.id ? "tab-active" : "tab-inactive"
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
