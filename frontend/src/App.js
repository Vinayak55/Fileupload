import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from 'react-bootstrap';
import Filedetails from './components/Filedetails';


class App extends Component {
// fetchdata
const = <Filedetails />
  state = {
    title: '',
    uploadPercentage:0,
    image: null
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('title', this.state.title);
    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        console.log( `${loaded}kb of ${total}kb | ${percent}%` );

        if( percent < 100 ){
          this.setState({ uploadPercentage: percent })
        }
      }
    }
    let url = 'http://localhost:8000/api/';
    axios.post(url, form_data,options, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          this.setState({ uploadPercentage: 100 }, ()=>{
            setTimeout(() => {
              this.setState({ uploadPercentage: 0 })
            }, 1000);
          })
        })
        .catch(err => console.log(err))
  };

  render() {
    const {uploadPercentage} = this.state;
  
    return (
      <div className="App" class="col-sm-3 mr-3 mt-3">
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <input class="form-control" type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
          </div>
          <div class="form-group">
            <input class="form-control" type="file" 
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
                   { uploadPercentage > 0 && <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`} /> }
          </div>
          <input class="btn btn-primary mr-2" type="submit" value="Upload"/>
        </form>
          <Filedetails />      
      </div>
    );
  }
}

export default App;