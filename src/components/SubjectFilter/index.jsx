import React, { useState } from 'react';

const SubjectFilter = ({ notes, onFilter }) => {
  const [subjectFilter, setSubjectFilter] = useState('');

  const handleFilterChange = (e) => {
    setSubjectFilter(e.target.value);
  };

  const handleFilterClick = () => {
    onFilter(subjectFilter.trim().toLowerCase());
  };

  return (
    <div className="subject-filter">
      <input
        type="text"
        placeholder="Filter by Subject"
        value={subjectFilter}
        onChange={handleFilterChange}
      />
      <button  className="filter-btn" onClick={handleFilterClick}>Filter</button>
    </div>
  );
};

export default SubjectFilter;