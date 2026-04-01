import React from "react";
import { Product } from "../../../types";

interface ChartPanelProps {
  products: Product[];
}

const ChartPanel: React.FC<ChartPanelProps> = ({ products }) => {
  const total = products.length;

  const categoryCounts = products.reduce<Record<string, number>>(
    (acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const averagePrice = total
    ? products.reduce((sum, p) => sum + p.price, 0) / total
    : 0;

  return (
    <div className="chart-panel">
      <div className="chart-card">
        <h4>Total Products</h4>
        <strong>{total}</strong>
      </div>
      <div className="chart-card">
        <h4>Avg Price</h4>
        <strong>${averagePrice.toFixed(2)}</strong>
      </div>
      <div className="chart-card">
        <h4>Top Categories</h4>
        <ul>
          {Object.entries(categoryCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([category, count]) => (
              <li key={category}>
                <span>{category}</span>
                <span>{count}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ChartPanel;
