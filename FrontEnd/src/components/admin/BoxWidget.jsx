import PropTypes from 'prop-types';

const BoxWidget = ({ heading, value, icon }) => {
  return (
    <div className="bg-gray-900 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-medium mb-4 text-white">{heading}</h2>
      <p className="text-4xl font-bold text-white flex justify-between items-center">
        <span>{value}</span>
        <i className={`${icon} text-4xl text-white`}></i>
      </p>
    </div>
  );
};

BoxWidget.propTypes = {
  heading: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default BoxWidget;
