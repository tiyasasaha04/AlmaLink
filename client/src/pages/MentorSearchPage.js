import React, { useState, useEffect, useCallback } from 'react';
import { searchAlumni } from '../services/directoryService';
import ProfileCard from '../components/common/ProfileCard';
import Spinner from '../components/common/Spinner';
import './MentorSearchPage.css'; // Add styles below

const MentorSearchPage = () => {
  const [filters, setFilters] = useState({
    name: '',
    industry: '',
    city: '',
    isMentor: false,
  });
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlumni = useCallback(async () => {
    setLoading(true);
    try {
      // Create a clean filter object (remove empty strings)
      const cleanFilters = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          cleanFilters[key] = filters[key];
        }
      });
      
      const { data } = await searchAlumni(cleanFilters);
      setAlumni(data);
    } catch (err) {
      console.error('Failed to fetch alumni', err);
    }
    setLoading(false);
  }, [filters]); // Re-create function if filters change

  // Initial load
  useEffect(() => {
    fetchAlumni();
  }, []); // Only run on first render

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAlumni(); // Manually trigger search
  };

  return (
    <div className="search-page-container">
      <aside className="search-sidebar">
        <h4>Filter Alumni</h4>
        <form onSubmit={handleSearch}>
          <div className="filter-group">
            <label>Name</label>
            <input type="text" name="name" value={filters.name} onChange={handleFilterChange} />
          </div>
          <div className="filter-group">
            <label>Industry</label>
            <input type="text" name="industry" value={filters.industry} onChange={handleFilterChange} />
          </div>
          <div className="filter-group">
            <label>City</label>
            <input type="text" name="city" value={filters.city} onChange={handleFilterChange} />
          </div>
          <div className="filter-group-checkbox">
            <input type="checkbox" name="isMentor" id="isMentorFilter" checked={filters.isMentor} onChange={handleFilterChange} />
            <label htmlFor="isMentorFilter">Only Show Mentors</label>
          </div>
          <button type="submit" className="search-button">Apply Filters</button>
        </form>
      </aside>

      <main className="search-results">
        <h2>Alumni Directory</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="results-grid">
            {alumni.length > 0 ? (
              alumni.map((user) => <ProfileCard key={user._id} user={user} />)
            ) : (
              <p>No alumni found matching your criteria.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MentorSearchPage;