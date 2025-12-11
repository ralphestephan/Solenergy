// app/glossary/page.tsx
import Reveal from "@/components/ui/Reveal";
import DynamicUnderline from "@/components/ui/DynamicUnderline";

type GlossarySection = {
  category: string;
  terms: Array<{ term: string; def: string }>;
};

const GLOSSARY: GlossarySection[] = [
  {
    category: "Solar Energy Basics",
    terms: [
      {
        term: "PV (Photovoltaic)",
        def: "Technology that converts sunlight directly into electricity using solar cells. PV panels are the core of solar energy systems."
      },
      {
        term: "Solar Panel / Module",
        def: "A collection of photovoltaic cells assembled together to generate electricity from sunlight."
      },
      {
        term: "Solar Array",
        def: "Multiple solar panels connected together to increase total power generation capacity."
      },
      {
        term: "Monocrystalline",
        def: "High-efficiency solar cells made from single-crystal silicon, recognizable by their uniform dark appearance."
      },
      {
        term: "Polycrystalline",
        def: "Solar cells made from multiple silicon crystals, typically less expensive but slightly lower efficiency than monocrystalline."
      },
      {
        term: "Thin-Film Solar",
        def: "Lightweight, flexible solar technology using thin layers of photovoltaic material, ideal for specific applications."
      },
      {
        term: "Bifacial Panels",
        def: "Solar panels that can capture sunlight from both front and back sides, increasing energy production."
      },
      {
        term: "Solar Irradiance",
        def: "The amount of solar power received per unit area, measured in watts per square meter (W/m²)."
      },
      {
        term: "Peak Sun Hours",
        def: "The equivalent number of hours per day when solar irradiance averages 1,000 W/m², used to calculate expected energy production."
      },
    ]
  },
  {
    category: "Energy Storage Systems (ESS)",
    terms: [
      {
        term: "ESS (Energy Storage System)",
        def: "A system that stores energy for later use, typically using batteries. ESS is crucial for solar and backup power solutions, enabling energy independence and grid resilience."
      },
      {
        term: "Lithium Battery",
        def: "A rechargeable battery technology commonly used in modern ESS for its high energy density, long cycle life, and low maintenance requirements."
      },
      {
        term: "Lithium Iron Phosphate (LiFePO4)",
        def: "A type of lithium battery chemistry known for exceptional safety, long life cycles (5,000+), and thermal stability."
      },
      {
        term: "BMS (Battery Management System)",
        def: "Electronics that manage and protect battery packs by monitoring voltage, temperature, current, and state of charge to ensure safety and longevity."
      },
      {
        term: "Depth of Discharge (DoD)",
        def: "The percentage of battery capacity that has been used. A higher DoD means more usable energy but may reduce battery lifespan."
      },
      {
        term: "State of Charge (SoC)",
        def: "The current energy level of a battery expressed as a percentage of its total capacity."
      },
      {
        term: "Cycle Life",
        def: "The number of complete charge/discharge cycles a battery can perform before its capacity degrades to a specified level (typically 80%)."
      },
      {
        term: "Round-trip Efficiency",
        def: "The percentage of energy that can be retrieved from a battery compared to what was stored, accounting for conversion losses."
      },
      {
        term: "C-Rate",
        def: "The rate at which a battery charges or discharges relative to its capacity. A 1C rate means full charge/discharge in one hour."
      },
      {
        term: "Battery Degradation",
        def: "The gradual loss of battery capacity and performance over time due to chemical aging and cycling."
      },
    ]
  },
  {
    category: "Inverters & Power Conversion",
    terms: [
      {
        term: "Inverter",
        def: "A device that converts DC (direct current) electricity from solar panels or batteries into AC (alternating current) electricity for use in homes and businesses."
      },
      {
        term: "Hybrid Inverter",
        def: "An advanced inverter that manages power from solar panels, batteries, and the grid, enabling seamless switching between all three sources."
      },
      {
        term: "String Inverter",
        def: "A type of inverter that connects a series (string) of solar panels, converting their combined DC output to AC power."
      },
      {
        term: "Microinverter",
        def: "A small inverter attached to individual solar panels, optimizing performance panel-by-panel and reducing impact of shading."
      },
      {
        term: "MPPT (Maximum Power Point Tracking)",
        def: "A technology in solar inverters that continuously adjusts operating conditions to extract maximum power from PV panels under varying conditions."
      },
      {
        term: "Grid-tied Inverter",
        def: "An inverter designed to synchronize with and feed electricity into the utility grid, often with anti-islanding protection."
      },
      {
        term: "Off-grid Inverter",
        def: "An inverter designed for standalone systems without grid connection, typically with battery charging capabilities."
      },
      {
        term: "Pure Sine Wave",
        def: "A smooth, continuous AC waveform produced by high-quality inverters, suitable for all types of electrical equipment."
      },
      {
        term: "Modified Sine Wave",
        def: "A stepped approximation of a sine wave, less expensive but may not work well with sensitive electronics."
      },
    ]
  },
  {
    category: "Grid & System Types",
    terms: [
      {
        term: "On-grid System",
        def: "A solar or energy system connected to the public electricity grid, allowing energy import/export and often with net metering."
      },
      {
        term: "Off-grid System",
        def: "A solar or energy system that operates independently of the public electricity grid, relying on batteries for energy storage."
      },
      {
        term: "Hybrid System",
        def: "A system that combines grid connection with battery storage, offering both grid benefits and backup power capability."
      },
      {
        term: "Grid-tied",
        def: "Connected to the public electricity grid, allowing for energy import when needed and export when surplus is available."
      },
      {
        term: "Net Metering",
        def: "A billing mechanism that credits solar energy system owners for the electricity they feed back to the grid, offsetting consumption costs."
      },
      {
        term: "Feed-in Tariff",
        def: "A policy mechanism that pays renewable energy producers a fixed rate for the electricity they feed into the grid."
      },
      {
        term: "Microgrid",
        def: "A localized group of electricity sources and loads that can disconnect from the traditional grid to operate autonomously during outages."
      },
      {
        term: "Virtual Power Plant (VPP)",
        def: "A network of distributed energy resources (solar, batteries, generators) managed as a single power plant through software."
      },
      {
        term: "Islanding",
        def: "When a distributed generation system continues to power a location even after grid power is lost, which can be dangerous for utility workers."
      },
      {
        term: "Anti-islanding Protection",
        def: "Safety mechanism that automatically disconnects solar inverters from the grid during outages to protect utility workers."
      },
    ]
  },
  {
    category: "Backup Power & Generators",
    terms: [
      {
        term: "Automatic Transfer Switch (ATS)",
        def: "A device that automatically switches power supply from the grid to a generator or backup source within milliseconds during an outage."
      },
      {
        term: "Volvo Penta",
        def: "A leading manufacturer of industrial and marine diesel generators, known for reliability, fuel efficiency, and performance in demanding conditions."
      },
      {
        term: "Diesel Generator",
        def: "A backup power system using a diesel engine to generate electricity, common for industrial and commercial applications."
      },
      {
        term: "Generator Paralleling",
        def: "Operating multiple generators together to increase total power capacity and provide redundancy."
      },
      {
        term: "Load Bank Testing",
        def: "Testing a generator under artificial load to verify performance, identify issues, and prevent wet stacking."
      },
      {
        term: "UPS (Uninterruptible Power Supply)",
        def: "A backup power system that provides instant electricity during outages using batteries, protecting sensitive equipment from power interruptions."
      },
      {
        term: "Blackout",
        def: "A complete loss of power in a given area, often requiring backup generators or ESS for continuity of operations."
      },
      {
        term: "Brownout",
        def: "A partial reduction in voltage or power availability, which can damage equipment without proper voltage regulation."
      },
      {
        term: "Load Shedding",
        def: "Intentional shutdown of electric load to prevent complete failure of the power system during supply shortages."
      },
      {
        term: "Standby Power",
        def: "Backup power systems that activate automatically when the primary power source fails."
      },
    ]
  },
  {
    category: "Energy Management & Monitoring",
    terms: [
      {
        term: "Load Management",
        def: "The process of controlling and optimizing the use of electrical loads to improve efficiency, reduce peak demand, and lower costs."
      },
      {
        term: "Peak Shaving",
        def: "Using stored energy or reducing consumption during periods of high electricity demand to avoid peak pricing and reduce overall costs."
      },
      {
        term: "Demand Response",
        def: "A strategy where consumers adjust their power usage in response to grid signals or price incentives, often automated through smart systems."
      },
      {
        term: "Energy Audit",
        def: "A comprehensive assessment of energy use in a facility to identify opportunities for efficiency improvements and cost savings."
      },
      {
        term: "Smart Meter",
        def: "An electronic device that records energy consumption in intervals and communicates with the utility for real-time monitoring and billing."
      },
      {
        term: "SCADA (Supervisory Control and Data Acquisition)",
        def: "A system for remote monitoring and control of industrial processes, including energy management, generator systems, and solar farms."
      },
      {
        term: "IoT (Internet of Things)",
        def: "A network of interconnected devices that collect and exchange data, enabling smart monitoring, automation, and optimization in energy systems."
      },
      {
        term: "EMS (Energy Management System)",
        def: "Software and hardware that monitors, controls, and optimizes energy consumption and production in buildings or facilities."
      },
      {
        term: "Real-time Monitoring",
        def: "Continuous tracking of system performance, energy production, and consumption with instant data updates and alerts."
      },
      {
        term: "Performance Analytics",
        def: "Data analysis tools that evaluate system efficiency, identify issues, and provide insights for optimization."
      },
    ]
  },
  {
    category: "Power Quality & Electrical Concepts",
    terms: [
      {
        term: "Power Factor",
        def: "A measure of how effectively electrical power is being used, ranging from 0 to 1. Poor power factor increases energy costs and system losses."
      },
      {
        term: "Reactive Power",
        def: "The portion of electricity that establishes and sustains electric and magnetic fields in AC equipment, measured in VARs (Volt-Amperes Reactive)."
      },
      {
        term: "Active Power",
        def: "The actual power consumed by electrical devices to perform useful work, measured in watts (W) or kilowatts (kW)."
      },
      {
        term: "Apparent Power",
        def: "The combination of active and reactive power, measured in volt-amperes (VA) or kilovolt-amperes (kVA)."
      },
      {
        term: "Surge Protection",
        def: "Devices or systems that protect electrical equipment from voltage spikes caused by lightning, grid switching, or other events."
      },
      {
        term: "Voltage Regulation",
        def: "Maintaining stable voltage levels despite variations in load or supply, critical for equipment protection and system reliability."
      },
      {
        term: "Harmonic Distortion",
        def: "Unwanted frequencies in electrical systems caused by non-linear loads, which can damage equipment and reduce efficiency."
      },
      {
        term: "Three-phase Power",
        def: "A power distribution system using three alternating currents offset by 120 degrees, common in commercial and industrial applications."
      },
      {
        term: "Single-phase Power",
        def: "A power system with one alternating current, typically used in residential applications."
      },
    ]
  },
  {
    category: "System Performance & Economics",
    terms: [
      {
        term: "Capacity Factor",
        def: "The ratio of actual energy produced by a system to its maximum possible output over a period, accounting for weather and downtime."
      },
      {
        term: "Performance Ratio",
        def: "A quality factor measuring the actual yield of a solar system compared to its theoretical yield under ideal conditions."
      },
      {
        term: "Specific Yield",
        def: "The annual energy output per installed kilowatt of solar capacity, measured in kWh/kWp, indicating system productivity."
      },
      {
        term: "Levelized Cost of Energy (LCOE)",
        def: "The total cost of building and operating a power generation system divided by the total energy produced over its lifetime."
      },
      {
        term: "ROI (Return on Investment)",
        def: "The financial return from a solar or energy system, calculated as net savings divided by total investment cost."
      },
      {
        term: "Payback Period",
        def: "The time required for energy savings to equal the initial investment cost, typically 3-7 years for solar systems in Lebanon."
      },
      {
        term: "Degradation Rate",
        def: "The annual percentage decrease in solar panel output, typically 0.5-0.8% per year for quality panels."
      },
      {
        term: "System Availability",
        def: "The percentage of time a system is operational and producing energy, critical for commercial applications."
      },
      {
        term: "Uptime",
        def: "The amount of time a system is functional and available, often expressed as a percentage (e.g., 99.9% uptime)."
      },
    ]
  },
  {
    category: "Installation & Components",
    terms: [
      {
        term: "Racking System",
        def: "The structural framework that secures solar panels to rooftops or ground mounts, designed to withstand wind and weather."
      },
      {
        term: "Balance of System (BoS)",
        def: "All components of a solar system except the panels themselves, including inverters, wiring, mounting, and electrical equipment."
      },
      {
        term: "DC (Direct Current)",
        def: "Electrical current that flows in one direction, produced by solar panels and batteries."
      },
      {
        term: "AC (Alternating Current)",
        def: "Electrical current that periodically reverses direction, used by household appliances and the power grid."
      },
      {
        term: "Combiner Box",
        def: "An enclosure where multiple solar panel strings are combined before connecting to the inverter."
      },
      {
        term: "Charge Controller",
        def: "A device that regulates the voltage and current from solar panels to batteries, preventing overcharging and deep discharge."
      },
      {
        term: "Junction Box",
        def: "A weatherproof enclosure on the back of solar panels where electrical connections are made."
      },
      {
        term: "MC4 Connector",
        def: "Industry-standard waterproof electrical connectors used for solar panel wiring."
      },
      {
        term: "Optimizers",
        def: "DC-to-DC converters attached to individual panels to maximize energy harvest, similar to microinverters but at the DC level."
      },
    ]
  },
  {
    category: "Regulations & Standards",
    terms: [
      {
        term: "IEC Standards",
        def: "International Electrotechnical Commission standards for solar equipment quality, safety, and performance testing."
      },
      {
        term: "Tier 1 Manufacturer",
        def: "Top-tier solar panel manufacturers with vertically integrated production, proven track records, and financial stability."
      },
      {
        term: "Warranty Coverage",
        def: "Manufacturer guarantees for solar equipment, typically 25 years for panel performance and 10-15 years for inverters."
      },
      {
        term: "Product Warranty",
        def: "Coverage against manufacturing defects, typically 10-12 years for solar panels."
      },
      {
        term: "Performance Warranty",
        def: "Guarantee that solar panels will maintain minimum power output, typically 80-90% after 25 years."
      },
      {
        term: "Building Permit",
        def: "Official approval required before installing solar systems, ensuring compliance with local codes and regulations."
      },
      {
        term: "Electrical Code Compliance",
        def: "Adherence to national and local electrical safety standards for solar and energy system installations."
      },
    ]
  },
  {
    category: "Advanced & Industry 4.0 Technologies",
    terms: [
      {
        term: "Industry 4.0",
        def: "The fourth industrial revolution, integrating IoT, AI, data analytics, and automation into energy and manufacturing systems."
      },
      {
        term: "Machine Learning",
        def: "AI technology that enables systems to learn from data patterns and make predictions, used for energy forecasting and optimization."
      },
      {
        term: "Predictive Maintenance",
        def: "Using data analytics and AI to predict equipment failures before they occur, minimizing downtime and repair costs."
      },
      {
        term: "Digital Twin",
        def: "A virtual replica of a physical energy system used for simulation, optimization, and predictive analysis."
      },
      {
        term: "Edge Computing",
        def: "Processing data locally at or near the energy system rather than in the cloud, enabling faster response and reduced latency."
      },
      {
        term: "MQTT Protocol",
        def: "A lightweight messaging protocol ideal for IoT devices in energy systems, enabling efficient real-time communication."
      },
      {
        term: "Time-series Database",
        def: "Specialized databases like InfluxDB or TimescaleDB optimized for storing and analyzing time-stamped energy data."
      },
      {
        term: "Blockchain for Energy",
        def: "Distributed ledger technology enabling peer-to-peer energy trading and transparent renewable energy certificate tracking."
      },
    ]
  },
];

const TERMS = [
  {
    term: "ESS (Energy Storage System)",
    def: "A system that stores energy for later use, typically using batteries. ESS is crucial for solar and backup power solutions, enabling energy independence and grid resilience."
  },
  {
    term: "PV (Photovoltaic)",
    def: "Technology that converts sunlight directly into electricity using solar cells. PV panels are the core of solar energy systems."
  },
  {
    term: "Hybrid Inverter",
    def: "A device that manages power from both solar panels and batteries, allowing seamless switching between grid, solar, and stored energy."
  },
  {
    term: "Net Metering",
    def: "A billing mechanism that credits solar energy system owners for the electricity they add to the grid."
  },
  {
    term: "Load Management",
    def: "The process of controlling and optimizing the use of electrical loads to improve efficiency and reduce costs."
  },
  {
    term: "SCADA (Supervisory Control and Data Acquisition)",
    def: "A system for remote monitoring and control of industrial processes, including energy and generator systems."
  },
  {
    term: "Off-grid System",
    def: "A solar or energy system that operates independently of the public electricity grid, often using batteries for storage."
  },
  {
    term: "On-grid System",
    def: "A solar or energy system connected to the public electricity grid, often with net metering."
  },
  {
    term: "Lithium Battery",
    def: "A rechargeable battery technology commonly used in modern ESS for its high energy density and long cycle life."
  },
  {
    term: "Automatic Transfer Switch (ATS)",
    def: "A device that automatically switches power supply from the grid to a generator or backup source during an outage."
  },
  {
    term: "Volvo Penta",
    def: "A leading manufacturer of industrial and marine generators, known for reliability and performance."
  },
  {
    term: "IoT (Internet of Things)",
    def: "A network of interconnected devices that collect and exchange data, enabling smart monitoring and automation in energy systems."
  },
  {
    term: "BMS (Battery Management System)",
    def: "Electronics that manage and protect battery packs, ensuring safety, longevity, and optimal performance."
  },
  {
    term: "Grid-tied",
    def: "A system that is connected to the public electricity grid, allowing for energy import/export."
  },
  {
    term: "Inverter",
    def: "A device that converts DC electricity from solar panels or batteries into AC electricity for use in homes and businesses."
  },
  {
    term: "Peak Shaving",
    def: "The use of stored energy to reduce electricity consumption during periods of high demand, lowering costs."
  },
  {
    term: "Demand Response",
    def: "A strategy where consumers adjust their power usage in response to grid signals, often incentivized by utilities."
  },
  {
    term: "Microgrid",
    def: "A localized group of electricity sources and loads that can disconnect from the traditional grid to operate autonomously."
  },
  {
    term: "MPPT (Maximum Power Point Tracking)",
    def: "A technology in solar inverters that maximizes the power output from PV panels by adjusting operating conditions."
  },
  {
    term: "UPS (Uninterruptible Power Supply)",
    def: "A backup power system that provides instant electricity during outages, protecting sensitive equipment."
  },
  {
    term: "Smart Meter",
    def: "An electronic device that records energy consumption and communicates with the utility for monitoring and billing."
  },
  {
    term: "Energy Audit",
    def: "A comprehensive assessment of energy use in a facility to identify opportunities for efficiency improvements."
  },
  {
    term: "Reactive Power",
    def: "The portion of electricity that establishes and sustains electric and magnetic fields in AC equipment, important for grid stability."
  },
  {
    term: "Power Factor",
    def: "A measure of how effectively electrical power is being used; improving it can reduce energy costs."
  },
  {
    term: "Blackout",
    def: "A complete loss of power in a given area, often requiring backup generators or ESS for continuity."
  },
  {
    term: "Surge Protection",
    def: "Devices or systems that protect electrical equipment from voltage spikes."
  },
  {
    term: "Feed-in Tariff",
    def: "A policy mechanism that pays renewable energy producers for the electricity they feed into the grid."
  },
  {
    term: "String Inverter",
    def: "A type of inverter that connects a series (string) of solar panels, converting their DC output to AC."
  },
  {
    term: "Distributed Generation",
    def: "Electricity generation from sources that are distributed throughout the grid, such as rooftop solar panels."
  }
];

export default function GlossaryPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <Reveal className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent">
            Solar & Energy Glossary
          </span>
        </h1>
        <DynamicUnderline watch="h1" align="left" widthClass="w-24" height={4} />
        <p className="mt-4 text-lg text-zinc-700 max-w-3xl">
          Comprehensive guide to solar energy, ESS, backup power, and energy management terms—organized by topic for easy reference.
        </p>
      </Reveal>

      <div className="space-y-12">
        {GLOSSARY.map(({ category, terms }) => (
          <Reveal key={category} as="section" className="scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-6 pb-2 border-b-2 border-brand-yellow">
              {category}
            </h2>
            <div className="space-y-6">
              {terms.map(({ term, def }) => (
                <div key={term} className="bg-white rounded-lg border border-zinc-200 shadow-sm p-5 hover:shadow-md hover:border-brand-yellow/30 transition-all">
                  <h3 className="text-lg font-bold text-brand-yellow mb-2">{term}</h3>
                  <p className="text-zinc-700 leading-relaxed">{def}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
