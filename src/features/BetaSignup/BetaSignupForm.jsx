import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import ReactCountryFlag from "react-country-flag";
import countries from "@/data/countries";

export default function BetaSignupForm() {
  const [form, setForm] = useState({ name: "", email: "", country: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.country) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "beta_signups"), {
        ...form,
        createdAt: Timestamp.now(),
      });
      setForm({ name: "", email: "", country: "" });
      toast.success("Thank you for registering! You’ll be notified via email.");
    } catch (error) {
      toast.error("Error submitting. Try again later.");
      console.error("Firebase error:", error);
    }
  };

  return (
    <section className="min-h-screen bg-[#121212] text-white py-16 px-6">
      <Toaster richColors position="top-center"/>
      <motion.div
        className="max-w-2xl mx-auto space-y-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-purple-400">Join Our Beta Program</h2>
          <p className="text-gray-400">
            Be one of the first to experience the new features of Melora. As a beta tester,
            you’ll test unreleased content, report bugs, and help shape the future of the game.
            You'll be notified via email if you're selected.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Name</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-zinc-800 text-white border border-zinc-700"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-zinc-800 text-white border border-zinc-700"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="bg-zinc-800 text-white border border-zinc-700 rounded-md w-full py-2 px-3"
              required
            >
              <option value="" disabled>
                Select your country
              </option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 w-full">
            Join Beta
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
