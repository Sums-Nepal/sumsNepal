import { Facebook, MapPin, Twitter, Instagram, Linkedin } from "lucide-react";

// Footer Data
export const socialLinks = [
  { id: 1, label: <Facebook/>, href: "https://www.facebook.com/people/SUMS-Nepal/61568207048292/" },
  { id: 2, label: <Twitter/> , href: "https://x.com/sumsnepal" },
  { id: 3, label: <Linkedin/>, href: "https://www.linkedin.com/company/sumsnepal/posts/?feedView=all" },
  { id: 4, label: <Instagram/>, href: "https://www.instagram.com/sumsnepal/" },
];

export const quickLinks = [
  "About Us",
  "How It Works",
  "Success Stories",
  "Blog",
  "Careers",
  "Contact",
];

export const stakeholders = [
  "Students",
  "Colleges",
  "Companies",
  "Cities",
  "Entrepreneurs",
  "Partnerships",
];

export const contacts = [
  {
    id: 1,
    icon: <MapPin className="w-4 h-4 mr-3 text-orange-400 flex-shrink-0" />,
    text: "Opposite to steel tower, Jawalakhel, Lalitpur, Nepal",
  },
  {
    id: 2,
    icon: (
      <span className="w-4 h-4 mr-3 text-orange-400 flex-shrink-0 text-center">
        @
      </span>
    ),
    text: "Info@sumsnepal.com",
  },
  {
    id: 3,
    icon: (
      <span className="w-4 h-4 mr-3 text-orange-400 flex-shrink-0 text-center">
        📞
      </span>
    ),
    text: " Mobile: 9810446594 |  9865995066 9843817094  ",
  },
];

export const policies = [
  "Privacy-Policy",
];
