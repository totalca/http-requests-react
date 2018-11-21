import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import UserForm from './component/UserForm';

class App extends Component {
  state = {
    name: null,
    location: null,
    avatar_url: null
  }

  getUser = (e) => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    if (user) {
      axios
      .get(`https://api.github.com/users/${user}`)
      .then((res) => {
        // console.log(res);
        const name = res.data.name;
        this.setState({ name: name });

        const location = res.data.location;
        this.setState({ location: location });

        const avatar_url = res.data.avatar_url;
        this.setState({ avatar_url: avatar_url });

        const html_url = res.data.html_url;
        this.setState({ html_url: html_url });
      })
    } else return;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HTTP Requests</h1>
        </header>
        <h2>Find a GitHub user</h2>
        <UserForm getUser={this.getUser}/>
        { this.state.avatar_url
          ? <p><img src={this.state.avatar_url} alt="Avatar" width="350px" height="350px"></img></p> 
          : null
        }
        { this.state.name
          ? <p>Name: <a href={this.state.html_url}><strong>{this.state.name}</strong></a></p> 
          : <p>*Please enter a username</p> 
        }
        { this.state.location
          ? <p>Location: <strong>{this.state.location}</strong></p> 
          : null
        }
      </div>
    );
  }
}

export default App;