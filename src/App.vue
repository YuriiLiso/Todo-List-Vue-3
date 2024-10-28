<template>
  <div>
    <!-- Початковий екран -->
    <div v-if="currentScreen === 'start'" class="start-screen">
      <header class="header">
        <div class="time">
          <p>9:41</p>
        </div>
        <div class="status_bar">
          <img class="antena" src="../images/logo_antena.png" alt="">
          <img class="wifi" src="../images/Wifi.png" alt="">
          <img class="battery" src="../images/Battery.png" alt="">
        </div>
      </header>

      <img class="bg_1" src="../images/bg_first.png" alt="">
      <img class="bg_2" src="../images/bg_second.png" alt="">
      <img class="bg_3" src="../images/bg_third.png" alt="">
      <img class="logo" src="../images/logo.png" alt="">

      <main class="main">
        <div class="greet">
          <h1>Make successful your day</h1>
          <p>Make small somethings to get big gift in your life</p>
        </div>
        <button @click="goToNextScreen" class="start">
          Start
        </button>
      </main>

      <footer class="footer">
        <img src="../images/Home Indicator.png" alt="">
      </footer>
    </div>

    <!-- Екран задач -->
    <div v-else-if="currentScreen === 'tasks'" class="task-app">
      <header class="header--screen">
        <div class="time">
          <p>9:41</p>
        </div>
        <div class="status_bar">
          <img class="antena" src="../images/logo_antena.png" alt="">
          <img class="wifi" src="../images/Wifi.png" alt="">
          <img class="battery" src="../images/Battery.png" alt="">
        </div>
      </header>
      
      <div class="todo--header">
        <div class="back">
          <button @click="goToStartScreen" class="btn">
            <img src="../images/arrow.png" alt="">
          </button>
          <h2>Back</h2>
        </div>
        <h2>Task</h2>
      </div>

      <!-- Панель фильтрации задач -->
      <div class="task-filters">
        <span :class=" { active: currentFilter === 'all' }" @click="setFilter('all')">
          All tasks
          <span class="badge">{{ allTasks.length }}</span>
        </span>
        <span :class="{ active: currentFilter === 'closed' }" @click="setFilter('closed')">
          Closed
          <span class="badge">{{ closedTasks.length }}</span>
        </span>
        <span :class="{ active: currentFilter === 'open' }" @click="setFilter('open')">
          Open
          <span class="badge">{{ openTasks.length }}</span>
        </span>
      </div>

      <!-- Список задач -->
      <div v-for="task in filteredTasks" :key="task.id" class="task-item">
        <div class="task-header"  @click="goToEditScreen(task)">
          <h3 :class="{ completed: task.completed }"  >{{ task.title }}</h3>

          <p class="task-descroption">{{ task.description }}</p>
          <p class="task-date">{{ task.date }}</p>
        </div>
        <input
            type="checkbox"
            :checked="task.completed"
            :id="'task-checkbox-' + task.id"
            class="round-checkbox"
            @change="toggleTaskStatus(task)"
          />
          <label :for="'task-checkbox-' + task.id"></label>
      </div>

      <!-- Кнопка добавления новой задачи -->
      <button class="add-task-button" @click="goToCreateScreen">+</button>

      <div v-if="deletionMessage" class="deletion-message">
        {{ deletionMessage }}
        <button @click="closeDeletionMessage" class="close-button">
          <img src="../images/close-button.png" alt="">
        </button>
      </div>

      <footer class="footer footer-task">
        <img src="../images/Home Indicator.png" alt="">
      </footer>
    </div>

    <!-- Екран створення задач -->
    <div v-else-if="currentScreen === 'create'" class="create-screen">
      <header class="header--screen">
        <div class="time">
          <p>9:41</p>
        </div>
        <div class="status_bar">
          <img class="antena" src="../images/logo_antena.png" alt="">
          <img class="wifi" src="../images/Wifi.png" alt="">
          <img class="battery" src="../images/Battery.png" alt="">
        </div>
      </header>
      <div class="todo--header">
        <div class="back">
          <button @click="goToNextScreen" class="btn">
            <img src="../images/arrow.png" alt="">
          </button>
          <h2>Back</h2>
        </div>
        <h2>Task</h2>
      </div>

      <div class="create-task-content">
        <!-- Иконка задачи -->
        <div class="task-icon">
          <img src="../images/task_icon.png" alt="Task Icon" />
        </div>

        <!-- Поля ввода задачи -->
        <form @submit.prevent="createTask" class="task-form">
          <label>Title <span class="required">*</span></label>
          <input type="text" v-model="newTask.title" placeholder="Enter title" required />
          
          <label>Description <span class="required">*</span></label>
          <textarea v-model="newTask.description" placeholder="Enter description" maxlength="500" required></textarea>
          <div class="char-count">{{ newTask.description.length }}/500 max characters</div>

          <label>Date end <span class="required">*</span></label>
          <input type="date" v-model="newTask.dateEnd" required />
        </form>

        <!-- Кнопки действия -->
          <button type="submit" class="create-button" @click="createTask">Create</button>
          <button type="button" class="cancel-button" @click="goToNextScreen">Cancel</button>

        <footer class="footer footer-task footer-create-task">
          <img src="../images/Home Indicator.png" alt="">
        </footer>
      </div>
    </div>

        <!-- Екран редагування та видалення задач -->
        <div v-else-if="currentScreen === 'edit'" class="edit-screen">
        <header class="header--screen">
        <div class="time">
          <p>9:41</p>
        </div>
        <div class="status_bar">
          <img class="antena" src="../images/logo_antena.png" alt="">
          <img class="wifi" src="../images/Wifi.png" alt="">
          <img class="battery" src="../images/Battery.png" alt="">
        </div>
        </header>
        <div class="todo--header">
        <div class="back">
          <button @click="goToNextScreen" class="btn">
            <img src="../images/arrow.png" alt="">
          </button>
          <h2>Back</h2>
        </div>
        <h2>Task</h2>
        </div>

        <div class="create-task-content">
        <!-- Иконка задачи -->
        <div class="task-icon">
          <img src="../images/task_icon.png" alt="Task Icon" />
        </div>

        <!-- Поля ввода задачи -->
        <form @submit.prevent="saveTask" class="task-form">
          <label>Title <span class="required">*</span></label>
          <input type="text" v-model="editableTask.title" placeholder="Enter title" required />
          
          <label>Description <span class="required">*</span></label>
          <textarea v-model="editableTask.description" placeholder="Enter description" maxlength="500" required></textarea>
          <div class="char-count">{{ newTask.description.length }}/500 max characters</div>

          <label>Date end <span class="required">*</span></label>
          <input type="date" v-model="editableTask.dateEnd" placeholder="Choose date" required />
        </form>

        <!-- Кнопки действия -->
          <button type="submit" class="save-button" @click="saveTask">Save</button>
          <button type="button" class="delete-button" @click="deleteTask">Delete</button>

        <footer class="footer footer-task footer-create-task footer-edit-task">
          <img src="../images/Home Indicator.png" alt="">
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
  import { ref, computed } from 'vue'

export default {
  setup() {
    // Логіка перемикання екранів
    const currentScreen = ref('start')
    const goToNextScreen = () => { currentScreen.value = 'tasks' }
    const goToStartScreen = () => { currentScreen.value = 'start' }
    const goToCreateScreen = () => { currentScreen.value = 'create' }
    const goToEditScreen = (task) => {
      editableTask.value = { ...task }
      currentScreen.value = 'edit'
    }

    // Список задач
    const tasks = ref([
      { id: 1, title: 'Виконати домашнє завдання', description: 'Необхідно зробити стартовий екран та екран із тасками.', date: '26 Oct 2024', isCompleted: false },
      { id: 2, title: 'Сходити за покупками', description: 'Потрібно скупитись згідно списку, який залишила мама.', date: '26 Oct 2024', isCompleted: false },
      { id: 3, title: 'Приготувати вечерю', description: 'Треба зварити макарони і підігріти котлети.', date: '26 Oct 2024', isCompleted: false }
    ])

    // Поточний фільтр
    const currentFilter = ref('all')
    const editableTask = ref(null)
    const deletionMessage = ref('')

    const closeDeletionMessage = () => {
      deletionMessage.value = ''
    }

    // Влаштування фільтру
    const setFilter = (filter) => {
      currentFilter.value = filter;
    }

    // Фільтрація задач по статусу
    const filteredTasks = computed(() => {
      if (currentFilter.value === 'all') return tasks.value
      if (currentFilter.value === 'closed') return tasks.value.filter(task => task.isCompleted)
      if (currentFilter.value === 'open') return tasks.value.filter(task => !task.isCompleted)
    })

    // Відмічаємо задачу як виконану або не виконану
    const toggleTaskStatus = (task) => {
      const index = tasks.value.findIndex(t => t.id === task.id)
      if (index !== -1) {
        tasks.value[index].isCompleted = !tasks.value[index].isCompleted
  }
}

    // Кількість задач по категоріям
    const allTasks = computed(() => tasks.value)
    const closedTasks = computed(() => tasks.value.filter(task => task.isCompleted))
    const openTasks = computed(() => tasks.value.filter(task => !task.isCompleted))
    const completedTasks = computed(() => tasks.value.filter(task => task.isCompleted))

    // Нова задача, яку додає користувач
    const newTask = ref({
      title: '',
      description: '',
      dateEnd: '',
      isCompleted: false
    })

    const goToTaskScreen = () => {
      currentScreen.value = 'tasks'
    }

    const goToCreateTaskScreen = () => {
      currentScreen.value = 'create'
    }

    const formatDate = (date) => {
      const options = { day: '2-digit', month: 'short', year: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    }

    const createTask = () => {
      if (newTask.value.title.trim() && newTask.value.description.trim() && newTask.value.dateEnd) {
        // Додаємо нову задачу до масиву задач
        tasks.value.push({
          ...newTask.value,
          id: Date.now(), // Унікальний ID для кожної задачі
          date: formatDate(newTask.value.dateEnd)
        });

        // Очищуємо поля форми після додавання задачі
        newTask.value = { title: '', description: '', dateEnd: '', isCompleted: false };

        // Повертаємося на екран із задачами
        goToTaskScreen();
      }
    }

    const cancelCreate = () => {
      // Очищаємо нову задачу і повертаємося на екран задач
      newTask.value = { title: '', description: '', dateEnd: '', isCompleted: false }
      goToTaskScreen()
    }

    const saveTask = () => {
      const index = tasks.value.findIndex(task => task.id === editableTask.value.id)
      if (index !== -1) {
        tasks.value[index] = { 
          ...editableTask.value,
          date: formatDate(editableTask.value.dateEnd)
         }
        editableTask.value = null
        goToNextScreen()
      }
    }

    // Видалення задачі
    const deleteTask = () => {
      tasks.value = tasks.value.filter(task => task.id !== editableTask.value.id)
      editableTask.value = null
      deletionMessage.value = 'Task Deleted'
        goToNextScreen()
    }

    return {
      currentScreen,
      goToNextScreen,
      goToStartScreen,
      goToCreateScreen,
      tasks,
      currentFilter,
      setFilter,
      filteredTasks,
      toggleTaskStatus,
      allTasks,
      closedTasks,
      openTasks,
      completedTasks,
      createTask,
      newTask,
      cancelCreate,
      goToCreateTaskScreen,
      goToEditScreen,
      editableTask,
      deleteTask,
      saveTask,
      formatDate,
      deletionMessage,
      closeDeletionMessage
    }
  }
}
</script>

<style>
/* Стилі для початкового екрану */

html {
  width: 393px;
  height: 852px;
}

body {
  width: inherit;
  margin: 0;
  padding: 0;
  font-family: Inter;
}

.start-screen {
  width: 393px;
  height: 852px;
  overflow: hidden;
  position: relative;
}

.start-screen img {
  object-fit: cover;
}

.bg_2, .bg_3 {
  position: absolute;
  top: 0;
  left: 0;
}

.logo {
  position: absolute;
  top: 90px;
  left: 146px;
}

.header {
  width: 393px;
  height: 54px;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #51C7E2;
}

.status_bar {
  width: 140px;
  height: 54px;
  display: flex;
  justify-content: center;
  gap: 7px;
  align-items: center;
}

.time {
  width: 140px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time p {
  margin: 0;
  text-align: center;
}

.antena {
  width: 19px;
  height: 12px;
}

.wifi {
  width: 17px;
  height: 12px;
}

.battery {
  width: 27px;
  height: 13px;
}

h1, p {
  margin: 0;
}

h1 {
  width: 323px;
  margin-left: 18px;
}

p {
  width: 305px;
  margin-top: 12px;
  margin-left: 27px;
}

.greet {
  width: 360px;
  height: 128px;
  margin-left: 16px;
  text-align: center;
  margin-top: 139px;
}

.start {
  width: 361px;
  height: 50px;
  border: none;
  border-radius: 12px;
  background-color: #1AB8D8;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  margin-left: 16px;
  margin-top: 125px;
  padding: 0;
}

.footer {
  position: absolute;
  width: 393px;
  bottom: 0;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Стилі для екрану із задачами */
.next-screen {
  width: 393px;
  height: 852px;
}

.header--screen {
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.todo--header {
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.todo--header > h2 {
  margin-left: 100px;
}

.back {
  width: 75px;
  height: 44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.back > h2 {
  color: #007AFF;
}

button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

button > img {
  width: 17px;
  height: 22px;
  margin-left: 8px;
}

h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 400;
}

/* Стилі для блоку із задачами */
.task-app {
  width: 393px;
  height: 852px;
  position: relative;
}

.task-filters {
  height: 22px;
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  margin-left: 16px;
}

.task-filters span {
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  color: #666;
  position: relative;
}

.task-filters span:not(:last-child) {
  border-right: 1px solid #666;
  padding-right: 15px;
}

.task-filters .active {
  color: #007AFF;
}

.task-header > input {
  border: 50px;
}

.round-checkbox {
  opacity: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.round-checkbox + label {
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #C7C7CC;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.round-checkbox:checked + label {
  background-color: #007AFF;
}

.round-checkbox:checked + label::after {
  content: "";
  position: absolute;
  left: 7px;
  top: 4px;
  width: 3px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(35deg);
}

.completed {
  text-decoration: line-through;
  color: gray;
}

span.badge {
  background-color: #007AFF;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  padding: 3px 7px;
  margin-left: 3px;
}

/* Стилі для задач */
.task-item {
  background: #f9f9f9;
  padding: 12px;
  padding-right: 50px;
  border-radius: 8px;
  margin-bottom: 12px;
  margin-left: 16px;
  margin-right: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.task-descroption {
  border-bottom: 1px solid #c6cbd1;
  padding-bottom: 10px;
}

.task-item  p {
  margin-top: 8px;
  margin-left: 0;
  color: #7c8085;
}

.task-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
}

.task-header h3 {
  margin: 0;
  font-size: 18px;
}

.task-header h3.completed {
  text-decoration: line-through;
}

.task-date {
  font-size: 12px;
  color: #bbb;
}

/* Кнопка додавання нової задачі (плюсик) */
.add-task-button {
  position: fixed;
  bottom: 32px;
  left: 315px;
  width: 62px;
  height: 62px;
  background-color: #1AB8DB;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.add-task-button:hover {
  background-color: #1ccdf5;
}

.add-task-button:active {
  transform: scale(0.9);
}

.create-task-content {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.task-icon img {
  width: 100px;
  margin: 52px 146px;
}

.task-form {
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  margin-left: 16px;
  margin-right: 16px;
}

.task-form label {
  text-align: left;
  font-weight: bold;
}

.task-form input[type="text"],
.task-form input[type="date"],
.task-form textarea {
  width: 100%;
  padding: 14px 0 14px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
  font-family: Inter;
  box-sizing: border-box;
  resize: none;
}

.task-form input[type="text"]:focus,
.task-form input[type="date"]:focus,
.task-form textarea:focus {
  border-color: #007AFF;
  outline: none;
}

.task-form input[type="date"],
.task-form textarea {
  margin-top: 5px;
}

.task-form input[type="text"],
.task-form input[type="date"] {
  height: 45px;
}

.task-form textarea {
  height: 100px;
}

.char-count {
  text-align: left;
  font-size: 12px;
  color: #888;
}

.create-screen {
  position: relative;
  height: 852px;
}

/* Кнопка додавання нової задачі */
.create-button {
  width: 361px;
  height: 50px;
  border: none;
  border-radius: 12px;
  background-color: #1AB8D8;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 100px;
  padding: 0;
}

/* Кнопка повернення із меню створення задач */
.cancel-button {
  width: 361px;
  height: 50px;
  border: none;
  background-color: #ccc;
  color: #0c0c0c;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 12px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 0;
}

.footer-create-task {
  width: 393px;
  position: absolute;
  bottom: 0;
}

.edit-screen {
  position: relative;
  height: 852px;
}

.required {
  color: red;
  font-weight: bold;
}

/* Кнопка збереження після додавання задачі */
.save-button {
  width: 361px;
  height: 50px;
  border: none;
  border-radius: 12px;
  background-color: #1AB8D8;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 100px;
  padding: 0;
}

/* Кнопка видалення задачі */
.delete-button {
  width: 361px;
  height: 50px;
  border: none;
  background-color: #ccc;
  color: #D92D20;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 12px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 0;
}

.footer-edit-task {
  width: 393px;
  position: absolute;
  bottom: 0;
}

.deletion-message {
  width: 358px;
  height: 40px;
  background-color: #F6F5F8;
  color: #721c24;
  padding: 12px 16px;
  margin-top: 156px;
  margin-bottom: 74px;
  margin-left: 17px;
  border-left: 3px solid #F04111;
  border-radius: 6px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

/* Кнопка закриття спливаючого повідомлення після видалення задачі */
.close-button {
  background: none;
  border: none;
  color: #721c24;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
}

.close-button > img {
  width: 12px;
  height: 12px;
}
</style>
