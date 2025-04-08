import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import InstrumentTable from '../instruments/InstrumentComponents/InstrumentTable';
import PackTable from '../packs/PackComponents/PackTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat } from '@fortawesome/free-solid-svg-icons' // or another icon


function Procedure() {
    const { id } = useParams();
    const [procedure, setProcedure] = useState({});
    const [refreshKey, setRefreshKey] = useState(false);
    const [showPacks, setShowPacks] = useState(true);
    const [equipment, setEquipment] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/procedures/${id}/get-equipment`);
                setProcedure(res.data.procedure);
                setEquipment(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, refreshKey]);


    const toggleTable = () => {
        setShowPacks(!showPacks);
    };


    const toggleButton = (
        <button
            onClick={toggleTable}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gray-700 text-white hover:bg-gray-600 transition"
        >
            <FontAwesomeIcon icon={faRepeat} />
            {showPacks ? "View Instruments" : "View Packs"}
        </button>
    );

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1 className="text-center">{procedure.name}:</h1>
                <p className="text-center">Description: {procedure.description}</p>
            </section>
            {showPacks ? (
                <PackTable
                    packs={equipment.packs}
                    parentId={id}
                    type="pack"
                    onRefresh={() => { setRefreshKey(!refreshKey) }}
                    toggleTable={toggleTable}
                />

            ) : (
                <InstrumentTable
                    instruments={equipment.instruments}
                    parentId={id}
                    type="procedure"
                    onRefresh={() => setRefreshKey(!refreshKey)}
                    toggleTable={toggleTable}
                />
            )}
        </>
    );
}

export default Procedure;
