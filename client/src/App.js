import React from "react";
import Sidebar from './components/Sidebar'
import './styles/App.scss';
import './styles/Sidebar.scss';
import ContentArea from "./components/ContentArea";
function App() {
  return (
    <div className="FleetContainer">
      <Sidebar />
      <ContentArea />
    </div>
  );
}

export default App;
