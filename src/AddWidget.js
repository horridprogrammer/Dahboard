import React, { useState } from "react";
import "./AddWidget.css";
const AddWidget = ({ isOpen, onClose , category , setCategory }) => {
    const [activeTab, setActiveTab] = useState("CSPM");
    const [Data,setData] = useState(category);
  
    if (!isOpen) return null;

    
    const handleCheckboxChange=(e,wid,name)=>{
        setData(prev => ({

        }))
        if (e.target.checked) {
            setData(prev => ({
                ...prev,
                categories: prev.categories.map(a => {
                if (a.name === name) {
                    return {
                    ...a,
                    widgets: [
                        ...a.widgets,
                        a.widgets.find(w => w.id === wid)
                    ]
                    };
                }
                return a;
                })
            }));
        }else{
            setData(...prev,categories.map((a=>{
                if(a.name === name){
                    return {
                        
                    }
                }
            })))
        }

    }

    return (
    <div className="drawer-overlay" onClick={onClose}>
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
                <h2>Add Widget</h2>
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="tabs">
                <button
                className={`tab-btn ${activeTab === "CSPM" ? "active" : ""}`}
                onClick={() => setActiveTab("CSPM")}
                >
                CSPM
                </button>
                <button
                className={`tab-btn ${activeTab === "CWPP" ? "active" : ""}`}
                onClick={() => setActiveTab("CWPP")}
                >
                CWPP
                </button>
                <button
                className={`tab-btn ${activeTab === "Image" ? "active" : ""}`}
                onClick={() => setActiveTab("Image")}
                >
                Image
                </button>
                <button
                className={`tab-btn ${activeTab === "Ticket" ? "active" : ""}`}
                onClick={() => setActiveTab("Ticket")}
                >
                Ticket
                </button>
            </div>

            <div className="tab-content">
                {activeTab === "CSPM" && (
                <div className="add-widget-content">
                    {category.categories.find((x)=>x.name ==="CSPM Executive Dashboard").widgets.map((y,index)=>
                        <div className="contain" key={y.id}>
                            <input type="checkbox" className="check" id={index} onChange={(e)=>handleCheckboxChange(e,y.id,"CSPM Executive Dashboard")}></input>
                            <label htmlFor={index}>{y.name}</label>
                        </div>
                    )}
                    <div className="overlay-footer">
                        <button type="button" className="cancel-btn">Cancel</button>
                        <button type="submit" className="submit-btn">Confirm</button>
                    </div>
                </div>
                
                )}

                {activeTab === "CWPP" && (
                <div className="add-widget-content">
                    {category.categories.find((x)=>x.name ==="Security Ops Dashboard").widgets.map((y,index)=>
                        <div className="contain" key={y.id}>
                            <input type="checkbox" className="check" id={index} onChange={(e)=>handleCheckboxChange}></input>
                            <label htmlFor={index}>{y.name}</label>
                        </div>
                    )}
                    <div className="overlay-footer">
                        <button type="button" className="cancel-btn">Cancel</button>
                        <button type="submit" className="submit-btn">Confirm</button>
                    </div>
                </div>
                )}

                {activeTab === "Image" && (
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
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="submit-btn">Confirm</button>
                    </div>
                </div>
                )}

                {activeTab === "Ticket" && (
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
                    <button type="button" className="cancel-btn">Cancel</button>
                    <button type="submit" className="submit-btn">Confirm</button>
                    </div>
                </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default AddWidget;
