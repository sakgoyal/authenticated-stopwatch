import fs from 'fs';
const UniqueSet = require('@sepiariver/unique-set');

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
	if (logstart > logend) {
		return res.status(400).json({ error: 'Logstart must be before logend.' });
	}
	if (logstart < 0) {
		return res.status(400).json({ error: 'Logstart must be greater than 0.' });
	}
	if (logend < 0) {
		return res.status(400).json({ error: 'Logend must be greater than 0.' });
	}
	if (logstart == logend) {
		return res.status(400).json({ error: 'Logstart and logend cannot be the same.' });
	}

	

	let jsonFile;
	try {
        const data = fs.readFileSync('./pages/api/db_test.json', 'utf8');
		jsonFile = await JSON.parse(data);
		
		if (!jsonFile[username]) { // if user doesn't exist, create it
			jsonFile[username] = {
				"username": username,
				"events": [],
			};
		}
		
		if (logstart !== undefined && logend !== undefined) { // if logstart and logend are defined, add them to the user's events
			jsonFile[username].events.push({ "start": logstart, "end": logend, });
			
			let unique = new UniqueSet(); 
			for (var event of jsonFile[username].events) { // remove duplicates by converting to UniqueSet (deep equality) and back to array
				unique.add(event);
			}
			jsonFile[username].events = [...unique.values()];
		}
		fs.writeFileSync('./pages/api/db_test.json', JSON.stringify(jsonFile, null, 2)); // write to file
    }
    catch(err){
        console.log(err);
    }
	
	return res.status(200).json({ success: jsonFile[username] });
};