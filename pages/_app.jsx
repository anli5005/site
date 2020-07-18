import 'scss/main.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../theme';

const GlobalStyle = createGlobalStyle`
:root {
${({theme: {colors: {light, names}}}) => names.map(([key, value]) => {
    return `--${value}: ${light[key]};\n`;
}).join("\n")}}
}

@media (prefers-color-scheme: dark) {
:root {
${({theme: {colors: {dark, names}}}) => names.map(([key, value]) => {
    return `--${value}: ${dark[key]};\n`;
}).join("\n")}}
}
}
`;

export default function App({Component, pageProps}) {
    return <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
    </ThemeProvider>;
}