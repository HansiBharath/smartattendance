import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/StudentDashboard";
import AttendancePage from "./pages/AttendancePage";
import Interests from "./pages/Interests";
import Profile from "./pages/Profile";
import Programs from "./pages/Programs";
import Curriculum from "./pages/timetable";
import ProfileF from "./pages/ProfileF";
import NotFound from "./pages/NotFound";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyAttendance from "./pages/FacultyAttendancePage";
import FacultyCurriculumPage from "./pages/FacultyCurriculum";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student/attendance" element={<AttendancePage />} />
          <Route path="/student/interests" element={<Interests />} />
          <Route path="/student/programs" element={<Programs />} />
          <Route path="/student/curriculum" element={<Curriculum />} />
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/faculty/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/attendance" element={<FacultyAttendance />} />
          <Route path="/faculty/curriculum" element={<FacultyCurriculumPage />} />
          <Route path="/faculty/profile" element={<ProfileF />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
