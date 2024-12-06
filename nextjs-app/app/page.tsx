import { Suspense } from "react";
import { AllPosts } from "@/app/components/Posts";
import { AllProjects } from "@/app/components/Projects";
import Hero from "@/app/components/Hero";
import { allProjectsQuery, settingsQuery, homeQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });
  const { data: settings } = await sanityFetch({ query: settingsQuery });
  const { data: home } = await sanityFetch({ query: homeQuery });

  return (
    <>
      {/* Hero Section */}
      <Hero home={home} />

      {/* Projects Section */}
      <div className="border-gray-10 border-t">
        <div className="container">
          <aside className="py-0">
            <Suspense>
              <AllProjects projects={projects} />
            </Suspense>
          </aside>
        </div>
      </div>
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
