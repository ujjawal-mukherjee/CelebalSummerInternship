import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Form.css';
const Form = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState(false);
    const countryCities = {
        India: ['Delhi', 'Mumbai'],
        USA: ['New York', 'Chicago'],
        Canada: ['Toronto', 'Montreal'],
    };
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneCode: '+91',
        phoneNumber: '',
        country: '',
        city: '',
        pan: '',
        aadhar: '',
    });
    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let msg = '';
        if (!value) {
            msg = 'Required';
        } else {
            switch (name) {
                case 'email':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = 'Invalid email';
                    break;
                case 'phoneNumber':
                    if (!/^\d{10}$/.test(value)) msg = 'Enter 10-digit number';
                    break;
                case 'pan':
                    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) msg = 'Invalid PAN';
                    break;
                case 'aadhar':
                    if (!/^\d{12}$/.test(value)) msg = 'Enter 12-digit Aadhar';
                    break;
                default:
                    break;
            }
        }
        setErrors(prev => ({ ...prev, [name]: msg }));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const newErrors = {};
        for (const key in formData) {
            validate(key, formData[key]);
            if (!formData[key]) newErrors[key] = 'Required';
        }
        if (Object.values(newErrors).every(val => val === '')) {
            navigate('/details', { state: formData });
        } else {
            setErrors(newErrors);
        }
    };

    const isFormValid =
        Object.values(formData).every(val => val !== '') &&
        Object.values(errors).every(err => !err);

    return (
        <div className="form-container">
            <h2>Registration form</h2>
            <form onSubmit={handleSubmit}>
                {['firstName', 'lastName', 'username', 'email', 'phoneNumber', 'pan', 'aadhar'].map(field => (
                    <div key={field}>
                        <label>{field}: </label><br />
                        <input
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }}>{errors[field]}</div>
                    </div>
                ))}
                <div>
                    <label>Password: </label><br />
                    <input
                        type={password ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="button" onClick={() => setPassword(p => !p)}>
                        {password ? 'Hide' : 'Show'}
                    </button>
                    <div style={{ color: 'red' }}>{errors.password}</div>
                </div>
                <div>
                    <label>Country Code: </label><br />
                    <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                    </select>
                </div>
                <div>
                    <label>Country: </label><br />
                    <select name="country" value={formData.country} onChange={handleChange}>
                        <option value="">--Select--</option>
                        {Object.keys(countryCities).map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <div style={{ color: 'red' }}>{errors.country}</div>
                </div>
                <div>
                    <label>City: </label><br />
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!formData.country}
                    >
                        <option value="">--Select--</option>
                        {(countryCities[formData.country] || []).map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <div style={{ color: 'red' }}>{errors.city}</div>
                </div>
                <br />
                <button type="submit" disabled={!isFormValid}>Submit</button>
            </form>
        </div>
    )
}

export default Form
