import { Component } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export class Searchbar extends Component {
  extractQuery = evt => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.query.value;
    this.props.onSubmit({
      query: query,
      images: [],
    });
    form.reset();
  };
  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.extractQuery}>
          <button type="submit" className="searchForm-button">
            {<HiMagnifyingGlass style={{ width: 24, height: 24 }} />}
          </button>

          <input
            className="searchForm-input"
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
