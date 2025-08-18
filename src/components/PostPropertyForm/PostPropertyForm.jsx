import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './PostPropertyForm.module.css';

const PostPropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'apartment',
    bedrooms: '',
    bathrooms: '',
    area: '',
    location: '',
    images: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Redirect if not logged in (as a safety net, though ProtectedRoute should handle this)
  if (!user) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      setError('You can upload a maximum of 5 images');
      return;
    }
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic validation
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      setError('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call with FormData
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          formData.images.forEach((image) => {
            formDataToSend.append('images', image);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });

      // Add user ID to the form data
      formDataToSend.append('userId', user.email);

      const response = await fetch('/api/properties', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Redirect to home after successful submission
      navigate('/', { state: { message: 'Property posted successfully!' } });
    } catch (err) {
      setError(err.message || 'Failed to submit property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Post Your Property</h2>
      {error && <div className={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title*</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter property title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Describe your property in detail"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price (DZD)*</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="Enter price"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="propertyType">Property Type*</label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="house">House</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="bedrooms">Bedrooms</label>
            <input
              id="bedrooms"
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bathrooms">Bathrooms</label>
            <input
              id="bathrooms"
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="area">Area (m²)</label>
            <input
              id="area"
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Location*</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter property address"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="images">Images (Max 5)</label>
          <input
            id="images"
            type="file"
            name="images"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
            disabled={formData.images.length >= 5}
          />
          {formData.images.length > 0 && (
            <div className={styles.imagePreviews}>
              {formData.images.map((image, index) => (
                <div key={index} className={styles.imagePreview}>
                  <span>{image.name}</span>
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)}
                    className={styles.removeImageBtn}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {formData.images.length >= 5 && (
            <p className={styles.imageLimit}>Maximum 5 images reached</p>
          )}
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span>
              Submitting...
            </>
          ) : (
            'Submit Property'
          )}
        </button>
      </form>
    </div>
  );
};

export default PostPropertyForm;