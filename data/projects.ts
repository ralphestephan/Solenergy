// data/projects.ts
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Solar Systems" | "Generators" | "Energy Management" | "Commercial" | "Residential" | "Institutional";
  capacity: string;
  location: string;
  image: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  client?: string;
  year?: string;
  systemType?: "Off-Grid" | "Hybrid" | "Grid-Tie";
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "qelhat-koura-residence",
    title: "Qelhat, Koura Residence",
    category: "Residential",
    capacity: "5kW",
    location: "Qelhat, Koura, Lebanon",
    image: "/images/panels.png",
    description: "Off-grid solar system installation for residential property.",
    fullDescription: "Complete off-grid solar installation for a residential property in Qelhat, Koura. The system provides reliable energy independence with 5kW solar generation capacity.",
    systemType: "Off-Grid",
    features: [
      "5kW solar generation",
      "Off-grid system",
      "Complete energy independence",
      "Professional installation"
    ],
    year: "2024"
  },
  {
    id: "2",
    slug: "feitroun-residence",
    title: "Feitroun Residence",
    category: "Residential",
    capacity: "5kW",
    location: "Feitroun, Lebanon",
    image: "/images/panels.png",
    description: "Off-grid solar system for residential home.",
    fullDescription: "Residential off-grid solar system installation in Feitroun. The 5kW system ensures complete energy independence for the home.",
    systemType: "Off-Grid",
    features: [
      "5kW solar generation",
      "Off-grid system",
      "Complete installation",
      "Energy independence"
    ],
    year: "2024"
  },
  {
    id: "3",
    slug: "beit-haifa-restaurant",
    title: "Beit Haifa Restaurant",
    category: "Commercial",
    capacity: "16kW",
    location: "Qelhat El-Koura, Lebanon",
    image: "/images/panels.png",
    description: "Hybrid solar system for restaurant operations.",
    fullDescription: "Hybrid solar system installation for Beit Haifa Restaurant in Qelhat El-Koura. The 16kW hybrid system combines solar generation with grid connectivity for optimal energy management.",
    systemType: "Hybrid",
    features: [
      "16kW solar generation",
      "Hybrid system",
      "Grid connectivity",
      "Commercial installation"
    ],
    year: "2024"
  },
  {
    id: "4",
    slug: "adonis-building",
    title: "Adonis Building",
    category: "Commercial",
    capacity: "8kW",
    location: "Adonis, Lebanon",
    image: "/images/panels.png",
    description: "Off-grid solar system for commercial building.",
    fullDescription: "Commercial off-grid solar installation for Adonis Building. The 8kW system provides reliable backup power and energy independence.",
    systemType: "Off-Grid",
    features: [
      "8kW solar generation",
      "Off-grid system",
      "Commercial building",
      "Reliable backup power"
    ],
    year: "2024"
  },
  {
    id: "5",
    slug: "beit-mery-residence",
    title: "Beit Mery Residence",
    category: "Residential",
    capacity: "100kW",
    location: "Beit Mery, Lebanon",
    image: "/images/panels.png",
    description: "Large-scale hybrid solar system for residential property.",
    fullDescription: "Major hybrid solar installation for a residential property in Beit Mery. With 100kW generation capacity, this is one of our largest residential projects, providing comprehensive energy independence.",
    systemType: "Hybrid",
    features: [
      "100kW solar generation",
      "Hybrid system",
      "Large-scale residential",
      "Complete energy management"
    ],
    year: "2024"
  },
  {
    id: "6",
    slug: "st-georges-church",
    title: "St. Georges Church",
    category: "Institutional",
    capacity: "7.5kW",
    location: "Mtolleh-Chouf, Lebanon",
    image: "/images/panels.png",
    description: "Off-grid solar system for church facility.",
    fullDescription: "Off-grid solar installation for St. Georges Church in Mtolleh-Chouf. The 7.5kW system ensures reliable power for the church's operations.",
    systemType: "Off-Grid",
    features: [
      "7.5kW solar generation",
      "Off-grid system",
      "Institutional installation",
      "Reliable power supply"
    ],
    year: "2024"
  },
  {
    id: "7",
    slug: "kearhbab-project",
    title: "Kearhbab Project",
    category: "Residential",
    capacity: "8kW",
    location: "Kearhbab, Lebanon",
    image: "/images/panels.png",
    description: "Off-grid solar system installation.",
    fullDescription: "Residential off-grid solar system installation in Kearhbab. The 8kW system provides complete energy independence for the property.",
    systemType: "Off-Grid",
    features: [
      "8kW solar generation",
      "Off-grid system",
      "Residential installation",
      "Energy independence"
    ],
    year: "2024"
  },
  {
    id: "8",
    slug: "commercial-solar-installation",
    title: "Commercial Solar Installation",
    category: "Commercial",
    capacity: "50kW",
    location: "Beirut, Lebanon",
    image: "/images/panels.png",
    description: "Commercial solar system installation.",
    fullDescription: "Commercial solar installation providing reliable clean energy for business operations.",
    systemType: "Grid-Tie",
    features: [
      "Commercial scale",
      "Grid-tie system",
      "Energy savings",
      "Professional installation"
    ],
    year: "2024"
  },
  {
    id: "9",
    slug: "industrial-solar-project",
    title: "Industrial Solar Project",
    category: "Commercial",
    capacity: "200kW",
    location: "Mount Lebanon, Lebanon",
    image: "/images/panels.png",
    description: "Large-scale industrial solar installation.",
    fullDescription: "Major industrial solar installation demonstrating our capability to handle large-scale commercial and industrial projects.",
    systemType: "Hybrid",
    features: [
      "200kW capacity",
      "Industrial scale",
      "Hybrid system",
      "Advanced monitoring"
    ],
    year: "2024"
  },
  {
    id: "10",
    slug: "residential-villa-solar",
    title: "Residential Villa Solar System",
    category: "Residential",
    capacity: "15kW",
    location: "Jounieh, Lebanon",
    image: "/images/panels.png",
    description: "Complete hybrid solar solution for luxury villa.",
    fullDescription: "Comprehensive hybrid solar system installation for a luxury residential villa. The system includes battery storage and intelligent energy management.",
    systemType: "Hybrid",
    features: [
      "15kW capacity",
      "Hybrid system",
      "Battery storage",
      "Smart energy management"
    ],
    year: "2024"
  },
  {
    id: "11",
    slug: "residential-off-grid-system",
    title: "Residential Off-Grid System",
    category: "Residential",
    capacity: "10kW",
    location: "Byblos, Lebanon",
    image: "/images/panels.png",
    description: "Complete off-grid residential solar system.",
    fullDescription: "Complete off-grid solar system providing full energy independence for residential property.",
    systemType: "Off-Grid",
    features: [
      "10kW capacity",
      "Off-grid system",
      "Complete independence",
      "Battery backup"
    ],
    year: "2024"
  },
  {
    id: "12",
    slug: "commercial-hybrid-system",
    title: "Commercial Hybrid System",
    category: "Commercial",
    capacity: "30kW",
    location: "Tripoli, Lebanon",
    image: "/images/panels.png",
    description: "Hybrid solar system for commercial facility.",
    fullDescription: "Hybrid solar installation combining solar generation with grid connectivity for optimal commercial energy management.",
    systemType: "Hybrid",
    features: [
      "30kW capacity",
      "Hybrid system",
      "Commercial installation",
      "Energy optimization"
    ],
    year: "2024"
  },
];
