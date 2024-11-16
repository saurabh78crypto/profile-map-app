import React from 'react';  
import { ProgressBar } from 'react-bootstrap';
import '../css/Loader.css'; 

const Loader = ({ loading, progress = 0 }) => {
  if (!loading) return null;

  return (
    <div className="d-flex justify-content-center align-items-center flex-column loader-container">
      {progress < 100 && (
        <div className="loader-progress">
          <ProgressBar
            animated
            now={progress}
            label={`${progress}%`}
            className="custom-progress-bar"
          />
        </div>
      )}
    </div>
  );
};

export default Loader;
