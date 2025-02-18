import { Suspense } from "react";
import { AllPosts } from "@/app/components/Posts";
import { AllProjects } from "@/app/components/Projects";
import Hero from "@/app/components/Hero";
import { allProjectsQuery, settingsQuery, homeQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { FeaturedProject } from '@/app/components/FeaturedProject'

async function getHomeData() {
  const query = `*[_type == "home"][0]{
    ...,
    featuredProject->{
      name,
      subtitle,
      "slug": slug.current,
      price,
      priceDetail,
      downPayment,
      downPaymentDetail,
      monthlyFee,
      "images": images[]{
        "url": asset->url,
        "alt": asset->altText
      },
      "location": location->{
        address,
      },
      tags,
      discountPercentage
    }
  }`

  return sanityFetch({ query })
}

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });
  const { data: settings } = await sanityFetch({ query: settingsQuery });
  const { data: home } = await getHomeData();

  return (
    <>
      {/* Hero Section */}
      <Hero home={home} />

      {home.featuredProject && (
        <section className="py-12 md:py-0">
          <FeaturedProject project={home.featuredProject} />
        </section>
      )}

      {/* Projects Section */}
      <section>
        <div className="py-0">
          <Suspense>
            <AllProjects projects={projects} />
          </Suspense>
        </div>

      </section>



      {/* Blog Posts Section */}
      {/* <div className="border-gray-10 border-t">
        <div className="container">
          <aside className="py-0">
            <Suspense>
              <AllPosts />
            </Suspense>
          </aside>
        </div>
      </div> */}
    </>
  );
}
