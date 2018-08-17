import _ from 'lodash'; // for throttling/debouncing 
import React, { Component } from 'react';
import './App.css';

// Need create our own config.js file and export  
// const apiKey = 'your_apiKey';
// export default apiKey;

import apiKey from './config'

import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetails from './components/VideoDetails';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('disturbed sound of silence')
  }

  videoSearch(term) {
    YTSearch({key: apiKey, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce(term => this.videoSearch(term),300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetails video={ this.state.selectedVideo } />
        <VideoList
          onVideoSelect={ selectedVideo => this.setState({selectedVideo})}
          videos={ this.state.videos } />
      </div>
    );
  }
}
