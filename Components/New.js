import React, {Component} from 'react';
// import FileUpload from './FileUpload';
import axios from 'axios';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCharacter: {
        name: '',
        charType: '',
        description: '',
        image: '',
      },
      errors: {},
    };
  }

  change = (key, e) => {
    let c = {...this.state.newCharacter};
    c[key] = e.target.value;
    this.setState({newCharacter: c});
  };

  fileChange = (image) => {
    let c = {...this.state.newCharacter, image: image};
    this.setState({newCharacter: c});
  };

  makeCharacter = (e) => {
    e.preventDefault();
    axios
      .post('localhost:3000/api/character', this.state.newCharacter)
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
      <form onSubmit={this.makeCharacter}>
        <div className="form-group">
          <label>Character Name:</label>
          <input type="text" onChange={this.change.bind(this, 'name')} />
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
            <option default value="default">
              Chose class
            </option>
            <option value="berserker">Berserker</option>
            <option value="demolitionist">Demolitionist</option>
            <option value="sniper">Sniper</option>
          </select>
        </div>

        {/* <div className="form-group">
          <label>Character Image:</label>
          <FileUpload onUpload={this.fileChange} />
        </div> */}

        <input type="submit" className="btn-submit" />
      </form>
    );
  }
}

export default New;
