import { Suspense } from "react";
import { AllProjects } from "@/app/components/Projects";
import Hero from "@/app/components/Hero";
import { allProjectsQuery, settingsQuery, homeQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { FeaturedProject } from '@/app/components/FeaturedProject'
import { notFound } from 'next/navigation'

export default async function Page() {
  try {
    const [projectsResponse, settingsResponse, { data: home }] = await Promise.all([
      sanityFetch({ query: allProjectsQuery }),
      sanityFetch({ query: settingsQuery }),
      sanityFetch({ query: homeQuery }),
    ]);

    const { data: projects } = projectsResponse;
    const { data: settings } = settingsResponse;

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
  } catch (error) {
    console.error('Failed to fetch data:', error)
    notFound()
  }
}
