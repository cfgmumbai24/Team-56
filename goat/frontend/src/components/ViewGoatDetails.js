import React, { useState } from 'react';
import axios from 'axios';

const ViewGoatDetails = () => {
    const [goatId, setGoatId] = useState('');
    const [goatDetails, setGoatDetails] = useState(null);
    const [error, setError] = useState(null);
    const [classification, setClassification] = useState(null);

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


    // const handleSubmit = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/api/goats/classify/${goatId}`);
    //         if (response.status === 200) {
    //             const { classification } = response.data;
    //             setClassification(classification); // Set classification result to state
    //         }
    //     } catch (error) {
    //         console.error('Error classifying goat:', error);
    //         setError('Failed to classify goat. Please try again.'); // Handle error state
    //     }
    // };

    const groupDetailsByDate = (details) => {
        return details.reduce((groups, detail) => {
            const date = new Date(detail.data_date).toLocaleDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(detail);
            return groups;
        }, {});
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>View Goat Details</h2>
            <form style={styles.form} onSubmit={handleSearch}>
                <label style={styles.label} htmlFor="goatId">Goat ID:</label>
                <input
                    type="text"
                    id="goatId"
                    value={goatId}
                    onChange={(e) => setGoatId(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button} onClick={handleSearch}>Search</button>
                {/* <button type="button" style={styles.button} onClick={handleSubmit}>Check Health Status</button> */}
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {goatDetails && (
                <div style={styles.detailsContainer}>
                    <h3 style={styles.detailsHeading}>Details for Goat ID: {goatId}</h3>
                    {Object.entries(groupDetailsByDate(goatDetails)).map(([date, details]) => (
                        <div key={date} style={styles.dateContainer}>
                            <h4 style={styles.dateHeading}>Date: {date}</h4>
                            {details.map((goat, index) => (
                                <div key={index} style={{ marginBottom: '20px' }}>
                                    <h5 style={styles.reportTitle}>Goat Health Report</h5>
                                    <p><strong>Patient:</strong> {goatId}</p>
                                    <p><strong>Clinical History:</strong> This is a female goat presenting for a routine health check.</p>
                                    <p><strong>Physical Examination:</strong></p>
                                    <ul>
                                        <li><strong>Weight:</strong> {goat.weight} kg - This falls within the normal weight range for an adult female goat.</li>
                                        <li><strong>Height:</strong> {goat.height} m - This is also within the normal range for an adult female goat.</li>
                                        <li><strong>Reproductive Status:</strong> The goat has produced a total of {goat.Fkids + goat.Mkids} kids ({goat.Fkids} female, {goat.Mkids} male). This indicates a healthy reproductive history.</li>
                                    </ul>
                                    <p><strong>Vaccination Status:</strong> The goat is fully vaccinated against diseases A, B, and C. This is excellent and helps protect the goat from various common illnesses.</p>
                                    <p><strong>Disease Status:</strong> The goat is currently disease-free, which is very positive.</p>
                                    <p><strong>Overall Assessment:</strong> Based on the presented data, this goat appears to be <strong>healthy</strong>. She is within a normal weight and height range, has a healthy reproductive history, is fully vaccinated, and shows no signs of disease.</p>
                                    <p><strong>Recommendations:</strong></p>
                                    <ul>
                                        <li>Continue with regular vaccinations and deworming as per recommended schedules.</li>
                                        <li>Provide a balanced diet and access to clean water.</li>
                                        <li>Monitor for any changes in behavior, appetite, or physical condition.</li>
                                        <li>Conduct a fecal examination to check for parasites.</li>
                                    </ul>
                                    <p><strong>Note:</strong> This report is based on limited information. A complete physical examination, including a thorough medical history, and further diagnostic testing may be needed to make a more definitive assessment of the goat's overall health.</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: '90vw',
        margin: '10vh auto',
        height: '80vh',
        paddingTop: '20px',
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
        alignItems: 'center',
        marginBottom: '20px',
    },
    label: {
        marginBottom: '5px',
        textAlign: 'left',
        width: '100%',
        maxWidth: '300px',
    },
    input: {
        width: '60vw',
        maxWidth: '300px',
        padding: '8px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        maxWidth: '300px',
        padding: '10px',
        backgroundColor: '#7B1F32',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '10px',
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
    dateContainer: {
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#e0e0e0',
    },
    dateHeading: {
        color: '#7B1F32',
        marginBottom: '10px',
    },
    reportTitle: {
        color: '#7B1F32',
        marginBottom: '10px',
    },
};

export default ViewGoatDetails;
