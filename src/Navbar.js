import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import './Navbar.css';

class Navbar extends Component {
  state = {
    format: 'hex'
  };

  handleChange = e => {
    this.setState({
      format: e.target.value
    });
    this.props.handleChange(e.target.value);
  };

  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;

    return (
      <header className="Navbar">
        <div className="logo">
          <a href="/">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
              trackStyle={{ backgroundColor: 'transparent' }}
              handleStyle={{
                backgroundColor: 'green',
                outline: 'none',
                border: '2px solid green',
                boxShadow: 'none',
                width: '13px',
                height: '13px',
                maringLeft: '-7px',
                marginTop: '-3px'
              }}
              railStyle={{ height: 8 }}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #ffffff </MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255) </MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0) </MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}

export default Navbar;
