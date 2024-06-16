import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewGoatDetails = () => {
    const [goatId, setGoatId] = useState('');
    const [goatDetails, setGoatDetails] = useState(null); // State to hold fetched goat details
    const [classificationReport, setClassificationReport] = useState(''); // State to hold classification report
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

                // Extract health status from the classification
                const healthStatus = classification.health_status;

                // Display health status in a formatted way
                const report = `
                    ## Veterinary Report - Goat ID: ${goatId}
                    **Date:** ${new Date().toLocaleDateString()}
                    **Examined by:** Your Name
                    **Patient:** Goat
                    **Health Status:** ${healthStatus}
                `;

                setClassificationReport(report); // Set classification report to state
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
            {classificationReport && (
                <div style={styles.classificationContainer}>
                    <h3 style={styles.detailsHeading}>Classification Report</h3>
                    <div style={styles.reportContainer}>
                        <pre style={styles.healthStatus}>{classificationReport}</pre>
                    </div>
                </div>
            )}
            {goatDetails && (
                <div style={styles.detailsContainer}>
                    <h3 style={styles.detailsHeading}>Details for Goat ID: {goatId}</h3>
                    {Object.entries(goatDetails).map(([key, value]) => (
                        <p key={key}><strong>{key}:</strong> {value}</p>
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
    classificationContainer: {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f0f0f0',
        textAlign: 'left', // Adjusted text alignment for classification report
    },
    detailsHeading: {
        color: '#7B1F32',
        marginBottom: '10px',
    },
    reportContainer: {
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #ccc',
        marginTop: '10px',
        textAlign: 'left',
        maxWidth: '80%',
        margin: 'auto',
    },
    healthStatus: {
        whiteSpace: 'pre-wrap', // Preserve line breaks and spacing
        fontFamily: 'Arial, sans-serif', // Use appropriate font for readability
        fontSize: '16px', // Adjust font size as needed
        lineHeight: '1.6', // Increase line height for readability
        color: '#333', // Text color
    },
};

export default ViewGoatDetails;
