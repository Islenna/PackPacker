import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Procedures() {
    const [procedures, setProcedures] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/procedures');
                setProcedures(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <h1>Procedures:</h1>
            {procedures.map((procedure) => (
                <div key={procedure.id}>
                    <h2>{procedure.name}</h2>
                </div>
            ))}
        </>
    );
}

export default Procedures;
