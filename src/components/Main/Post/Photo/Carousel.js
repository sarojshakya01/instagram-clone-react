import React from "react";
import ImageSlide from "./ImageSlide";
import Arrow from "./Arrow";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPhoto: 0,
    };
  }

  previousSlide = () => {
    this.setState({ currPhoto: this.state.currPhoto - 1 });
  };

  nextSlide = () => {
    this.setState({ currPhoto: this.state.currPhoto + 1 });
  };

  renderDots = () => {
    const dots = this.props.photoList.map((dot, index) => {
      const myClass = index === this.state.currPhoto ? "dot current" : "dot";
      return <div key={index} className={myClass}></div>;
    });
    return dots;
  };

  render() {
    return (
      <div className="carousel">
        <ImageSlide
          postBy={this.props.postBy}
          photo={this.props.photoList[this.state.currPhoto]}
        />
        {this.state.currPhoto === 0 ? null : (
          <Arrow direction="left" click={this.previousSlide} />
        )}
        {this.state.currPhoto === this.props.photoList.length - 1 ? null : (
          <Arrow direction="right" click={this.nextSlide} />
        )}
        <div className="igpost-image-indicator">{this.renderDots()}</div>
      </div>
    );
  }
}

export default Carousel;
