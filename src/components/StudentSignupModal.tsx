import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StudentSignupModal: React.FC<StudentSignupModalProps> = ({ open, onOpenChange }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    registerNo: '',
    branch: '',
    year: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { toast } = useToast();

  const branches = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics and Communication Engineering',
    'Electrical and Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.registerNo || !formData.branch || 
        !formData.year || !formData.dob || !formData.email || 
        !formData.password || !formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitted(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Signup Request Submitted",
        description: "Your request has been sent to Faculty for approval.",
      });
    }, 1000);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      registerNo: '',
      branch: '',
      year: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Student Registration</DialogTitle>
              <DialogDescription>
                Create your student account
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="signup-fullname">Full Name *</Label>
                <Input
                  id="signup-fullname"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="transition-all duration-200 focus:scale-[1.01]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-regno">Register Number *</Label>
                <Input
                  id="signup-regno"
                  value={formData.registerNo}
                  onChange={(e) => handleInputChange('registerNo', e.target.value)}
                  placeholder="Enter your register number"
                  className="transition-all duration-200 focus:scale-[1.01]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-branch">Branch *</Label>
                <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                  <SelectTrigger className="transition-all duration-200 focus:scale-[1.01]">
                    <SelectValue placeholder="Select your branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-year">Year *</Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                  <SelectTrigger className="transition-all duration-200 focus:scale-[1.01]">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-dob">Date of Birth *</Label>
                <Input
                  id="signup-dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  className="transition-all duration-200 focus:scale-[1.01]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email *</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="transition-all duration-200 focus:scale-[1.01]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password *</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  className="transition-all duration-200 focus:scale-[1.01]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password *</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className="transition-all duration-200 focus:scale-[1.01]"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 academic-button">
                Submit Request
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 fade-in">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Your signup request has been sent to Faculty for approval. 
              You'll be notified once approved.
            </p>
            <Button onClick={handleClose} className="academic-button">
              Got it!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentSignupModal;