import React, { useState } from "react";
import { User, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleBioChange = (e) => {
    if (e.target.value.length <= 150) {
      setBio(e.target.value);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send to backend
    navigate("/hackathon");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Create Your Profile
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Photo upload section */}
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2">
                  <Upload size={16} className="text-white" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value="John" // Example pre-filled value
                disabled
                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700"
              />
              <p className="mt-1 text-xs text-gray-500">
                (automatically filled from login)
              </p>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value="Doe" // Example pre-filled value
                disabled
                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700"
              />
              <p className="mt-1 text-xs text-gray-500">
                (automatically filled from login)
              </p>
            </div>
            {/* Bio section */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={bio}
                onChange={handleBioChange}
                maxLength={150}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Tell us a bit about yourself..."
              />
              <p className="mt-1 text-xs text-gray-500">
                {bio.length}/150 characters
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
