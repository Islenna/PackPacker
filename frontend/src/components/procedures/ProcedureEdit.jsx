import React, { useState } from "react";
import Packs from "../packs/Packs";
import Instruments from "../instruments/Instruments";


function ProcedureEdit() {
    const [selectedPacks, setSelectedPacks] = useState([]);
    const [selectedInstruments, setSelectedInstruments] = useState([]);

    return (
        <>
            <h1>Edit Procedure</h1>
            <div className="columns">
                <div className="column">
                    <Packs
                        selectedPacks={selectedPacks}
                        onSelectPack={(pack) => {
                            // Handle pack selection
                            setSelectedPacks([...selectedPacks, pack]);
                        }}
                    />
                </div>
                <div className="column">
                    <Instruments
                        selectedInstruments={selectedInstruments}
                        onSelectInstrument={(instrument) => {
                            // Handle instrument selection
                            setSelectedInstruments([...selectedInstruments, instrument]);
                        }}
                    />
                </div>
            </div>
        </>
    );
}
export default ProcedureEdit;