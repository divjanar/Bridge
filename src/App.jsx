import { useState } from "react";
import Login from "./login";

// Job data
const jobs = [
  {
    id: 1,
    companyLogo: "/logos/google.png",
    role: "Frontend Engineer",
    salary: "$90k - $120k",
    experienceLevel: "Mid-level",
    degreeRequired: "Bachelor's in CS",
    location: "San Francisco, CA",
    languages: ["JavaScript", "React"],
    shortDetails: ["Remote-friendly", "Flexible hours", "Great team culture"],
    applicationOpen: "2026-02-01",
  },
  {
    id: 2,
    companyLogo: "/logos/amazon.png",
    role: "Backend Engineer",
    salary: "$100k - $130k",
    experienceLevel: "Senior",
    degreeRequired: "Bachelor's in CS",
    location: "Seattle, WA",
    languages: ["Python", "AWS"],
    shortDetails: ["High growth team", "Stock options", "Healthcare included"],
    applicationOpen: "2026-02-10",
  },
  // Add more job objects here
];

function JobCard({ job, onLike, onReject }) {
  return (
    <div className="job-card border p-4 rounded shadow-md mb-4 flex gap-4 flex-col md:flex-row relative">
      <img src={job.companyLogo} alt={`${job.role} logo`} className="w-16 h-16 object-contain" />
      <div className="job-info flex-1">
        <h2 className="text-xl font-bold">{job.role}</h2>
        <p>{job.salary} • {job.experienceLevel} • {job.degreeRequired}</p>
        <p>{job.location}</p>
        <p>Languages: {job.languages.join(", ")}</p>
        <ul className="list-disc list-inside">
          {job.shortDetails.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-500">Application Opens: {job.applicationOpen}</p>
      </div>

      {/* Floating buttons at bottom corners */}
      <button
        onClick={onReject}
        className="reject-btn absolute bottom-4 left-4"
      >
        <i className="ri-close-fill"></i>
      </button>
      <button
        onClick={onLike}
        className="like-btn absolute bottom-4 right-4"
      >
        <i className="ri-heart-fill"></i>
      </button>
    </div>
  );
}

function FilterBar({ filters, setFilters }) {
  return (
    <div className="filter-bar flex gap-4 mb-6">
      <select
        value={filters.experienceLevel}
        onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
      >
        <option value="">All Levels</option>
        <option value="Junior">Junior</option>
        <option value="Mid-level">Mid-level</option>
        <option value="Senior">Senior</option>
      </select>

      <select
        value={filters.degreeRequired}
        onChange={(e) => setFilters({ ...filters, degreeRequired: e.target.value })}
      >
        <option value="">Any Degree</option>
        <option value="Bachelor's in CS">Bachelor's in CS</option>
        <option value="Master's in CS">Master's in CS</option>
      </select>

      <input
        type="text"
        placeholder="Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />
    </div>
  );
}

function Profile({ user, likedJobsData, onLogout }) {
  return (
    <div className="profile-page p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{user}'s Profile</h2>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Liked Jobs</h3>
      {likedJobsData.length === 0 ? (
        <p className="text-gray-500">You haven't liked any jobs yet.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {likedJobsData.map((job) => (
            <li key={job.id} className="border p-4 rounded shadow-md">
              <h4 className="font-bold">{job.role}</h4>
              <p>{job.salary} • {job.experienceLevel}</p>
              <p>{job.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



function App() {
  const [filters, setFilters] = useState({
    experienceLevel: "",
    degreeRequired: "",
    location: "",
  });
  const [likedJobs, setLikedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [user, setUser] = useState(null); // null = not logged in
  const [viewProfile, setViewProfile] = useState(false);

  const visibleJobs = jobs
    .filter((job) => {
      return (
        (filters.experienceLevel === "" || job.experienceLevel === filters.experienceLevel) &&
        (filters.degreeRequired === "" || job.degreeRequired === filters.degreeRequired) &&
        (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase()))
      );
    })
    .filter((job) => !likedJobs.includes(job.id) && !rejectedJobs.includes(job.id));

  const currentJob = visibleJobs[0] || null;

  const handleLike = (jobId) => setLikedJobs([...likedJobs, jobId]);
  const handleReject = (jobId) => setRejectedJobs([...rejectedJobs, jobId]);

  const handleLogout = () => {
    setUser(null);
    setLikedJobs([]);
    setRejectedJobs([]);
    setViewProfile(false);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  if (viewProfile) {
    const likedJobsData = jobs.filter((job) => likedJobs.includes(job.id));
    return <Profile user={user} likedJobsData={likedJobsData} onLogout={handleLogout} />;
  }

  return (
    <div className="app p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">BRIDGE</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setViewProfile(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      {currentJob ? (
        <JobCard
          job={currentJob}
          onLike={() => handleLike(currentJob.id)}
          onReject={() => handleReject(currentJob.id)}
        />
      ) : (
        <p className="text-gray-500">No more jobs to show 😔</p>
      )}
    </div>
  );
}




export default App;
