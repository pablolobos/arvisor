import { Suspense } from "react";
import { AllPosts } from "@/app/components/Posts";
import { AllProjects } from "@/app/components/Projects";
import ExpertCard from "@/app/components/ExpertCard";
import { allProjectsQuery, settingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });
  const { data: settings } = await sanityFetch({ query: settingsQuery });

  return (
    <>
      {/* Expert Card Section */}
      <div className="border-gray-10 border-t">
        <div className="container">
          <div className="py-12 sm:py-20">
            {settings?.expertName && (
              <ExpertCard
                name={settings.expertName}
                role={settings.expertRole}
                image={settings.expertImage}
                instagramUrl={settings.expertInstagram}
              />
            )}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="border-gray-10 border-t">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>
              <AllProjects projects={projects} />
            </Suspense>
          </aside>
        </div>
      </div>

      {/* Posts Section */}
      <div className="border-gray-10 border-t">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>
              <AllPosts />
            </Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
