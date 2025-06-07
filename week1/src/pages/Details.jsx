import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Details.css'; 

const Details = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="no-data-container">
                <div className="no-data-icon">
                </div>
                <h2 className="no-data-title">No Data Found</h2>
                <p className="no-data-message">
                    It looks like no form data has been submitted yet. Please fill out the registration form first.
                </p>
                <div className="action-buttons">
                    <button className="back-button" onClick={() => navigate('/')}>
                        Go to Form
                    </button>
                </div>
            </div>
        );
    }
    const fieldCategories = {
        firstName: { label: 'First Name', category: 'personal' },
        lastName: { label: 'Last Name', category: 'personal' },
        username: { label: 'Username', category: 'personal' },
        email: { label: 'Email Address', category: 'contact' },
        password: { label: 'Password', category: 'security', sensitive: true },
        phoneCode: { label: 'Country Code', category: 'contact' },
        phoneNumber: { label: 'Phone Number', category: 'contact' },
        country: { label: 'Country', category: 'location' },
        city: { label: 'City', category: 'location' },
        pan: { label: 'PAN Number', category: 'document', sensitive: true },
        aadhar: { label: 'Aadhar Number', category: 'document', sensitive: true }
    };

    const formatValue = (key, value) => {
        if (key === 'password') {
            return '•'.repeat(value.length);
        }
        if (key === 'phoneCode' && key === 'phoneNumber') {
            return value;
        }
        return value;
    };

    return (
        <div className="details-container">
            <div className="details-header">
                <div className="success-icon">
                </div>
                <h2 className="details-title">Registration Successful!</h2>
                <p className="details-subtitle">
                    Your account has been created successfully. Here are your submitted details:
                </p>
            </div>

            <div className="details-body">
                <div className="details-grid">
                    {Object.entries(state).map(([key, value]) => {
                        const fieldInfo = fieldCategories[key] || { label: key, category: 'general' };
                        return (
                            <div
                                key={key}
                                className={`detail-card field-${fieldInfo.category}`}
                            >
                                <span className="detail-label">
                                    {fieldInfo.label}
                                </span>
                                <div className={`detail-value ${fieldInfo.sensitive ? 'sensitive' : ''}`}>
                                    {formatValue(key, value)}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="action-buttons">
                    <button className="back-button" onClick={() => navigate('/')}>
                        Create Another Account
                    </button>
                    <button
                        className="secondary-button"
                        onClick={() => window.print()}
                    >
                        Print Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Details