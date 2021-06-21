import React from "react";
import axios from "axios";
import ThreatType from "./ThreatType";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false,
      activateButtonText: "Activate FRS",
      medical: false,
      fire: false,
      humanThreat: false,
      threatTypeSubmit: false,
      incidentStartTime: null,
      timeElapsed: "0",
    };
    this.handleActivateFRS = this.handleActivateFRS.bind(this);
    this.handleToggleEmergencyType = this.handleToggleEmergencyType.bind(this);
    this.handleFormatTime = this.handleFormatTime.bind(this);
    this.handleGetTime = this.handleGetTime.bind(this);
  }

  handleActivateFRS() {
    let incidentStartTime = new Date();
    this.setState({
      active: true,
      activateButtonText: "FRS Activated",
      incidentStartTime: incidentStartTime.toLocaleTimeString(),
    });
    axios.get("/activate").then((response) => {
      console.log(response);
      this.handleGetTime();
    });
  }

  handleToggleEmergencyType(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }

  handleFormatTime(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  handleGetTime() {
    const { timeElapsed } = this.state;
    const incidentTime = new Date();
    setInterval((timeElapsed) => {
      let currentTime = new Date();
      let totalTime = currentTime - incidentTime;
      let formattedTime = this.handleFormatTime(totalTime);
      this.setState({ timeElapsed: formattedTime });
      console.log(formattedTime);
    }, 10000);
  }

  render() {
    const { active, activateButtonText } = this.state;
    return (
      <div className="activation-page">
        <button onClick={this.handleActivateFRS}>{activateButtonText}</button>
        {active && (
          <ThreatType
            handleToggleEmergencyType={this.handleToggleEmergencyType}
          />
        )}
      </div>
    );
  }
}

export default App;
