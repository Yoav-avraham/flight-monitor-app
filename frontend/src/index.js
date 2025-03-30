import React from 'react'; //import react lib
import ReactDOM from 'react-dom/client'; //Import the ReactDOM library for rendering the app in the DOM
import './index.css';// Import the CSS file for styling the app
import App from './App';// Import the App component, which is the main component of the app
import reportWebVitals from './reportWebVitals';// Import the reportWebVitals function to measure performance

const root = ReactDOM.createRoot(document.getElementById('root'));// Create the root element for the React app
// Render the app inside the root element, wrapped in React.StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
