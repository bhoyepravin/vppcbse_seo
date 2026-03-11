
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { footerlogo } from "../../assets";

const Footer = () => {
  const socialIcons = [
    {
      icon: FaFacebookF,
      label: "Facebook",
      url: "https://www.facebook.com/share/1Exn77sKxB/",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      url: "#",
    },
    {
      icon: FaYoutube,
      label: "YouTube",
      url: "https://youtube.com/@vppcbse1331?si=4L6Zl_o-O27F7vRz",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      url: "https://www.instagram.com/vppcbse?igsh=YTlwZnVxaGpidjcx",
    },
  ];

  const quickLinks = [
    {
      label: "About us",
      path: "/about",
    },
    {
      label: "Admission",
      path: "/admission",
    },
    {
      label: "Academics",
      path: "/curriculum",
    },
    {
      label: "Gallery",
      path: "/images",
    },
    {
      label: "Contact us",
      path: "/contact",
    },
    {
      label: "Mandatory Public Disclosure",
      path: "/disclosure",
    }
  ];

  return (
    <footer className="gradient-navy text-white pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 lg:px-16 rounded-t-2xl sm:rounded-t-3xl shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
        {/* Left Section - School Information */}
        <div>
          <Link to="/">
            <img
              src={footerlogo}
              alt="Vidya Prabodhini Prashala Logo"
              className="mb-4 sm:mb-6 w-32 sm:w-36 md:w-40 hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
          
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white/90 flex items-center gap-2">
            <IoCallOutline size={18} className="text-navy-200" />
            Contact Us
          </h3>
          <p className="text-sm text-white/80 mb-4">
            Got something to say? Please drop us a line.
          </p>
          <ul className="text-sm text-white/80 space-y-3">
            <li className="flex items-start gap-2">
              <IoLocationOutline
                size={18}
                className="text-navy-200 mt-1 flex-shrink-0"
              />
              <span>
                <strong className="text-white font-medium">
                  Vidya Prabodhini Prashala 
                </strong>
                <br />
                Dharmaveer Dr. B.S. Moonje Marg, Rambhoomi, 
                <br />
                Nashik, Maharashtra 422005
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineEmail size={18} className="text-navy-200" />
              <a
                href="mailto:info@vppcbse.bhonsala.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-300 hover:underline"
              >
                info@vppcbse.bhonsala.in
              </a>
            </li>

            <li className="flex items-center gap-2">
              <IoCallOutline size={18} className="text-navy-200" />
              <a
                href="tel:7507546666"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-300 hover:underline"
              >
                7507546666
              </a>
            </li>
          </ul>

          {/* School Timings */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <h4 className="text-sm font-semibold text-white mb-2">
              SCHOOL TIMINGS:
            </h4>
            <p className="text-sm text-white/80">
              Monday to Friday: 8:00 AM - 2:00 PM
            </p>
            <p className="text-sm text-white/80">
              Saturday: 8:00 AM - 11:00 AM
            </p>
            <p className="text-sm text-white/80 mt-2">
              Office: 8:30 AM - 12:00 PM
            </p>
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white/90">
            Quick Links
          </h3>
          <ul className="text-sm text-white/80 space-y-2">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-navy-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Media Links */}
          <div className="mt-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white/90">
              Stay Connected
            </h3>
            <ul className="text-sm text-white/80 space-y-2 mb-6">
              <li className="flex items-center gap-2 group">
                <FaFacebookF className="text-navy-200 group-hover:text-blue-400 transition-colors duration-300" />
                <a 
                  href="https://www.facebook.com/share/1Exn77sKxB/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white hover:underline transition-colors duration-300"
                >
                  Facebook: See our latest portfolio & gallery
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <FaLinkedin className="text-navy-200 group-hover:text-blue-500 transition-colors duration-300" />
                <a 
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white hover:underline transition-colors duration-300"
                >
                  LinkedIn: Connect with us for professional insights
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <FaYoutube className="text-navy-200 group-hover:text-red-500 transition-colors duration-300" />
                <a 
                  href="https://youtube.com/@vppcbse1331?si=4L6Zl_o-O27F7vRz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white hover:underline transition-colors duration-300"
                >
                  YouTube: Watch our videos & success stories
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <FaInstagram className="text-navy-200 group-hover:text-pink-500 transition-colors duration-300" />
                <a 
                  href="https://www.instagram.com/vppcbse?igsh=YTlwZnVxaGpidjcx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white hover:underline transition-colors duration-300"
                >
                  Instagram: Follow our daily updates & events
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Map & Social Icons */}
        <div className="lg:col-span-1 md:col-span-2">
          <div className="space-y-6">
            {/* Map */}
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <iframe
                title="Vidya Prabodhini Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d432.0137821062885!2d73.75400732954571!3d20.008474559323567!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb85fab84bf9%3A0x5f2e809d4e352b3b!2sVidya%20Prabodhini%20Prashala%20(%20C.B.S.E%20)!5e1!3m2!1sen!2sin!4v1768134378635!5m2!1sen!2sin"
                className="w-full h-48 sm:h-52 md:h-56 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                style={{ border: 0 }}
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4">
                <Link 
                  to="/contact" 
                  className="bg-white/90 text-navy-800 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-white transition-all duration-300 hover:shadow-lg flex items-center gap-1"
                >
                  <IoLocationOutline size={14} />
                  Get Directions
                </Link>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white/90">
                Follow Us
              </h3>
              <div className="flex gap-4 sm:gap-6">
                {socialIcons.map(({ icon: Icon, label, url }, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="bg-white/10 backdrop-blur-sm p-2.5 sm:p-3 rounded-full shadow-sm hover:bg-white/20 text-white hover:text-white transition-all duration-300 group relative"
                  >
                    <Icon size={18} className="sm:w-5 sm:h-5" />
                    {/* Tooltip */}
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-navy-800 text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Accreditation */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-white/80">
                <strong className="text-white font-medium">
                  Affiliated with:
                </strong>{" "}
                C.B.S.E (New Delhi)
              </p>
              <p className="text-sm text-white/80">
                <strong className="text-white font-medium">
                  Affiliation No.:
                </strong>{" "}
                1130258
              </p>
            </div>

            {/* Quick Contact Button */}
            <div className="mt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 w-full justify-center text-sm font-medium"
              >
                <MdOutlineEmail size={16} />
                Quick Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 sm:mt-10 md:mt-12 text-center text-sm text-white/70 border-t border-white/20 pt-4 sm:pt-6">
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <p>
            © 2025{" "}
            <span className="font-semibold text-white">
              Vidya Prabodhini Prashala 
            </span>
            . All Rights Reserved.
          </p>
          <span className="hidden sm:inline text-white/50">|</span>
          <p className="text-xs text-white/60">
            Est. 1965 • A Legacy of Excellence in Education
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-2 text-xs sm:text-sm">
          <Link
            to="/terms"
            className="text-white/70 hover:text-white hover:underline transition-colors duration-300 px-2 py-1 rounded hover:bg-white/5"
          >
            Terms & Conditions
          </Link>
          <span className="text-white/50 hidden sm:inline">|</span>
          <Link
            to="/privacy"
            className="text-white/70 hover:text-white hover:underline transition-colors duration-300 px-2 py-1 rounded hover:bg-white/5"
          >
            Privacy Policy
          </Link>
          <span className="text-white/50 hidden sm:inline">|</span>
          <Link
            to="/disclosure"
            className="text-white/70 hover:text-white hover:underline transition-colors duration-300 px-2 py-1 rounded hover:bg-white/5"
          >
            Mandatory Public Disclosure
          </Link>
          <span className="text-white/50 hidden sm:inline">|</span>
          <Link
            to="/sitemap"
            className="text-white/70 hover:text-white hover:underline transition-colors duration-300 px-2 py-1 rounded hover:bg-white/5"
          >
            Sitemap
          </Link>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-xs text-white/50">
            Designed & Developed with ❤️ by{" "}
            <a 
              href="https://richsol.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white hover:underline transition-colors duration-300"
            >
             RICH System Solutions Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;