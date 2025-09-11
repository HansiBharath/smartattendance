import React, { useState } from 'react';
import { Bell, Menu, X, Plus, Target, BookOpen, Users, LayoutDashboard, GraduationCap, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

// Sidebar component
const AppSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/student-dashboard' },
    { icon: Users, label: 'Attendance', path: '/attendance' },
    { icon: Target, label: 'Interests & Goals', path: '/interests-goals', active: true },
    { icon: BookOpen, label: 'Programs', path: '/programs' },
    { icon: GraduationCap, label: 'Curriculum', path: '/curriculum' },
    { icon: User, label: 'Profile & Settings', path: '/profile' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 border-r border-[#E5E7EB]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="p-4 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#333]">Navigation</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden text-[#333] hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive || item.active
                  ? 'bg-[#17BFA7] text-white shadow-sm'
                  : 'text-[#333] hover:bg-[#17BFA7]/10 hover:text-[#17BFA7]'
                }
              `}
              onClick={onClose}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

// Notification dropdown
const NotificationDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const notifications = [
    "Free period available, complete AI & ML program in progress",
    "Assignment due: Data Structures homework",
    "New course recommendation: Advanced React Development"
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-[#E5E7EB] z-50">
        <div className="p-4 border-b border-[#E5E7EB]">
          <h3 className="font-semibold text-[#333]">Notifications</h3>
        </div>
        <div className="p-2 max-h-64 overflow-y-auto">
          {notifications.map((notification, index) => (
            <div key={index} className="p-3 hover:bg-gray-50 rounded-lg text-sm text-[#333] transition-colors">
              {notification}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Goal interface
interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'Career' | 'Education' | 'Skills' | 'Personal';
  targetYear: string;
}

const InterestsGoalsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [interests, setInterests] = useState(['Artificial Intelligence', 'Web Development', 'Data Science']);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Become a Full-Stack Developer',
      description: 'Master frontend and backend technologies',
      category: 'Career',
      targetYear: '2025'
    }
  ]);
  
  // Interest management
  const [newInterest, setNewInterest] = useState('');
  const [showInterestInput, setShowInterestInput] = useState(false);
  
  // Goal management
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Career' as Goal['category'],
    targetYear: new Date().getFullYear().toString()
  });

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
      setShowInterestInput(false);
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const addGoal = () => {
    if (newGoal.title.trim()) {
      const goal: Goal = {
        ...newGoal,
        id: Date.now().toString()
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        description: '',
        category: 'Career',
        targetYear: new Date().getFullYear().toString()
      });
      setIsGoalModalOpen(false);
    }
  };

  const removeGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

  const getCategoryColor = (category: Goal['category']) => {
    switch (category) {
      case 'Career': return 'bg-[#17BFA7] text-white';
      case 'Education': return 'bg-blue-500 text-white';
      case 'Skills': return 'bg-green-500 text-white';
      case 'Personal': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex">
      {/* Sidebar */}
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-[#E5E7EB] sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 h-16">
            {/* Left: Hamburger Menu */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#333] hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* Center: App Title */}
            <h1 className="text-lg font-semibold text-[#333] text-center flex-1 lg:flex-none">
              Smart Curriculum and Attendance Activity
            </h1>
            
            {/* Right: Notification Bell */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative text-[#333] hover:bg-gray-100"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <NotificationDropdown 
                isOpen={notificationOpen} 
                onClose={() => setNotificationOpen(false)} 
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 space-y-8">
          {/* Page Title */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-[#333] mb-2">Interests & Goals</h1>
            <p className="text-gray-600">Manage your academic interests and set long-term goals</p>
          </div>

          {/* Section 1: Your Interests */}
          <Card className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] animate-fade-in">
            <CardHeader className="border-b border-[#E5E7EB]">
              <CardTitle className="flex items-center gap-2 text-[#333]">
                <Target className="w-5 h-5 text-[#17BFA7]" />
                Your Interests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Interest Tags */}
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-2 bg-[#17BFA7]/10 text-[#17BFA7] border border-[#17BFA7]/20 hover:bg-[#17BFA7]/20 transition-all duration-200 group cursor-pointer animate-scale-in"
                  >
                    {interest}
                    <button
                      onClick={() => removeInterest(interest)}
                      className="ml-2 opacity-70 hover:opacity-100 hover:text-red-500 transition-all duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {/* Add Interest Input */}
              {showInterestInput ? (
                <div className="flex gap-2 animate-slide-in-right">
                  <Input
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Enter your interest..."
                    className="flex-1 border-[#E5E7EB] focus:border-[#17BFA7] focus:ring-[#17BFA7]"
                    onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    autoFocus
                  />
                  <Button
                    onClick={addInterest}
                    className="bg-[#17BFA7] hover:bg-[#17BFA7]/90 text-white shadow-sm hover:shadow-md transition-all duration-200"
                    size="sm"
                  >
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setShowInterestInput(false);
                      setNewInterest('');
                    }}
                    variant="outline"
                    size="sm"
                    className="border-[#E5E7EB] text-[#333] hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowInterestInput(true)}
                  variant="outline"
                  className="border-[#17BFA7] text-[#17BFA7] hover:bg-[#17BFA7] hover:text-white transition-all duration-200 hover:shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Interest
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Section 2: Long-term Goals */}
          <Card className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] animate-fade-in">
            <CardHeader className="border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-[#333]">
                  <BookOpen className="w-5 h-5 text-[#17BFA7]" />
                  Long-term Goals
                </CardTitle>
                <Dialog open={isGoalModalOpen} onOpenChange={setIsGoalModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#17BFA7] hover:bg-[#17BFA7]/90 text-white shadow-sm hover:shadow-md transition-all duration-200">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Goal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-[#333]">Add New Goal</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="goal-title" className="text-[#333]">Goal Title</Label>
                        <Input
                          id="goal-title"
                          value={newGoal.title}
                          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                          placeholder="e.g., Become a Full-Stack Developer"
                          className="border-[#E5E7EB] focus:border-[#17BFA7] focus:ring-[#17BFA7]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="goal-description" className="text-[#333]">Description</Label>
                        <Textarea
                          id="goal-description"
                          value={newGoal.description}
                          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                          placeholder="Brief description of your goal..."
                          rows={3}
                          className="border-[#E5E7EB] focus:border-[#17BFA7] focus:ring-[#17BFA7]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="goal-category" className="text-[#333]">Category</Label>
                        <Select
                          value={newGoal.category}
                          onValueChange={(value: Goal['category']) => setNewGoal({ ...newGoal, category: value })}
                        >
                          <SelectTrigger className="border-[#E5E7EB] focus:border-[#17BFA7]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-[#E5E7EB]">
                            <SelectItem value="Career">Career</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Skills">Skills</SelectItem>
                            <SelectItem value="Personal">Personal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="goal-year" className="text-[#333]">Target Year</Label>
                        <Select
                          value={newGoal.targetYear}
                          onValueChange={(value) => setNewGoal({ ...newGoal, targetYear: value })}
                        >
                          <SelectTrigger className="border-[#E5E7EB] focus:border-[#17BFA7]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-[#E5E7EB]">
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
                        <Button 
                          onClick={addGoal} 
                          className="bg-[#17BFA7] hover:bg-[#17BFA7]/90 text-white flex-1 transition-all duration-200"
                        >
                          Add Goal
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsGoalModalOpen(false)}
                          className="flex-1 border-[#E5E7EB] text-[#333] hover:bg-gray-50"
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
                  <Card key={goal.id} className="bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-200 animate-scale-in">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-[#333] mb-2">{goal.title}</CardTitle>
                          <Badge className={`${getCategoryColor(goal.category)} text-xs px-2 py-1`}>
                            {goal.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGoal(goal.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Target Year</span>
                        <span className="font-medium text-[#17BFA7]">{goal.targetYear}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {goals.length === 0 && (
                <div className="text-center py-12">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No goals yet. Start by adding your first goal!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default InterestsGoalsPage;