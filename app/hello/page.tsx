import Link from "next/link";

export default function Hello() {
    return <div className="prose">
        <p>Hello!</p>
        <p><Link href="/delay">Load delay page</Link></p>
    </div>;
}