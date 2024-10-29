const app = Vue.createApp({
  data() {
    return {
      // showMainScreen: true,
      // task_container: true,
      // addTask: true,
      // editTask: true,
      // allert: true,
      //Для ВЕРСТКИ==================================================>
      
      showMainScreen: true,
      task_container: false,
      addTask: false,
      editTask: false,
      allert: false,

      tasks: [
        {
          id: 1,
          title: "Завершити домашнє завдання з Vue.js",
          description: "Допрацювати проект і надіслати код інструктору",
          isCompleted: false,
          dateEnd: "2024-10-22",
          isSelected: false,
        },
        {
          id: 2,
          title: "Зробити презентацію для роботи",
          description: "Підготувати презентацію для зустрічі з клієнтом",
          isCompleted: false,
          dateEnd: "2024-10-25",
          isSelected: false,
        },
        {
          id: 3,
          title: "Купити продукти",
          description: "Скласти список і купити овочі, м’ясо та хліб",
          isCompleted: false,
          dateEnd: "2024-10-22",
          isSelected: false,
        },
      ],
      tabs: ["All tasks", "Closed", "Open"],
      selectedTab: "All tasks",

      createForm: {
        id: "",
        title: "",
        description: "",
        dateEnd: "",
      },

      error: {
        title: false,
        description: false,
        dateEnd: false,
      },
    };
  },

  computed: {
    filterTasks() {
      if (this.selectedTab === "Open")
        return this.tasks.filter((item) => !item.isCompleted);
      if (this.selectedTab === "Closed")
        return this.tasks.filter((item) => item.isCompleted);

      return this.tasks;
    },

    totalTasks() {
      return this.tasks.length;
    },
    completedTasksCount() {
      return this.tasks.filter((task) => task.isCompleted).length;
    },
    openTasksCount() {
      return this.tasks.filter((task) => !task.isCompleted).length;
    },
  },

  methods: {
    startApp() {
      this.showMainScreen = false;
      this.task_container = true;
      this.addTask = false;
      this.editTask = false;
    },
    backToStart() {
      this.showMainScreen = true;
      this.task_container = false;
      this.editTask = false;
    },

    plusTask() {
      this.showMainScreen = false;
      this.task_container = false;
      this.addTask = true;
      this.editTask = false;
    },

    backToTasks() {
      this.showMainScreen = false;
      this.task_container = true;
      this.addTask = false;
      this.editTask = false;
    },

    showEditTask(task) {
      this.createForm = { ...task };
      this.showMainScreen = false;
      this.task_container = false;
      this.addTask = false;
      this.editTask = true;
    },

    closeAllert () {
      this.allert = false;
    },

    taskSelected(item) {
      item.isCompleted = !item.isCompleted;
    },
    selectTab(item) {
      this.selectedTab = item;
    },

    validateForm() {
      this.error.title = !this.createForm.title;
      this.error.description = !this.createForm.description;
      this.error.dateEnd = !this.createForm.dateEnd;
  
      return !this.error.title && !this.error.description && !this.error.dateEnd;
    },

    pushTask() {
      if (!this.validateForm()) {
        return;
      }
  
      const newTask = {
        ...this.createForm,
        id:this.tasks.length > 0 ? Math.max(...this.tasks.map((task) => task.id)) + 1 : 1,
        isCompleted: false,
        isSelected: false,
      };
      this.tasks.push(newTask);

      this.createForm = {
        title: "",
        description: "",
        dateEnd: "",
      }
     this.backToTasks();
    },

    sendForm() {
      if (!this.validateForm()) {
        return;
      }

      const index = this.tasks.findIndex((task) => task.id === this.createForm.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, { ...this.createForm });
      }
      this.backToTasks();
    },

    deleteTask() {
      const index = this.tasks.findIndex((task) => task.id === this.createForm.id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
      this.backToTasks();

      this.allert = true;
    },
    
  },
  components: { VueDatePicker },
});

app.mount("#app");
