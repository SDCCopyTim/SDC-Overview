import React from 'react';
import Axios from 'axios';
import Activities from './Activities.jsx';
import Attractions from './Attractions.jsx';
import Photos from './Photos.jsx';
import Services from './Services.jsx';
import Terrain from './Terrain.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: Math.floor(Math.random() * 100 + 1),
      campsiteName: '',
      campsiteArea: '',
      campsiteState: '',
      campsiteElevation: '',
      campsiteTemperature: '',
      campsiteWeather: '',
      campsiteDistance: '',
    };
    this.getSite = this.getSite.bind(this);
  }

  componentDidMount() {
    this.getSite(this.state.id);
  }

  getSite(id) {
    Axios.get(`/api/sites/${id}`)
      .then((results) => {
        this.setState({
          campsiteName: results.data[0].siteName ? results.data[0].siteName : results.data[0].sitename,
          campsiteArea: results.data[0].siteArea ? results.data[0].siteArea : results.data[0].sitearea,
          campsiteState: results.data[0].siteState ? results.data[0].siteState : results.data[0].sitestate,
          campsiteElevation: results.data[0].elevation,
          campsiteTemperature: results.data[0].temperature,
          campsiteWeather: results.data[0].weather,
          campsiteDistance: results.data[0].distance,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div id="container">
        <div id="main">
          <Services path={this.state.id} campsiteName={this.state.campsiteName} />
          <Activities path={this.state.id} />
          <Terrain
            path={this.state.id}
            campsiteName={this.state.campsiteName}
            campsiteState={this.state.campsiteState}
          />
          <Photos
            path={this.state.id}
            campsiteName={this.state.campsiteName}
            campsiteArea={this.state.campsiteArea}
            campsiteElevation={this.state.campsiteElevation}
            campsiteWeather={this.state.campsiteWeather}
            campsiteTemperature={this.state.campsiteTemperature}
            campsiteDistance={this.state.campsiteDistance}
          />
          <Attractions path={this.state.id} campsiteArea={this.state.campsiteArea} />
        </div>
        <div id="empty" />
      </div>
    );
  }
}
