import { useState } from "react";
import Data from "../data/data.json";
import Category from "./Category";
import "./dashboard.css";
import AddWidget from "../AddWidget";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data,setData] = useState(Data);
  return (
    <div className="dashboard">
      <h1>CNAPP Dashboard</h1>
      <div className="dashboard-controls">
      <input type="button" value="Add Widget +" className="add-widget-btn" onClick={()=>setIsModalOpen(true)}></input>
      <AddWidget
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)
        }
        category = {data}
        setCategory = {setData}
      />
      <input type="button" value="⟳" className="refresh-btn" onClick={()=>window.location.reload()}></input>
      <input type="button" value="⋮" className="option-btn"></input>
      <select className="select-btn">
        <option>Last 2 days</option>
        <option>Last 7 days</option>
        <option>Last 1 month</option>
        <option>Last 1 year</option>
        <option>Lifetime</option>
      </select>
      </div>
      {data.categories.map((x) => (
        <Category key={x.id} category={x} />
      ))}
    </div>
  );
};

export default Dashboard;
