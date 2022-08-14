import axios from "axios";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: req.body.searchTerm,
        orientation: "landscape",
        client_id: "m0IPoyOMdUhVImoRDAX6Xat_CgVOTqeWY69L73tNHxk",
      },
    });
    const randomNum = Math.floor(Math.random() * 10);
    res.json(data.data.results[randomNum].urls.raw);
  }
};

export default handler;
