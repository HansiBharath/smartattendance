import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X, Plus, Tag, Calendar, Check, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Goal = {
  id: string;
  title: string;
  description: string;
  category: "Career" | "Education" | "Skills" | "Personal";
  year: number;
};

const defaultInterests = ["Artificial Intelligence", "Web Development", "Data Science"];

const years = Array.from({ length: 8 }).map((_, i) => new Date().getFullYear() + i);

export default function Interests() {
  const [interests, setInterests] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("sc_interests");
      return raw ? JSON.parse(raw) : defaultInterests;
    } catch (e) {
      return defaultInterests;
    }
  });

  const [showInterestInput, setShowInterestInput] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  const [goals, setGoals] = useState<Goal[]>(() => {
    try {
      const raw = localStorage.getItem("sc_goals");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
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

  // interest handlers
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

  // goals handlers
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
      category: form.category as Goal['category'],
      year: Number(form.year),
    };
    setGoals((s) => [g, ...s]);
    setModalOpen(false);
  }

  function deleteGoal(id: string) {
    setGoals((s) => s.filter((g) => g.id !== id));
  }

  return (
    <div className="min-h-screen p-6 pt-24 bg-[#F5F6FA]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#333]">Interests & Goals</h1>
            <p className="text-sm text-gray-600">Organize your interests and long-term goals to shape your learning path.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={openNewGoalModal} className="bg-teal-600 hover:bg-teal-500 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Goal
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interests Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Your Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex flex-wrap gap-3">
                  <AnimatePresence initial={false}>
                    {interests.map((it) => (
                      <motion.div
                        key={it}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="flex items-center gap-2 bg-white border rounded-full px-3 py-1 shadow-sm"
                      >
                        <span className="text-sm text-gray-800">{it}</span>
                        <button
                          aria-label={`Remove ${it}`}
                          onClick={() => removeInterest(it)}
                          className="rounded-full p-1 hover:bg-gray-100"
                        >
                          <X className="h-3 w-3 text-gray-500" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* add interest */}
              <div>
                {!showInterestInput ? (
                  <Button
                    variant="ghost"
                    onClick={() => setShowInterestInput(true)}
                    className="flex items-center gap-2 text-teal-600 border border-dashed"
                  >
                    <Plus className="h-4 w-4" /> Add Interest
                  </Button>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="e.g., Machine Learning"
                      className="flex-1"
                    />
                    <Button onClick={addInterest} className="bg-teal-600 hover:bg-teal-500 text-white">
                      Add
                    </Button>
                    <Button variant="ghost" onClick={() => { setShowInterestInput(false); setNewInterest(""); }}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Goals Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Long-term Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {goals.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-gray-600"
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
                      className="bg-white p-4 rounded-lg shadow-sm border flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{g.title}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{g.category}</span>
                        </div>
                        <p className="text-sm text-gray-600">{g.description}</p>
                      </div>

                      <div className="mt-3 md:mt-0 flex items-center gap-3">
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{g.year}</span>
                        </div>
                        <button onClick={() => deleteGoal(g.id)} className="rounded-md p-2 hover:bg-gray-100">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* modal for adding goal */}
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
                className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl z-10 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Add New Goal</h2>
                  <button onClick={() => setModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Goal Title</label>
                    <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Become a Full-Stack Developer" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full border rounded-md p-2 min-h-[80px] resize-none"
                      placeholder="Short description about the goal"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Category</label>
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
                      <label className="block text-sm text-gray-700 mb-1">Target Year</label>
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
                    <Button onClick={saveGoal} className="bg-teal-600 hover:bg-teal-500 text-white">
                      <Check className="mr-2 h-4 w-4" /> Save Goal
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
