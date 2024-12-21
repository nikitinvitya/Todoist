import React, { Component } from 'react';

class SeverityFilter extends Component {
  render() {
    const { selectedSeverities, onSeverityFilterChange } = this.props;

    return (
      <div className="filter-severities">
        <label>
          <input
            type="checkbox"
            value="low"
            checked={selectedSeverities.includes('low')}
            onChange={onSeverityFilterChange}
          />
          Low Severity
        </label>
        <label>
          <input
            type="checkbox"
            value="medium"
            checked={selectedSeverities.includes('medium')}
            onChange={onSeverityFilterChange}
          />
          Medium Severity
        </label>
        <label>
          <input
            type="checkbox"
            value="high"
            checked={selectedSeverities.includes('high')}
            onChange={onSeverityFilterChange}
          />
          High Severity
        </label>
      </div>
    );
  }
}

export default SeverityFilter;
