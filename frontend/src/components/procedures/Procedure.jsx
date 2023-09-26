import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Procedure() {
    let { id } = useParams();
    const [procedure, setProcedure] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/procedure/${id}/get-equipment`);
                setProcedure(res.data.procedure);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>{procedure.name}:</h1>
            <p>Description: {procedure.description}</p>

            <h2>Packs:</h2>
            <ul>
                {procedure.packs && procedure.packs.map((pack) => (
                    <li key={pack.id}>{pack.name}</li>
                ))}
            </ul>

            <h2>Instruments:</h2>
            <ul>
                {procedure.instruments && procedure.instruments.map((instrument) => (
                    <li key={instrument.name}>{instrument.name}</li>
                ))}
            </ul>
            <Link to={`/procedures/${procedure.id}/edit`}>
                <button>Update</button>
            </Link>
        </>
    );
}

export default Procedure;
