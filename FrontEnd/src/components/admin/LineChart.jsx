import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Loader } from '..';
import PropTypes from 'prop-types';

const LineChart = ({ siteVisits, loading }) => {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Traffic',
        // data: siteVisits.map((visit) => {
        //   const date = new Date(visit.date);
        //   const dayOfWeek = date.toLocaleDateString('en-US', {
        //     weekday: 'short',
        //   });
        //   index.indexOf(dayOfWeek);
        //   return visit.count;
        // }),
        data: siteVisits.map((visit) => visit.count),
        fill: false,
        backgroundColor: 'rgb(81, 171, 240)',
        borderColor: 'rgb(54, 100, 227)',
        // cubicInterpolationMode: 'monotone',
      },
    ],
  };

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
      // elements: {
      //   line: {
      //     tension: 0.4,
      //   },
      // },
    },
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-10 py-5 md:px-5 bg-darkbg rounded-xl m-10">
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
