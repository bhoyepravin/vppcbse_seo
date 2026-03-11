import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, FileText, ArrowLeft, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

function PrivacyPolicy() {
  // Current date for the policy
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-x-32 -translate-y-32"></div>
      {/* <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-x-32 translate-y-32"></div> */}

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0075c4 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-navy-400"></div>
            <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-navy">
              Privacy Policy
            </h1>
            <div className="w-2 h-2 rounded-full bg-navy-400"></div>
          </div>
          
          <div className="h-1.5 w-24 gradient-navy mx-auto mb-6 rounded-full"></div>
          
          <div className="flex items-center justify-center gap-2 text-navy-600 text-sm sm:text-base">
            <Shield className="w-4 h-4" />
            <span>Last Updated: {currentDate}</span>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-navy-100 overflow-hidden"
        >
          {/* Quick Info Bar */}
          <div className="bg-gradient-to-r from-navy-50 to-blue-50 p-6 border-b border-navy-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-navy-600">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-navy-500">Data Protection</p>
                  <p className="text-sm font-semibold text-navy-800">100% Secure</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-navy-600">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-navy-500">Transparency</p>
                  <p className="text-sm font-semibold text-navy-800">Clear & Honest</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-navy-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-navy-500">Compliance</p>
                  <p className="text-sm font-semibold text-navy-800">Legal Standards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Introduction
              </h2>
              <p className="text-navy-700 leading-relaxed">
                At Vidya Prabodhini Prashala, part of The Central Hindu Military Education Society (CHME'S), 
                we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard 
                your personal information when you interact with our educational institution.
              </p>
            </section>

            {/* Information Collection */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-navy-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy-800">Student Information</h3>
                    <p className="text-navy-600 text-sm">Name, date of birth, grade, academic records, and health information necessary for educational purposes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-navy-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy-800">Parent/Guardian Information</h3>
                    <p className="text-navy-600 text-sm">Contact details, emergency contacts, and communication preferences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-navy-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy-800">Staff Information</h3>
                    <p className="text-navy-600 text-sm">Employment records, qualifications, and professional development information.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                How We Use Your Information
              </h2>
              <ul className="space-y-2 text-navy-700">
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>To provide educational services and maintain academic records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>To communicate important updates, events, and emergency information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>To process admissions, fees, and administrative tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>To ensure student safety and well-being on campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>To comply with legal obligations and educational regulations</span>
                </li>
              </ul>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Data Protection & Security
              </h2>
              <p className="text-navy-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. Our security practices include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-navy-50 p-4 rounded-lg">
                  <p className="font-semibold text-navy-800 mb-2">Encrypted Storage</p>
                  <p className="text-sm text-navy-600">All sensitive data is encrypted using industry standards</p>
                </div>
                <div className="bg-navy-50 p-4 rounded-lg">
                  <p className="font-semibold text-navy-800 mb-2">Access Control</p>
                  <p className="text-sm text-navy-600">Strict role-based access to information</p>
                </div>
                <div className="bg-navy-50 p-4 rounded-lg">
                  <p className="font-semibold text-navy-800 mb-2">Regular Audits</p>
                  <p className="text-sm text-navy-600">Periodic security assessments and updates</p>
                </div>
                <div className="bg-navy-50 p-4 rounded-lg">
                  <p className="font-semibold text-navy-800 mb-2">Staff Training</p>
                  <p className="text-sm text-navy-600">Regular privacy and security awareness programs</p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Your Rights
              </h2>
              <p className="text-navy-700 mb-3">You have the right to:</p>
              <ul className="space-y-2 text-navy-700">
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>Access your personal information held by us</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>Request correction of inaccurate information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>Withdraw consent for data processing where applicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>Request deletion of information subject to legal requirements</span>
                </li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-br from-navy-50 to-blue-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Contact Us
              </h2>
              <p className="text-navy-700 mb-4">
                If you have questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-navy-600" />
                  <span className="text-navy-700">info@vppcbse.bhonsala.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-navy-600" />
                  <span className="text-navy-700">+91 7507546666</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-navy-600" />
                  <span className="text-navy-700">Vidya Prabodhini Prashala, Dharmaveer Dr. B.S. Moonje Marg, Rambhoomi,
Nashik, Maharashtra 422005, India</span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-xs text-navy-500 mt-8"
        >
          © {new Date().getFullYear()} Vidya Prabodhini Prashala. All rights reserved.
        </motion.p>
      </div>
    </div>
  )
}

export default PrivacyPolicy