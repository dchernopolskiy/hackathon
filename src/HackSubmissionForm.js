import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HackSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    track: '',
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();

    // Append text fields
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });

    // Append images
    images.forEach((image, index) => {
      submissionData.append(`images`, image);
    });

    try {
      const response = await axios.post('/api/hacks', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Hack submitted successfully:', response.data);
      navigate('/submissions');
    } catch (err) {
      setError('Failed to submit hack. Please try again.');
      console.error('Error submitting hack:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-300">Video URL</label>
        <input
          type="url"
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-300">Images</label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-300
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-purple-600 file:text-white
          hover:file:bg-purple-700"
        />
      </div>
      <div>
        <label htmlFor="track" className="block text-sm font-medium text-gray-300">Track</label>
        <select
          id="track"
          name="track"
          value={formData.track}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="">Select a track</option>
          <option value="classic">Classic Track</option>
          <option value="reusable-assets">Reusable Assets</option>
          <option value="ai-automation">AI & Automation Track</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Submit Hack
      </button>
    </form>
  );
};

export default HackSubmissionForm;