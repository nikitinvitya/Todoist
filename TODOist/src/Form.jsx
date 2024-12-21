import React, { Component } from 'react';

class Form extends Component {
  render() {
    const { title, description, severity, handleTitleChange, handleDescriptionChange, handleSeverityChange, handleKeyPress, addTask } = this.props;
    return (
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
          className="input"
        />

        <div className="severity-buttons">
          <button
            type="button"
            onClick={() => handleSeverityChange('low')}
            className={severity === 'low' ? 'button selected' : 'button'}
          >
            Low Severity
          </button>
          <button
            type="button"
            onClick={() => handleSeverityChange('medium')}
            className={severity === 'medium' ? 'button selected' : 'button'}
          >
            Medium Severity
          </button>
          <button
            type="button"
            onClick={() => handleSeverityChange('high')}
            className={severity === 'high' ? 'button selected' : 'button'}
          >
            High Severity
          </button>
        </div>

        <button onClick={addTask} className="button">Add Task</button>
      </div>
    );
  }
}

export default Form;
