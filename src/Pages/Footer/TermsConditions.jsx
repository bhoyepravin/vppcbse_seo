import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, BookOpen, Users, Award, ArrowLeft, CheckCircle, AlertCircle, FileCheck, Heart } from "lucide-react";

function TermsConditions() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50">
      {/* Background decorative elements */}
      {/* <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-navy-100/20 to-blue-100/10 rounded-full -translate-y-32 translate-x-32"></div> */}
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tl from-blue-100/10 to-navy-100/20 rounded-full translate-y-32 -translate-x-32"></div>

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
              Terms & Conditions
            </h1>
            <div className="w-2 h-2 rounded-full bg-navy-400"></div>
          </div>
          
          <div className="h-1.5 w-24 gradient-navy mx-auto mb-6 rounded-full"></div>
          
          <div className="flex items-center justify-center gap-2 text-navy-600 text-sm sm:text-base">
            <Scale className="w-4 h-4" />
            <span>Effective Date: {currentDate}</span>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-navy-100 overflow-hidden"
        >
          {/* Mission Statement Banner */}
          <div className="bg-gradient-to-r from-navy-600 to-blue-600 p-6 text-white">
            <div className="flex items-center gap-4 mb-3">
              <Heart className="w-8 h-8 opacity-90" />
              <h2 className="text-xl font-semibold">Our Commitment to Excellence Since 2011-12</h2>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              As envisioned by our Founder, Dharmaveer Dr. Balakrishna Shivram Moonje in 1936, 
              we remain dedicated to providing quality education that blends discipline, strength, and values.
            </p>
          </div>

          {/* Terms Content */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Acceptance of Terms
              </h2>
              <p className="text-navy-700 leading-relaxed">
                By accessing or using the services of Vidya Prabodhini Prashala, you agree to be bound by these Terms 
                and Conditions. If you do not agree with any part of these terms, please do not use our services or 
                access our facilities.
              </p>
            </section>

            {/* Educational Services */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Educational Services
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-navy-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy-800">Curriculum & Academics</h3>
                    <p className="text-navy-600 text-sm">We follow a comprehensive, values-based curriculum designed to nurture academic excellence and character development.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-navy-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy-800">Student Conduct</h3>
                    <p className="text-navy-600 text-sm">All students are expected to maintain discipline, respect, and follow the code of conduct inspired by military values.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-navy-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy-800">Assessment & Progress</h3>
                    <p className="text-navy-600 text-sm">Regular assessments are conducted to track academic progress and provide feedback for improvement.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Parent/Guardian Responsibilities */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Parent/Guardian Responsibilities
              </h2>
              <ul className="space-y-3 text-navy-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-navy-500 flex-shrink-0" />
                  <span>Ensure regular attendance and punctuality of students</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-navy-500 flex-shrink-0" />
                  <span>Participate in parent-teacher meetings and school events</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-navy-500 flex-shrink-0" />
                  <span>Provide accurate and updated contact information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-navy-500 flex-shrink-0" />
                  <span>Support the school's discipline and value system at home</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-navy-500 flex-shrink-0" />
                  <span>Timely payment of fees and other dues</span>
                </li>
              </ul>
            </section>

            {/* Code of Conduct */}
            <section className="bg-navy-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Code of Conduct
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-navy-800 mb-2 flex items-center gap-2">
                    <span className="text-green-600">✓</span> Expected Behavior
                  </h3>
                  <ul className="space-y-1 text-sm text-navy-700">
                    <li>Respect for teachers and staff</li>
                    <li>Regular attendance and punctuality</li>
                    <li>Proper uniform and appearance</li>
                    <li>Academic honesty and integrity</li>
                    <li>Care for school property</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800 mb-2 flex items-center gap-2">
                    <span className="text-red-600">!</span> Prohibited Behavior
                  </h3>
                  <ul className="space-y-1 text-sm text-navy-700">
                    <li>Bullying or harassment</li>
                    <li>Use of mobile phones during school hours</li>
                    <li>Disrespectful behavior</li>
                    <li>Cheating or plagiarism</li>
                    <li>Damage to school property</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Fees and Payments */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Fees and Payments
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <FileCheck className="w-5 h-5 text-navy-500 flex-shrink-0" />
                  <p className="text-navy-700">Fees must be paid by the due date as specified in the fee schedule</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-navy-500 flex-shrink-0" />
                  <p className="text-navy-700">Late payments may incur additional charges as per school policy</p>
                </div>
                <div className="flex items-start gap-2">
                  <Scale className="w-5 h-5 text-navy-500 flex-shrink-0" />
                  <p className="text-navy-700">Fees are non-refundable except as required by law or school policy</p>
                </div>
              </div>
            </section>

            {/* Safety and Security */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Safety and Security
              </h2>
              <p className="text-navy-700 leading-relaxed mb-3">
                Vidya Prabodhini Prashala prioritizes the safety and well-being of all students and staff. 
                We maintain strict security protocols including:
              </p>
              <ul className="space-y-2 text-navy-700">
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>CCTV surveillance across campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>Secure entry and exit points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>Visitor registration and identification system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>Emergency response protocols and drills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy-400 font-bold">•</span>
                  <span>Trained security personnel on campus</span>
                </li>
              </ul>
            </section>

            {/* Modifications to Terms */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Modifications to Terms
              </h2>
              <p className="text-navy-700 leading-relaxed">
                Vidya Prabodhini Prashala reserves the right to modify these terms at any time. 
                Changes will be communicated through official channels and will be effective immediately 
                upon posting. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-br from-navy-50 to-blue-50 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-400"></span>
                Questions & Concerns
              </h2>
              <p className="text-navy-700 mb-4">
                For any questions regarding these Terms and Conditions, please contact our administration office:
              </p>
              <div className="space-y-2 text-navy-700">
                <p><span className="font-semibold">Administration Office:</span> +91 7507546666</p>
                <p><span className="font-semibold">Email:</span> info@vppcbse.bhonsala.in</p>
                <p><span className="font-semibold">Office Hours:</span> Monday - Friday,8:30 AM - 12:00 PM</p>
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
          © {new Date().getFullYear()} Vidya Prabodhini Prashala (CHME'S). All rights reserved.
        </motion.p>
      </div>
    </div>
  )
}

export default TermsConditions