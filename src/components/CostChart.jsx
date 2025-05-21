// File: src/components/CostCharts.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF5EAA'];

const CostCharts = () => {
  const costs = useSelector(state => state.costs || []);

  if (costs.length === 0) return null;

  const pieData = costs.map(cost => ({
    name: cost.description,
    value: cost.amount
  }));

  const barData = costs.map(cost => ({
    name: cost.description,
    amount: cost.amount
  }));

  const lineData = costs
    .filter(cost => cost.timestamp)
    .map(cost => ({
      time: new Date(cost.timestamp).toLocaleDateString(),
      amount: cost.amount
    }))
    .sort((a, b) => new Date(a.time) - new Date(b.time));

  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ textAlign: 'center' }}>📊 Project Cost Visualizations</h3>

      {/* Pie Chart */}
      <div style={{ marginTop: 30 }}>
        <h4>💹 Cost Breakdown (Pie Chart)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div style={{ marginTop: 30 }}>
        <h4>📏 Cost Comparison (Bar Chart)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      {lineData.length > 1 && (
        <div style={{ marginTop: 30 }}>
          <h4>📈 Cost Trend Over Time (Line Chart)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CostCharts;
