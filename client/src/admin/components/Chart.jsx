import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registering the components required for our chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChart = () => {
    // Dummy data for monthly sales
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Total Sales per Month',
                data: [0, 10000, 5000, 15000, 20000, 30000, 25000, 40000, 35000, 30000, 45000, 50000],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },

        },
        // Maintain aspect ratio of the chart within its container
        maintainAspectRatio: false,
    };

    // Render the Line component with data and options passed as props
    return (
        <div style={{ width: '100%', height: '300px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;