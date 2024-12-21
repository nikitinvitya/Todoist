import React, { Component } from 'react';
import Task from './Task';

class TaskList extends Component {
  render() {
    const { tasks, toggleTaskCompletion, deleteTask } = this.props;
    return (
      <ul className="taskList">
        {tasks
          .sort((a, b) => a.completed - b.completed)
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          ))}
      </ul>
    );
  }
}

export default TaskList;
