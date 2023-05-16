import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Loader } from '../../components';
import PropTypes from 'prop-types';

const LineChart = ({ siteVisits, loading }) => {
  // format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}`;
  };

  const labels = siteVisits.map((visit) => formatDate(visit.date)).slice(-8);
  const data = {
    labels: labels.slice(-8),
    datasets: [
      {
        label: 'Traffic',
        data: siteVisits.map((visit) => visit.count).slice(-8),
        fill: false,
        backgroundColor: 'rgb(81, 171, 240)',
        borderColor: 'rgb(54, 100, 227)',
      },
    ],
  };

  if (data.labels.length < siteVisits.length) {
    const updatedLabels = labels.slice(-siteVisits.length);
    updatedLabels.shift();
    data.labels = updatedLabels;
    data.datasets[0].data.shift();
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          fontColor: '#fff',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          fontColor: '#fff',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
      },
    },
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-10 py-5 md:px-5 bg-darkbg rounded-xl md:m-10 m-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              TRAFFIC
            </h2>
          </div>
          <Line data={data} options={options} chart={Chart} />
        </div>
      )}
    </>
  );
};

LineChart.propTypes = {
  siteVisits: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

export default LineChart;
