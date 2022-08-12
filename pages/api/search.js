const axios = require("axios");

const handler = (req, res) => {
  if (req.method === "POST") {
    const options = {
      method: "GET",
      url: "https://spott.p.rapidapi.com/places/autocomplete",
      params: {
        limit: "10",
        skip: "0",
        q: req.body.destination.trim(),
        type: "CITY",
      },
      headers: {
        "X-RapidAPI-Key": "48adfcd6a9mshddc34e84af86666p180b89jsne892cd059aab",
        "X-RapidAPI-Host": "spott.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        res.status(200).json({ searchResults: response.data });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
};

export default handler;
