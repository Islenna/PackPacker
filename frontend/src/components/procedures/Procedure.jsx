import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import InstrumentTable from '../instruments/InstrumentComponents/InstrumentTable';
import PackTable from '../packs/PackComponents/PackTable';

function Procedure() {
    const { id } = useParams();
    const [procedure, setProcedure] = useState({});
    const [refreshKey, setRefreshKey] = useState(false);
    const [showPacks, setShowPacks] = useState(true);

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
    }, [id, refreshKey]);

    const toggleTable = () => {
        setShowPacks(!showPacks);
    };

    return (
        <>
            <h1>{procedure.name}:</h1>
            <p>Description: {procedure.description}</p>
            <button onClick={toggleTable}>Toggle Table</button>
            {showPacks ? (
                <PackTable 
                packs={procedure.packs} 
                parentId={id}
                type="pack"
                onRefresh={() => {setRefreshKey(!refreshKey)}}
                />
            ) : (
                <InstrumentTable
                    instruments={procedure.instruments}
                    parentId={id}
                    type="procedure"
                    onRefresh={() => setRefreshKey(!refreshKey)}
                />
            )}
        </>
    );
}

export default Procedure;
