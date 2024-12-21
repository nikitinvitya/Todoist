//Из дополнительного: адаптивность


import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import TaskList from './TaskList';
import Filter from './Filter';
import SeverityFilter from './SeverityFilter'; 
import { generateRandomString } from './randomTaskName';
import { loadMoreTasks } from './pagination'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      visibleTasks: [], 
      title: '',
      description: '',
      severity: 'low',
      searchQuery: '',
      showOnlyIncomplete: false,
      selectedSeverities: [],
      errorMessage: '',
      page: 1,
      tasksPerPage: 50,
    };
  }

  componentDidMount() {
    this.loadVisibleTasks();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  addTask = () => {
    const { title, description, severity } = this.state;
    if (!title.trim() || title.trim() !== title) {
      this.setState({ errorMessage: 'Task title should not be empty or contain leading/trailing spaces.' });
      setTimeout(() => {
        this.setState({ errorMessage: '' });
      }, 3000);
      return;
    }
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      severity: severity,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    this.setState((prevState) => ({
      tasks: [newTask, ...prevState.tasks],
      title: '',
      description: '',
      severity: 'low',
    }), this.loadVisibleTasks);
  };

  generateTasks = () => {
    const tasks = [];
    for (let i = 0; i < 1000; i++) {
      const randomTitle = `${generateRandomString(5)}`; 
      const randomDescription = `Description: ${generateRandomString(10)}`;
      const randomSeverity = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];

      tasks.push({
        id: Date.now() + i,
        title: randomTitle,
        description: randomDescription,
        severity: randomSeverity,
        completed: false,
        createdAt: new Date().toLocaleString(),
      });
    }

    this.setState((prevState) => ({
      tasks: [...tasks, ...prevState.tasks],
    }), this.loadVisibleTasks);
  };

  loadVisibleTasks = () => {
    const { page, tasksPerPage, tasks } = this.state;
    const newVisibleTasks = tasks.slice(0, page * tasksPerPage);

    this.setState({ visibleTasks: newVisibleTasks });
  };

  handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      const { page, tasks } = this.state;
      if (page * this.state.tasksPerPage < tasks.length) {
        this.setState((prevState) => ({
          page: prevState.page + 1
        }), this.loadVisibleTasks); 
      }
    }
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSeverityChange = (value) => {
    this.setState({ severity: value });
  };

  handleSeverityFilterChange = (e) => {
    const value = e.target.value;
    this.setState((prevState) => {
      const { selectedSeverities } = prevState;
      if (selectedSeverities.includes(value)) {
        return { selectedSeverities: selectedSeverities.filter((severity) => severity !== value) };
      } else {
        return { selectedSeverities: [...selectedSeverities, value] };
      }
    });
  };

  toggleTaskCompletion = (id) => {
    const newTasks = this.state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.setState({ tasks: newTasks }, this.loadVisibleTasks);
  };

  deleteTask = (id) => {
    const newTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks: newTasks }, this.loadVisibleTasks);
  };

  getFilteredTasks() {
    const { visibleTasks, showOnlyIncomplete, searchQuery, selectedSeverities } = this.state;
    return visibleTasks
      .filter((task) => !showOnlyIncomplete || !task.completed)
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((task) =>
        selectedSeverities.length === 0 || selectedSeverities.includes(task.severity)
      );
  }

  toggleFilter = () => {
    this.setState((prevState) => ({
      showOnlyIncomplete: !prevState.showOnlyIncomplete,
    }));
  };

  render() {
    const { title, description, severity, showOnlyIncomplete, errorMessage, searchQuery, selectedSeverities } = this.state;
    const filteredTasks = this.getFilteredTasks();

    return (
      <div className="container">
        <h1>TODO List</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Form 
          title={title} 
          description={description} 
          severity={severity}
          handleTitleChange={this.handleTitleChange} 
          handleDescriptionChange={this.handleDescriptionChange} 
          handleSeverityChange={this.handleSeverityChange} 
          handleKeyPress={this.handleKeyPress} 
          addTask={this.addTask} 
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={this.handleSearchChange} 
          className="input"
        />
        <button onClick={this.generateTasks} className="button">Add 1000 Tasks</button>
        <SeverityFilter 
          selectedSeverities={selectedSeverities}
          onSeverityFilterChange={this.handleSeverityFilterChange} 
        />
        <Filter 
          showOnlyIncomplete={showOnlyIncomplete}
          onToggle={this.toggleFilter}
        />
        <TaskList 
          tasks={filteredTasks}
          toggleTaskCompletion={this.toggleTaskCompletion}
          deleteTask={this.deleteTask}
        />
      </div>
    );
  }
}

export default App;
