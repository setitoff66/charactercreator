/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {Component} from 'react';
import FileUpload from './FileUpload';
import axios from 'axios';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCharacter: {
        name: '',
        charType: 'default',
        skill: '',
        image: 'default',
      },
      errors: {},
    };
  }

  componentDidMount = () => {
    console.log(this.props.match.params._id);
    axios
      .get(`/api/characters/${this.props.match.params._id}`)
      .then((res) => {
        this.setState({character: res.data.character});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  change = (key, e) => {
    let c = {...this.state.character};
    c[key] = e.target.value;
    this.setState({character: c});
  };

  fileChange = (image) => {
    let c = {...this.state.character, image: image};
    this.setState({character: c});
  };

  updateCharacter = (e) => {
    e.preventDefault();
    axios
      .put(`/api/characters/${this.state.character._id}`, this.state.character)
      .then((res) => {
        if (res.data.errors) {
          this.setState({errors: res.data.errors.errors});
        } else {
          this.props.history.push('/');
        }
      });
  };

  render() {
    return (
      <form onSubmit={this.updateCharacter}>
        <div className="form-group">
          <label>Character Name:</label>
          <input
            type="text"
            onChange={this.change.bind(this, 'name')}
            value={this.state.character.name}
          />
          {this.state.errors.name ? (
            <p>{this.state.errors.name.message}</p>
          ) : (
            ''
          )}
        </div>

        <div className="form-group">
          <label>Character Class:</label>
          <select value={this.state.charType}>
            <option value="warrior">Warrior</option>
            <option value="siren">Siren</option>
            <option value="berserker">Berserker</option>
            <option value="demolitionist">Demolitionist</option>
            <option value="sniper">Sniper</option>
          </select>
        </div>

        <div className="form-group">
          <label>Character Source:</label>
          <input
            type="text"
            onChange={this.change.bind(this, 'source')}
            value={this.state.character.source}
          />
        </div>

        <div className="form-group">
          <label>
            <img
              src={this.state.character.image}
              alt="character image"
              width="100px"
            />
          </label>
          <FileUpload onUpload={this.fileChange} />
        </div>

        <input type="submit" className="btn-submit" value="Update" />
      </form>
    );
  }
}

export default Edit;
