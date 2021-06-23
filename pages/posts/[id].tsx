/** @jsxImportSource theme-ui */
import {useRouter} from "next/router";
import {Box, Container, Heading, Text} from "theme-ui";
import Navbar from "../../components/Navbar";
import * as React from "react";
import ReactMarkdown from "markdown-to-jsx";

const Blog = ({post}) => {
    const router = useRouter();

    const fix = (text: string): string => {
        text = text.replace(/\*/g, "**");
        text = text.replace(/~/g, "~~");
        return text;
    };

    let content = fix(post.fields.content);

    return (<>
        <Box as="header" sx={{bg: "sheet", color: "text"}}>
            <Navbar/>
            <Container sx={{pt: 3, pb: [3, 4], textAlign: "center"}}>
                <Heading as={"h1"} variant={"title"} color={"primary"}>
                    {post.fields.title}
                </Heading>
            </Container>
        </Box>
        <Box as={"content"} sx={{"color": "smoke", alignItems: "center"}}>
            <Container sx={{
                pt: 3,
                textAlign: "left"
            }}>
                <Text variant={"lead"}>
                    <ReactMarkdown>
                        {content.split("\n").join("<br />")}
                    </ReactMarkdown>
                </Text>
            </Container>
        </Box>
    </>);
};

export async function getServerSideProps({params}) {
    let id = params.id;
    let data = await fetch(`http://localhost:3000/api/posts/${id}`).then(r => r.json());
    return {
        props: {
            post: data
        }
    };
}

export default Blog;