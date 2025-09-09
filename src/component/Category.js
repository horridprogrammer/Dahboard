import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import NewWidget from "./NewWidget";
import "./Category.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Category = ({ category, setCategory, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const chartOption = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "center",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 10,
          generateLabels: (chart) => {
            const data = chart.data;
            if (!data.labels || !data.datasets.length) return [];
            return data.labels.map((label, i) => ({
              text: `${label} (${data.datasets[0].data[i]})`,
              fillStyle: data.datasets[0].backgroundColor[i],
              strokeStyle: data.datasets[0].backgroundColor[i],
              index: i,
            }));
          },
        },
      },
      tooltip: { enabled: true },
    },
    layout: { padding: 0 },
    maintainAspectRatio: false,
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      const datasets = chart.data.datasets;
      if (!datasets) return;
      const total = datasets[0].data.reduce((acc, val) => acc + val, 0);

      ctx.save();
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(total, width / 2, height / 2);
      ctx.restore();
    },
  };

  ChartJS.register(centerTextPlugin);

  let filteredWidgets = category.widgets.filter((w) =>
    searchTerm
      ? w.name.toLowerCase().includes(searchTerm.toLowerCase())
      : w.visible
  );

  const visibleWidgetsCount = category.widgets.filter((w) => w.visible).length;

  let cards = [...filteredWidgets];
  while (cards.length < 3) {
    cards.push({ id: `add-${cards.length}`, type: "add" });
  }

  const maxVisible = 3;

  return (
    <div>
      <h3 className="head">{category.name}</h3>
      <div className="category-cards">
        {cards.map((x) => (
          <div className="category-card" key={x.id}>
            {x.type === "add" ? (
              <button className="add-widget-btn" onClick={openModal}>
                Add Widget
              </button>
            ) : (
              <>
                <h3>{x.name}</h3>
                <div className="chart-container">
                  <Doughnut data={x.data} options={chartOption} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <NewWidget
        isOpen={isModalOpen}
        onClose={closeModal}
        category={category}
        setCategory={setCategory}
        maxVisible={maxVisible}
      />
    </div>
  );
};

export default Category;
