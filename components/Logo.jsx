export const defaultText = `+++[>++[>++
[>++[>++[>+
+[>+<-]<-]<
-]<-]<-]<-]
>>>>>>+[.]`.split("\n");

const textHeight = 400;

export default function Logo({className, style, angle, primary, primaryOpacity, accent, text, textColor, aColor, a, size, circle}) {
    let compiledStyle = style || {};
    compiledStyle.overflow = "hidden";

    if (size) {
        let value = `${size}px`;
        compiledStyle.width = value;
        compiledStyle.height = value;
    }

    if (circle) {
        compiledStyle.borderRadius = "50%";
    }

    return <svg
        viewBox="0 0 2048 2048"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={className}
        style={compiledStyle}
    >
        <defs>
            <linearGradient id="background" gradientTransform={`rotate(${angle || -30})`}>
                <stop offset="0%" stopColor={primary || `rgba(6, 95, 201, ${primaryOpacity || 1.0})`} />
                <stop offset="100%" stopColor={accent || "rgba(29, 182, 115, 1.0)"} />
            </linearGradient>
        </defs>
        <rect width="2048" height="2048" fill="url(#background)" />
        <g style={{mixBlendMode: "soft-light"}}>
            <text style={{font: "400px 'Fira Code', monospace", fill: textColor || "rgba(255, 255, 255, 0.5)", fontVariantLigatures: "none"}} textAnchor="middle">
                {(text || defaultText).map((line, index) => <tspan key={index} x="1024" y={(index + 0.9) * textHeight}>{line}</tspan>)}
            </text>
            <text textAnchor="middle" x="1024" y="1500" style={{font: "bold 2000px europa, sans-serif", fill: aColor || "white"}}>{a || "a"}</text>
        </g>
    </svg>;
}