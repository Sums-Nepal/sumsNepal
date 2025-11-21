import { Briefcase, GraduationCap, MapPin, TrendingUp } from "lucide-react";

export const eventsData = [
  {
    id: 1,
    title: "Faculty Workshop",
    description:
      "Training educators on modern teaching methodologies and industry alignment",
    date: "September 15",
    location: "Lalitpur",
    gradient: "from-blue-50 to-blue-100",
    bgColor: "bg-blue-500",
    dateColor: "text-blue-600",
    locationColor: "text-blue-500",
    icon: GraduationCap,
  },
  {
    id: 2,
    title: "Startup Bootcamp",
    description: "3-day intensive program for aspiring entrepreneurs",
    date: "October 10-12",
    location: "Pokhara",
    gradient: "from-orange-50 to-orange-100",
    bgColor: "bg-orange-500",
    dateColor: "text-orange-600",
    locationColor: "text-orange-500",
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Civic Summit",
    description:
      "Solutions for urban challenges with city leaders and students",
    date: "November 5",
    location: "KTMOnline",
    gradient: "from-purple-50 to-purple-100",
    bgColor: "bg-purple-500",
    dateColor: "text-purple-600",
    locationColor: "text-purple-500",
    icon: MapPin,
  },
  {
    id: 4,
    title: "Job Fair",
    description: "Connect skilled graduates with leading employers",
    date: "December 1",
    location: "KTMOnline",
    gradient: "from-green-50 to-green-100",
    bgColor: "bg-green-500",
    dateColor: "text-green-600",
    locationColor: "text-green-500",
    icon: Briefcase,
  },
];