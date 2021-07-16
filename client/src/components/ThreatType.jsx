import React from "react";
import TextDescription from "./TextDescription";
import SoundRecorder from "./SoundRecorder";
import VideoRecorder from "./VideoRecorder";

class ThreatType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textDescription: "",
      soundRecording: null,
      videoRecording: null,
      descriptionOptions: {
        showTextDescription: false,
        showSoundRecorder: false,
        showVideoRecorder: false,
      },
    };
    this.showUnshowOption = this.showUnshowOption.bind(this);
  }

  showUnshowOption(e) {
    e.preventDefault();
    const options = this.state.descriptionOptions;
    for (let key in options) {
      if (key === e.target.name) {
        options[key] = !options[key];
      } else {
        options[key] = false;
      }
    }
  }

  render() {
    const { handleToggleEmergencyType } = this.props;
    const { showTextDescription, showSoundRecorder, showVideoRecorder } =
      this.state.descriptionOptions;
    return (
      <div className="threat-type">
        {showVideoRecorder && <VideoRecorder />}
        <button name="showVideoRecorder" onClick={this.showUnshowOption}>
          Take Video
        </button>
        {showSoundRecorder && <SoundRecorder />}
        <button name="showSoundRecorder" onClick={this.showUnshowOption}>
          Record Sound
        </button>
        {showTextDescription && <TextDescription />}
        <button name="showTextDescription" onClick={this.showUnshowOption}>
          Write Text Description
        </button>
      </div>
    );
  }
}

export default ThreatType;
