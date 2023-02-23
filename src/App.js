import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  const handleFileSelect = (event) => {
    const newFiles = [...event.target.files];
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (files.length > 0) {
      setCurrentFileIndex(currentFileIndex + 1);
    }
    startProgress();
  };

  const handleNextFile = () => {
    if (currentFileIndex < files.length) {
      setCurrentFileIndex((prevIndex) => prevIndex + 1);
      startProgress();
    }
  };

  const startProgress = () => {
    let i = 0;
    if (i === 0) {
      i = 1;
      var width = 1;
      var id = setInterval(frame, 15);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          setCurrentPercentage(width);
        }
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Multiple File Upload</h1>
        <input type="file" multiple onChange={handleFileSelect} disabled={currentFileIndex < files.length - 1} />
        {files.length > 0 && (
          <div>
            <h2>Upload Progress:</h2>
            <div>
              {files.map((file, index) => (
                <div key={index}>
                  <p>{file.name}</p>
                  {index <= currentFileIndex && (
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: (currentFileIndex === index ? currentPercentage : 0) + '%',
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {currentFileIndex < files.length - 1 && <button onClick={handleNextFile}>Upload Next File</button>}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
