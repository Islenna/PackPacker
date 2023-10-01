import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import InstrumentTable from '../instruments/InstrumentComponents/InstrumentTable'

function PacksAndInstruments() {
    const { id } = useParams()
    const [pack, setPack] = useState([])
    const [instruments, setInstruments] = useState([])
    const [refreshKey, setRefreshKey] = useState(false);


    useEffect(() => {
        const getPack = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/pack/${id}`)
                const packData = response.data
                setPack(packData)
                setInstruments(packData.instruments)
            }
            catch (err) {
                console.log(err)
            }
        }
        getPack()
    }
        , [id, refreshKey])

    return (
        <>
            <h1>{pack.name}</h1>
            <InstrumentTable 
            instruments={instruments} 
            packId={id}
            onRefresh={() => setRefreshKey(!refreshKey)}/>
        </>
    )
}

export default PacksAndInstruments