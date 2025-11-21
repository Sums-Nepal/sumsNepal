import { GalleryHorizontalEndIcon } from "lucide-react";

export const placeData = [
  {
    id: 1,
    title: "Software Developer",
    description: "Join a leading tech company and help build amazing products.",
    image: "/images/software-developer.jpg",
    alt: "Software Developer",
    icon: () => <GalleryHorizontalEndIcon />, // You can use any icon library
  },
  {
    id: 2,
    title: "Product Manager",
    description: "Lead product development and manage cross-functional teams.",
    image: "/images/product-manager.jpg",
    alt: "Product Manager",
        icon: () => <GalleryHorizontalEndIcon />, // You can use any icon library

  },
  // Add more job data here
];
