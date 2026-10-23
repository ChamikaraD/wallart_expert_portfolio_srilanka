import { images, type ImageAsset } from "./images";

/**
 * Services and process. All entries are PROPOSED content (`approved: false`) and must
 * be confirmed by the owner before launch. Pending items show a discreet
 * "Awaiting approval" note on the page.
 */

export type Service = {
  slug: string;
  title: string;
  description: string;
  image: ImageAsset;
  approved: boolean;
};

export const services: Service[] = [
  {
    slug: "custom-wall-art",
    title: "Custom Wall Art",
    description:
      "Original artwork conceived for a specific wall — its scale, its light and the people who live or work around it.",
    image: images.serviceCustomArt,
    approved: false,
  },
  {
    slug: "decorative-wall-painting",
    title: "Decorative Wall Painting",
    description:
      "Hand-painted finishes, patterns and murals that bring texture, colour and character directly to the surface.",
    image: images.serviceWallPainting,
    approved: false,
  },
  {
    slug: "feature-wall-design",
    title: "Feature Wall Design",
    description:
      "A single, considered focal point that anchors a room and gives the whole interior a sense of intent.",
    image: images.serviceFeatureWall,
    approved: false,
  },
  {
    slug: "commercial-interior-wall-art",
    title: "Commercial Interior Wall Art",
    description:
      "Wall art for hospitality, dining, retail and workplaces that expresses a brand and shapes how a space is experienced.",
    image: images.serviceCommercial,
    approved: false,
  },
];

export type ProcessStep = { title: string; description: string };

/** Proposed stages — OWNER APPROVAL before publishing as the official process. */
export const processApproved = false;

export const processSteps: ProcessStep[] = [
  { title: "Discover", description: "We understand your space, how it is used and the vision you have for it." },
  { title: "Design", description: "We establish the creative direction — concept, palette, scale and placement." },
  { title: "Create", description: "We execute the approved design with care, on site or in the studio." },
  { title: "Complete", description: "We review every detail together and present the finished work." },
];
