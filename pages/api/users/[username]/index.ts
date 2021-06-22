import type {NextApiRequest, NextApiResponse} from "next";

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== "GET") {
        return res.status(405).json({
            "message": "Only the `GET` method is valid on the `/api/[username]` route."
        });
    }

    if (!["john", "tejas"].includes(req.query.user as string)) {
        return res.status(404).json({
            "message": "User not found"
        });
    }

    return res.status(200).json({
        "message": `Found the user: ${req.query.username}`,
    });
};