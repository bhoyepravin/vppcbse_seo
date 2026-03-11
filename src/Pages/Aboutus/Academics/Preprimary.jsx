import React from "react";
import OurCurriculum from "./OurCurriculum";
import ProgramsSection from "./ProgramsSection";
import InquiryForm from "./InquiryForm";
import VertualTour from "./VertualTour";
import PrePrimaryIntro from "./PrePrimaryIntro";

function Preprimary() {
  return (
    <div>
      <PrePrimaryIntro/>
      <OurCurriculum />
      <ProgramsSection />
      <InquiryForm />
      {/* <VertualTour /> */}

    </div>
  );
}

export default Preprimary;
