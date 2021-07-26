import { Component } from "react";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      images: [],
    };
  }

  componentDidMount() {
    if (this.props.images === undefined) {
      this.setState({
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
      });
    } else {
      this.setState({ images: this.props.images });
    }
  }

  changeHandler = (event) => {
    this.setState({ active: +event.target.dataset.dog });
  };

  render() {
    return (
      <div className="carousel">
        <img src={this.state.images[this.state.active]} alt="animal" />
        <div className="carousel-smaller">
          {this.state.images.map((photo, index) => {
            return (
              <img
                onClick={this.changeHandler}
                src={photo}
                key={index}
                data-dog={index}
                className={index === this.state.active ? "active" : ""}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
