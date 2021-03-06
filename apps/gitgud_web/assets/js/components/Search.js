import React from "react"
import {QueryRenderer, graphql} from "react-relay"

import environment from "../relay-environment"

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {input: ""}
    this.dropdown = React.createRef()
    this.inputContainer = React.createRef()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.renderSearchResult = this.renderSearchResult.bind(this)
  }

  render() {
    return (
      <div className="search dropdown" ref={this.dropdown}>
        <div className="control has-icons-right">
          <input type="text" className="input is-rounded is-small" ref={this.inputContainer} onChange={this.handleInputChange} placeholder="Search here" />
          <span className="icon is-small is-right">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="dropdown-menu">
          {this.state.input.length && this.renderDropdown()}
        </div>
      </div>
    )
  }

  renderDropdown() {
    return (
      <div className="dropdown-content">
        <QueryRenderer
          environment={environment}
          query={graphql`
            query SearchQuery($input: String!) {
              search(all: $input, first:10) {
                edges {
                  node {
                    __typename
                    ... on User {
                      id
                      username
                      name
                      url
                    }
                    ... on Repo {
                      id
                      name
                      owner {
                        username
                      }
                      url
                    }
                  }
                }
              }
            }
          `}
          variables={{
            input: this.state.input
          }}
          render={({error, props}) => {
            if(error) {
              return <div>{error.message}</div>
            } else if(props) {
              return (
                <div>
                  {props.search.edges.map(this.renderSearchResult)}
                </div>
              )
            }
            return <div></div>
          }}
        />
      </div>
    )
  }

  renderSearchResult(edge) {
    switch(edge.node.__typename) {
      case "User":
        return (
          <a key={edge.node.id} href={edge.node.url} className="dropdown-item">
            <span className="icon">
              <i className="fa fa-user"></i>
            </span>
            {edge.node.username} <span className="has-text-grey">{edge.node.name}</span>
          </a>
        )
      case "Repo":
        return (
          <a key={edge.node.id} href={edge.node.url} className="dropdown-item">
            <span className="icon">
              <i className="fa fa-archive"></i>
            </span>
            <span>{edge.node.owner.username} / {edge.node.name}</span>
          </a>
        )
    }
  }

  handleInputChange(event) {
    const input = event.target.value
    if(input.length)
      this.dropdown.current.classList.add("is-active")
    else
      this.dropdown.current.classList.remove("is-active")
    this.setState({input: input})
  }

}

export default Search
