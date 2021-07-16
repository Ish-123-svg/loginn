import React from "react";
import { ReactMic } from "react-mic";

class SoundRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      soundBlobs: [],
    };
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
  }

  startRecording() {
    this.setState({ record: true });
  }
  stopRecording() {
    this.setState({ record: false });
  }
  render() {
    return <div>SoundRecorder goes here</div>;
  }
}

export default SoundRecorder;
