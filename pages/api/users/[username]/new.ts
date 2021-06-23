import type {NextApiRequest, NextApiResponse} from "next";

const createPost = async (token: string, author: string, title: string, content: string, time?: string, banner?: string) => {
    let body = {
        records: [
            {
                fields: {
                    author,
                    title,
                    content,
                }
            }
        ]
    };

    time ? body["records"][0]["fields"]["time"] = time : body["records"][0]["fields"]["time"] = Date.now();
    if (banner)
        body["records"][0]["fields"]["banner"] = [
            {
                url: banner
            }
        ];

    return await fetch("https://api.airtable.com/v0/appRNmsIgblo0s4df/main/", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((res) => res.json());
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    let {author, title, content} = req.body;
    let status = await createPost(req.headers.authorization, author, title, content, req.body.time, req.body.banner);
    if (status.error?.type === "AUTHENTICATION_REQUIRED") return res.status(401).json({
        "message": "Not authorized!"
    });
    res.status(200).json({
        "message": "Done!"
    });
};
