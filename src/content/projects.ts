import { images, type ImageAsset } from "./images";

/**
 * Portfolio data.
 *
 * All projects below use genuine Wall Art Expert photographs. Their titles and summaries are
 * drafts: `placeholder: true` keeps a project out of search results and the sitemap until
 * the owner confirms its details — then set it to `false`. Do not add locations, clients
 * or details that have not been confirmed by the owner.
 */

export type SpaceSlug = "residential" | "hospitality" | "restaurants-cafes" | "commercial" | "offices-retail";

export type Space = {
  slug: SpaceSlug;
  title: string;
  description: string;
  image: ImageAsset;
};

/** Proposed categories — OWNER APPROVAL: adjust to match the company's actual work. */
export const spaces: Space[] = [
  {
    slug: "residential",
    title: "Residential Interiors",
    description: "Living rooms, bedrooms and private homes.",
    image: images.tropicalLagoon,
  },
  {
    slug: "hospitality",
    title: "Hotels & Hospitality",
    description: "Lobbies, suites and guest experiences.",
    image: images.spaceHospitality,
  },
  {
    slug: "restaurants-cafes",
    title: "Restaurants & Cafés",
    description: "Dining spaces with a distinct atmosphere.",
    image: images.dragonRestaurant,
  },
  {
    slug: "commercial",
    title: "Commercial Spaces",
    description: "Receptions, showrooms and public interiors.",
    image: images.chinoiserieBlossom,
  },
  {
    slug: "offices-retail",
    title: "Offices & Retail",
    description: "Workplaces and stores that express a brand.",
    image: images.spaceOffices,
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  space: SpaceSlug;
  /** Only add a location the client has approved for publication. */
  location?: string;
  summary: string;
  cover: ImageAsset;
  gallery: ImageAsset[];
  featured: boolean;
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    // Real company photograph. OWNER APPROVAL: confirm title, space, location and summary,
    // then set `placeholder: false` so the project is indexed and added to the sitemap.
    slug: "hill-country-mural",
    title: "Hill Country Mural",
    category: "Decorative Wall Painting",
    space: "commercial",
    summary:
      "A hand-painted mural celebrating life in Sri Lanka's hill country — tea estates, winding rivers and a family gathered around the table — brought to life in vivid, intricately patterned colour.",
    cover: images.hillCountryMural,
    gallery: [images.hillCountryMural, images.hillCountryMuralDetail],
    featured: true,
    placeholder: true,
  },
  {
    // Real company photographs. OWNER APPROVAL: confirm title, space, location and summary.
    slug: "floral-relief-panels",
    title: "Sculpted Floral Relief",
    category: "Feature Wall Design",
    space: "commercial",
    summary:
      "Full-height sculpted relief panels where oversized blooms rise out of flowing, wind-swept folds — one finished in pearlescent blush with gilded stems, another in pure sculptural white.",
    cover: images.reliefBlush2,
    gallery: [images.reliefBlush2, images.reliefBlush1, images.reliefWhite],
    featured: true,
    placeholder: true,
  },
  {
    // Real company photographs. OWNER APPROVAL: confirm title, space, location and summary.
    slug: "sepia-arched-tree-panels",
    title: "Sepia Arched Tree Panels",
    category: "Decorative Wall Painting",
    space: "commercial",
    summary:
      "Delicate tree canopies and perched birds hand-painted in soft sepia tones, set into arched niches within classical white panelling for a quiet, timeless elegance.",
    cover: images.sepiaPanel2,
    gallery: [images.sepiaPanel2, images.sepiaPanel1, images.sepiaPanel3],
    featured: true,
    placeholder: true,
  },
  {
    // Real company photographs. OWNER APPROVAL: confirm title, space, location and summary.
    slug: "botanical-landscape-murals",
    title: "Botanical Landscape Murals",
    category: "Decorative Wall Painting",
    space: "commercial",
    summary:
      "A room wrapped in hand-painted landscape — towering trees, misty hills and exotic birds rendered in muted greens and warm, hazy light, from full walls to arched panels.",
    cover: images.botanicalTree,
    gallery: [images.botanicalTree, images.botanicalArches, images.botanicalCorner],
    featured: true,
    placeholder: true,
  },
  {
    // Real company photographs. OWNER APPROVAL: confirm title, client/location and summary.
    slug: "dragon-mural-restaurant",
    title: "Golden Dragon Mural",
    category: "Commercial Interior Wall Art",
    space: "restaurants-cafes",
    summary:
      "A monumental hand-painted dragon for an Asian restaurant — gold and green scales coiling across a fiery red wall, giving the dining room an unforgettable centrepiece beneath glowing lanterns.",
    cover: images.dragonFront,
    gallery: [images.dragonFront, images.dragonAngle, images.dragonRestaurant],
    featured: true,
    placeholder: true,
  },
  {
    // Real company photographs. OWNER APPROVAL: confirm title, space, location and summary.
    slug: "nine-arch-bridge-mural",
    title: "Nine Arch Bridge Mural",
    category: "Decorative Wall Painting",
    space: "residential",
    summary:
      "Sri Lanka's beloved Nine Arch Bridge, hand-painted as a bedroom centrepiece — a blue train curving out of the hills through layers of misty forest and tea, under a soft blush sky.",
    cover: images.nineArchBridge,
    gallery: [images.nineArchBridge, images.nineArchBridgeDetail],
    featured: true,
    placeholder: true,
  },
  {
    // Real company photograph. OWNER APPROVAL: confirm title, space, location and summary.
    slug: "tropical-lagoon-bedroom",
    title: "Tropical Lagoon Bedroom",
    category: "Feature Wall Design",
    space: "residential",
    summary:
      "A framed tropical scene above the bed — palms, herons and flamingos gathered at a lagoon beneath a warm peach sunset, set within classic white panelling and brass lights.",
    cover: images.tropicalLagoon,
    gallery: [images.tropicalLagoon],
    featured: false,
    placeholder: true,
  },
  {
    // Real company photograph. OWNER APPROVAL: confirm title, space, location and summary.
    slug: "misty-forest-bedroom",
    title: "Misty Forest Bedroom",
    category: "Decorative Wall Painting",
    space: "residential",
    summary:
      "A calm, immersive forest that wraps around the corner of a bedroom — tall trees and hazy hills painted in muted greens to make a compact room feel open and serene.",
    cover: images.mistyForest,
    gallery: [images.mistyForest],
    featured: false,
    placeholder: true,
  },
  {
    // Real company photograph. OWNER APPROVAL: confirm title, space, location and summary.
    slug: "chinoiserie-blossom-mural",
    title: "Chinoiserie Blossom Mural",
    category: "Custom Wall Art",
    space: "commercial",
    summary:
      "Delicate chinoiserie in blush pink — blossoming branches, peonies and songbirds hand-painted within a moulded frame, bringing softness and elegance to a client lounge.",
    cover: images.chinoiserieBlossom,
    gallery: [images.chinoiserieBlossom],
    featured: false,
    placeholder: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

/**
 * Homepage hero slideshow (auto-advances). Chosen for wide composition, art-led framing
 * (no people) and tones that sit well with the brand palette. Order = display order.
 */
export const heroSlides = (["nine-arch-bridge-mural", "tropical-lagoon-bedroom", "chinoiserie-blossom-mural"] as const)
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p))
  .map((p) => ({ slug: p.slug, title: p.title, image: p.cover }));

/** Project highlighted in the homepage credibility section. */
export const spotlightProject = projects.find((p) => p.slug === "botanical-landscape-murals");

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getSpace = (slug: string | undefined) => spaces.find((s) => s.slug === slug);

/**
 * Authentic before/after photo pair for the signature comparison slider.
 * Leave as `null` until the company supplies a genuine pair of the SAME wall —
 * the homepage shows the craftsmanship feature instead.
 */
export const transformation: {
  title: string;
  before: ImageAsset;
  after: ImageAsset;
} | null = null;
