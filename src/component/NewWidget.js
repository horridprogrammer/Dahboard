import { useState, useEffect } from "react";
import "../NewWidget.css";

const NewWidget = ({ isOpen, onClose, category, setCategory }) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [widgetType, setWidgetType] = useState("Chart");

  useEffect(() => {
    if (isOpen) {
      setWidgetName("");
      setWidgetText("");
      setWidgetType("Chart");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWidget = {
      id: Date.now().toString(),
      name: widgetName,
      text: widgetText,
      type: widgetType,
      visible: true,
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
          },
        ],
      },
    };

    setCategory((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.name === category.name
          ? { ...cat, widgets: [...cat.widgets, newWidget] }
          : cat
      ),
    }));

    onClose();
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <h2>Add Widget - {category.name}</h2>

        <form className="newwidget-form" onSubmit={handleSubmit}>
          <label>Widget Name:</label>
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            placeholder="Enter widget name"
            required
          />

          <label>Widget Text:</label>
          <input
            type="text"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
            placeholder="Enter widget description"
            required
          />

          <label>Type:</label>
          <select
            value={widgetType}
            onChange={(e) => setWidgetType(e.target.value)}
          >
            <option>Chart</option>
            <option>Bar</option>
            <option>Line</option>
          </select>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewWidget;
