import React from 'react';
import styled from 'styled-components';

const ImagesContainer = styled.div`
  margin: 5px 0;
  width: 415px;
  padding: 12px 0;
`

const LargeImageContainer = styled.div`
  position: relative;
`

const LargeImage = styled.img`
  width: 415px;
  height: 315px;
  object-fit: cover;
`

const ThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 2px;
  position: relative;
`

const ThumbnailPhoto = styled.img`
  opacity: 0.5;
  width: 50px;
  height: 50px;
  &:hover {
    opacity: 1;
  }
`

const FullViewButton = styled.button`
  &:hover {
    opacity: 0.7;
    }
  opacity: 0;
  position: absolute;
  top: 40%;
  left: 35%;
  background-color: #555;
  color: white;
  font-size: 16px;
  padding: 24px 24px;
  border: none;
  border-radius: 5px;
  outline: none;
`

const LeftCarouselButton = styled.button`
  position: absolute;
  opacity: 0.7;
  &:hover {
    opacity: 0.9;
  }
  top: 40%;
  left: 0;
  background-color: #555;
  color: white;
  font-size: 16px;
  padding: 24px 24px;
  border: none;
  border-radius: 5px;
  outline: none;
  z-index: 6;
`

const RightCarouselButton = styled.button`
  position: absolute;
  opacity: 0.7;
  &:hover {
    opacity: 0.9;
  }
  top: 40%;
  right: 0;
  background-color: #555;
  color: white;
  font-size: 16px;
  padding: 24px 24px;
  border: none;
  border-radius: 5px;
  outline: none;
  z-index: 6;
`

const ImagePopOutContainer = styled.div`
  position:absolute;
  z-index: 2;
  top: 20%;
  left: 50%;
  height: 1000px;
  width: 1400px;
  background-color: grey;
`

const ImagePopOut = styled.img`
  position: absolute;
  top: 10%;
  left: 7%;
  width: 1200px;
  height: 800px;
  z-index: 4;
`

const ExitButton = styled.button`
  position: absolute;
  background: none;
  outline: none;
  color: black;
  right: 0;
  font-size: 50px;
  z-index: 6;
  border: none;
`

class Images extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentPhotoIndex: 0,
      popoutPhotoIndex: 0,
      popout: false
    }
  }


  changePhoto(change, type) {
    this.setState((prevState) => {
      if (type === 'popout') {
        return {
          popoutPhotoIndex: change === 'next' ? prevState.popoutPhotoIndex + 1 : prevState.popoutPhotoIndex -1
        }
      } else {
        return {
        currentPhotoIndex: change === 'next' ? prevState.currentPhotoIndex + 1 : prevState.currentPhotoIndex -1
        }
      }
    })
  }

  handleThumbnailClick(photoIndex) {
    this.setState({
      currentPhotoIndex: photoIndex
    })
  }

  handlePopOut(photoIndex) {
    this.setState({
      popoutPhotoIndex: photoIndex,
      popout: true
    })
  }

  handleExitClick() {
    this.setState({
      popout: false
    })
  }

  render () {
    return (
      <ImagesContainer>
        <LargeImageContainer>
          <LargeImage src={this.props.images[this.state.currentPhotoIndex]}/>
          <LeftCarouselButton style={{display: this.state.currentPhotoIndex === 0 ? "none" :  "block" }} onClick={this.changePhoto.bind(this, 'previous', 'current')}>{String.fromCharCode(10094)}</LeftCarouselButton>
          <FullViewButton onClick={this.handlePopOut.bind(this, this.state.currentPhotoIndex)}>Full View</FullViewButton>
          <RightCarouselButton style={{display: this.state.currentPhotoIndex === this.props.images.length - 1 ? "none" :  "block" }} onClick={this.changePhoto.bind(this, 'next')}>{String.fromCharCode(10095)}</RightCarouselButton>
        </LargeImageContainer>
        <ThumbnailContainer>
          {this.props.images.map((image, index) => {
            if (image === this.props.images[this.state.currentPhotoIndex]){
              return (
              <ThumbnailPhoto onClick={this.handleThumbnailClick.bind(this, index)} key={index} src={image} style={{opacity: 1}}/>
              )
            }
            return (
              <ThumbnailPhoto onClick={this.handleThumbnailClick.bind(this, index)} key={index} src={image} />
            )
          })}
        </ThumbnailContainer>
        <ImagePopOutContainer style={{display: this.state.popout ? "block" : "none", }}>
          <ImagePopOut src={this.props.images[this.state.popoutPhotoIndex]} />
          <ExitButton onClick={this.handleExitClick.bind(this)}>{String.fromCharCode(10005)}</ExitButton>
          <LeftCarouselButton style={{display: this.state.popoutPhotoIndex === 0 ? "none" :  "block", left: "7%" }} onClick={this.changePhoto.bind(this, 'previous', 'popout')}>{String.fromCharCode(10094)}</LeftCarouselButton>
          <RightCarouselButton style={{display: this.state.popoutPhotoIndex === this.props.images.length - 1 ? "none" :  "block", right: "7%"}} onClick={this.changePhoto.bind(this, 'next', 'popout')}>{String.fromCharCode(10095)}</RightCarouselButton>
        </ImagePopOutContainer>
      </ImagesContainer>
    )
  }
}

export default Images;