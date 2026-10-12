export interface SectorItem {
  name: string;
  slug: string;
  subcategories: string[];
}

export const exhibitionSectors: SectorItem[] = [
  {
    name: "Building Materials",
    slug: "building-materials",
    subcategories: ["Cement & Concrete", "Blocks & Bricks", "Gypsum Boards", "Roofing & Cladding", "Waterproofing", "Construction Chemicals"]
  },
  {
    name: "Construction Machinery & Equipment",
    slug: "construction-machinery",
    subcategories: ["Earthmoving Equipment", "Excavators & Loaders", "Concrete & Batching Plants", "Cranes & Lifting", "Scaffolding & Formwork"]
  },
  {
    name: "Steel, Metal & Structural Products",
    slug: "steel-metal-structural",
    subcategories: ["Structural & Rebar Steel", "Pipes & Tubes", "Metal Sheets", "Pre-Engineered Structures"]
  },
  {
    name: "Electrical, Power & Lighting",
    slug: "electrical-power-lighting",
    subcategories: ["Cables & Wires", "Switchgear & Transformers", "Generators", "LED & Industrial Lighting"]
  },
  {
    name: "Doors, Windows, Glass & Aluminium",
    slug: "doors-windows-glass-aluminium",
    subcategories: ["Aluminium Profiles", "uPVC Systems", "Architectural Glass", "Façade Systems", "Shutters & Hardware"]
  },
  {
    name: "HVAC & Building Services",
    slug: "hvac-building-services",
    subcategories: ["Air Conditioning", "Ventilation", "Refrigeration", "Mechanical & Building Services"]
  },
  {
    name: "Prefab, Precast & Modular Buildings",
    slug: "prefab-precast-modular",
    subcategories: ["Precast Products", "Prefabricated Structures", "Modular Buildings", "PEB Systems"]
  },
  {
    name: "Tiles, Marble, Stone & Surfaces",
    slug: "tiles-marble-stone",
    subcategories: ["Ceramic & Porcelain Tile", "Marble & Granite", "Natural Stone", "Flooring & Architectural Surfaces"]
  },
  {
    name: "Water, Plumbing & Pumps",
    slug: "water-plumbing-pumps",
    subcategories: ["Pipes & Fittings", "Industrial Pumps & Valves", "Water Tanks", "Water Treatment Systems"]
  },
  {
    name: "Solar, Energy & Power Solutions",
    slug: "solar-energy-power",
    subcategories: ["Solar Systems", "Backup Power", "Energy-Efficient Building Products"]
  },
  {
    name: "Hardware, Tools & Fasteners",
    slug: "hardware-tools-fasteners",
    subcategories: ["Hand & Power Tools", "Cutting & Drilling Equipment", "Fasteners & Abrasives", "Workshop Hardware"]
  },
  {
    name: "Paints, Coatings & Chemicals",
    slug: "paints-coatings-chemicals",
    subcategories: ["Decorative Paints", "Industrial Coatings", "Adhesives & Sealants", "Concrete Admixtures"]
  },
  {
    name: "Sanitaryware & Bathroom",
    slug: "sanitaryware-bathroom",
    subcategories: ["Sanitaryware & Faucets", "Showers & Fittings", "Bathroom Furniture & Fixtures"]
  },
  {
    name: "Fire, Safety & Security",
    slug: "fire-safety-security",
    subcategories: ["Fire Detection & Protection", "Site Safety Equipment", "CCTV & Access Control"]
  },
  {
    name: "Interiors & Finishing Materials",
    slug: "interiors-finishing-materials",
    subcategories: ["Ceilings & Wall Panels", "Decorative Materials", "Interior Finishes"]
  }
];