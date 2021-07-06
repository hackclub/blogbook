import type {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const {id} = req.query;

    let data = await fetch(`https://api.airtable.com/v0/appRNmsIgblo0s4df/main/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.AIRTABLE_TOKEN}`
        }
    }).then(r => r.json());
    return res.status(200).json(data);
};