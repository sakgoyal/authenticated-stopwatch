
import userDataJson from "./user.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	const { username, logstart, logend } = req.body;
	console.log("username: " + username + " logstart: " + logstart + " logend: " + logend)
	if (!username) {
		return res.status(400).json({ error: 'Username is required.' });
	}
	// if (!data) {
	// 	return res.status(400).json({ error: 'Data is required.' });
	// }

	if (!userDataJson[username]) {
		userDataJson[username] = {
			"username": username,
			"events": [],
		};
	}

	userDataJson[username]["events"].push({
		"start": logstart,
		"end": logend,
	});
	return res.status(200).json({ success: `User ${username} updated with data ${userDataJson[username]}` });
};
