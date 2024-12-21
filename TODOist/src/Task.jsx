import React, { Component } from 'react';

class Task extends Component {
  render() {
    const { task, toggleTaskCompletion, deleteTask } = this.props;
    return (
      <li className="taskItem">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
          className="checkbox"
        />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h3 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {task.title}
          </h3>
          <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal' }}>
            {task.description}
          </p>
          <p style={{ fontWeight: 'bold', margin: '5px 0' }}>
            Severity: {task.severity}
          </p>
          <p className="task-time">Created: {task.createdAt}</p>
        </div>
        <button onClick={() => deleteTask(task.id)} className="deleteButton">Delete</button>
      </li>
    );
  }
}

export default Task;
