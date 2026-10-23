/**
 * Customer reviews.
 *
 * Only add genuine reviews that the company is happy to publish — copy them exactly from
 * the Google Business listing (or another verified source) with the reviewer's name as shown
 * there. Never edit a review's meaning or invent one. Remove any a customer asks to remove.
 */

export type Testimonial = {
  name: string;
  /** 1–5 stars, as given by the reviewer. */
  rating: number;
  text: string;
  /** Optional context, e.g. "Hotel lobby mural" or "March 2026". */
  meta?: string;
  source: "Google";
};

/** Overall Google rating — update when the listing changes. Verified 20 Oct 2026. */
export const googleReviews = {
  rating: 4.9,
  count: 30,
  url: "https://share.google/jSkyUX2cUbPVSRnay",
};

// Supplied by Wall Art Expert from their Google Business listing, 20 Oct 2026.
// Text is kept exactly as the reviewers wrote it.
export const testimonials: Testimonial[] = [
  {
    name: "Chris Klotz",
    rating: 5,
    meta: "Living room floral mural",
    text: "Absolute magic. I wanted a custom floral mural for my living room but wasn't entirely sure how to execute it. The design team was so patient, presenting beautiful concepts and tweaking the colors until they perfectly matched my decor. The execution was flawless.the attention to detail and craftsmanship are unmatched. It feels like we have a living gallery piece in our home. Truly a talented group of artists and a seamless experience from start to finish.",
    source: "Google",
  },
  {
    name: "Niruka Rajapaksha",
    rating: 5,
    meta: "Mural",
    text: "Exceptional work from start to finish! The team’s creativity, professionalism, and attention to detail are truly impressive. They listened carefully to our ideas, transformed them into a stunning mural, and delivered results beyond our expectations. The quality, craftsmanship, and dedication shown throughout the project were outstanding. Highly recommended for anyone looking for unique and beautiful wall art. 💯",
    source: "Google",
  },
  {
    name: "seniru Jayamal",
    rating: 5,
    text: "I’m really impressed with their wall art service. The design and finishing were perfect, and they completed the work on time. Great experience overall.",
    source: "Google",
  },
  {
    name: "Evon Sherida",
    rating: 5,
    meta: "Office walls",
    text: "They transformed our office walls into inspiring pieces of art. Great communication and talented artists.",
    source: "Google",
  },
  {
    name: "UPEKSHA Dilrangi",
    rating: 5,
    text: "Beautiful designs, flawless execution, and excellent customer service. Highly recommended!",
    source: "Google",
  },
];
