"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="bg-base-100 dark:bg-base-900 py-24 min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h2 className="text-4xl lg:text-5xl font-display text-title font-semibold">
            Get In Touch
          </h2>
          <p className="text-base max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-base-50 dark:bg-base-900 rounded-3xl border border-base-300 dark:border-base-700 shadow-lg hover:shadow-xl p-8 md:p-12 transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          {status === "success" ? (
            <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="relative inline-block">
                <CheckCircle2 className="w-20 h-20 text-black dark:text-white animate-in zoom-in duration-500" />
                <div className="absolute inset-0 bg-black dark:bg-white blur-2xl opacity-10 animate-pulse"></div>
              </div>
              <h3 className="text-3xl font-display font-semibold text-title">Message Sent!</h3>
              <p className="text-base">Thank you for reaching out. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2 animate-in fade-in slide-in-from-left duration-500 delay-300">
                   <label htmlFor="name" className="text-sm font-medium text-title">
                     Name
                   </label>
                   <div className="relative">
                     <input
                       type="text"
                       id="name"
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       onFocus={() => setFocusedField("name")}
                       onBlur={() => setFocusedField(null)}
                       required
                       className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none bg-base-50 dark:bg-base-900 text-title placeholder:text-muted ${
                         focusedField === "name"
                           ? "border-[rgb(33,33,33)] dark:border-[rgb(223,223,223)] shadow-md shadow-black/15 dark:shadow-white/25"
                           : "border-base-300 dark:border-base-700 hover:border-[rgb(33,33,33)] dark:hover:border-[rgb(223,223,223)]"
                       }`}
                       placeholder="John Doe"
                     />
                   </div>
                 </div>

                <div className="space-y-2 animate-in fade-in slide-in-from-right duration-500 delay-300">
                  <label htmlFor="email" className="text-sm font-medium text-title">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none bg-base-50 dark:bg-base-900 text-title placeholder:text-muted ${
                        focusedField === "email"
                          ? "border-[rgb(33,33,33)] dark:border-[rgb(223,223,223)] shadow-md shadow-black/15 dark:shadow-white/25"
                          : "border-base-300 dark:border-base-700 hover:border-[rgb(33,33,33)] dark:hover:border-[rgb(223,223,223)]"
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 animate-in fade-in slide-in-from-bottom duration-500 delay-400">
                <label htmlFor="subject" className="text-sm font-medium text-title">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none bg-base-50 dark:bg-base-900 text-title placeholder:text-muted ${
                    focusedField === "subject"
                      ? "border-[rgb(33,33,33)] dark:border-[rgb(223,223,223)] shadow-md shadow-black/15 dark:shadow-white/25"
                      : "border-base-300 dark:border-base-700 hover:border-[rgb(33,33,33)] dark:hover:border-[rgb(223,223,223)]"
                  }`}
                  placeholder="How can we help you?"
                />
              </div>

              <div className="space-y-2 animate-in fade-in slide-in-from-bottom duration-500 delay-500">
                <label htmlFor="message" className="text-sm font-medium text-title">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none resize-none bg-base-50 dark:bg-base-900 text-title placeholder:text-muted ${
                    focusedField === "message"
                      ? "border-[rgb(33,33,33)] dark:border-[rgb(223,223,223)] shadow-md shadow-black/15 dark:shadow-white/25"
                      : "border-base-300 dark:border-base-700 hover:border-[rgb(33,33,33)] dark:hover:border-[rgb(223,223,223)]"
                  }`}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {status === "error" && (
                <div className="bg-base-100 dark:bg-base-800 border-2 border-[rgb(33,33,33)] dark:border-[rgb(223,223,223)] rounded-xl p-4 text-title text-sm animate-in fade-in slide-in-from-bottom duration-300">
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group animate-in fade-in slide-in-from-bottom duration-500 delay-600"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
