import React, { Component, useCallback, useEffect, useRef } from 'react';
import PropTypes, { func, number, oneOfType, string } from 'prop-types';

import './textarea.css';

class Textarea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
		console.log('Change content: ' + this.state.value);
	}

	render(){
		let name = this.props.headline.toLowerCase();
		return(
			<form onSubmit={() => this.props.handleSubmit}>
				<label>
					<div>{this.props.headline}</div>
					<textarea value={this.state.value} name={name} onChange={this.handleChange} />
				</label>
				<div>
					<input type="submit" value="Submit" />
				</div>
			</form>
		);
	}
}

Textarea.propTypes = {
	headline: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired
}

// #####################################

export const getHeight = (rows, el) => {
	const {
		borderBottomWidth,
		borderTopWidth,
		lineHeight,
		paddingBottom,
		paddingTop
	} = window.getComputedStyle(el)

	const rowHeight =
		rows == null
			? 0
			: parseFloat(lineHeight) * parseInt(rows, 10) +
				parseFloat(borderBottomWidth) +
				parseFloat(borderTopWidth) +
				parseFloat(paddingBottom) +
				parseFloat(paddingTop)

	const scrollHeight =
		el.scrollHeight + parseFloat(borderBottomWidth) + parseFloat(borderTopWidth)

	return Math.max(rowHeight, scrollHeight)
}

export const resize = (rows, el) => {
	if (el) {
		el.style.height = '0'
		el.style.overflowY = 'hidden'
		el.style.height = `${getHeight(rows, el)}px`
		el.style.overflowY = 'auto'
	}
}

const DynamicTextarea = props => {
	const ref = useRef(null)

	useEffect(() => {
		resize(props.rows, ref.current)
	}, [props.rows, props.value])

	const handleInput = useCallback(
		e => {
			props.onChange(e)
			props.onInput(e)
			resize(props.rows, ref.current)
		},
		[props]
	)

	return <textarea {...props} onInput={handleInput} ref={ref} />
}

DynamicTextarea.propTypes = {
	onChange: func,
	onInput: func,
	rows: oneOfType([number, string]),
	value: string
}

DynamicTextarea.defaultProps = {
	onChange: Function.prototype,
	onInput: Function.prototype
}

// #####################################

export {
  Textarea,
  DynamicTextarea
}
