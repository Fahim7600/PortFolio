import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import { personalInfo, socialLinks } from '@/data/portfolio-data';
import { IconChip } from '../ui';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // GSAP ScrollTrigger staggered entrance for contact items
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-fade-in',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message body cannot be empty.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setStatusMessage('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Retrieve backend API URL from env variables
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' }); // reset inputs
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Failed to submit form. Please review input fields or try again.');
      }
    } catch (err) {
      console.error('Contact Form Post Error:', err);
      setSubmitStatus('error');
      setStatusMessage('Unable to connect to the mail server. Please ensure the backend is running, or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaGithub':
        return <FiGithub className="text-xl" />;
      case 'FaLinkedin':
        return <FiLinkedin className="text-xl" />;
      default:
        return <FiMail className="text-xl" />;
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-[#0a0e17] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/5"
    >
      {/* Decorative Organic Floating Blob (Visual rhyme with earlier sections) */}
      <div className="absolute right-0 bottom-1/4 w-80 h-80 pointer-events-none opacity-20 filter blur-3xl z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 0.9, 1],
            rotate: [0, 90, 180, 360],
            borderRadius: [
              '40% 60% 60% 40% / 40% 50% 60% 50%',
              '50% 50% 50% 50%',
              '30% 70% 70% 30% / 50% 60% 40% 50%',
              '40% 60% 60% 40% / 40% 50% 60% 50%',
            ],
          }}
          transition={{
            duration: 15,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="w-full h-full bg-gradient-to-tr from-cyan-600/10 to-purple-600/20"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Heading */}
        <div className="space-y-2 mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div>
        </div>

        {/* Layout grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Invitations & Contact Information */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="contact-fade-in space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Let&apos;s build something together!
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                Whether you have an interesting job opening, want to discuss software engineering, machine learning models, or just want to connect, feel free to drop a message. I will do my best to reply as soon as possible.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="contact-fade-in space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 bg-[#131826]/75 border border-white/10 hover:border-purple-500/80 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] rounded-2xl transition-all duration-300 group"
                aria-label="Send Email"
              >
                <div className="p-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white rounded-xl transition-all duration-300">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Email Me</span>
                  <span className="text-[#E6E9F0] text-sm font-semibold group-hover:text-white transition-colors">
                    {personalInfo.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 p-4 bg-[#131826]/75 border border-white/10 hover:border-cyan-500/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] rounded-2xl transition-all duration-300 group"
                aria-label="Call Phone"
              >
                <div className="p-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-white rounded-xl transition-all duration-300">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Call Me</span>
                  <span className="text-[#E6E9F0] text-sm font-semibold group-hover:text-white transition-colors">
                    {personalInfo.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-[#131826]/75 border border-white/10 rounded-2xl shadow-md">
                <div className="p-3 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-xl">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Location</span>
                  <span className="text-[#E6E9F0] text-sm font-semibold">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Socials Connection Row */}
            <div className="contact-fade-in flex items-center gap-4 pt-2">
              <span className="text-sm font-semibold tracking-wide text-slate-400 uppercase">Connect:</span>
              <div className="flex items-center gap-3">
                {socialLinks
                  .filter((social) => social.id !== 'email')
                  .map((social, idx) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus:outline-none"
                      aria-label={`Visit my ${social.label}`}
                    >
                      <IconChip
                        size="md"
                        accentColor={idx % 2 === 0 ? 'cyan' : 'magenta'}
                      >
                        {getSocialIcon(social.icon)}
                      </IconChip>
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-fade-in lg:col-span-7 bg-[#131826]/75 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Row for Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1 text-left">
                  <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[#1b2234] border focus:outline-none focus:ring-1 focus:ring-purple-500/40 focus:border-purple-500 text-white placeholder-slate-500 transition-all duration-300 ${
                      errors.name ? 'border-red-500/80 focus:ring-red-500/30' : 'border-white/10 hover:border-white/20'
                    }`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-red-400 text-xs font-semibold mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1 text-left">
                  <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[#1b2234] border focus:outline-none focus:ring-1 focus:ring-purple-500/40 focus:border-purple-500 text-white placeholder-slate-500 transition-all duration-300 ${
                      errors.email ? 'border-red-500/80 focus:ring-red-500/30' : 'border-white/10 hover:border-white/20'
                    }`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-400 text-xs font-semibold mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1 text-left">
                <label htmlFor="subject" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-[#1b2234] border focus:outline-none focus:ring-1 focus:ring-purple-500/40 focus:border-purple-500 text-white placeholder-slate-500 transition-all duration-300 ${
                    errors.subject ? 'border-red-500/80 focus:ring-red-500/30' : 'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="Collaboration opening"
                  disabled={isSubmitting}
                />
                {errors.subject && <p className="text-red-400 text-xs font-semibold mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1 text-left">
                <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-[#1b2234] border focus:outline-none focus:ring-1 focus:ring-purple-500/40 focus:border-purple-500 text-white placeholder-slate-500 transition-all duration-300 resize-none ${
                    errors.message ? 'border-red-500/80 focus:ring-red-500/30' : 'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="Hey, let's talk about..."
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-red-400 text-xs font-semibold mt-1">{errors.message}</p>}
              </div>

              {/* Submit Feedback Banners */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-start gap-2.5 p-4 rounded-xl border text-sm text-left ${
                      submitStatus === 'success'
                        ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400'
                        : 'bg-red-950/30 border-red-500/20 text-red-400'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <FiCheckCircle className="text-emerald-500 text-base mt-0.5 flex-shrink-0" />
                    ) : (
                      <FiAlertCircle className="text-red-400 text-base mt-0.5 flex-shrink-0" />
                    )}
                    <span className="font-semibold leading-relaxed">{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-600/70 disabled:to-indigo-600/70 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-600/25 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-500/20 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="text-base group-hover:translate-x-0.5 transition-transform" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
