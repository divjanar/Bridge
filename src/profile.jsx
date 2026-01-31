import React from "react";
import "./Profile.css";

function Profile({ user, likedJobsData, onLogout, onBack }) {
  return (
    <div className="profile-page">
      {/* Header with Back (left) and Logout (right) buttons */}
      <div className="profile-buttons-container">
        <button onClick={onBack} className="profile-back-btn">
          Back
        </button>
        <button onClick={onLogout} className="profile-logout-btn">
          Logout
        </button>
      </div>

      {/* Profile heading on the next line */}
      <h2 className="profile-heading">{user}'s Profile</h2>

      {/* Liked Jobs Section */}
      <h3>Liked Jobs</h3>
      {likedJobsData.length === 0 ? (
        <p className="text-gray-500">You haven't liked any jobs yet.</p>
      ) : (
        <div className="liked-jobs">
          {likedJobsData.map((job) => (
            <div key={job.id} className="liked-job-card">
              <h4>{job.role}</h4>
              <p>{job.salary} • {job.experienceLevel}</p>
              <p>{job.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
