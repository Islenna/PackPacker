import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import InstrumentTable from '../instruments/InstrumentComponents/InstrumentTable';
import PackTable from '../packs/PackComponents/PackTable';

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

    return (
        <>
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <h1>{procedure.name}:</h1>
            <p>Description: {procedure.description}</p>
            <button onClick={toggleTable} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Toggle Table
                </span>
            </button>
            </section>
            {showPacks ? (
                <PackTable
                    packs={equipment.packs}
                    parentId={id}
                    type="pack"
                    onRefresh={() => { setRefreshKey(!refreshKey) }}
                />
            ) : (
                <InstrumentTable
                    instruments={equipment.instruments}
                    parentId={id}
                    type="procedure"
                    onRefresh={() => setRefreshKey(!refreshKey)}
                />
            )}
        </>
    );
}

export default Procedure;
