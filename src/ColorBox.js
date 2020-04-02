import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import './ColorBox.css';

const styles = {
    ColorBox: {
        width: '20%',
        height: props => (props.showingFullPalette ? '25%' : '50%'),
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5p',
        '&:hover button': {
            opacity: 1
        }
    },
    copyText: {
        color: props =>
            chroma(props.background).luminance() >= 0.7 ? 'black' : 'white'
    },

    colorName: {
        color: props =>
            chroma(props.background).luminance() <= 0.08 ? 'white' : 'black'
    },
    seeMore: {
        color: props =>
            chroma(props.background).luminance() >= 0.7
                ? 'rgba(0,0,0,0.6)'
                : 'white',
        background: 'rgb(255, 255, 255, 0.3)',
        position: 'absolute',
        border: 'none',
        right: '0px',
        bottom: '0px',

        width: '60px',
        height: '30px',
        textTransform: 'uppercase',
        lineHeight: '30px',
        textAlign: 'center'
    },

    copyButton: {
        color: props =>
            chroma(props.background).luminance() >= 7
                ? 'rgba(0,0,0,0.5)'
                : 'white',
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        outline: 'none',
        background: 'rgb(255, 255, 255, 0.3)',
        lineHeight: '30px',
        textTransform: 'uppercase',
        border: 'none',
        textDecoration: 'none',
        opacity: 0
    },

    boxContent: {
    position: "absolute",
    left: "0px",
    padding: "10px",
    bottom: "0px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px"
    }
};

class ColorBox extends Component {
    state = {
        copied: false
    };

    changeCopyState = () => {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        });
    };
    render() {
        const {
            name,
            background,
            moreUrl,
            showingFullPalette,
            classes
        } = this.props;
        const { copied } = this.state;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div
                        style={{ background }}
                        className={`copy-overlay ${copied && 'show'}`}
                    />
                    <div className={`copy-msg ${copied && 'show'}`}>
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>
                            {this.props.background}
                        </p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}
export default withStyles(styles)(ColorBox);
