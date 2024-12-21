import React, { Component } from 'react';

class Filter extends Component {
  render() {
    const { showOnlyIncomplete, onToggle } = this.props;
    return (
      <div className="filter">
        <input
          type="checkbox"
          checked={showOnlyIncomplete}
          onChange={onToggle}
        />
        <label>Show only outstanding</label>
      </div>
    );
  }
}

export default Filter;