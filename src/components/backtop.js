import React from 'react';

export default class BackTop extends React.Component {
  handleClick = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }
    render() {
        return (
            <button 
                style={{
                    borderRadius: "50%",
                    height: "60px",
                    width: "60px",
                    position: 'fixed',
                    bottom: "60px",
                    right: "20px",
                    backgroundColor: "#409eff",
                    color: "#fff",
                    outline: 'none',
                    border: 0
                }}
                onClick={this.handleClick}
            >
                <img src='../asserts/backTop.svg' />
            </button>
        )
    }
}