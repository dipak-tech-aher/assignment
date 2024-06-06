import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ProgressBar = ({ progress, error }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{
        width: '100%',
        height: '30px',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: error ? '#ff4d4d' : '#76c7c0',
          transition: 'width 0.3s ease'
        }}></div>
      </div>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

const APIProgressBar = ({ urls }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const cancelTokens = useRef([]);

  const fetchWithProgress = async (url, cancelToken) => {
    try {
      const response = await axios.get(url, {
        cancelToken: cancelToken.token,
        onDownloadProgress: (event) => {
          const total = event.total || 1;
          const currentProgress = (event.loaded / total) * 100;
          setProgress((prevProgress) => Math.min(prevProgress + currentProgress / urls.length, 100));
        }
      });
      return response.data;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        throw err;
      }
    }
  };

  const fetchData = async () => {
    try {
      setProgress(0);
      setError(null);
      const promises = urls.map((url) => {
        const cancelToken = axios.CancelToken.source();
        cancelTokens.current.push(cancelToken);
        return fetchWithProgress(url, cancelToken);
      });
      await Promise.all(promises);
    } catch (err) {
      setError(err);
    }
  };

  const cancelAllRequests = () => {
    cancelTokens.current.forEach((cancelToken) => cancelToken.cancel('Operation canceled by the user.'));
  };

  useEffect(() => {
    fetchData();
    return () => {
      cancelAllRequests();
    };
  }, [urls]);

  return (
    <div>
      <ProgressBar progress={progress} error={error} />
      {error && <button onClick={fetchData}>Retry</button>}
      <button onClick={cancelAllRequests}>Cancel All Requests</button>
    </div>
  );
};

export default APIProgressBar;
