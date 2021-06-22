/** @jsxImportSource theme-ui */
import * as React from "react";
import type {AppProps} from "next/app";
import Router from "next/router";

import "@hackclub/theme/fonts/reg-bold.css";
import theme from "@hackclub/theme";
import {ThemeProvider} from "theme-ui";


const App = ({Component, pageProps}: AppProps) => {
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const start = () => setLoading(true);
        const end = () => setLoading(false);
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <>
            {/* @ts-ignore */}
            <ThemeProvider theme={theme}>
                {loading ? (
                    <h1>Loading</h1>
                ) : (<Component {...pageProps} />
                )}
            </ThemeProvider>
        </>
    );
};

export default App;