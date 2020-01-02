import { Component } from 'react'

export default class Error extends Component {
  static async getInitialProps (props) {
    return {}
  }

  render () {
    return <div>Error page</div>
  }
}
