import {useRouter} from "next/router";

const Blog = ({post}) => {
    const router = useRouter();
    const {id} = router.query;

    return (<>{post.fields.title}{post.fields.content}</>);
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