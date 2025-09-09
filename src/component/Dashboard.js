import { useState } from "react";
import Data from "../data/data.json";
import Category from "./Category";
import "./dashboard.css";
import AddWidget from "../AddWidget";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(Data);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = data.categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="dashboard">
      <h1>CNAPP Dashboard</h1>

      <div className="dashboard-controls">
        <div className="dashboard-search">
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <input
          type="button"
          value="Add Widget +"
          className="add-widget-btn"
          onClick={() => setIsModalOpen(true)}
        />

        <AddWidget
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={data}
          setCategory={setData}
        />

        <input
          type="button"
          value="⟳"
          className="refresh-btn"
          onClick={() => window.location.reload()}
        />

        <input type="button" value="⋮" className="option-btn" />

        <select className="select-btn">
          <option>Last 2 days</option>
          <option>Last 7 days</option>
          <option>Last 1 month</option>
          <option>Last 1 year</option>
          <option>Lifetime</option>
        </select>
      </div>

      {filteredCategories.map((category) => (
        <Category
          key={category.id}
          category={{
            ...category,
            widgets: searchTerm
              ? category.widgets.filter((widget) =>
                  widget.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
              :
                category.widgets.filter((widget) => widget.visible),
          }}
          setCategory={setData}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};

export default Dashboard;
