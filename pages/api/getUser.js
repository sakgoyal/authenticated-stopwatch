import fs from 'fs';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required.' });
  }

  let jsonFile;
  try {
    const data = fs.readFileSync('./pages/api/db_test.json', 'utf8');
    jsonFile = await JSON.parse(data);

    if (!jsonFile[username]) { // if user doesn't exist, error
      return res.status(200).json({ error: 'User does not exist' });
    }
  }
  catch (err) {
    console.log(err);
  }

  return res.status(200).json({ success: jsonFile[username] });
};