import {
  Globe,
  Hammer,
  Lightbulb,
  Rocket,
  TestTube,
  TrendingUp,
} from "lucide-react";
import type { Project } from "../../types/componentsType/projectTypes";

export const stages = [
  {
    id: "Pre-Incubation",
    name: "Pre-Incubation",
    description: "Brainstorm solutions for issues like waste or traffic",
    icon: Lightbulb,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "build-mvp",
    name: "Build MVP",
    description: "Create prototypes with expert guidance",
    icon: Hammer,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "test",
    name: "Test",
    description: "Pilot in markets like Kathmandu",
    icon: TestTube,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "incubate",
    name: "Incubate",
    description: "Refine with mentors and resources",
    icon: Rocket,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "accelerate",
    name: "Accelerate",
    description: "Scale with funding and networks",
    icon: TrendingUp,
    color: "from-red-500 to-rose-500",
  },
  {
    id: "relocate",
    name: "Relocate",
    description: "Expand to India, Bangladesh, or globally",
    icon: Globe,
    color: "from-indigo-500 to-blue-500",
  },
];


export const projectsData: Project[] = [
  // Texas College
  {
    id: "1",
    title: "HOVIUS",
    description:
      "Hospital Management System focusing on digitizing hospital operations",
    stage: "Pre-Incubation",
    team: "HOVIUS Team",
    college: "Texas College",
    year: 2024,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_HOVIUS.pdf",
    projectLeaders: {
      name: "Priya Sharma",
      email: "priya.sharma@texascollege.edu",
    },
    teams: [
      { name: "Rahul Kumar", email: "rahul.kumar@texascollege.edu" },
      { name: "Sneha Patel", email: "sneha.patel@texascollege.edu" },
    ],
  },
  {
    id: "2",
    title: "UTOPIA",
    description:
      "Modernizing gold and silver jewelry to make it more affordable",
    stage: "Pre-Incubation",
    team: "UTOPIA Team",
    college: "Texas College",
    year: 2024,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_UTOPIA.pdf",
    projectLeaders: {
      name: "Aisha Khan",
      email: "aisha.khan@texascollege.edu",
    },
    teams: [
      { name: "Vikram Singh", email: "vikram.singh@texascollege.edu" },
      { name: "Neha Gupta", email: "neha.gupta@texascollege.edu" },
    ],
  },
  {
    id: "3",
    title: "AUTUMN",
    description:
      "Developing travel, study, and hygiene kits targeted for girls in communities",
    stage: "Pre-Incubation",
    team: "AUTUMN Team",
    college: "Texas College",
    year: 2024,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_AUTUMN.pdf",
    projectLeaders: {
      name: "Maya Thapa",
      email: "maya.thapa@texascollege.edu",
    },
    teams: [
      { name: "Suman Rai", email: "suman.rai@texascollege.edu" },
      { name: "Anjali Shrestha", email: "anjali.shrestha@texascollege.edu" },
    ],
  },
  {
    id: "4",
    title: "GEN-Z",
    description:
      "Energy & water solution for hiking with a smart bottle design",
    stage: "Pre-Incubation",
    team: "GEN-Z Team",
    college: "Texas College",
    year: 2025,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_GENZ.pdf",
    projectLeaders: {
      name: "Rohan Mehta",
      email: "rohan.mehta@texascollege.edu",
    },
    teams: [
      { name: "Kavya Joshi", email: "kavya.joshi@texascollege.edu" },
      { name: "Arjun Bhat", email: "arjun.bhat@texascollege.edu" },
    ],
  },
  {
    id: "5",
    title: "FLOAT",
    description: "Collaborative platform for learners to study and socialize",
    stage: "Pre-Incubation",
    team: "FLOAT Team",
    college: "Texas College",
    year: 2025,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_FLOAT.pdf",
    projectLeaders: {
      name: "Simran Kaur",
      email: "simran.kaur@texascollege.edu",
    },
    teams: [
      { name: "Dev Patel", email: "dev.patel@texascollege.edu" },
      { name: "Isha Reddy", email: "isha.reddy@texascollege.edu" },
    ],
  },
  {
    id: "6",
    title: "GIRLY GIRLZ",
    description:
      "Jewelry segment connecting fashion with lightweight solutions",
    stage: "Pre-Incubation",
    team: "GIRLY GIRLZ Team",
    college: "Texas College",
    year: 2024,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_GIRLYGIRLZ.pdf",
    projectLeaders: {
      name: "Riya Desai",
      email: "riya.desai@texascollege.edu",
    },
    teams: [
      { name: "Pooja Shah", email: "pooja.shah@texascollege.edu" },
      { name: "Tanvi Iyer", email: "tanvi.iyer@texascollege.edu" },
    ],
  },
  {
    id: "7",
    title: "TREBLE",
    description: "Providing home services nationwide in the future",
    stage: "Pre-Incubation",
    team: "TREBLE Team",
    college: "Texas College",
    year: 2025,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_TREBLE.pdf",
    projectLeaders: {
      name: "Karan Malhotra",
      email: "karan.malhotra@texascollege.edu",
    },
    teams: [
      { name: "Nisha Verma", email: "nisha.verma@texascollege.edu" },
      { name: "Amit Chopra", email: "amit.chopra@texascollege.edu" },
    ],
  },
  {
    id: "8",
    title: "SKILLWAVE",
    description:
      "SOS system embedded in school bags to send alerts and live location to parents",
    stage: "Pre-Incubation",
    team: "SKILLWAVE Team",
    college: "Texas College",
    year: 2024,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_SKILLWAVE.pdf",
    projectLeaders: {
      name: "Ananya Nair",
      email: "ananya.nair@texascollege.edu",
    },
    teams: [
      { name: "Siddharth Rao", email: "siddharth.rao@texascollege.edu" },
      { name: "Meera Pillai", email: "meera.pillai@texascollege.edu" },
    ],
  },
  {
    id: "9",
    title: "BACK ARROW",
    description:
      "OTT platform promoting Nepali movies and culture internationally",
    stage: "Pre-Incubation",
    team: "BACK ARROW Team",
    college: "Texas College",
    year: 2025,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_BACKARROW.pdf",
    projectLeaders: {
      name: "Sagar Gurung",
      email: "sagar.gurung@texascollege.edu",
    },
    teams: [
      { name: "Binita Tamang", email: "binita.tamang@texascollege.edu" },
      { name: "Prakash Lama", email: "prakash.lama@texascollege.edu" },
    ],
  },
  {
    id: "10",
    title: "REACTOR",
    description: "Multipurpose and interchangeable jewelry designs",
    stage: "Pre-Incubation",
    team: "REACTOR Team",
    college: "Texas College",
    year: 2024,
    image: "/images/logos/texas-mgmt-id.png",
    report: "/files/Texas_REACTOR.pdf",
    projectLeaders: {
      name: "Divya Menon",
      email: "divya.menon@texascollege.edu",
    },
    teams: [
      { name: "Kunal Bansal", email: "kunal.bansal@texascollege.edu" },
      { name: "Shruti Agarwal", email: "shruti.agarwal@texascollege.edu" },
    ],
  },
  // St. Xaviers
  {
    id: "11",
    title: "BAZINGA",
    description:
      "Protein and meat bites designed to fuel students during university struggles",
    stage: "Pre-Incubation",
    team: "BAZINGA Team",
    college: "St. Xaviers",
    year: 2024,
    image: "/images/logos/st-x.png",
    report: "/files/StXaviers_BAZINGA.pdf",
    projectLeaders: {
      name: "Aditya Shrestha",
      email: "aditya.shrestha@stxaviers.edu",
    },
    teams: [
      { name: "Kritika Adhikari", email: "kritika.adhikari@stxaviers.edu" },
      { name: "Suraj Karki", email: "suraj.karki@stxaviers.edu" },
    ],
  },
  {
    id: "12",
    title: "APPLE",
    description: "Clothing brand offering hoodie haven for students",
    stage: "Pre-Incubation",
    team: "APPLE Team",
    college: "St. Xaviers",
    year: 2025,
    image: "/images/logos/st-x.png",
    report: "/files/StXaviers_APPLE.pdf",
    projectLeaders: {
      name: "Manisha Maharjan",
      email: "manisha.maharjan@stxaviers.edu",
    },
    teams: [
      { name: "Bibek Thapa", email: "bibek.thapa@stxaviers.edu" },
      { name: "Samira Rai", email: "samira.rai@stxaviers.edu" },
    ],
  },
  {
    id: "13",
    title: "DIVERSE",
    description: "Bio kit backpack for outdoor enthusiasts",
    stage: "Pre-Incubation",
    team: "DIVERSE Team",
    college: "St. Xaviers",
    year: 2024,
    image: "/images/logos/st-x.png",
    report: "/files/StXaviers_DIVERSE.pdf",
    projectLeaders: {
      name: "Rajesh Limbu",
      email: "rajesh.limbu@stxaviers.edu",
    },
    teams: [
      { name: "Priyanka Magar", email: "priyanka.magar@stxaviers.edu" },
      { name: "Sandip Gurung", email: "sandip.gurung@stxaviers.edu" },
    ],
  },
  {
    id: "14",
    title: "Aroma",
    description: "Stylish and functional bags, totes, and backpacks",
    stage: "Pre-Incubation",
    team: "Aroma Team",
    college: "St. Xaviers",
    year: 2025,
    image: "/images/logos/st-x.png",
    report: "/files/StXaviers_AROMA.pdf",
    projectLeaders: {
      name: "Swastika Shakya",
      email: "swastika.shakya@stxaviers.edu",
    },
    teams: [
      { name: "Ashok Poudel", email: "ashok.poudel@stxaviers.edu" },
      { name: "Shraddha Joshi", email: "shraddha.joshi@stxaviers.edu" },
    ],
  },
  {
    id: "15",
    title: "Team B",
    description:
      "Find Your Tribe app platform connecting fellow college students",
    stage: "Pre-Incubation",
    team: "Team B",
    college: "St. Xaviers",
    year: 2024,
    image: "/images/logos/st-x.png",
    report: "/files/StXaviers_TeamB.pdf",
    projectLeaders: {
      name: "Nischal Dhungana",
      email: "nischal.dhungana@stxaviers.edu",
    },
    teams: [
      { name: "Anisha Karki", email: "anisha.karki@stxaviers.edu" },
      { name: "Prabesh Tamang", email: "prabesh.tamang@stxaviers.edu" },
    ],
  },
  {
    id: "16",
    title: "Eco-friendly Robot",
    description:
      "Robot prototype designed for sustainable waste management and recycling",
    stage: "Pre-Incubation",
    team: "Green Tech",
    college: "St. Xaviers",
    year: 2025,
    image: "/images/logos/st-x.png",
    report: "/files/St.Xaviers.pdf",
    projectLeaders: { name: "Binod Shahi", email: "binod.shahi@stxaviers.edu" },
    teams: [
      { name: "Srijana Subedi", email: "srijana.subedi@stxaviers.edu" },
      { name: "Milan Thapa", email: "milan.thapa@stxaviers.edu" },
    ],
  },
  // School of Management
  {
    id: "17",
    title: "Management Dashboard",
    description:
      "Web-based dashboard for visualizing KPIs and team productivity metrics",
    stage: "Pre-Incubation",
    team: "Dashboard Team",
    college: "School of Management",
    year: 2024,
    image: "/images/logos/somtu.png",
    report: "/files/School-of-Management.pdf",
    projectLeaders: { name: "Saurav Basnet", email: "saurav.basnet@som.edu" },
    teams: [
      { name: "Reshma Koirala", email: "reshma.koirala@som.edu" },
      { name: "Dipesh Rai", email: "dipesh.rai@som.edu" },
    ],
  },
  {
    id: "18",
    title: "Innovators' Hive",
    description:
      "Mentoring platform where students teach and learn based on nearby locations",
    stage: "Pre-Incubation",
    team: "Innovators' Hive",
    college: "School of Management",
    year: 2025,
    image: "/images/logos/somtu.png",
    report: "/files/SchoolOfManagement_InnovatorsHive.pdf",
    projectLeaders: { name: "Kushal Pandey", email: "kushal.pandey@som.edu" },
    teams: [
      { name: "Alisha Maharjan", email: "alisha.maharjan@som.edu" },
      { name: "Rohit Shrestha", email: "rohit.shrestha@som.edu" },
    ],
  },
  // Samarpan
  {
    id: "19",
    title: "Community Help Platform",
    description:
      "Platform connecting volunteers with community service projects efficiently",
    stage: "Pre-Incubation",
    team: "Community Helpers",
    college: "Samarpan",
    year: 2024,
    image: "/images/logos/icms.jpeg",
    report: "/files/Samarpan.pdf",
    projectLeaders: {
      name: "Sarita Ghimire",
      email: "sarita.ghimire@samarpan.edu",
    },
    teams: [
      { name: "Rajan Bhandari", email: "rajan.bhandari@samarpan.edu" },
      { name: "Usha Khadka", email: "usha.khadka@samarpan.edu" },
    ],
  },
  {
    id: "20",
    title: "The Plot Twist Trio",
    description:
      "Mental wellness chatbot providing students with 24/7 emotional support",
    stage: "Pre-Incubation",
    team: "Plot Twist Trio",
    college: "Samarpan",
    year: 2025,
    image: "/images/logos/icms.jpeg",
    report: "/files/Samarpan_PlotTwistTrio.pdf",
    projectLeaders: {
      name: "Aashish Upreti",
      email: "aashish.upreti@samarpan.edu",
    },
    teams: [
      { name: "Sabina Sharma", email: "sabina.sharma@samarpan.edu" },
      { name: "Prabin Dahal", email: "prabin.dahal@samarpan.edu" },
    ],
  },
  {
    id: "21",
    title: "APPS",
    description: "Peer-to-peer book exchange platform to reduce textbook costs",
    stage: "Pre-Incubation",
    team: "APPS Team",
    college: "Samarpan",
    year: 2024,
    image: "/images/logos/icms.jpeg",
    report: "/files/Samarpan_APPS.pdf",
    projectLeaders: { name: "Kiran Malla", email: "kiran.malla@samarpan.edu" },
    teams: [
      { name: "Sunita Lama", email: "sunita.lama@samarpan.edu" },
      { name: "Deepak Rai", email: "deepak.rai@samarpan.edu" },
    ],
  },
  // Sagarmatha Engineering College
  {
    id: "22",
    title: "Tech Ninja",
    description:
      "E-commerce site revamp for better UX and streamlined checkout",
    stage: "Pre-Incubation",
    team: "Tech Ninja",
    college: "Sagarmatha Engineering College",
    year: 2024,
    image: "/images/logos/sagarmathalogo.png",
    report: "/files/Sagarmatha_TechNinja.pdf",
    projectLeaders: {
      name: "Nabin Chaudhary",
      email: "nabin.chaudhary@sagarmatha.edu",
    },
    teams: [
      { name: "Ritu Kafle", email: "ritu.kafle@sagarmatha.edu" },
      { name: "Bikash Thapa", email: "bikash.thapa@sagarmatha.edu" },
    ],
  },
  {
    id: "23",
    title: "S-quad",
    description:
      "App for tracking workouts, diet, sleep, and integrating with wearables",
    stage: "Pre-Incubation",
    team: "S-quad",
    college: "Sagarmatha Engineering College",
    year: 2025,
    image: "/images/logos/sagarmathalogo.png",
    report: "/files/Sagarmatha_Squad.pdf",
    projectLeaders: {
      name: "Shiva Prasad",
      email: "shiva.prasad@sagarmatha.edu",
    },
    teams: [
      { name: "Kamana Shrestha", email: "kamana.shrestha@sagarmatha.edu" },
      { name: "Sagar Khatri", email: "sagar.khatri@sagarmatha.edu" },
    ],
  },
  {
    id: "24",
    title: "Clover",
    description:
      "Smart home control system with voice recognition and AI learning",
    stage: "Pre-Incubation",
    team: "Clover",
    college: "Sagarmatha Engineering College",
    year: 2024,
    image: "/images/logos/sagarmathalogo.png",
    report: "/files/Sagarmatha_Clover.pdf",
    projectLeaders: {
      name: "Rakesh Adhikari",
      email: "rakesh.adhikari@sagarmatha.edu",
    },
    teams: [
      { name: "Puja Bhattarai", email: "puja.bhattarai@sagarmatha.edu" },
      { name: "Santosh Rai", email: "santosh.rai@sagarmatha.edu" },
    ],
  },
  {
    id: "25",
    title: "Pichai",
    description:
      "Educational platform with video lessons, quizzes, and live sessions",
    stage: "Pre-Incubation",
    team: "Pichai",
    college: "Sagarmatha Engineering College",
    year: 2025,
    image: "/images/logos/sagarmathalogo.png",
    report: "/files/Sagarmatha_Pichai.pdf",
    projectLeaders: {
      name: "Santosh Kumar",
      email: "santosh.kumar@sagarmatha.edu",
    },
    teams: [
      { name: "Anjana Subedi", email: "anjana.subedi@sagarmatha.edu" },
      { name: "Krishna Gurung", email: "krishna.gurung@sagarmatha.edu" },
    ],
  },
  {
    id: "26",
    title: "Code Crafter",
    description:
      "IoT-based system to optimize water usage and provide farming insights",
    stage: "Pre-Incubation",
    team: "Code Crafter",
    college: "Sagarmatha Engineering College",
    year: 2024,
    image: "/images/logos/sagarmathalogo.png",
    report: "/files/Sagarmatha_CodeCrafter.pdf",
    projectLeaders: {
      name: "Bikram Karki",
      email: "bikram.karki@sagarmatha.edu",
    },
    teams: [
      { name: "Laxmi Poudel", email: "laxmi.poudel@sagarmatha.edu" },
      { name: "Suresh Thapa", email: "suresh.thapa@sagarmatha.edu" },
    ],
  },
  {
    id: "27",
    title: "365-plus1",
    description:
      "AI chatbot for customer inquiries with NLP and machine learning",
    stage: "Pre-Incubation",
    team: "365-plus1",
    college: "Sagarmatha Engineering College",
    year: 2025,
    image: "/images/logos/sagarmathalogo.png",
    report: "/files/Sagarmatha_365plus1.pdf",
    projectLeaders: {
      name: "Rajendra Sharma",
      email: "rajendra.sharma@sagarmatha.edu",
    },
    teams: [
      { name: "Bhawana KC", email: "bhawana.kc@sagarmatha.edu" },
      { name: "Dipendra Baral", email: "dipendra.baral@sagarmatha.edu" },
    ],
  },
];
