import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const Graph = ({ expenses }) => {
  const [dates, setDates] = useState([]);
  const [months, setMonths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoricalAmount, setCategoricalAmount] = useState([]);
  const [weeklyAmounts, setWeeklyAmounts] = useState([]);
  const [monthlyAmounts, setMonthlyAmounts] = useState([]);

  useEffect(() => {
    const oneWeekAgo = new Date();
    const oneMonthAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const categoricalExpense = expenses.reduce((acc, expense) => {
      if (acc[expense.tag]) {
        acc[expense.tag] += expense.amount;
      } else {
        acc[expense.tag] = expense.amount;
      }
      return acc;
    }, {});

    const lastWeekExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= oneWeekAgo;
    });

    const lastMonthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= oneWeekAgo;
    });
    // console.log(lastWeekExpenses);
    // console.log(lastMonthExpenses);
    setCategories(Object.keys(categoricalExpense));
    setCategoricalAmount(Object.values(categoricalExpense));
    setDates(
      lastWeekExpenses.map((expense) =>
        moment(expense.createdAt).format("dddd")
      )
    );
    setWeeklyAmounts(lastWeekExpenses.map((expense) => expense.amount));
    setMonths(
      lastMonthExpenses.map((expense) =>
        moment(expense.createdAt).format("MMMM")
      )
    );
    setMonthlyAmounts(lastMonthExpenses.map((expense) => expense.amount));
  }, [expenses]);
  const doughnutData = {
    labels: categories,
    datasets: [
      {
        label: "Expense Overview by Tag",
        data: categoricalAmount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        hoverOffset: 30,
        datalabels: {
          align: "end",
          anchor: "end",
        },
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    responsive: true,
    radius: 120,
    plugins: {
      labels: {
        render: "value",
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: "hsl(0, 0%, 98%)",
        display: function (context) {
          return context;
        },
        formatter: function (value, context) {
          return "৳ " + value;
        },
        font: {
          family: "Axiforma",
          size: "16px",
          weight: "bold",
        },
      },
    },
  };
  const barOptions = {
    aspectRatio: 1 | 2,
    responsive: true,
    plugins: {
      labels: {
        render: "value",
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: "hsl(0, 0%, 98%)",
        display: function (context) {
          return context;
        },
        formatter: function (value, context) {
          return "৳ " + value;
        },
        font: {
          family: "Axiforma",
          size: "16px",
          weight: "bold",
        },
      },
    },
  };

  const options = {
    scales: {
      y: {
        color: "white",
      },
    },
  };
  const weeklyData = {
    color: "white",
    labels: dates,
    datasets: [
      {
        label: "Weekly expenses",
        data: weeklyAmounts,
        fill: true,
        backgroundColor: "rgba(0,0,0,0)",
        // borderColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: "#00a8cc",
      },
    ],
  };
  const monthlyData = {
    labels: months,
    datasets: [
      {
        label: "Monthly expenses",
        data: monthlyAmounts,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return (
    <div className="col-span-2 grid grid-cols-2 gap-4 text-text flex-1">
      <div className="col-span-2 p-8 rounded-lg bg-gradient-to-bl from-blue-gray-800 via-blue-gray-900 to-blue-gray-900">
        <Bar options={barOptions} data={doughnutData} />
      </div>
      <div className="col-span-1 p-8 rounded-lg backdrop-blur-md bg-gradient-to-bl from-blue-gray-800 via-blue-gray-900 to-blue-gray-900">
        <Line options={options} data={weeklyData} />
      </div>
      <div className="col-span-1 p-8 rounded-lg bg-gradient-to-bl from-blue-gray-800 via-blue-gray-900 to-blue-gray-900">
        <Line options={options} data={monthlyData} />
      </div>
    </div>
  );
};
