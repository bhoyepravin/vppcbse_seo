import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import AdmissionForm from "./Pages/Admission/AdmissionForm";

import Teachers from "./Pages/Aboutus/Teachers";
import ManagementCommittee from "./Pages/Aboutus/ManagementCommittee";
import Faculty from "./Pages/Aboutus/Faculty";
import Infrastructure from "./Pages/Aboutus/Infrastructure";
//import AboutUs from "./Pages/Aboutus/Aboutus/Aboutus";
import Preprimary from "./Pages/Aboutus/Academics/Preprimary";
// import Primary from "./Pages/Aboutus/Academics/Primary";
// import Secondary from "./Pages/Aboutus/Academics/Secondary";
import PrimarySection from "./Pages/Aboutus/Academics/Primary/PrimarySection";
import SecondarySection from "./Pages/Aboutus/Academics/SecondarySection/SecondarySection";

import AboutUs from "./Pages/Aboutus/About/AboutUs";
import AboutChmes from "./Pages/Aboutus/About/AboutChmes";
import FacultyPage from "./Pages/Aboutus/About/FacultyPage";
import AdmissionGuidelines from "./Pages/Admission/AdmissionGuidelines";
import AdmissionProcess from "./Pages/Admission/AdmissionProcess";
import AdmissionEnquiryForm from "./Pages/Admission/AdmissionEnquiryForm";
import FeeStructure from "./Pages/Admission/FeeStructure";
import MiddleSection from "./Pages/Aboutus/Academics/Middle/MiddleSection";
import Result from "./Pages/Aboutus/Academics/Result/Result";
import CurriculumSection from "./Pages/Infocorner/CurriculumSection";
import StudentCouncilSection from "./Pages/Infocorner/StudentCouncilSection";
import Academiccalendar from "./Pages/Calendar/Academiccalendar";
import Classwisestrength from "./Pages/Calendar/Classwisestrength";
import Timetable from "./Pages/Calendar/Timetable";
import Images from "./Pages/Gallery/Images";
import Videos from "./Pages/Gallery/Videos";
import NationalInternational from "./Pages/Sportsandgames/NationalInternational";
import SportsVideos from "./Pages/Sportsandgames/SportsVideos";
import SportsImages from "./Pages/Sportsandgames/SportsImages";
import ContactUs from "./Pages/Contactus/ContactUs";
import SocialConnect from "./Pages/SocialConnect/SocialConnect";
import Blog from "./Pages/Blog/Blog";
import Disclosure from "./Pages/Home/Disclosure";
import Cocurricular from "./Pages/Cocurricular/Cocurricular";
import Cbseaffiliation from "./Pages/Infocorner/Cbseaffiliation";
import Booklist from "./Pages/Infocorner/Booklist";
import Reports from "./Pages/Infocorner/Reports";
import AffiliationCertificate from "./Pages/Infocorner/AffiliationCertificate";
import Circulars from "./Pages/Infocorner/Circulars";
import VppsStudentJourneydetails from "./Pages/Home/VppsStudentJourneydetails";
import JobRegistration from "./Pages/Jobvacancy/JobRegistration";
import VppSchoolTour from "./Pages/Home/VppSchoolTour";
import HolidayVacations from "./Pages/Calendar/HolidayVacations";
import TermsConditions from "./Pages/Footer/TermsConditions";
import PrivacyPolicy from "./Pages/Footer/PrivacyPolicy";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/disclosure" element={<Disclosure />} />
        <Route path="student-journey" element={<VppsStudentJourneydetails />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/aboutchmes" element={<AboutChmes />} />

        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route
          path="/management"
          element={<ManagementCommittee />}
        />
        <Route path="/teachers" element={<Teachers />} />

        <Route path="admission" element={<AdmissionForm />} />
        <Route path="/guidelines" element={<AdmissionGuidelines />} />
        <Route path="/admissionprocess" element={<AdmissionProcess />} />
        <Route path="/enquiry" element={<AdmissionEnquiryForm />} />
        <Route path="/admissionform" element={<AdmissionForm />} />

        <Route path="/pre-primary" element={<Preprimary />} />
        <Route path="academics/middle" element={<MiddleSection />} />

        <Route path="/primary" element={<PrimarySection />} />
        <Route path="/secondary" element={<SecondarySection />} />
        <Route path="academics/result" element={<Result />} />
        <Route path="/curriculum" element={<CurriculumSection />} />
        <Route
          path="/studentscouncil"
          element={<StudentCouncilSection />}
        />
        <Route
          path="/cbse-affiliation"
          element={<Cbseaffiliation />}
        />
        <Route
          path="/affiliation-certificate"
          element={<AffiliationCertificate />}
        />
        <Route path="/circulars" element={<Circulars />} />
        <Route path="/book-list" element={<Booklist />} />
        <Route path="/reports" element={<Reports />} />
        <Route
          path="/academiccalendar"
          element={<Academiccalendar />}
        />
        <Route
          path="/class-wise-strength"
          element={<Classwisestrength />}
        />
        <Route path="/table-table" element={<Timetable />} />
        <Route path="/images" element={<Images />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/sportsimages" element={<SportsImages />} />
        <Route path="/sportsvideos" element={<SportsVideos />} />

        <Route
          path="sports/national-international-participants"
          element={<NationalInternational />}
        />

        <Route path="co-curricular" element={<Cocurricular />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="social-connect" element={<SocialConnect />} />
        <Route path="careers" element={<JobRegistration />} />
        <Route path="virtual-tour" element={<VppSchoolTour />} />
        <Route path="holidays" element={<HolidayVacations />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsConditions />} />



      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
