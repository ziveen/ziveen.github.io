import React from 'react';
import backTop from '../asserts/backTop.png'

export default class BackTop extends React.Component {
  state = {
    showScrollBtn: false
  }
  handleClick = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }
    componentDidMount() {
      window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop
        if(scrollTop > 100) {
          this.setState({
            showScrollBtn: true
          })
        }
      })
    }

  render() {
      const { showScrollBtn } = this.state
        return showScrollBtn ?
            <button
                style={{
                    borderRadius: "50%",
                    height: "60px",
                    width: "60px",
                    position: 'fixed',
                    bottom: "60px",
                    right: "20px",
                    outline: 'none',
                    backgroundColor: '#fff',
                    border: 0
                }}
                onClick={this.handleClick}
            >
                <img src={backTop} />
            </button>
        : null
    }
}
