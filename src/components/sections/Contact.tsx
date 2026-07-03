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
        return <FiGithub className="text-lg" />;
      case 'FaLinkedin':
        return <FiLinkedin className="text-lg" />;
      default:
        return <FiMail className="text-lg" />;
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-background py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-border/30"
    >
      {/* Decorative Organic Floating Blob (Visual rhyme with earlier sections) */}
      <div className="absolute right-0 bottom-1/4 w-80 h-80 pointer-events-none opacity-30 mix-blend-multiply filter blur-2xl z-0">
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
          className="w-full h-full bg-gradient-to-tr from-accent/20 to-accent-light/35"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Heading */}
        <div className="space-y-2 mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full"></div>
        </div>

        {/* Layout grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Invitations & Contact Information */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="contact-fade-in space-y-4">
              <h3 className="text-2xl font-bold text-foreground tracking-tight">
                Let&apos;s build something together!
              </h3>
              <p className="text-muted text-base leading-relaxed">
                Whether you have an interesting job opening, want to discuss software engineering, machine learning models, or just want to connect, feel free to drop a message. I will do my best to reply as soon as possible.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="contact-fade-in space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 bg-surface border border-border/40 hover:border-accent/40 rounded-2xl hover:shadow-xs transition-all duration-200 group"
                aria-label="Send Email"
              >
                <div className="p-3 bg-accent-light/50 text-accent group-hover:bg-accent group-hover:text-white rounded-xl transition-all duration-200">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-muted uppercase tracking-wider">Email Me</span>
                  <span className="text-foreground text-sm font-semibold group-hover:text-accent transition-colors">
                    {personalInfo.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 p-4 bg-surface border border-border/40 hover:border-accent/40 rounded-2xl hover:shadow-xs transition-all duration-200 group"
                aria-label="Call Phone"
              >
                <div className="p-3 bg-accent-light/50 text-accent group-hover:bg-accent group-hover:text-white rounded-xl transition-all duration-200">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-muted uppercase tracking-wider">Call Me</span>
                  <span className="text-foreground text-sm font-semibold group-hover:text-accent transition-colors">
                    {personalInfo.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-surface border border-border/40 rounded-2xl shadow-xxs">
                <div className="p-3 bg-accent-light/50 text-accent rounded-xl">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-muted uppercase tracking-wider">Location</span>
                  <span className="text-foreground text-sm font-semibold">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Socials Connection Row */}
            <div className="contact-fade-in flex items-center gap-4 pt-2">
              <span className="text-sm font-semibold tracking-wide text-muted uppercase">Connect:</span>
              <div className="flex items-center gap-3">
                {socialLinks
                  .filter((social) => social.id !== 'email')
                  .map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border/80 text-muted hover:text-accent hover:border-accent hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
                      aria-label={`Visit my ${social.label}`}
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-fade-in lg:col-span-7 bg-surface border border-border/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Row for Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1 text-left">
                  <label htmlFor="name" className="text-xs font-bold text-muted uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-surface-alt border focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all ${
                      errors.name ? 'border-red-500' : 'border-border/60 hover:border-border'
                    }`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1 text-left">
                  <label htmlFor="email" className="text-xs font-bold text-muted uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-surface-alt border focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all ${
                      errors.email ? 'border-red-500' : 'border-border/60 hover:border-border'
                    }`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1 text-left">
                <label htmlFor="subject" className="text-xs font-bold text-muted uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-alt border focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all ${
                    errors.subject ? 'border-red-500' : 'border-border/60 hover:border-border'
                  }`}
                  placeholder="Collaboration opening"
                  disabled={isSubmitting}
                />
                {errors.subject && <p className="text-red-500 text-xs font-semibold mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1 text-left">
                <label htmlFor="message" className="text-xs font-bold text-muted uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-surface-alt border focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground transition-all resize-none ${
                    errors.message ? 'border-red-500' : 'border-border/60 hover:border-border'
                  }`}
                  placeholder="Hey, let's talk about..."
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-red-500 text-xs font-semibold mt-1">{errors.message}</p>}
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
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <FiCheckCircle className="text-emerald-600 text-base mt-0.5 flex-shrink-0" />
                    ) : (
                      <FiAlertCircle className="text-red-600 text-base mt-0.5 flex-shrink-0" />
                    )}
                    <span className="font-semibold leading-relaxed">{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 w-full py-3.5 bg-accent hover:bg-accent-hover disabled:bg-accent/70 text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-accent/25 hover:shadow-lg disabled:cursor-not-allowed"
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
