export const loadMoreTasks = (page, tasksPerPage, tasks, visibleTasks) => {
    const nextPage = page + 1;
    const newVisibleTasks = tasks.slice(0, nextPage * tasksPerPage);
  
    return {
      page: nextPage,
      visibleTasks: newVisibleTasks,
    };
  };
  
  export const handleScroll = (callback) => {
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        callback();
      }
    });
  };
  