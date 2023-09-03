
import userDataJson from "./user.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	const { username, data } = req.body;

	if (!username) {
		return res.status(400).json({ error: 'Username is required.' });
	}
	// if (!data) {
	// 	return res.status(400).json({ error: 'Data is required.' });
	// }

	userDataJson[username] = {"start" : "x"};
	return res.status(200).json({ success: `User created/updated with data ${userDataJson[username]}` });
};
