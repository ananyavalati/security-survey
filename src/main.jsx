
// ReactDOM connects React to the real HTML page in the browser.
// The "client" version is used for browser apps.
import ReactDOM from "react-dom/client";

// Root componenet that contains the whole app.
import App from "./App.jsx";

// Import global CSS styles that apply to the whole app (fonts, body styles, etc).
import "./index.css";

// Starts React app by putting main <App /> component inside the root div on the page.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);


