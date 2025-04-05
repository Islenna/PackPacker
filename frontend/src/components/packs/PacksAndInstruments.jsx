import React, { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance';
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
                const response = await axios.get(`http://localhost:8000/api/pack/${id}`)
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
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <h1>{pack.name}</h1>
            </section>
            <InstrumentTable
                instruments={instruments}
                parentId={id}
                type="pack"
                onRefresh={() => setRefreshKey(!refreshKey)} />
        </>
    )
}

export default PacksAndInstruments