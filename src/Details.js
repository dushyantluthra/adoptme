import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true, showModal: false };
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.dog}`
    );
    const json = await res.json();
    this.setState({
      loading: false,
      name: json.pets[0].name,
      animal: json.pets[0].animal,
      breed: json.pets[0].breed,
      state: json.pets[0].state,
      city: json.pets[0].city,
      description: json.pets[0].description,
      id: json.pets[0].id,
      images: json.pets[0].images,
    });
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;
    return (
      <div className="details">
        <div>
          <Carousel images={images} />
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {(theme) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme[0] }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>

        {showModal ? (
          <ThemeContext.Consumer>
            {(theme) => (
              <Modal>
                <div className="buttons">
                  <h2>Would you like to adopt {name}</h2>
                  <button
                    style={{ backgroundColor: theme[0] }}
                    onClick={this.adopt}
                  >
                    Yes
                  </button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </Modal>
            )}
          </ThemeContext.Consumer>
        ) : null}
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailsWithRouter {...props} />
    </ErrorBoundary>
  );
}
