import React, { useState } from "react";
import { Bell, Menu, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Calendar, User, Settings, BookOpen, Target, PieChart } from "lucide-react";

// Sidebar Navigation Component
const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { title: "Dashboard", url: "/student-dashboard", icon: BarChart3 },
    { title: "Attendance", url: "/attendance", icon: Calendar },
    { title: "Interests & Goals", url: "/interests-goals", icon: Target },
    { title: "Programs", url: "/programs", icon: BookOpen },
    { title: "Curriculum", url: "/curriculum", icon: PieChart },
    { title: "Profile & Settings", url: "/profile", icon: Settings },
  ];

  return (
    <Sidebar className="border-r border-border/40 bg-navy text-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={currentPath === item.url ? "bg-teal text-white" : "text-white/80 hover:bg-white/10"}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

interface Goal {
  id: string;
  title: string;
  description: string;
  category: "Career" | "Education" | "Personal" | "Skills";
  targetYear: string;
}

const InterestsGoalsPage = () => {
  const [interests, setInterests] = useState<string[]>([
    "Artificial Intelligence",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Mobile Development"
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Become a Fullstack Developer",
      description: "Master both frontend and backend technologies to build complete web applications.",
      category: "Career",
      targetYear: "2025"
    },
    {
      id: "2",
      title: "Complete AI & ML Specialization",
      description: "Finish coursework and projects in artificial intelligence and machine learning.",
      category: "Education",
      targetYear: "2024"
    },
    {
      id: "3",
      title: "Build 10 Personal Projects",
      description: "Create a portfolio of diverse projects showcasing different skills and technologies.",
      category: "Skills",
      targetYear: "2025"
    }
  ]);

  const [newInterest, setNewInterest] = useState("");
  const [showInterestInput, setShowInterestInput] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "" as Goal["category"],
    targetYear: ""
  });

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
      setShowInterestInput(false);
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const addGoal = () => {
    if (newGoal.title.trim() && newGoal.category && newGoal.targetYear) {
      const goal: Goal = {
        id: Date.now().toString(),
        ...newGoal
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: "", description: "", category: "" as Goal["category"], targetYear: "" });
      setIsGoalModalOpen(false);
    }
  };

  const removeGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

  const getCategoryColor = (category: Goal["category"]) => {
    const colors = {
      Career: "bg-blue-100 text-blue-800",
      Education: "bg-green-100 text-green-800",
      Personal: "bg-purple-100 text-purple-800",
      Skills: "bg-orange-100 text-orange-800"
    };
    return colors[category];
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-light-gray">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="h-16 bg-navy text-white flex items-center justify-between px-4 shadow-sm sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
            </div>
            
            <h1 className="text-xl font-semibold tracking-tight">Smart Curriculum and Attendance Activity</h1>
            
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-8">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Page Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-text-primary">Interests & Goals</h1>
                <p className="text-text-secondary">Manage your academic interests and set long-term career goals to guide your learning journey.</p>
              </div>

              {/* Section 1: Your Interests */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-navy to-teal text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Your Interests
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="px-3 py-1.5 bg-teal/10 text-teal hover:bg-teal/20 transition-colors group cursor-pointer"
                        >
                          {interest}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeInterest(interest)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    {showInterestInput ? (
                      <div className="flex gap-2 max-w-md">
                        <Input
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Enter new interest..."
                          onKeyPress={(e) => e.key === "Enter" && addInterest()}
                          className="flex-1"
                        />
                        <Button onClick={addInterest} size="sm" className="bg-teal hover:bg-teal/90">
                          Add
                        </Button>
                        <Button
                          onClick={() => {
                            setShowInterestInput(false);
                            setNewInterest("");
                          }}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setShowInterestInput(true)}
                        variant="outline"
                        className="border-teal text-teal hover:bg-teal hover:text-white transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Interest
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Long-term Goals */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-navy to-teal text-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Long-term Goals
                    </CardTitle>
                    <Dialog open={isGoalModalOpen} onOpenChange={setIsGoalModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Goal
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add New Goal</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                              Goal Title
                            </label>
                            <Input
                              value={newGoal.title}
                              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                              placeholder="Enter goal title..."
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                              Description
                            </label>
                            <Textarea
                              value={newGoal.description}
                              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                              placeholder="Describe your goal..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                              Category
                            </label>
                            <Select
                              value={newGoal.category}
                              onValueChange={(value: Goal["category"]) => setNewGoal({ ...newGoal, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Career">Career</SelectItem>
                                <SelectItem value="Education">Education</SelectItem>
                                <SelectItem value="Personal">Personal</SelectItem>
                                <SelectItem value="Skills">Skills</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                              Target Year
                            </label>
                            <Select
                              value={newGoal.targetYear}
                              onValueChange={(value) => setNewGoal({ ...newGoal, targetYear: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => {
                                  const year = new Date().getFullYear() + i;
                                  return (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button onClick={addGoal} className="flex-1 bg-teal hover:bg-teal/90">
                              Add Goal
                            </Button>
                            <Button
                              onClick={() => {
                                setIsGoalModalOpen(false);
                                setNewGoal({ title: "", description: "", category: "" as Goal["category"], targetYear: "" });
                              }}
                              variant="outline"
                              className="flex-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {goals.map((goal) => (
                      <Card key={goal.id} className="relative group hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-text-primary line-clamp-2">{goal.title}</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                                onClick={() => removeGoal(goal.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            {goal.description && (
                              <p className="text-sm text-text-secondary line-clamp-3">{goal.description}</p>
                            )}
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className={getCategoryColor(goal.category)}>
                                {goal.category}
                              </Badge>
                              <span className="text-sm font-medium text-text-secondary">
                                Target: {goal.targetYear}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {goals.length === 0 && (
                    <div className="text-center py-12">
                      <Target className="h-12 w-12 text-text-tertiary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-text-primary mb-2">No goals yet</h3>
                      <p className="text-text-secondary mb-4">Start by adding your first long-term goal to track your progress.</p>
                      <Button
                        onClick={() => setIsGoalModalOpen(true)}
                        className="bg-teal hover:bg-teal/90"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Goal
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default InterestsGoalsPage;