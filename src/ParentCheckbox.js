import React, { useState } from 'react';

const ParentCheckbox = ({ label, children }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleParentChange = (e) => {
    const isChecked = e.target.checked;
    const newCheckedItems = {};
    React.Children.forEach(children, (child) => {
      newCheckedItems[child.props.label] = isChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleChildChange = (label, isChecked) => {
    setCheckedItems({
      ...checkedItems,
      [label]: isChecked
    });
  };

  const totalChildren = React.Children.count(children);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const isParentChecked = checkedCount === totalChildren;

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isParentChecked}
          onChange={handleParentChange}
        />
        {label} {checkedCount > 0 && `(${checkedCount})`}
      </label>
      <div style={{ marginLeft: 20 }}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            checked: checkedItems[child.props.label] || false,
            onChange: handleChildChange
          })
        )}
      </div>
    </div>
  );
};

export default ParentCheckbox;
