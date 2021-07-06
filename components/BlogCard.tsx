/** @jsxImportSource theme-ui */
import {Card, Heading, Text} from "theme-ui";
import {useRouter} from "next/router";

const BlogCard = ({title, id}) => {
    const router = useRouter();
    const goToBlog = () => {
        router.push(`/posts/${id}`);
    };

    return (
        <div>
            {/*//@ts-ignore*/}
            <Card shadow={"elevated"} variant={"primary"} key={"primary"} mt={3} p={[3, 4]} mx={[3, 4]} sx={{
                display: "flex",
                "flexDirection": "column",
                width: ["325px", "600px"],
                cursor: "pointer",
            }} onClick={goToBlog}>
                <Heading as={"h1"} sx={{
                    "white-space": "nowrap",
                    fontSize: [3, 4, 4],
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>
                    {title}
                </Heading>
            </Card>
        </div>
    );
};

export default BlogCard;