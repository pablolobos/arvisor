import { Suspense } from "react";
import Link from "next/link";

import { AllPosts } from "@/app/components/Posts";
import GetStartedCode from "@/app/components/GetStartedCode";
import { AllProjects } from "@/app/components/Projects";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });

  return (
    <>
      <div className="border-gray-10 border-t">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>
              <AllProjects projects={projects} />
            </Suspense>
          </aside>
        </div>
      </div>

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
