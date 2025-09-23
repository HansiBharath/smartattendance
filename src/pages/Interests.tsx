
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Bell,
  LayoutDashboard,
  Users,
  Target,
  BookOpen,
  GraduationCap,
  Plus,
  User,
  Tag,
  Check,
  Calendar,
  Trash2,
  X,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type Goal = {
  id: string;
  title: string;
  description: string;
  category: "Career" | "Education" | "Skills" | "Personal";
  year: number;
};

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/student-dashboard" },
    { icon: Users, label: "Attendance",  path: "/student/attendance" },
    { icon: Target, label: "Interests & Goals",active: true, path: "/student/interests" },
    { icon: BookOpen, label: "Programs", path: "/student/programs" },
    { icon: Clock, label: "Curriculum" ,path:"/student/curriculum"},
    { icon: User, label: "Profile & Settings", path: "/student/profile" },
  ];

const defaultInterests = ["Artificial Intelligence", "Web Development", "Data Science"];
const years = Array.from({ length: 8 }).map((_, i) => new Date().getFullYear() + i);

export default function Interests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [interests, setInterests] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("sc_interests");
      return raw ? JSON.parse(raw) : defaultInterests;
    } catch {
      return defaultInterests;
    }
  });

  const [showInterestInput, setShowInterestInput] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  const [goals, setGoals] = useState<Goal[]>(() => {
    try {
      const raw = localStorage.getItem("sc_goals");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "Career", year: years[0] });

  // persist
  useEffect(() => {
    localStorage.setItem("sc_interests", JSON.stringify(interests));
  }, [interests]);

  useEffect(() => {
    localStorage.setItem("sc_goals", JSON.stringify(goals));
  }, [goals]);

  function addInterest() {
    const cleaned = newInterest.trim();
    if (!cleaned) return;
    if (interests.includes(cleaned)) {
      setNewInterest("");
      setShowInterestInput(false);
      return;
    }
    setInterests((s) => [cleaned, ...s]);
    setNewInterest("");
    setShowInterestInput(false);
  }

  function removeInterest(name: string) {
    setInterests((s) => s.filter((i) => i !== name));
  }

  function openNewGoalModal() {
    setForm({ title: "", description: "", category: "Career", year: years[0] });
    setModalOpen(true);
  }

  function saveGoal() {
    if (!form.title.trim()) return;
    const g: Goal = {
      id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category as Goal["category"],
      year: Number(form.year),
    };
    setGoals((s) => [g, ...s]);
    setModalOpen(false);
  }

  function deleteGoal(id: string) {
    setGoals((s) => s.filter((g) => g.id !== id));
  }

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

        {/* Notification Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="text-white hover:bg-white/20 relative"
          >
            <Bell className="h-6 w-6" />
          </Button>
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
              <div className="divide-y p-4 text-sm text-gray-600">
                No new notifications
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
      <main
        className={cn(
          "pt-20 p-6 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-0 md:ml-16"
        )}
      >
        <div className="max-w-5xl mx-auto">
          {/* Interests & Goals content goes here (your existing content) */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <br/>
              <br/>
              <h2 className="text-3xl font-bold text-gray-900">Interests & Goals</h2>
              <p className="text-gray-600 mt-2">
                
                
                Organize your interests and long-term goals to shape your learning path.
              </p>
            </div>
          </div>
          

          {/* --- Keep your Interests and Goals cards below --- */}
          {/* (same as your existing code, unchanged) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interests Card */}
          <Card className="interests-card">
            <CardHeader className="interests-header">
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Your Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <br/>
               <br/>
                

              <div className="mb-4">
                <div className="flex flex-wrap gap-3">
                  <AnimatePresence initial={false}>
                    {interests.map((it) => (
                      <motion.div
                        key={it}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="interests-tag"
                      >
                        <span>{it}</span>
                        <button
                          aria-label={`Remove ${it}`}
                          onClick={() => removeInterest(it)}
                          className="interests-tag-remove"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Add interest */}
              <div>
                {!showInterestInput ? (
                  <Button
                    variant="ghost"
                    onClick={() => setShowInterestInput(true)}
                    className="interests-add-btn"
                  >
                    <Plus className="h-4 w-4" /> Add Interest
                  </Button>
                ) : (
                  <div className="flex gap-4 items-center ">
                    <Input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="e.g., Machine Learning"
                      className="flex-1"
                    />
                    <Button onClick={addInterest} className="interests-button">
                      Add
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowInterestInput(false);
                        setNewInterest("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Goals Card */}
          <Card className="interests-card">
            <CardHeader className="interests-header">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Long-term Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <br/>
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {goals.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-muted-foreground"
                    >
                      No goals yet. Click "Add New Goal" to create one.
                    </motion.div>
                    
                  )}
                  
                  {goals.map((g) => (
                    <motion.div
                      key={g.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="interests-goal"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">{g.title}</h3>
                          <span className="interests-category">{g.category}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{g.description}</p>
                      </div>

                      <div className="mt-3 md:mt-0 flex items-center gap-3">
                        <div className="interests-year">
                          <Calendar className="h-4 w-4" />
                          <span>{g.year}</span>
                        </div>
                        <button onClick={() => deleteGoal(g.id)} className="interests-delete-btn">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button onClick={openNewGoalModal} className="interests-button">
                <Plus className="mr-2 h-4 w-4" /> Add New Goal
              </Button>
            </div>
          </div>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal for adding goal */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />

              <motion.div
                initial={{ y: 20, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 10, scale: 0.98 }}
                className="relative interests-modal"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-foreground">Add New Goal</h2>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4 backgroung color white p-4 rounded-lg">
                  <div>
                    <label className="block text-sm text-foreground mb-1">Goal Title</label>
                    <Input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Become a Full-Stack Developer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-foreground mb-1">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full border rounded-md p-2 min-h-[80px] resize-none"
                      placeholder="Short description about the goal"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-foreground mb-1">Category</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full border rounded-md p-2"
                      >
                        <option>Career</option>
                        <option>Education</option>
                        <option>Skills</option>
                        <option>Personal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-foreground mb-1">Target Year</label>
                      <select
                        value={String(form.year)}
                        onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                        className="w-full border rounded-md p-2"
                      >
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveGoal} className="interests-button">
                      <Check className="mr-2 h-4 w-4" /> Save Goal
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
}
