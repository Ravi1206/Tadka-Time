import React, { useState } from 'react';
import { 
  Mail, 
  User, 
  FileText, 
  ShieldCheck, 
  CheckCircle, 
  Send, 
  MapPin, 
  Award, 
  BookOpen, 
  Sparkles, 
  Coffee, 
  Calendar,
  Eye,
  Info
} from 'lucide-react';

/* ==========================================
   ABOUT US COMPONENT
   ========================================== */
interface AboutUsProps {
  onBackToHome: () => void;
  setActiveCategory: (cat: any) => void;
}

export function AboutUs({ onBackToHome, setActiveCategory }: AboutUsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="about-us-view">
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-6 flex items-center gap-1.5">
        <button onClick={onBackToHome} className="hover:text-orange-600 transition">Home</button>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-300 font-semibold">About Us</span>
      </div>

      {/* Hero section */}
      <div className="text-center mb-12">
        <span className="bg-orange-500/10 text-orange-600 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest dark:bg-orange-950/40">
          The Tadka Time Story
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-3 tracking-tight">
          Savouring Culinary Craft & Local Beat
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mt-3 max-w-2xl mx-auto">
          Tadka Time is a modern, high-quality digital content ecosystem blending culinary arts, street-level city reporting, business intelligence, and daily interactive challenges.
        </p>
      </div>

      {/* Ravi Kumar Founder Showcase Card */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-6 sm:p-8 shadow-md dark:border-neutral-800 dark:bg-neutral-950 mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
          <div className="relative">
            <img
              src="/Ravi.png"
              alt="Ravi Kumar"
              referrerPolicy="no-referrer"
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-md border-2 border-orange-500"
            />
            <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow-md">
              Founder
            </span>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">Ravi Kumar</h3>
            <p className="text-xs text-orange-600 font-bold tracking-wide uppercase mt-0.5">
              Founder of Tadka Time & Dabba Meals
            </p>
            <p className="text-xs text-neutral-400 mt-1 flex items-center justify-center md:justify-start gap-1">
              <MapPin className="h-3 w-3" /> Bengaluru, Karnataka, India
            </p>
            
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-4 leading-relaxed font-sans font-light">
              Ravi Kumar is a food entrepreneur, digital publisher, and technology professional with experience in both the food and IT industries. He has over two years of experience as an <strong>RPA (Robotic Process Automation) Developer</strong>, specializing in <strong>UiPath, Automation Anywhere, and Microsoft Power Automate</strong>, where he worked on automating business processes and improving operational efficiency.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed font-sans font-light">
              Alongside his technology career, Ravi built and operated <strong>Dabba Meals</strong>, a home-style tiffin service dedicated to delivering quality and affordable meals. Combining his passion for food, business, and technology, he launched <strong>Tadka Time</strong>, a digital platform focused on sharing authentic food recipes, restaurant business insights, Bengaluru local news, finance and investment guides, and engaging quizzes.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed font-sans font-light">
              His mission is to empower food lovers, support aspiring entrepreneurs, and help businesses grow through practical knowledge, innovation, and technology-driven solutions. With hands-on experience in restaurant operations, automation, and content creation, Ravi aims to make <strong>Tadka Time</strong> a trusted platform that educates, informs, and inspires readers across India.
            </p>
          </div>
        </div>
      </div>

      {/* Core Desks Grid */}
      <div className="mb-12">
        <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white mb-6 text-center">
          What We Cover Inside Tadka Time
        </h3>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:shadow-md transition">
            <div className="text-2xl mb-2">🍲</div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Food & Recipes</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Authentic Indian recipes, street food hacks, and high-protein meal preps tailored for urban professionals.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:shadow-md transition">
            <div className="text-2xl mb-2">🍽</div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Restaurant Business</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Unit economics sheets, cloud kitchen consultancy guides, food cost formulas, and operational audits.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:shadow-md transition">
            <div className="text-2xl mb-2">🏙</div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Bengaluru Local News</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Namma Metro transit alerts, community food festivals at Palace Grounds, and urban development projects.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:shadow-md transition">
            <div className="text-2xl mb-2">💰</div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Finance & Investment</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Tax-saving blueprints, Step-Up SIP compound maps, NPS, and practical capital management for young workers.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:shadow-md transition">
            <div className="text-2xl mb-2">🧩</div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Puzzles & Trivia</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              Daily interactive Sudokus and spice culinary trivia quizzes that award reward loyalty points on completion.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950 hover:shadow-md transition">
            <div className="text-2xl mb-2">💡</div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Tech & Lifestyle</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
              CTO surveys on Generative AI coding standards and health strategies to live a vibrant, balanced corporate life.
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission & Values */}
      <div className="border-t pt-8 dark:border-neutral-800">
        <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white mb-4">Our Mission & Principles</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light">
          At Tadka Time, we are firmly committed to editorial transparency and publishing original, high-quality content written with a reader-first philosophy. We do not participate in duplicate article scraping or generate low-effort placeholders. We make sure every article contains proper structural headings, clear instructions, verified facts, and relevant downloadable resources.
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-3 leading-relaxed font-sans font-light">
          Our platform is optimized for accessibility, is fast loading, is fully responsive on mobile devices, and implements standard Schema.org structured data to be completely transparent to search engine web crawlers.
        </p>
      </div>
    </div>
  );
}


/* ==========================================
   CONTACT US COMPONENT
   ========================================== */
export function ContactUs({ onBackToHome }: { onBackToHome: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }
    // Simulate API delivery
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="contact-us-view">
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-6 flex items-center gap-1.5">
        <button onClick={onBackToHome} className="hover:text-orange-600 transition">Home</button>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-300 font-semibold">Contact Us</span>
      </div>

      <div className="text-center mb-10">
        <span className="bg-orange-500/10 text-orange-600 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest dark:bg-orange-950/40">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-3 tracking-tight">
          Connect With Ravi Kumar
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-lg mx-auto">
          Have feedback on our recipes? Looking for cloud kitchen business advice? Drop a line directly into our mail tray.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar Info cards */}
        <div className="space-y-4 md:col-span-1">
          <div className="p-5 rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Direct Channel</h4>
            <p className="text-sm font-extrabold text-neutral-900 dark:text-white">Ravi Kumar</p>
            <p className="text-xs text-orange-600 font-semibold mt-1">Founder & Lead Writer</p>
            <a 
              href="mailto:ravikumar870317@gmail.com"
              className="text-xs text-neutral-600 hover:text-orange-600 dark:text-neutral-300 mt-3 flex items-center gap-1.5 font-sans break-all"
            >
              <Mail className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
              <span>ravikumar870317@gmail.com</span>
            </a>
          </div>

          <div className="p-5 rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Office Headquarters</h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed flex items-start gap-1.5 font-sans">
              <MapPin className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
              <span>
                HBR Layout 5th Block,<br/>
                Bangalore, KA - 560043<br/>
                India
              </span>
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">AdSense Publisher</h4>
            <p className="text-xs text-neutral-500 leading-normal font-sans font-light">
              Approved ads appear in dedicated, non-intrusive zones. For advertising partnerships, please label subject with "ADVERTISING CO-OP".
            </p>
          </div>
        </div>

        {/* Contact Form card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-neutral-100 p-6 shadow-md dark:border-neutral-800 dark:bg-neutral-950">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Message Transmitted!</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-sm mx-auto">
                Thank you for contacting Tadka Time. Ravi Kumar or a team writer will review your inquiry and reply via email at <strong>{formData.email}</strong> within 24–48 hours.
              </p>
              <button
                onClick={() => { setFormData({ name: '', email: '', subject: '', message: '' }); setSubmitted(false); }}
                className="mt-6 rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 text-xs font-bold transition shadow-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Your Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                    <input
                      type="email"
                      required
                      placeholder="John@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Question about Butter Chicken Spices"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2 px-3 text-xs font-bold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">Message Content</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Type your message details here. Include any specific links or recipe names..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-md border border-neutral-200 bg-neutral-50 p-3 text-xs font-semibold outline-none focus:border-orange-500 focus:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 text-xs font-extrabold transition shadow-md shadow-orange-500/10 flex items-center justify-center gap-2"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Message to Ravi</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


/* ==========================================
   PRIVACY POLICY COMPONENT
   ========================================== */
export function PrivacyPolicy({ onBackToHome }: { onBackToHome: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="privacy-policy-view">
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-6 flex items-center gap-1.5">
        <button onClick={onBackToHome} className="hover:text-orange-600 transition">Home</button>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-300 font-semibold">Privacy Policy</span>
      </div>

      <div className="border bg-white rounded-2xl p-6 sm:p-10 shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
        <div className="flex items-center gap-2.5 mb-4">
          <ShieldCheck className="h-8 w-8 text-orange-600" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Privacy Policy – Tadka Time
            </h1>
            <p className="text-xs text-neutral-400 font-medium">Effective Date: January 1, 2026</p>
          </div>
        </div>
        
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light mt-4">
          At Tadka Time (available at <a href="https://www.tadkatime.online" className="text-orange-600 hover:underline">https://www.tadkatime.online</a>), we respect your privacy and are committed to protecting your personal information. This Privacy Policy details how we collect, store, utilize, and protect your information when you visit our digital platform.
        </p>

        <div className="space-y-6 mt-8 font-sans font-light text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700 dark:bg-orange-950/40">1</span>
              <span>Information We Collect</span>
            </h2>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              <li><strong>Name and email address:</strong> Collected when you fill our contact forms, subscribe to our Tadka Dispatch weekly newsletter, or register for the member club.</li>
              <li><strong>Comments and feedback:</strong> Any text or insights you submit on articles are stored on our servers to keep discussions lively and engaged.</li>
              <li><strong>Technical and log data:</strong> Browser type, operating system, dynamic IP address, timestamp, page navigation paths, and device profiles are tracked for performance diagnostics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700 dark:bg-orange-950/40">2</span>
              <span>Cookies</span>
            </h2>
            <p className="pl-7">
              We utilize cookies (small standard identifier records) to enhance website performance, store member session logins, remember dark mode preferences, and analyze website traffic. You hold the absolute right to disable or refuse cookies directly through your individual internet browser configuration panel.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700 dark:bg-orange-950/40">3</span>
              <span>Google AdSense & DoubleClick DART Cookies</span>
            </h2>
            <p className="pl-7">
              Google, as a prominent third-party advertising network partner, uses cookies to display tailored advertisements on Tadka Time. Google's use of the DART cookie enables it to serve personalized banners based on your previous visits to this website and other platforms on the internet. You can manage, disable, or personalize these ad serving parameters by visiting the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Google Ad Settings</a> panel.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700 dark:bg-orange-950/40">4</span>
              <span>Third-Party Advertising & Services</span>
            </h2>
            <p className="pl-7">
              We may utilize specific third-party analytics and optimization systems like Google Analytics and social media sharing plug-ins. These external services compile information according to their own strict, independent privacy guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700 dark:bg-orange-950/40">5</span>
              <span>Data Protection & Safety</span>
            </h2>
            <p className="pl-7">
              We implement comprehensive security layers to shield your personal details. We do not sell, lease, rent, trade, or share your compiled personal email information with external third parties under any circumstances, except when explicitly required to enforce legal directives.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700 dark:bg-orange-950/40">6</span>
              <span>Children's Privacy</span>
            </h2>
            <p className="pl-7">
              Protecting young children's safety online is paramount. Tadka Time is an educational, culinary, and news platform not directed toward children under 13. We do not knowingly collect identifiable data from children under the age of 13.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-700 dark:bg-orange-950/40">7</span>
              <span>Changes to This Policy</span>
            </h2>
            <p className="pl-7">
              We reserve the absolute right to update or modify this Privacy Policy as our operations expand. Any modifications will carry a revised Effective Date visible at the top of this document.
            </p>
          </section>

          <section className="border-t pt-4 dark:border-neutral-800">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Contact Information</h2>
            <p>If you have any questions or feedback regarding our privacy practices, please contact our administrator directly:</p>
            <p className="mt-2 font-bold text-neutral-900 dark:text-white">Ravi Kumar</p>
            <p className="text-xs text-orange-600 font-semibold">Founder of Tadka Time</p>
            <p className="text-xs mt-1">Email: <a href="mailto:ravikumar870317@gmail.com" className="text-orange-600 hover:underline">ravikumar870317@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}


/* ==========================================
   TERMS & CONDITIONS COMPONENT
   ========================================== */
export function TermsConditions({ onBackToHome }: { onBackToHome: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="terms-view">
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-6 flex items-center gap-1.5">
        <button onClick={onBackToHome} className="hover:text-orange-600 transition">Home</button>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-300 font-semibold">Terms & Conditions</span>
      </div>

      <div className="border bg-white rounded-2xl p-6 sm:p-10 shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
        <div className="flex items-center gap-2.5 mb-4">
          <FileText className="h-8 w-8 text-orange-600" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Terms & Conditions – Tadka Time
            </h1>
            <p className="text-xs text-neutral-400 font-medium">Effective Date: January 1, 2026</p>
          </div>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light mt-4">
          By accessing and browsing our website at <a href="https://www.tadkatime.online" className="text-orange-600 hover:underline">https://www.tadkatime.online</a>, you fully agree to adhere to and be bound by the following terms and conditions. If you disagree with any part of these conditions, please do not use our website.
        </p>

        <div className="space-y-6 mt-8 font-sans font-light text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">1. Use of Website</h2>
            <p className="pl-4">
              All materials, articles, food cost calculators, and quizzes published on Tadka Time are provided exclusively for informational, personal, and educational purposes. You agree to use the platform in a lawful manner and promise not to take any action that may damage or compromise website accessibility, performance, or general database security.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">2. Intellectual Property</h2>
            <p className="pl-4">
              All recipe manuals, graphics, text summaries, layout coordinates, code logic, and logos published on this website are the intellectual property of Tadka Time and founder Ravi Kumar, unless explicitly credited to external third parties. You may not copy, scrape, distribute, reproduce, or resell any content without our explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">3. User Conduct</h2>
            <p className="pl-4">
              When using interactive components like our discussion comments section, you agree to submit only civil, relevant, and legal content. You are strictly forbidden from posting marketing spam, malicious code scripts, hostile statements, or content that infringes upon third-party copyrights. We reserve absolute rights to delete, edit, or reject any comment.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">4. External Web Links</h2>
            <p className="pl-4">
              Our publications may contain links pointing toward third-party domains (e.g. food apps, external reference libraries). We hold no authority, control, or liability over the content, tracking technologies, or privacy frameworks operated by those external platforms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">5. Limitation of Liability</h2>
            <p className="pl-4">
              Tadka Time and its founder, Ravi Kumar, will not be held liable or responsible for any financial losses, culinary mistakes, or investment damages resulting from your usage of info obtained from this platform. All tools and calculators are provided as-is without performance warranties.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">6. Changes to Terms</h2>
            <p className="pl-4">
              We reserve absolute rights to modify, edit, or update these terms at any moment without prior warnings. Continued use of our website post changes indicates your complete agreement to the revised conditions.
            </p>
          </section>

          <section className="border-t pt-4 dark:border-neutral-800">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Contact Terms Administration</h2>
            <p className="text-xs text-neutral-500 mt-1">
              Email: <a href="mailto:ravikumar870317@gmail.com" className="text-orange-600 hover:underline">ravikumar870317@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


/* ==========================================
   DISCLAIMER COMPONENT
   ========================================== */
export function Disclaimer({ onBackToHome }: { onBackToHome: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" id="disclaimer-view">
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-6 flex items-center gap-1.5">
        <button onClick={onBackToHome} className="hover:text-orange-600 transition">Home</button>
        <span>/</span>
        <span className="text-neutral-600 dark:text-neutral-300 font-semibold">Disclaimer</span>
      </div>

      <div className="border bg-white rounded-2xl p-6 sm:p-10 shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
        <div className="flex items-center gap-2.5 mb-4">
          <Info className="h-8 w-8 text-orange-600 animate-pulse" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              Disclaimer – Tadka Time
            </h1>
            <p className="text-xs text-neutral-400 font-medium">Effective Date: January 1, 2026</p>
          </div>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light mt-4">
          The information provided on Tadka Time (available at <a href="https://www.tadkatime.online" className="text-orange-600 hover:underline">https://www.tadkatime.online</a>) is for general informational and educational purposes only.
        </p>

        <div className="space-y-6 mt-8 font-sans font-light text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <section className="bg-orange-50/20 p-4 rounded-xl border border-orange-100 dark:bg-orange-950/10 dark:border-orange-900/30">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 uppercase tracking-wide">
              🍴 Food & Recipe Content
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              Our recipes, diet grids, and nutritional advice are created based on personal opinion, experiences, and standard culinary assumptions. Cooking results may vary depending on ingredients, cookware, and experience level. Individuals with allergies or food sensitivities are advised to exercise maximum personal caution before executing any meal plans.
            </p>
          </section>

          <section className="bg-red-50/20 p-4 rounded-xl border border-red-100 dark:bg-red-950/10 dark:border-red-900/30">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 uppercase tracking-wide">
              💰 Finance & Investment Content
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              The financial planning advice, tax guides, and compounding calculators published on this platform are for educational and visualization purposes only and should absolutely not be considered certified investment or legal tax advice. Readers must verify rates and consult qualified financial advisors before taking real-world investment actions.
            </p>
          </section>

          <section className="bg-neutral-50 p-4 rounded-xl border border-neutral-150 dark:bg-neutral-900 dark:border-neutral-800">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 uppercase tracking-wide">
              🏙 Bengaluru Local News
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              We strive to publish highly accurate and updated local reports (transit details, festival tickets, metro schedules). However, city policies, event dates, and transport timelines change over time. We do not guarantee the absolute completeness or real-time accuracy of news records.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-2">External Links</h2>
            <p className="pl-4">
              We may reference or link to external commercial platforms. We are not responsible for verifying or validating the products, opinions, or accuracy of information presented on those third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-2">Advertisements Disclaimer</h2>
            <p className="pl-4">
              This platform serves commercial advertisements sourced via Google AdSense and related marketing partners. Banners and click links are displayed automatically and do not indicate direct endorsement by Tadka Time or founder Ravi Kumar.
            </p>
          </section>

          <section className="border-t pt-4 dark:border-neutral-800 text-center sm:text-left">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Admin Contact</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Email: <a href="mailto:ravikumar870317@gmail.com" className="text-orange-600 hover:underline">ravikumar870317@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
