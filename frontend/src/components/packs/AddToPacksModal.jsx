import React, { useState } from 'react';

// InstrumentTable component (for displaying instruments)
function InstrumentTable({ instruments }) {
    // ... code for displaying instruments
}

// AddToPackModal component
function AddToPackModal({ isOpen, onClose, instruments, packId }) {
    const [selectedInstruments, setSelectedInstruments] = useState([]);

    const handleInstrumentSelection = (instrumentId) => {
        // Toggle the selection status of the instrument
        setSelectedInstruments((prevSelected) => {
            if (prevSelected.includes(instrumentId)) {
                return prevSelected.filter((id) => id !== instrumentId);
            } else {
                return [...prevSelected, instrumentId];
            }
        });
    };

    const handleSubmit = async () => {
        try {
            // Make a request to the server to add selectedInstruments to the pack with packId
            // You can use Axios or the fetch API for this
            const response = await fetch(`/api/addToPack/${packId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ instruments: selectedInstruments }),
            });

            if (response.ok) {
                // Provide feedback to the user (e.g., a success message)
                console.log('Instruments added to pack successfully');
                // Close the modal
                onClose();
            } else {
                // Handle errors or show error messages
                console.error('Failed to add instruments to pack');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-content">
                <h2>Add Instruments to Pack</h2>
                {/* Render the form with instrument options */}
                <form>
                    {/* Example: Checkboxes for instrument selection */}
                    {instruments.map((instrument) => (
                        <label key={instrument.id}>
                            <input
                                type="checkbox"
                                value={instrument.id}
                                checked={selectedInstruments.includes(instrument.id)}
                                onChange={() => handleInstrumentSelection(instrument.id)}
                            />
                            {instrument.name}
                        </label>
                    ))}
                    <button type="button" onClick={handleSubmit}>
                        Add to Pack
                    </button>
                </form>
                <button type="button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default AddToPackModal;
