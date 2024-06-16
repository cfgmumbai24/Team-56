import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewGoatDetails = () => {
    const [goatId, setGoatId] = useState('');
    const [goatDetails, setGoatDetails] = useState(null); // State to hold fetched goat details
    const [classification, setClassification] = useState(null); // State to hold classification result
    const [error, setError] = useState(null); // State to hold error message

    const handleSearch = async (e) => {
        if (e) e.preventDefault(); // Prevent form submission reload

        try {
            const response = await axios.get(`http://localhost:5000/api/mitra/${goatId}`);
            const fetchedGoatDetails = response.data;
            setGoatDetails(fetchedGoatDetails);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError('Failed to fetch goat details. Please try again.'); // Handle error
            console.error('Error fetching goat details:', error);
            setGoatDetails(null); // Clear existing goat details on error
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/goats/classify/${goatId}`);
            if (response.status === 200) {
                const { classification } = response.data;
                setClassification(classification); // Set classification result to state
            }
        } catch (error) {
            console.error('Error classifying goat:', error);
            setError('Failed to classify goat. Please try again.'); // Handle error state
        }
    };

    useEffect(() => {
        if (goatId) {
            handleSearch();
        }
    }, [goatId]);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>View Goat Details</h2>
            <form onSubmit={handleSearch} style={styles.form}>
                <label style={styles.label} htmlFor="goatId">Goat ID:</label>
                <input
                    type="text"
                    id="goatId"
                    value={goatId}
                    onChange={(e) => setGoatId(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Search</button>
                <button type="button" style={styles.button} onClick={handleSubmit}>Check Health Status</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {classification && (
                <div style={styles.detailsContainer}>
                    <h3 style={styles.detailsHeading}>Classification Result</h3>
                    <p><strong>Goat ID:</strong> {goatId}</p>
                    <p><strong>Classification:</strong> {classification}</p>
                </div>
            )}
            {goatDetails && (
                <div style={styles.detailsContainer}>
                    <h3 style={styles.detailsHeading}>Details for Goat ID: {goatId}</h3>
                    {goatDetails.map((goat, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <p><strong>Date:</strong> {new Date(goat.data_date).toLocaleDateString()}</p>
                            <p><strong>Weight:</strong> {goat.weight} kg</p>
                            <p><strong>Height:</strong> {goat.height} m</p>
                            <p><strong>Female Kids:</strong> {goat.Fkids}</p>
                            <p><strong>Male Kids:</strong> {goat.Mkids}</p>
                            <p><strong>vacA:</strong> {goat.vacA ? 'Yes' : 'No'}</p>
                            <p><strong>vacB:</strong> {goat.vacB ? 'Yes' : 'No'}</p>
                            <p><strong>vacC:</strong> {goat.vacC ? 'Yes' : 'No'}</p>
                            <p><strong>Disease:</strong> {goat.disease ? 'Yes' : 'No'}</p>
                            <p><strong>Village Name:</strong> {goat.villagename}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: '80%', // Adjusted width to fit better
        margin: '50px auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    },
    heading: {
        marginBottom: '20px',
        color: '#7B1F32',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center align form items
        marginBottom: '20px',
    },
    label: {
        marginBottom: '5px',
        textAlign: 'left',
        width: '100%',
        maxWidth: '300px', // Limit width of labels
    },
    input: {
        width: '100%',
        maxWidth: '300px', // Limit width of inputs
        padding: '8px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        maxWidth: '300px', // Limit width of button
        padding: '10px',
        backgroundColor: '#7B1F32',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '10px', // Added margin bottom for better spacing
    },
    detailsContainer: {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f0f0f0',
    },
    detailsHeading: {
        color: '#7B1F32',
        marginBottom: '10px',
    },
};

export default ViewGoatDetails;
