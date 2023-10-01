import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import InstrumentTable from '../instruments/InstrumentComponents/InstrumentTable'

function PacksAndInstruments() {
    const { id } = useParams()
    const [pack, setPack] = useState([])
    const [instruments, setInstruments] = useState([])
    const [quantity, setQuantity] = useState(1);
    const [selectedInstruments, setSelectedInstruments] = useState([]);

    const addToSelectedInstruments = (instrument) => {
        setSelectedInstruments([...selectedInstruments, instrument]);
    };

    // Function to commit selected instruments to the pack
    const commitSelectedInstruments = () => {
        // Implement the logic to add selected instruments to the pack
    };

    useEffect(() => {
        const getPack = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/pack/${id}`)
                const packData = response.data
                setPack(packData)
                setInstruments(packData.instruments)
                setQuantity(packData.quantity)
            }
            catch (err) {
                console.log(err)
            }
        }
        getPack()
    }
        , [id])

    return (
        <>
            <h1>{pack.name}</h1>

            <InstrumentTable instruments={instruments} />

        </>
    )
}

export default PacksAndInstruments