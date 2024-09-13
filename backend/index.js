const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Don't forget to require axios

const app = express();
app.use(express.json());
app.use(cors({origin: true}));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "56dd1b2c-8807-43fd-a943-719c08b03167" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    // Default to a 500 Internal Server Error if e.response is undefined
    const statusCode = e.response ? e.response.status : 500;
    const errorMessage = e.response ? e.response.data : { error: 'Internal Server Error' };
    return res.status(statusCode).json(errorMessage);
  }
});

app.listen(3001);