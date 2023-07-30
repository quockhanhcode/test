import React, { useEffect, useState } from "react";
import axios from "axios";

const callApi = () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/albums")
    .then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const Api = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    callApi().then((url) => {
      console.log(url);
      setData(url);
    });
  }, []);

  return (
    <div>
      <h1> Get Api</h1>
      {data.map((item, index) => (
        <box key={item.id}>
            <h4>{item.title}</h4>
        </box>
      ))}
    </div>
  );
};

export default Api;
