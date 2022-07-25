import { PageTitle } from "components/PageTitle";
import { NextSeo } from "next-seo";
import Link from "next/link";

export default function NotFound() {
    return <div>
        <NextSeo title="404" />
        <PageTitle bgClip={true} className="bg-gradient-to-br from-red-400 to-red-800 dark:from-red-300 dark:to-red-600">
            404
        </PageTitle>
        <main className="md:mt-4 prose">
            <p>We couldn't find that page. <Link href="/"><a>Go back to the homepage?</a></Link></p>
        </main>
    </div>;
}