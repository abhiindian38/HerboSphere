import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLeaf, FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

const Register = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageUrl: '', 
  });

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Let’s Get Started!');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));

    const filledFields = Object.values({ ...formState, [name]: value }).filter(
      (field) => field !== ''
    ).length;
    const newProgress = (filledFields / 5) * 100; 
    setProgress(newProgress);
    updateMessage(newProgress);
  };

  const updateMessage = (progress) => {
    if (progress === 0) setMessage("Let's Get Growing!");
    else if (progress <= 20) setMessage('Sprouting Up!');
    else if (progress <= 40) setMessage('Growing Strong!');
    else if (progress <= 60) setMessage('Blooming Beautifully!');
    else if (progress <= 80) setMessage('Almost in Full Bloom!');
    else setMessage('Ready to Flourish!');
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { confirmPassword, ...formData } = formState;

    try {
      const response = await axios.post(`http://localhost:4000/user-api/user`, formData);
      console.log('Response from server:', response.data);
      navigate('/login');
    } catch (error) {
      setError('Failed to sign up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-80 p-5" style={{ backgroundColor: '#cfe2d9' }}>
      <div className="position-relative" style={{ width: '100%', maxWidth: '400px' }}>
        {/* Image Preview */}
        {formState.imageUrl && (
          <div className="position-absolute" style={{ top: '10px', right: '10px', width: '100px', height: '100px' }}>
            <img
              src={formState.imageUrl}
              alt="Profile Preview"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '8px' }}
              className="img-fluid border border-secondary"
            />
          </div>
        )}

        <form
          className="p-5 bg-light rounded shadow-lg text-center "
          style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <FaLeaf size={50} color="#225722" aria-hidden="true" />
            <h1 className="mt-2" style={{ color: '#225722 ' }}>Join Vaidyavan</h1>
            <p className="text-muted">Your journey into herbal knowledge starts here!</p>
          </div>

          {/* Progress Bar */}
          <div className="progress mb-3">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="text-muted mb-3">{message}</div>

          {/* Image URL Input */}
          <div className="form-group mb-3">
            <label htmlFor="imageUrl" className="visually-hidden">Profile Picture URL</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FaImage /></span>
              </div>
              <input
                id="imageUrl"
                className="form-control border-secondary"
                type="text"
                placeholder="Profile Picture URL"
                name="imageUrl"
                value={formState.imageUrl}
                onChange={handleChange}
                aria-label="Profile picture URL input"
              />
            </div>
          </div>

          {/* Username Input */}
          <div className="form-group mb-3">
            <label htmlFor="username" className="visually-hidden">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FaUser /></span>
              </div>
              <input
                id="username"
                className="form-control border-secondary"
                type="text"
                placeholder="Username"
                name="username"
                value={formState.username}
                onChange={handleChange}
                required
                aria-required="true"
                aria-label="Username input"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="form-group mb-3">
            <label htmlFor="email" className="visually-hidden">Email</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FaEnvelope /></span>
              </div>
              <input
                id="email"
                className="form-control border-secondary"
                type="email"
                placeholder="Email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-label="Email input"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group mb-3">
            <label htmlFor="password" className="visually-hidden">Password</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FaLock /></span>
              </div>
              <input
                id="password"
                className="form-control border-secondary"
                type="password"
                placeholder="Password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
                aria-required="true"
                aria-label="Password input"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="form-group mb-4">
            <label htmlFor="confirmPassword" className="visually-hidden">Confirm Password</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><FaLock /></span>
              </div>
              <input
                id="confirmPassword"
                className="form-control border-secondary"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
                required
                aria-required="true"
                aria-label="Confirm password input"
              />
            </div>
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button className="btn btn-success btn-block mb-4" type="submit">
            Start Your Journey
          </button>

          <div className="text-muted small">
            Already have an account?{' '}
            <Link to="/login" className="text-primary" aria-label="Login">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
