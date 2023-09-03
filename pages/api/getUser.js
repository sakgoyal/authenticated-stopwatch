
import userDataJson from "./user.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required.' });
    }
    if (!userDataJson[username]) {
        return res.status(200).json({ error: 'User does not exist' });
    }

    res.status(200).json(userDataJson[username]);
};
