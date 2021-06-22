import type {NextApiRequest, NextApiResponse} from "next";

const getRawPosts = async (max?: number) => {
    return await fetch(`https://api.airtable.com/v0/appRNmsIgblo0s4df/main?${max ? `maxRecords=${max}&` : ""}`, {
        method: "get",
        headers: {
            "Authorization": `Bearer ${process.env.AIRTABLE_TOKEN}`
        }
    }).then(r => r.json());
};

const formatUsers = (users) => {
    if (users.records.length <= 0) return [];
    let formatted = [];
    users.records.forEach(record => {
        let i = {
            id: record.id,
            author: record.fields.author,
            title: record.fields.title,
            content: record.fields.content,
            time: record.fields.time,
        };
        if (record.fields.banner) i["banner"] = record.fields.banner[0].url;
        formatted.push(i);
    });
    return formatted;
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    return res.status(200).json(formatUsers(await getRawPosts()));
};