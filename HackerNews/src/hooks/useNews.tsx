import {useState} from 'react';
import News from '../api/News';

export default () => {
    const [results, setResults] = useState([]);

    const getResults = async (key) => {

        const request = async (searchTerm) => {
            const response = await News.get(`/search?query=${searchTerm}`);
            console.log(response.data.hits)
            return response.data.hits;
        }
        
        request(key)
        .then((data) => {
            setResults(data);
        });
    };

    return [results, getResults];
};