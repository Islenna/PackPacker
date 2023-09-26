import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProcedureForm from '../procedures/ProcedureForm';

function Procedures() {
    const [procedures, setProcedures] = useState([]);
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

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
                    <Link to={`/procedures/${procedure.id}`}>
                        <button>{procedure.name}</button>
                    </Link>
                </div>
            ))}

            <div onClick={toggleModal} className="flex justify-center m-5">
                <button id="defaultModalButton" data-modal-toggle="defaultModal" className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">
                    New Procedure
                </button>
            </div>

            {modal && (
                <ProcedureForm onClose={toggleModal} />
            )}


        </>
    );
}

export default Procedures;
