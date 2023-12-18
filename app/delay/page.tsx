import { headers } from "next/headers";

export default async function Delay() {
    headers();
    await new Promise(resolve => setTimeout(resolve, 5000));

    return <div className="prose">
        <p>Page!</p>
    </div>;
}