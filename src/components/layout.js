import React from "react"
import { Link } from "gatsby"
import Bio from './bio'
import Toggle from "./toggle"
import moon from '../asserts/moon.png'
import sun from '../asserts/sun.png'

import { rhythm } from "../utils/typography"
import BackTop from "./backtop"

class Layout extends React.Component {
  state = {
    theme: null
  }

  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  renderToggle () {
    return  this.state.theme !== null ? (
        <Toggle
          icons={{
            checked: (
              <img
                src={moon}
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
            unchecked: (
              <img
                src={sun}
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
          }}
          checked={this.state.theme === 'dark'}
          onChange={e =>
            window.__setPreferredTheme(
              e.target.checked ? 'dark' : 'light'
            )
          }
        />
      ) : (
        <div style={{ height: '24px' }} />
      )
  }
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h3
          style={{
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            paddingTop: 0
          }}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.625rem',
            }}
          >{header}{this.renderToggle()}</header>
          <Bio/>
          <main>{children}</main>
          <BackTop />
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
