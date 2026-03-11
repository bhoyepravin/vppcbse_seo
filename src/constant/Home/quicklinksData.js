import { UserPlus, IndianRupee, Users, FileText } from "lucide-react";

export const quicklinksData = {
  title: "Quick Links",
  items: [
    {
      id: 1,
      title: "School Information",
      icon: UserPlus,
      link: "about",
    },
    {
      id: 2,
      title: "Vidya Prabodhini Initiatives",
      icon: IndianRupee,
      link: "curriculum",
    },
    // {
    //   id: 3,
    //   title: "Between Us Login",
    //   icon: Users,
    //   link: "/login",
    // },
    {
      id: 4,
      title: "Enquiry Form",
      icon: FileText,
      link: "enquiry",
    },
  ],
};
