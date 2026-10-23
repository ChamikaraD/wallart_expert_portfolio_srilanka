/**
 * Image registry — the single place where image sources live.
 *
 * Every entry below is a TEMPORARY DEVELOPMENT PLACEHOLDER (stock photography from
 * Unsplash) and is flagged `placeholder: true`. These images are NOT Wall Art Expert
 * projects. Placeholders are labelled on the page so they are never mistaken for
 * company work.
 *
 * To replace one: add the company's photograph to /public/images/..., set `src` to
 * its local path (e.g. "/images/projects/colombo-residence.webp"), update `alt`,
 * `width`/`height`, and set `placeholder: false`.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder: boolean;
};

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=2400`;

function placeholder(id: string, alt: string, width = 2400, height = 1600): ImageAsset {
  return { src: unsplash(id), alt, width, height, placeholder: true };
}

/** A genuine Wall Art Expert photograph stored in /public/images. */
function photo(src: string, alt: string, width = 1280, height = 960): ImageAsset {
  return { src, alt, width, height, placeholder: false };
}

export const images = {
  intro: photo(
    "/images/artist-portrait-mural.jpg",
    "A Wall Art Expert artist at work on a large textured mural of a woman in a teal hat with vivid pink poppies",
    1500,
    1500,
  ),

  // Projects — company photographs
  hillCountryMural: {
    src: "/images/1.jpeg",
    alt: "Hand-painted mural of Sri Lankan hill country life — tea estates, villages, rivers and a family sharing a meal — framed by two curved columns",
    width: 1280,
    height: 960,
    placeholder: false,
  },
  hillCountryMuralDetail: {
    src: "/images/hill-country-mural-detail.jpg",
    alt: "Front view of the hill country mural showing tea pluckers on green slopes, a stone bridge over a river, calla lilies and a family taking tea on a verandah",
    width: 1280,
    height: 960,
    placeholder: false,
  },

  botanicalTree: photo(
    "/images/botanical-mural-tree.jpg",
    "Hand-painted botanical mural of a great tree, cypresses and distant mountains in soft greens, framed by ivory drapes beneath a brass chandelier",
  ),
  botanicalArches: photo(
    "/images/botanical-mural-arched-panels.jpg",
    "Arched wall panels hand-painted with trees and exotic birds in muted greens, either side of a gold-framed arched mirror",
  ),
  botanicalCorner: photo(
    "/images/botanical-mural-corner.jpg",
    "Panoramic hand-painted landscape wrapping a room corner — tall trees, rolling hills and a hazy golden sky",
  ),

  sepiaPanel1: photo(
    "/images/sepia-arch-panel-1.jpg",
    "Arched wall niche hand-painted with delicate sepia-toned tree canopies and grasses, set in classical white panelling",
    960,
    1280,
  ),
  sepiaPanel2: photo(
    "/images/sepia-arch-panel-2.jpg",
    "Sepia hand-painted arch panel of a slender tree with a small bird on a branch, beside a brass wall sconce",
    960,
    1280,
  ),
  sepiaPanel3: photo(
    "/images/sepia-arch-panel-3.jpg",
    "Hand-painted sepia tree panel with a perched bird inside an arched niche, reflected in a neighbouring arched mirror",
    960,
    1280,
  ),

  reliefBlush1: photo(
    "/images/floral-relief-blush-1.jpg",
    "Sculpted floral relief panel with pearlescent blush-pink blooms and gilded stems rising from flowing ivory folds",
    960,
    1280,
  ),
  reliefBlush2: photo(
    "/images/floral-relief-blush-2.jpg",
    "Full-height view of the blush floral relief panel, lit from above to highlight its glossy sculpted petals",
    960,
    1280,
  ),
  reliefWhite: photo(
    "/images/floral-relief-white.jpg",
    "All-white sculpted relief of oversized flowers emerging from swirling folds, spot-lit on a warm beige wall",
    960,
    1280,
  ),

  nineArchBridge: photo(
    "/images/nine-arch-bridge-mural.jpg",
    "Hand-painted mural of Sri Lanka's Nine Arch Bridge with a blue train emerging from a tunnel through misty hill-country forest, framed in white panelling behind a bed",
  ),
  nineArchBridgeDetail: photo(
    "/images/nine-arch-bridge-mural-detail.jpg",
    "Close view of the Nine Arch Bridge mural in soft daylight, showing layered trees, tea bushes and a pink, cloudy sky",
  ),
  tropicalLagoon: photo(
    "/images/tropical-lagoon-bedroom-mural.jpg",
    "Bedroom feature wall with a hand-painted tropical lagoon scene — palms, herons and flamingos under a peach sunset sky — between brass wall lights",
  ),
  mistyForest: photo(
    "/images/misty-forest-bedroom-mural.jpg",
    "Hand-painted misty forest mural wrapping the corner of a bedroom, with tall trees and soft hills in muted greens",
  ),
  chinoiserieBlossom: photo(
    "/images/chinoiserie-blossom-mural.jpg",
    "Chinoiserie-style mural of blossoming branches, peonies and songbirds on a blush-pink ground, framed above a marble counter",
  ),

  dragonFront: photo(
    "/images/dragon-mural-front.jpg",
    "Hand-painted golden-green Chinese dragon coiling across a vivid red wall, flanked by red paper lanterns above restaurant booths",
  ),
  dragonAngle: photo(
    "/images/dragon-mural-angle.jpg",
    "Angled view of the dragon mural showing fine scale detail, flowing whiskers and fiery cloud textures on a red ground",
  ),
  dragonRestaurant: photo(
    "/images/dragon-mural-restaurant.jpg",
    "Restaurant dining room with red lanterns and burgundy seating, the dragon mural forming the centrepiece of the far wall",
  ),


  // Spaces
  spaceHospitality: placeholder(
    "1595526114035-0d45ed16cfbf",
    "Serene bedroom suite with soft linen and neutral walls",
  ),
  spaceOffices: placeholder(
    "1441986300917-64674bd600d8",
    "Boutique retail interior with display shelving and pendant lights",
  ),

  // Services
  serviceCustomArt: placeholder(
    "1541961017774-22349e4a1262",
    "Close-up of expressive, textured brushwork in vivid colour",
  ),
  serviceWallPainting: placeholder(
    "1460661419201-fd4cecdf8a8b",
    "Well-used paint brushes with layered pigment on the bristles",
  ),
  serviceFeatureWall: placeholder(
    "1618219908412-a29a1bb7b86e",
    "Feature wall with a round mirror and natural cane furniture",
  ),
  serviceCommercial: placeholder(
    "1497366811353-6870744d04b2",
    "Contemporary office floor with long sightlines and expansive walls",
  ),

  // Craftsmanship
  craftWide: placeholder(
    "1513364776144-60967b0f800f",
    "A paint brush loaded with warm orange pigment sweeping across a surface",
  ),
  craftDetail: placeholder(
    "1579783902614-a3fb3927b6a5",
    "Detail of a richly painted floral artwork with deep, layered colour",
  ),
  craftLandscape: placeholder(
    "1578301978693-85fa9c0320b9",
    "Detail of a classical landscape painting with fine, layered brushwork",
  ),
} satisfies Record<string, ImageAsset>;
