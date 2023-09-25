import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Instruments() {
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/instruments');
                setInstruments(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1>Instruments:</h1>
            {instruments.map((instrument) => (
                <div key={instrument.id}>
                    <h2>{instrument.name}</h2>
                </div>
            ))}

        </>
    )
}

export default Instruments