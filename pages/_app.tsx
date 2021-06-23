/** @jsxImportSource theme-ui */
import * as React from "react";
import type {AppProps} from "next/app";
import Router from "next/router";

import "@hackclub/theme/fonts/reg-bold.css";
import theme from "@hackclub/theme";
import {ThemeProvider} from "theme-ui";
import LoadingBar from "react-top-loading-bar";
import Navbar from "../components/Navbar";


const App = ({Component, pageProps}: AppProps) => {
    let ref = React.useRef(null);

    React.useEffect(() => {
        const start = () => ref.current.continuousStart();
        const end = () => ref.current.complete();
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
                <LoadingBar ref={ref} color={"#ec3750"}/>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};

export default App;