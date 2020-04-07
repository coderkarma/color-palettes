import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import "rc-slider/assets/index.css";

import Slider from "rc-slider";
// import "./Navbar.css";

const styles = {
    Navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh",
    },
    logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#eceff1",
        fontFamily: "Roboto",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
            textDecoration: "none",
            color: "black",
        },
    },

    slider: {
        width: "340px",
        margin: "0 10px",
        display: "inline-block",
    },
};

class Navbar extends Component {
    state = {
        format: "hex",
        open: false,
    };

    handleFormatChange = (e) => {
        this.setState({
            format: e.target.value,
            open: true,
        });
        //this.props.handleChange(e.target.value);
    };

    closeSnackbar = () => {
        this.setState({
            open: false,
        });
    };
    render() {
        const { level, changeLevel, showingAllColors, classes } = this.props;
        const { format } = this.state;

        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to="/">Reactcolorpicker</Link>
                </div>
                {showingAllColors && (
                    <div className="slider-container">
                        <span>level: {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                                trackStyle={{ backgroundColor: "transparent" }}
                                handleStyle={{
                                    backgroundColor: "green",
                                    outline: "none",
                                    border: "2px solid green",
                                    boxShadow: "none",
                                    width: "13px",
                                    height: "13px",
                                    maringLeft: "-7px",
                                    marginTop: "-3px",
                                }}
                                railStyle={{ height: 8 }}
                            />
                        </div>
                    </div>
                )}
                <div className="select-container">
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff </MenuItem>
                        <MenuItem value="rgb">
                            RGB - rgb(255, 255, 255)
                        </MenuItem>
                        <MenuItem value="rgba">
                            RGBA - rgba(255, 255, 255, 1.0)
                        </MenuItem>
                    </Select>
                </div>

                <Snackbar
                    onClose={this.closeSnackbar}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={
                        <span id="message-id">
                            Format Changed To {format.toUpperCase()}
                        </span>
                    }
                    ContentProps={{
                        "aria-describedby": "message-id",
                    }}
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar}
                            color="inherit"
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);
