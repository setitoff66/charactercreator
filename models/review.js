import React, {Component} from 'react';
import axios from 'axios';

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: {reviews: []},
      review: {
        name: '',
        reviewText: '',
        rating: 3,
      },
      avgRating: 0,
    };
  }

  componentDidMount = () => {
    console.log(this.props.match.params._id);
    axios
      .get(`/localhost:8000/api/characters/${this.props.match.params._id}`)
      .then((res) => {
        let reviews = res.data.character.reviews;
        let s = 0;
        for (let review of reviews) {
          s += review.rating;
        }
        let avg = s / reviews.length;
        this.setState({
          character: res.data.character,
          avgRating: avg,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  review = (e) => {
    e.preventDefault();
    axios
      .post(
        `/localhost:8000/api/reviews/${this.props.match.params._id}`,
        this.state.review
      )
      .then((res) => {
        console.log(res);
        this.componentDidMount();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  change = (key, e) => {
    let r = {...this.state.review};
    r[key] = e.target.value;
    this.setState({review: r});
  };

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <img
            src={this.state.character.image}
            alt="the character"
            className="aligntop"
          />
          <span className="aligntop">
            <h1>{this.state.character.name}</h1>
            <p>${this.state.character.price}</p>
            <p>{this.state.character.source}</p>
            <p>{this.state.character.description}</p>
            <p>
              Average Rating: {Math.round(this.state.avgRating * 100) / 100}
            </p>
          </span>
        </div>
        <hr />
        {this.state.character.reviews.map((review) => (
          <div key={review._id}>
            <span>
              <strong>{review.name} says:</strong> {review.reviewText} &nbsp;
            </span>
            <span>Rating: {review.rating}</span>
            <hr />
          </div>
        ))}
        <fieldset>
          <legend>New Review</legend>
          <form onSubmit={this.review}>
            <div className="form-group">
              <label>Your Name:</label>
              <input
                type="text"
                onChange={this.change.bind(this, 'name')}
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Your Review:</label>
              <input
                type="text"
                onChange={this.change.bind(this, 'reviewText')}
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Your Rating:</label>
              <select onChange={this.change.bind(this, 'rating')}>
                <option value="5">★★★★★</option>
                <option value="4">☆★★★★</option>
                <option value="3" selected>
                  ☆☆★★★
                </option>
                <option value="2">☆☆☆★★</option>
                <option value="1">☆☆☆☆★</option>
              </select>
            </div>
            <input type="submit" />
          </form>
        </fieldset>
      </div>
    );
  }
}

export default Review;
