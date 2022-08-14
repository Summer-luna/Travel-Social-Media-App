import axios from "axios";

const Test = () => {
  const test = async () => {
    const options = {
      method: "GET",
      url: "https://api.weatherbit.io/v2.0/forecast/daily",
      params: {
        lat: "42.3584",
        lon: "-71.0598",
        key: "ddf26ddeab8640718ca5aa4862c03bcc",
        days: "7",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div>
      <button className="bg-primary-color" onClick={test}>
        Test
      </button>
    </div>
  );
};

export default Test;
