import { faShrimp } from "@fortawesome/pro-regular-svg-icons";
import { useBreadcrumbConfiguration } from "components/Breadcrumbs";
import { PageTitle } from "components/PageTitle";
import { NextSeo } from "next-seo";

export default function NotFound() {
    useBreadcrumbConfiguration({
        items: [
            {
                icon: faShrimp,
                title: "???",
                href: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
            }
        ],
        trailing: true,
    });

    return <div>
        <NextSeo title="404" />
        <PageTitle bgClip={true} className="bg-gradient-to-br from-red-400 to-red-800 dark:from-red-300 dark:to-red-600">
            404
        </PageTitle>
        <main className="md:mt-4 prose">
            <p>We couldn't find that page. Sorry!</p>
        </main>
    </div>;
}