import React, { useState, useEffect } from "react";
import "./AddWidget.css";

const AddWidget = ({ isOpen, onClose, category, setCategory }) => {
  const [activeTab, setActiveTab] = useState("CSPM");
  const [localData, setLocalData] = useState(category);

  useEffect(() => {
    if (isOpen) {
      setLocalData(category);
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const handleCheckboxChange = (e, wid, catName) => {
    const currentCat = localData.categories.find(c => c.name === catName);
    const visibleCount = currentCat.widgets.filter(w => w.visible).length;

    if (!e.target.checked && visibleCount <= 0) return;

    if (e.target.checked && visibleCount >= 3) {
      alert("You can select a maximum of 3 widgets per category!");
      return;
    }

    setLocalData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => {
        if (cat.name === catName) {
          return {
            ...cat,
            widgets: cat.widgets.map(widget =>
              widget.id === wid ? { ...widget, visible: e.target.checked } : widget
            )
          };
        }
        return cat;
      })
    }));
  };

  const handleSubmit = () => {
    setCategory(localData);
    onClose();
  };

  const renderCheckboxes = (catName) => {
    const categoryObj = localData.categories.find(c => c.name === catName);
    if (!categoryObj) return null;

    return categoryObj.widgets.map((widget, idx) => (
      <div className="contain" key={widget.id}>
        <input
          type="checkbox"
          id={`${catName}-${idx}`}
          checked={widget.visible}
          onChange={(e) => handleCheckboxChange(e, widget.id, catName)}
        />
        <label htmlFor={`${catName}-${idx}`}>{widget.name}</label>
      </div>
    ));
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Add Widget</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="tabs">
          {["CSPM", "CWPP", "Image", "Ticket"].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {(activeTab === "CSPM" || activeTab === "CWPP") && (
            <div className="add-widget-content">
              {renderCheckboxes(
                activeTab === "CSPM"
                  ? "CSPM Executive Dashboard"
                  : "Security Ops Dashboard"
              )}
              <div className="overlay-footer">
                <button className="cancel-btn" onClick={onClose}>Cancel</button>
                <button className="submit-btn" onClick={handleSubmit}>Confirm</button>
              </div>
            </div>
          )}

          {(activeTab === "Image" || activeTab === "Ticket") && (
            <div className="add-widget-content">
              <div className="form-scroll">
                <h3>Summary Widgets</h3>
                <p>Add a summary card with key metrics.</p>
                <form className="form">
                  <label>Title:</label>
                  <input type="text" placeholder="Enter title" />
                  <label>Metric:</label>
                  <input type="number" placeholder="Enter metric value" />
                </form>
              </div>
              <div className="overlay-footer">
                <button className="cancel-btn" onClick={onClose}>Cancel</button>
                <button className="submit-btn" onClick={handleSubmit}>Confirm</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddWidget;
