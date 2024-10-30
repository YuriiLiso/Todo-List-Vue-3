const app = Vue.createApp({
  components: { VueDatePicker },
  data() {
    return {
      isStarted: false,
      isAddingTask: false,
      isEditingTask: false,
      currentTaskId: null,
      showTaskList: true,
      tasks: [
        {
          id: 1,
          title: "Забрати дітей зі школи",
          description: "Забрати дітей о 16:00 зі школи та відвезти додому",
          isCompleted: false,
          dateEnd: "2024-10-22",
        },
        {
          id: 2,
          title: "Купити продукти",
          description:
            "Скласти список і купити овочі, м’ясо та хліб, шоколад, молоко, какао, олію, рибу, чай каркаде та цитрину",
          isCompleted: true,
          dateEnd: "2024-10-21",
        },
        {
          id: 3,
          title: "Заплатити за комунальні послуги",
          description: "Оплатити рахунки за електрику та воду",
          isCompleted: false,
          dateEnd: "2024-10-24",
        },
      ],
      selectedTab: "All tasks",
      tabs: ["All tasks", "Open", "Closed"],
      title: "",
      description: "",
      dateEnd: null,
      validation: {
        title: false,
        description: false,
        dateEnd: false,
      },
      message: "Task deleted",
    };
  },
  computed: {
    filteredTasks() {
      if (this.selectedTab === "Open") {
        return this.tasks.filter((task) => !task.isCompleted);
      } else if (this.selectedTab === "Closed") {
        return this.tasks.filter((task) => task.isCompleted);
      }
      return this.tasks;
    },

    allTasks() {
      return this.tasks.length;
    },
    openTasksCount() {
      return this.tasks.filter((task) => !task.isCompleted).length;
    },
    closedTasksCount() {
      return this.tasks.filter((task) => task.isCompleted).length;
    },
  },
  methods: {
    startApp() {
      this.isStarted = true;
      this.isAddingTask = false;
    },

    selectTab(item) {
      this.selectedTab = item;
    },

    emitUpdate(task) {
      task.isCompleted = !task.isCompleted;
    },

    toggleAddTask() {
      this.isAddingTask = true;
      this.isStarted = false;
    },

    validateForm() {
      this.validation.title = !this.title;
      this.validation.description = !this.description;
      this.validation.dateEnd = !this.dateEnd;
      return (
        !this.validation.title &&
        !this.validation.description &&
        !this.validation.dateEnd
      );
    },

    addTask() {
      if (!this.validateForm()) {
        return;
      }

      this.tasks.push({
        id: this.tasks.length + 1,
        title: this.title,
        description: this.description,
        isCompleted: false,
        dateEnd: this.formatDate(this.dateEnd),
      });

      this.cancel();
    },

    openEditForm(task) {
      this.isStarted = false;
      this.isAddingTask = false;
      this.isEditingTask = true;
      this.currentTaskId = task.id;
      this.title = task.title;
      this.description = task.description;
      this.dateEnd = task.dateEnd;
    },

    editTask() {
      if (!this.validateForm()) {
        return;
      }
      const task = this.tasks.find((task) => task.id === this.currentTaskId);
      if (task) {
        task.title = this.title;
        task.description = this.description;
        task.dateEnd = this.dateEnd;
      }
      this.cancel();
    },

    deleteTask() {
      this.tasks = this.tasks.filter((task) => task.id !== this.currentTaskId);

      this.isEditingTask = false;
      this.isStarted = true;
      this.currentTaskId = null;
      this.title = "";
      this.description = "";
      this.dateEnd = null;

      Swal.fire({
        text: this.message,
        showConfirmButton: false,
        timer: 1200,
        customClass: {
          popup: "custom-swal",
        },

        didOpen: () => {
          const closeButton = document.createElement("button");
          closeButton.textContent = "X";
          closeButton.className = "custom-close-button";
          closeButton.onclick = () => Swal.close();
          Swal.getPopup().appendChild(closeButton);
        },
      });
    },

    cancel() {
      this.isAddingTask = false;
      this.isStarted = true;
      this.title = "";
      this.description = "";
      this.dateEnd = null;
      this.isEditingTask = false;
    },

    goToStartScreen() {
      this.isStarted = false;
      this.isAddingTask = false;
      this.isEditingTask = false;
    },
    goToHomeScreen() {
      this.isStarted = true;
      this.isAddingTask = false;
      this.isEditingTask = false;
    },

    formatDate(date) {
      const currentDate = new Date(date);
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
  },
});

app.mount("#app");
