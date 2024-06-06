import React from 'react';

const ChildCheckbox = ({ label, checked, onChange }) => {
  const handleChange = (e) => {
    onChange(label, e.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        {label}
      </label>
    </div>
  );
};

export default ChildCheckbox;
