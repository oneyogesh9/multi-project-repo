import React, { useMemo } from "react";
import { Product } from "../../../types";

interface DashboardChartsProps {
  products: Product[];
}

interface PieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  size?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, size = 120 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return <div className="no-data-chart">No data</div>;

  let cumulativeAngle = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((item, index) => {
        const percentage = item.value / total;
        const angle = percentage * 360;
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + angle;

        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;

        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2 - 2;

        const x1 = centerX + radius * Math.cos(startAngleRad);
        const y1 = centerY + radius * Math.sin(startAngleRad);
        const x2 = centerX + radius * Math.cos(endAngleRad);
        const y2 = centerY + radius * Math.sin(endAngleRad);

        const largeArcFlag = angle > 180 ? 1 : 0;

        const pathData = [
          `M ${centerX} ${centerY}`,
          `L ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          "Z",
        ].join(" ");

        cumulativeAngle = endAngle;

        return (
          <path
            key={index}
            d={pathData}
            fill={item.color}
            stroke="#fff"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
};

const DashboardCharts: React.FC<DashboardChartsProps> = ({ products }) => {
  const total = products.length;

  const categoryCounts = useMemo(() => {
    const count: Record<string, number> = {};
    products.forEach((product) => {
      count[product.category] = (count[product.category] ?? 0) + 1;
    });
    return count;
  }, [products]);

  const topCategories = useMemo(() => {
    return Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [categoryCounts]);

  const averagePrice = useMemo(() => {
    if (total === 0) return 0;
    const sum = products.reduce((acc, product) => acc + product.price, 0);
    return sum / total;
  }, [products, total]);

  const dataPriceRange = useMemo(() => {
    const ranges = {
      "Under $50": 0,
      "$50-$100": 0,
      "$100-$150": 0,
      "Over $150": 0,
    } as Record<string, number>;
    products.forEach((product) => {
      if (product.price < 50) ranges["Under $50"] += 1;
      else if (product.price < 100) ranges["$50-$100"] += 1;
      else if (product.price < 150) ranges["$100-$150"] += 1;
      else ranges["Over $150"] += 1;
    });
    return ranges;
  }, [products]);

  const categoryChartData = useMemo(() => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];
    return topCategories.map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  }, [topCategories]);

  const priceRangeChartData = useMemo(() => {
    const colors = ["#FFD93D", "#6BCF7F", "#4D96FF", "#9B59B6"];
    return Object.entries(dataPriceRange).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  }, [dataPriceRange]);

  return (
    <div className="dashboard-charts">
      <div className="charts-card">
        <div className="charts-title">Total Products</div>
        <div className="charts-value">{total}</div>
      </div>
      <div className="charts-card">
        <div className="charts-title">Average Price</div>
        <div className="charts-value">${averagePrice.toFixed(2)}</div>
      </div>
      <div className="charts-card charts-card--column">
        <div className="charts-title">Category Distribution</div>
        <div className="chart-container">
          <PieChart data={categoryChartData} />
          <div className="chart-legend">
            {categoryChartData.map((item, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="legend-text" title={item.name}>
                  {item.name.length > 12
                    ? `${item.name.substring(0, 12)}...`
                    : item.name}
                </span>
                <span className="legend-value">
                  {total > 0 ? Math.round((item.value / total) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="charts-card charts-card--column">
        <div className="charts-title">Price Range Distribution</div>
        <div className="chart-container">
          <PieChart data={priceRangeChartData} />
          <div className="chart-legend">
            {priceRangeChartData.map((item, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="legend-text">{item.name}</span>
                <span className="legend-value">
                  {total > 0 ? Math.round((item.value / total) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
