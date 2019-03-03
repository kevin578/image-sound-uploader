import React, { Component } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import firebase from "firebase";

const Body = styled.div`
  padding: 50px;
`;

const ImageContainer = styled.div`
  margin-left: 100px;
`;

const Image = styled.img`
  display: block;
  margin-bottom: 25px;
  width: 200px;
`;

const NoImageMessage = styled.p`
  border: 1px black solid;
  width: 400px;
  height: 300px;
  text-align: center;
  line-height: 250px;
`;

const SoundContainer = styled.div`
  margin-top: 45px;
  margin-left: 100px;
  width: 200px;
  height: 200px;
`;

const Button = styled.button`
  width: 100px;
  height: 20px;
  display: block;
  margin-top: 20px;
`;

const SoundLabel = styled.p``;

class App extends Component {
  state = {
    image: null,
    sound: null,
    soundName: "",
    uploadedImage: null,
    uploadedSound: null
  };

  componentDidMount = () => {
    var storage = firebase.storage();
    storage
      .ref("uploadedPicture")
      .getDownloadURL()
      .then(url => {
        this.setState({ uploadedImage: url });
      });
    storage
      .ref("uploadedSound")
      .getDownloadURL()
      .then(url => {
        this.setState({ uploadedSound: url });
      });
    storage
      .ref("uploadedSound")
      .getMetadata()
      .then(data => {
        this.setState({soundName: data.customMetadata.name});
      })
  };


  getImage = () => {
    if (this.state.uploadedImage) {
      return <Image src={this.state.uploadedImage} onClick = {this.playSound}/>;
    } else {
      return <NoImageMessage>No Image Uploaded.</NoImageMessage>;
    }
  };

  getSoundLabel = () => {
    if (this.state.soundName) {
      return <SoundLabel>Current sound: {this.state.soundName}</SoundLabel>;
    } else {
      return <SoundLabel>No current sound</SoundLabel>;
    }
  };

  handleFile = event => {
    const { name } = event.target;
    const file = event.target.files[0];
    this.setState({
      [name]: file
    });
  };

  playSound = ()=> {
    const sound = new Audio(this.state.uploadedSound);
    sound.play();
  }

  upload = (refName, file) => {
    const metadata = {
      customMetadata: {
        name: file.name
      }
    }
    const ref = firebase
      .storage()
      .ref()
      .child(refName);
    ref.put(file, metadata).then(function(snapshot) {
      window.location.reload();
    });


  };

  render() {
    return (
      <Body>
        <Helmet>
          <title>Image Uploader</title>
        </Helmet>
        <ImageContainer>
          {this.getImage()}
          <input
            type="file"
            name="image"
            label="Upload Image"
            onChange={this.handleFile}
          />
          <Button
            onClick={() => this.upload("uploadedPicture", this.state.image)}
          >
            Upload Picture
          </Button>
        </ImageContainer>
        <SoundContainer>
          {this.getSoundLabel()}
          <input
            type="file"
            name="sound"
            label="Upload Sound"
            onChange={this.handleFile}
          />
          <Button
            onClick={() => this.upload("uploadedSound", this.state.sound)}
          >
            Upload Sound
          </Button>
        </SoundContainer>
      </Body>
    );
  }
}

export default App;
