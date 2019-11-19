import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Textarea, DynamicTextarea } from './components/textarea';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
		console.log('Change content: ' + this.state.value);
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render(){
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
				</header>
				<section className="content">
					<Textarea 
						headline="Name"
						handleSubmit={this.handleSubmit}
					></Textarea>
					<div>
						<label htmlFor="dynamic--textarea">Notes:</label>
					</div>
					<DynamicTextarea
						className="textarea"
						defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
						id="dynamic--textarea"
						maxLength="5000"
						name="pet[notes]"
						onChange={this.handleChange}
						placeholder="Content ..."
					/>
				</section>
				<footer className="App-footer">
					(c) Copyright - Mike Ludemann
				</footer>
			</div>
		);
	}
}

export default App;
