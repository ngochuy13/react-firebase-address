/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/places/SearchBox";
import { FormattedMessage } from 'react-intl';

export const INPUT_STYLE = {
};

const SearchBoxExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    disableDefaultUI={true}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_CENTER}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Location"
      inputStyle={INPUT_STYLE}
      inputClassName={'custom-input '+props.inputClassName}
    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
));


/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export class SearchBoxGoogle extends Component {

  state = {
    bounds: null,
    center: {
      lat: 10.804337,
      lng: 106.6860069,
    },
    markers: [],
  };

  componentWillMount() {
    if (this.props.defaultValue) {
      const markers = [{
        position: { lat: parseFloat(this.props.defaultValue.latitude), lng: parseFloat(this.props.defaultValue.longitude) },
      }];

      // Set markers; set map center to first search result
      const mapCenter = { lat: parseFloat(this.props.defaultValue.latitude), lng: parseFloat(this.props.defaultValue.longitude) };

      this.setState({
        center: mapCenter,
        markers,
      });
      const seft = this;
      setTimeout(function(){
        document.querySelectorAll('.' + (seft.props.inputClassName || 'custom-input'))[0].value = seft.props.defaultValue.address
      },300);
    }
  }

  // handleMapMounted = this.handleMapMounted.bind(this);
  // handleBoundsChanged = this.handleBoundsChanged.bind(this);
  // handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  // handlePlacesChanged = this.handlePlacesChanged.bind(this);

  handleMapMounted = (map) => {
    this._map = map;
  }

  handleBoundsChanged = () => {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted = (searchBox) => {
    this._searchBox = searchBox;
  }

  handlePlacesChanged = () => {
    const places = this._searchBox.getPlaces();
    // Add a marker for each place returned from search bar
    if (typeof this.props.setPlace === 'function') {
      this.props.setPlace(places[0]);
    }
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));
    console.log(markers);
    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers,
    });
  }

  render() {
    return (
      <div className="group-map">
        <SearchBoxExampleGoogleMap
          containerElement={
            <div style={{ height: `200px`, width: '100%' }} />
          }
          mapElement={
            <div style={{ height: `200px`, width: '100%' }} />
          }
          center={this.state.center}
          onMapMounted={this.handleMapMounted}
          onBoundsChanged={this.handleBoundsChanged}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged}
          markers={this.state.markers}
          inputClassName={this.props.inputClassName || 'custom-input'}
        />
      </div>
    );
  }
}
