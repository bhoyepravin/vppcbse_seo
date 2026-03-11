import { instaqr, facebookqr, youtubeqr } from "../../assets";

const socialQrData = {
  categories: [
    {
      id: "social-media",
      title: "Social Media",
      //icon: "📱",
      description: "Scan to follow us on social media platforms",
      platforms: [
        {
          id: "whatsapp",
          title: "WhatsApp Updates",
          //icon: "💬",
          qrCode:
            "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/911234567890&color=25D366&bgcolor=ffffff",
          color: "#194369",
          description: "Scan to join WhatsApp updates channel",
        },
        {
          id: "instagram",
          title: "Instagram",
          // icon: "📷",
          qrCode: instaqr,
          //color: "pink",
          description: "Scan to follow on Instagram",
        },
        {
          id: "facebook",
          title: "Facebook",
          //icon: "📘",
          qrCode: facebookqr,
          color: "blue",
          description: "Scan to like our Facebook page",
        },
        {
          id: "youtube",
          title: "YouTube",
          //icon: "📺",
          qrCode: youtubeqr,
          color: "red",
          description: "Scan to subscribe on YouTube",
        },
      ],
    },
    // {
    //   id: "communication",
    //   title: "Communication",
    //   //icon: "📞",
    //   description: "QR codes for direct communication and information",
    //   platforms: [
    //     {
    //       id: "website",
    //       title: "School Website",
    //       // icon: "🌐",
    //       qrCode:
    //         "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.schoolname.edu&color=4F46E5&bgcolor=ffffff",
    //       color: "purple",
    //       description: "Scan to visit official website",
    //     },
    //     {
    //       id: "email",
    //       title: "Email Contact",
    //       //icon: "✉️",
    //       qrCode:
    //         "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=mailto:info@schoolname.edu&color=EA4335&bgcolor=ffffff",
    //       color: "orange",
    //       description: "Scan to email us",
    //     },
    //     {
    //       id: "phone",
    //       title: "Contact Number",
    //       //icon: "📞",
    //       qrCode:
    //         "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:+911234567890&color=34B7F1&bgcolor=ffffff",
    //       color: "teal",
    //       description: "Scan to call school office",
    //     },
    //     {
    //       id: "location",
    //       title: "School Location",
    //       // icon: "📍",
    //       qrCode:
    //         "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://maps.app.goo.gl/XYZ123&color=0F9D58&bgcolor=ffffff",
    //       color: "green",
    //       description: "Scan for directions to school",
    //     },
    //   ],
    // },
    // {
    //   id: "digital-services",
    //   title: "Digital Services",
    //   //icon: "💻",
    //   description: "QR codes for school portals and online services",
    //   platforms: [
    //     {
    //       id: "parent-portal",
    //       title: "Parent Portal",
    //       //icon: "👨‍👩‍👧‍👦",
    //       qrCode:
    //         "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://parents.schoolname.edu&color=4285F4&bgcolor=ffffff",
    //       color: "blue",
    //       description: "Scan to access parent portal",
    //     },
    //     {
    //       id: "student-portal",
    //       title: "Student Portal",
    //       // icon: "🎓",
    //       qrCode:
    //         "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://students.schoolname.edu&color=DB4437&bgcolor=ffffff",
    //       color: "red",
    //       description: "Scan to access student portal",
    //     },
    //     {
    //       id: "fee-payment",
    //       title: "Fee Payment",
    //       //icon: "💰",
    //       qrCode:
    //         "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://payments.schoolname.edu&color=0F9D58&bgcolor=ffffff",
    //       color: "green",
    //       description: "Scan for online fee payment",
    //     },
    //     {
    //       id: "library",
    //       title: "Digital Library",
    //       //icon: "📚",
    //       qrCode:
    //         "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://library.schoolname.edu&color=FF6D01&bgcolor=ffffff",
    //       color: "orange",
    //       description: "Scan to access digital library",
    //     },
    //   ],
    // },
  ],
};

export default socialQrData;
