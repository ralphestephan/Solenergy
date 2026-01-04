// data/projects.ts
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Solar Systems" | "Generators" | "Energy Management" | "Commercial" | "Residential";
  capacity: string;
  location: string;
  image: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  client?: string;
  year?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "commercial-solar-beirut",
    title: "Commercial Solar Installation - Beirut",
    category: "Solar Systems",
    capacity: "250 kW",
    location: "Beirut, Lebanon",
    image: "/images/field.jpg",
    description: "Large-scale commercial solar installation for office building",
    fullDescription: "A comprehensive 250 kW solar installation for a modern office building in Beirut. This project included rooftop solar panels, grid-tie inverters, and a complete monitoring system. The system provides significant energy savings and reduces the building's carbon footprint.",
    features: [
      "250 kW total capacity",
      "Grid-tie system with net metering",
      "Real-time energy monitoring",
      "25-year warranty on panels",
      "Professional installation and commissioning"
    ],
    client: "Commercial Office Building",
    year: "2024"
  },
  {
    id: "2",
    slug: "industrial-generator-setup",
    title: "Industrial Generator Setup",
    category: "Generators",
    capacity: "500 kVA",
    location: "Mount Lebanon, Lebanon",
    image: "/images/volvoGENERATOR.png",
    description: "High-capacity backup generator installation for manufacturing facility",
    fullDescription: "Installation of a 500 kVA industrial backup generator system for a manufacturing facility. The system includes automatic transfer switch, fuel management, and remote monitoring capabilities.",
    features: [
      "500 kVA capacity",
      "Automatic transfer switch",
      "Remote monitoring system",
      "Fuel management system",
      "24/7 support and maintenance"
    ],
    client: "Manufacturing Facility",
    year: "2024"
  },
  {
    id: "3",
    slug: "smart-factory-integration",
    title: "Smart Factory Integration",
    category: "Energy Management",
    capacity: "150 kW",
    location: "Beirut, Lebanon",
    image: "/images/girdBattery.jpg",
    description: "Complete energy management system with battery storage",
    fullDescription: "A complete smart energy management system integrating solar panels, battery storage, and intelligent load management for a modern factory. The system optimizes energy usage and provides backup power during outages.",
    features: [
      "150 kW solar capacity",
      "Battery energy storage system",
      "Smart load management",
      "Real-time monitoring dashboard",
      "Automated energy optimization"
    ],
    client: "Industrial Facility",
    year: "2023"
  },
  {
    id: "4",
    slug: "residential-solar-system",
    title: "Residential Solar System",
    category: "Residential",
    capacity: "10 kW",
    location: "Jounieh, Lebanon",
    image: "/images/fieldwork.png",
    description: "Complete residential solar system with battery backup",
    fullDescription: "A complete 10 kW residential solar system with battery backup for a family home. The system provides energy independence and significant savings on electricity bills.",
    features: [
      "10 kW solar capacity",
      "Battery backup system",
      "Grid-tie with net metering",
      "Mobile app monitoring",
      "Complete installation and setup"
    ],
    client: "Residential Home",
    year: "2024"
  },
  {
    id: "5",
    slug: "hybrid-power-hotel",
    title: "Hybrid Power System - Hotel",
    category: "Commercial",
    capacity: "300 kW",
    location: "Byblos, Lebanon",
    image: "/images/work.png",
    description: "Hybrid solar + generator system for luxury hotel",
    fullDescription: "A sophisticated hybrid power system combining 300 kW of solar panels with backup generators for a luxury hotel. The system ensures uninterrupted power supply while maximizing renewable energy usage.",
    features: [
      "300 kW solar capacity",
      "Backup generator integration",
      "Automatic switching system",
      "Energy cost optimization",
      "24/7 monitoring and support"
    ],
    client: "Luxury Hotel",
    year: "2023"
  },
  {
    id: "6",
    slug: "commercial-solar-farm",
    title: "Commercial Solar Farm",
    category: "Solar Systems",
    capacity: "1 MW",
    location: "Baalbek, Lebanon",
    image: "/images/panels.png",
    description: "Large-scale solar farm installation",
    fullDescription: "A massive 1 MW ground-mounted solar farm installation. This project represents one of the largest solar installations in the region, providing clean energy for multiple commercial facilities.",
    features: [
      "1 MW total capacity",
      "Ground-mounted installation",
      "Advanced tracking system",
      "Grid connection",
      "Comprehensive monitoring"
    ],
    client: "Commercial Development",
    year: "2023"
  },
  {
    id: "7",
    slug: "backup-generator-hospital",
    title: "Backup Generator - Hospital",
    category: "Generators",
    capacity: "800 kVA",
    location: "Beirut, Lebanon",
    image: "/images/back-up-generator-business.jpg",
    description: "Critical backup power system for hospital",
    fullDescription: "Installation of a critical 800 kVA backup generator system for a hospital. The system includes redundant systems and automatic failover to ensure uninterrupted power for critical medical equipment.",
    features: [
      "800 kVA capacity",
      "Redundant backup systems",
      "Automatic failover",
      "Critical load prioritization",
      "24/7 emergency support"
    ],
    client: "Medical Facility",
    year: "2024"
  },
  {
    id: "8",
    slug: "residential-solar-battery",
    title: "Residential Solar + Battery",
    category: "Residential",
    capacity: "15 kW",
    location: "Mount Lebanon, Lebanon",
    image: "/images/deyeBattery.jpg",
    description: "Residential system with energy storage",
    fullDescription: "A 15 kW residential solar system with advanced battery storage. This system provides complete energy independence, allowing the home to operate off-grid during power outages.",
    features: [
      "15 kW solar capacity",
      "Advanced battery storage",
      "Off-grid capability",
      "Smart energy management",
      "Mobile monitoring app"
    ],
    client: "Residential Home",
    year: "2024"
  },
  {
    id: "9",
    slug: "commercial-energy-management",
    title: "Commercial Energy Management",
    category: "Energy Management",
    capacity: "200 kW",
    location: "Doha, Qatar",
    image: "/images/deyeESS.png",
    description: "Smart energy management for commercial building",
    fullDescription: "A comprehensive smart energy management system for a commercial building in Qatar. The system integrates solar power, battery storage, and intelligent load management to optimize energy usage and costs.",
    features: [
      "200 kW solar capacity",
      "Energy storage system",
      "Smart load management",
      "Cost optimization",
      "Real-time analytics"
    ],
    client: "Commercial Building",
    year: "2024"
  },
  {
    id: "10",
    slug: "industrial-solar-installation",
    title: "Industrial Solar Installation",
    category: "Solar Systems",
    capacity: "500 kW",
    location: "Tripoli, Lebanon",
    image: "/images/GRID.jpg",
    description: "Large industrial solar installation",
    fullDescription: "A 500 kW industrial solar installation for a manufacturing facility. The system significantly reduces operational costs and provides a reliable source of clean energy.",
    features: [
      "500 kW capacity",
      "Industrial-grade equipment",
      "Grid integration",
      "Performance monitoring",
      "Maintenance program"
    ],
    client: "Manufacturing Facility",
    year: "2023"
  },
  {
    id: "11",
    slug: "residential-off-grid",
    title: "Residential Off-Grid System",
    category: "Residential",
    capacity: "5 kW",
    location: "Zahle, Lebanon",
    image: "/images/smaESS.png",
    description: "Complete off-grid residential solar system",
    fullDescription: "A complete 5 kW off-grid solar system for a remote residential property. The system provides complete energy independence with battery storage and backup generator integration.",
    features: [
      "5 kW solar capacity",
      "Off-grid operation",
      "Battery storage",
      "Generator backup",
      "Complete energy independence"
    ],
    client: "Residential Home",
    year: "2023"
  },
  {
    id: "12",
    slug: "generator-maintenance-upgrade",
    title: "Generator Maintenance & Upgrade",
    category: "Generators",
    capacity: "400 kVA",
    location: "Sidon, Lebanon",
    image: "/images/volvoGENERATOR.png",
    description: "Generator system upgrade and maintenance",
    fullDescription: "Comprehensive upgrade and maintenance of an existing 400 kVA generator system. The project included modernizing controls, improving efficiency, and implementing remote monitoring.",
    features: [
      "400 kVA capacity",
      "System modernization",
      "Improved efficiency",
      "Remote monitoring",
      "Extended maintenance contract"
    ],
    client: "Commercial Facility",
    year: "2024"
  },
];

