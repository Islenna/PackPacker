import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Packs() {
    const [packs, setPacks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/packs')
                setPacks(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <h1>Packs:</h1>
            {packs.map((pack) => (
                <div key={pack.id}>
                    <h2>{pack.name}</h2>
                </div>
            ))}
        </>

    )
}

export default Packs