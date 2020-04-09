import { useState } from "react";
import News from "../api/News";

export default () => {
  const [results, setResults] = useState([]);

  const getResults = async (key) => {
    if (!key) {
      getInitialResults();
      return;
    }
    const request = async (searchTerm) => {
      const response = await News.get(`/search?query=${searchTerm}`);
      return response.data.hits;
    };

    request(key).then((data) => {
      setResults(data);
    });
  };

  const getInitialResults = async () => {
    const request = async () => {
      const response = await News.get(`/search?tags=front_page`);
      return response.data.hits;
    };
    request().then((data) => {
      setResults(data);
    });
  };

  return [results, getResults, getInitialResults];
};
