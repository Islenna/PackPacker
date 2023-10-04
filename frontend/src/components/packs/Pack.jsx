import React, { useState, useEffect }from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

function Pack() {
    const { id } = useParams();
    const [pack, setPack] = useState({})
    useEffect (() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/pack/${id}`);
                setPack(res.data.pack);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
        <h1>{pack.name}</h1>
        <ul>
                {pack.instruments && pack.instruments.map((instrument) => (
                    <li key={instrument.name}>{instrument.name}</li>
                ))}
            </ul>
        </>
    )
};

export default Pack