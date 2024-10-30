const { createApp } = Vue;

createApp({
  components: { VueDatePicker },

  data() {
    return {
      todos: [
        {
          id: 1,
          title: 'Забрати дітей зі школи',
          description: 'Забрати дітей о 16: 00 зі школи та відвезти додому',
          isCompleted: false,
          dateEnd: '2024-10-21',
        },
        {
          id: 2,
          title: 'Купити продукти',
          description: 'Скласти список і купити овочі, м’ясо та хліб',
          isCompleted: false,
          dateEnd: '2024-10-22',
        },
        {
          id: 3,
          title: 'Заплатити за комунальні послуги',
          description: 'Оплатити рахунки за електрику та воду',
          isCompleted: false,
          dateEnd: '2024-10-23',
        },
        {
          id: 4,
          title: 'Приготувати вечерю',
          description: 'Приготувати курячі котлети з салатом',
          isCompleted: false,
          dateEnd: '2024-10-21',
        },
        {
          id: 5,
          title: 'Записатися до стоматолога',
          description: 'Зателефонувати і записатися на консультацію',
          isCompleted: false,
          dateEnd: '2024-10-24',
        },
        {
          id: 6,
          title: 'Сходити в тренажерний зал',
          description: 'Тренування на ноги та кардіо',
          isCompleted: true,
          dateEnd: '2024-10-21',
        },
        {
          id: 7,
          title: 'Прочитати 50 сторінок книги',
          description: "Прочитати книгу 'Цифрова мінімізація' до 50 сторінки",
          isCompleted: false,
          dateEnd: '2024-10-22',
        },
        {
          id: 8,
          title: 'Погуляти з собакою',
          description: 'Вивести собаку на прогулянку на 30 хвилин',
          isCompleted: true,
          dateEnd: '2024-10-21',
        },
        {
          id: 9,
          title: 'Зробити презентацію для роботи',
          description: 'Підготувати презентацію для зустрічі з клієнтом',
          isCompleted: false,
          dateEnd: '2024-10-25',
        },
        {
          id: 10,
          title: 'Завершити домашнє завдання з Vue.js',
          description: 'Допрацювати проект і надіслати код інструктору',
          isCompleted: false,
          dateEnd: '2024-10-22',
        },
      ],
      chosenScreen: 'start',

      tabs: [
        {
          id: 'all',
          name: 'All tasks',
          counter: 0,
        },
        {
          id: 'closed',
          name: 'Closed',
          counter: 0,
        },
        {
          id: 'open',
          name: 'Open',
          counter: 0,
        },
      ],
      selectedTab: 'all',

      newTodo: {
        id: '',
        title: '',
        description: '',
        isCompleted: false,
        dateEnd: '',
      },
      selectedTodo: null,
      isShowNotification: false,
    };
  },
  methods: {
    selectTodo(todo) {
      this.chosenScreen = 'edit';
      this.selectedTodo = todo;
    },
    addTodo() {
      this.todos.push(this.newTodo);
      this.goToTodos();
      setDefaultNewTodo();
    },
    editTodo() {
      const index = this.todos.findIndex(
        (el) => el.id === this.selectedTodo.id,
      );
      this.todos.splice(index, 1, { ...this.selectedTodo });
      this.goToTodos();
    },
    deleteTodo() {
      const index = this.todos.findIndex(
        (el) => el.id === this.selectedTodo.id,
      );
      this.todos.splice(index, 1);
      this.goToTodos();
      this.showDeleteNotification();
    },

    showDeleteNotification() {
      this.isShowNotification = true;
    },
    hideNotification() {
      this.isShowNotification = false;
    },

    cancelTodo() {
      this.chosenScreen = 'todos';
      setDefaultNewTodo();
    },
    selectTab(tab) {
      this.selectedTab = tab.id;
    },
    goToTodos() {
      this.chosenScreen = 'todos';
    },
    goToCreate() {
      this.chosenScreen = 'create';
    },
    goToBack() {
      if (this.chosenScreen === 'create' || this.chosenScreen === 'edit') {
        this.goToTodos();
      } else {
        this.chosenScreen = 'start';
      }
    },
    setDefaultNewTodo() {
      this.newTodo = {
        id: '',
        title: '',
        description: '',
        isCompleted: false,
        dateEnd: '',
      };
    },
  },

  computed: {
    computedTabs() {
      return this.tabs.map((tab) => {
        if (tab.id === 'open') {
          tab.counter = this.todos.filter((todo) => !todo.isCompleted).length;
        } else if (tab.id === 'closed') {
          tab.counter = this.todos.filter((todo) => todo.isCompleted).length;
        } else {
          tab.counter = this.todos.length;
        }
        return tab;
      });
    },

    fileteredTodos() {
      if (this.selectedTab === 'closed') {
        return this.todos.filter((todo) => todo.isCompleted);
      }
      if (this.selectedTab === 'open') {
        return this.todos.filter((todo) => !todo.isCompleted);
      }
      return this.todos;
    },
    screenName() {
      if (this.chosenScreen === 'create') {
        return 'Add Task';
      }
      if (this.chosenScreen === 'edit') {
        return 'Edit Task';
      }
      if (this.chosenScreen === 'todos') {
        return 'Task';
      }
    },
  },
}).mount('#app');
