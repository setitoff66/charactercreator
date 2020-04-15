import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  // sortCharacters(arr) {
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = 0; j < arr.length - i - 1; j++) {
  //       if (arr[j].avgRating < arr[j + 1].avgRating) {
  //         let temp = arr[j];
  //         arr[j] = arr[j + 1];
  //         arr[j + 1] = temp;
  //       }
  //     }
  //   }
  //   return arr;
  // }

  componentDidMount = () => {
    axios
      .get('localhost:3000/api/characters')
      .then((res) => {
        //simple method to remove
        console.log(res);
        this.setState({characters: res.data.characters});

        // let characters = res.data.characters;
        //   for (let i = 0; i < characters.length; i++) {
        //     let c = 0;
        //     for (let review of characters[i].reviews) {
        //       c += review.rating;
        //     }
        //     let rating =
        //       Math.round((c / characters[i].reviews.length) * 100) / 100;
        //     if (isNaN(rating)) {
        //       characters[i].avgRating = 0;
        //     } else {
        //       characters[i].avgRating = rating;
        //     }
        //   }
        //   this.setState({characters: this.sortCharacters(characters)});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete = (_id) => {
  // axios
  //   .delete(`/api/characters/${_id}`)
  //   .then((res) => {
  //     console.log(res);
  //     this.componentDidMount();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };

  render() {
    return (
      <>
        {this.state.characters.map((character) => (
          <div key={character._id} className="character">
            <img src={character.image} alt={character.name} height="100px" />
            <span style={{display: 'flex'}}>
              <h3>{character.name}</h3>
              &nbsp;&nbsp;
              <p>{character.avgRating}</p>
              &nbsp;&nbsp;
              <p>{character.description}</p>
            </span>
            {/* <span>
              <Link to={`/character/${character._id}`}>Review</Link>
              &nbsp;
              <Link to={`/edit/${character._id}`}>Edit</Link>
              &nbsp;
              <a href="#!" onClick={this.delete.bind(this, character._id)}>
                Delete
              </a>
            </span> */}
          </div>
        ))}
      </>
    );
  }
}

export default Home;
