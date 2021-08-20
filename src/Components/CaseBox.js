import Modal from 'react-modal'
import React, { Component } from 'react'
import CaseService from '../Services/CaseService'
import ReactPlayer from 'react-player'

Modal.setAppElement('#root')
class CaseBox extends Component {

  constructor() {

    super()
    this.state = {
      modalIsOpen: false,
      medicalCase: {
        instructions: []
      }
    }


  }
  setmodalIsOpen(param) {
    this.setState({
      modalIsOpen: param
    })
    if (param) {
      this.callCase()
    }
  }



  callCase() {
    CaseService.getSpecificCase(this.props.title).then((res) => {
      this.setState({ medicalCase: res.data })
    });

  }
  playAudio(audioNum) {
    this.stopAnyCurrentlyPlayingAudio()
    let audioEl = document.getElementsByClassName(audioNum)[0]
    audioEl.play()

  }

  stopAnyCurrentlyPlayingAudio() {
    for (const audio of document.querySelectorAll('audio')) {
      audio.pause()
      audio.currentTime = 0;
    }
  }

  render() {


    return (

      <div className="caseBox">
        <div onClick={() => this.setmodalIsOpen(true)}>
          <header className="caseTitle">
            <h3>{this.props.title}</h3>
          </header>
          <img src={process.env.PUBLIC_URL + this.props.image} alt="CaseImage" width="200" height="150" />
        </div>
        <Modal isOpen={this.state.modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={() => this.setmodalIsOpen(false)}
          style={
            {
              overlay: {
                backgroundColor: 'transparent'
              },
              content: {
                borderRadius: '60px'
              }
            }
          }>

          <div className="caseModal">
            <img className="xclose" onClick={() => this.setmodalIsOpen(false)} src={process.env.PUBLIC_URL + '/images/close.png'} alt="logo" width="20" height="20"></img>
            <h2> {this.props.title} </h2>
                 
            <p>{this.state.medicalCase.description}</p>
            <ReactPlayer className="caseVideo" url={this.state.medicalCase.videoUrl} controls={true} width='640px' height='360px' />
            <h4>:שלבים לביצוע</h4>
            <ol>
              {

                this.state.medicalCase.instructions.map(
                  item => <div key={item.id} onClick={() => this.playAudio(item.id)}>
                    <li key={item.id}> {item.text}</li>
                    <audio className={item.id}>
                      <source src={process.env.PUBLIC_URL + '/audios/' + item.voiceUrl}></source>
                    </audio>

                  </div>)
              }
            </ol>
          </div>
        </Modal>
      </div>
    );


  }
}

export default CaseBox
