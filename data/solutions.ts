// data/solutions.ts
export type SolutionTech = {
  key: string;          // stable id
  label: string;        // short name shown on the card
  icon: string;         // one of the keys we map to lucide icons in the slug page
  blurb: string;        // 1–2 lines that explain why we use it
};

export type Solution = {
  slug:
    | "generators"
    | "maintenance-services"
    | "solar-services"
    | "energy-management"; 
  heading: string;
  description: string;
  image?: string;       // preferred hero/teaser image for this solution
  tech?: SolutionTech[]; // technologies we use (shown inside slug page)
  category?: "popular" | "specialized" | "innovation";
};

const solutions: Solution[] = [
  // GENERATORS
  {
    slug: "generators",
    heading: "Reliable Backup Power Solutions",
    description:
      "Industrial and commercial generators that ensure uninterrupted power supply with intelligent load management and automatic switching.",
    image: "/images/volvoGENERATOR.png",
    category: "popular",
    tech: [
      {
        key: "auto-transfer",
        label: "Automatic Transfer Switch",
        icon: "zap",
        blurb: "Seamless power switching between grid and generator within milliseconds.",
      },
      {
        key: "load-management",
        label: "Smart Load Management",
        icon: "gauge",
        blurb: "Intelligent power distribution prioritizing critical loads during outages.",
      },
      {
        key: "remote-monitoring",
        label: "Remote Monitoring",
        icon: "smartphone",
        blurb: "Real-time status monitoring and control from anywhere via mobile app.",
      },
      {
        key: "fuel-efficiency",
        label: "Fuel Optimization",
        icon: "droplet",
        blurb: "Advanced fuel management systems maximizing runtime and efficiency.",
      },
    ],
  },

  // MAINTENANCE SERVICES
  {
    slug: "maintenance-services",
    heading: "Comprehensive Maintenance & Support",
    description:
      "Preventive maintenance and emergency support for generators, solar systems, and energy infrastructure—keeping your systems at peak performance.",
    image: "/images/fieldwork.png",
    category: "specialized",
    tech: [
      { 
        key: "preventive-care", 
        label: "Preventive Maintenance", 
        icon: "wrench", 
        blurb: "Scheduled inspections and servicing to prevent costly breakdowns." 
      },
      { 
        key: "emergency-response", 
        label: "24/7 Emergency Service", 
        icon: "phone", 
        blurb: "Rapid response team available around the clock for urgent repairs." 
      },
      { 
        key: "performance-tuning", 
        label: "Performance Optimization", 
        icon: "trending-up", 
        blurb: "System tuning and upgrades to maximize efficiency and output." 
      },
      { 
        key: "spare-parts", 
        label: "Genuine Parts Inventory", 
        icon: "package", 
        blurb: "Extensive stock of OEM parts for immediate replacement needs." 
      },
    ],
  },

  // SOLAR SERVICES - Complete Solar Solutions
  {
    slug: "solar-services",
    heading: "Complete Solar Energy Solutions",
    description:
      "Comprehensive solar solutions from consultation to smart innovations—including intelligent load prioritization, sunflower tracking, energy storage, and real-time monitoring for maximum efficiency.",
    image: "/images/panels.png",
    category: "popular",
    tech: [
      { 
        key: "site-assessment", 
        label: "Site Assessment", 
        icon: "map", 
        blurb: "Detailed energy audits and feasibility studies for optimal system design." 
      },
      { 
        key: "custom-design", 
        label: "Custom System Design", 
        icon: "layers", 
        blurb: "Tailored solar configurations matching your energy profile and budget." 
      },
      { 
        key: "professional-install", 
        label: "Professional Installation", 
        icon: "hammer", 
        blurb: "Certified installers ensuring safe, compliant, and efficient setup." 
      },
      { 
        key: "smart-prioritization", 
        label: "Smart Load Prioritization", 
        icon: "cpu", 
        blurb: "AI-driven system automatically allocates solar power to critical loads first." 
      },
      { 
        key: "sunflower-tracking", 
        label: "Sunflower Solar Tracking", 
        icon: "sun", 
        blurb: "Dual-axis tracking systems following the sun's path for up to 40% more energy." 
      },
      { 
        key: "hybrid-storage", 
        label: "Hybrid Battery Storage", 
        icon: "battery", 
        blurb: "Intelligent battery management maximizing solar utilization and grid independence." 
      },
      { 
        key: "performance-monitoring", 
        label: "Performance Monitoring", 
        icon: "bar-chart-3", 
        blurb: "Real-time tracking of energy production, savings, and system health." 
      },
    ],
  },

  // INDUSTRY 4.0 & ENERGY MANAGEMENT
  {
    slug: "energy-management",
    heading: "Energy Management & Industry 4.0",
    description:
      "Complete industrial solution combining smart energy management, IoT automation, and Industry 4.0 technologies. Integrate solar, generators, and grid power with advanced monitoring, predictive analytics, and our SaaS platform Sol4.o for total operational control.",
    image: "/images/synchnorizedDist.png",
    category: "specialized",
    tech: [
      { 
        key: "energy-analytics", 
        label: "Energy Analytics", 
        icon: "activity", 
        blurb: "Detailed consumption analysis identifying waste and optimization opportunities." 
      },
      { 
        key: "multi-source", 
        label: "Multi-Source Integration", 
        icon: "git-branch", 
        blurb: "Seamless coordination between solar, grid, and generator power sources." 
      },
      { 
        key: "iot-sensors", 
        label: "Industrial IoT Sensors", 
        icon: "radio", 
        blurb: "Network of sensors monitoring equipment, environment, and production metrics." 
      },
      { 
        key: "automation", 
        label: "Process Automation", 
        icon: "cog", 
        blurb: "PLC programming and SCADA systems for automated industrial processes." 
      },
      { 
        key: "solen-platform", 
        label: "Sol4.o SaaS Platform", 
        icon: "cloud", 
        blurb: "Unified cloud platform managing solar, generators, and energy systems in one dashboard." 
      },
      { 
        key: "predictive-maintenance", 
        label: "Predictive Maintenance", 
        icon: "shield", 
        blurb: "AI algorithms predicting equipment failures before they occur." 
      },
      { 
        key: "demand-response", 
        label: "Demand Response", 
        icon: "clock", 
        blurb: "Automated load shifting during peak hours to minimize electricity costs." 
      },
    ],
  },
];

export default solutions;
