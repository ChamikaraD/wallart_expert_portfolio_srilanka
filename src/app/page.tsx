import { projects, spotlightProject, transformation } from "@/content/projects";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ExploreBySpace } from "@/components/sections/ExploreBySpace";
import { Services } from "@/components/sections/Services";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { ProjectSpotlight } from "@/components/sections/ProjectSpotlight";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedProjects />
      <ExploreBySpace />
      <Services />
      {transformation ? <BeforeAfter {...transformation} /> : <Craftsmanship />}
      <Process />
      <Testimonials />
      <ProjectSpotlight project={spotlightProject ?? projects[0]} />
      <FinalCta />
    </>
  );
}
