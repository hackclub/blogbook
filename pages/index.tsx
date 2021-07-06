import {Container, Box, Heading, Text, Grid} from "theme-ui";
import Head from "next/head";
import Meta from "@hackclub/meta";

import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

import useSWR from "swr";
import * as React from "react";

function Index({posts}) {

    const {data, error} = useSWR("http://localhost:3000/api/users", fetcher, {initialData: posts});

    if (error) return "error occured";
    if (!data) return "loading";

    // @ts-ignore
    return (
        <>
            <Head>
                <title>Blogbook - Hack Club</title>
                <Meta name={"Blogbook"} description={"Fast. Simple. Publish your blogs with ease"}/>
            </Head>

            <Box as="header" sx={{ bg: "sheet", color: "text"}}>
                <Navbar/>
                <Container sx={{pt: 3, pb: [3, 4], textAlign: "center"}}>
                    <Heading as={"h1"} variant={"title"} color={"primary"}>
                        Blogbook
                    </Heading>
                    <Heading as={"h2"} variant={"subtitle"} mt={3} color={"text"}>
                        Fast. Simple. Publish blogs with ease.
                    </Heading>
                </Container>
            </Box>
            {/*// @ts-ignore*/}
            <Box as={"blogs"} sx={{bg: "sheet", alignItems: "center"}}>
                <Container variant={"container"} sx={{
                    m: "none",
                    mb: 3,
                    "@media screen and (min-width: 48em)": {
                        maxWidth: "1400px"
                    },
                }}>
                    <Grid columns={["1fr", "1fr", "1fr", "1fr 1fr"]} gap={2} sx={{
                        justifyItems: "center"
                    }}>
                        {data.map(post => (
                            <BlogCard id={post.id} key={post.id} title={post.title}/>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

const fetcher = async (url) => await fetch(url).then(r => r.json());

export async function getServerSideProps() {
    const posts = await fetcher("http://localhost:3000/api/users");
    return {
        props: {
            posts
        }
    };
}

export default Index;