const {ref, reactive, computed, createApp} = Vue;
createApp({
    setup(){
        const showStartpage = ref('Start')
        const todos = reactive([
            {
              id: 1,
              title: "Забрати дітей зі школи",
              description: "Забрати дітей о 16: 00 зі школи та відвезти додому",
              isCompleted: false,
              dateEnd: "21 Sep 2024"
            },
            {
              id: 2,
              title: "Купити продукти",
              description: "Скласти список і купити овочі, м’ясо та хліб",
              isCompleted: false,
              dateEnd: "12 Oct 2024"
            },
            {
              id: 3,
              title: "Заплатити за комунальні послуги",
              description: "Оплатити рахунки за електрику та воду",
              isCompleted: false,
              dateEnd: "30 Jul 2024"
            },
            {
              id: 4,
              title: "Приготувати вечерю",
              description: "Приготувати курячі котлети з салатом",
              isCompleted: false,
              dateEnd: "2 Feb 2024"
            },
            {
              id: 5,
              title: "Записатися до стоматолога",
              description: "Зателефонувати і записатися на консультацію",
              isCompleted: false,
              dateEnd: "14 Nov 2024"
            },
            {
              id: 6,
              title: "Сходити в тренажерний зал",
              description: "Тренування на ноги та кардіо",
              isCompleted: true,
              dateEnd: "20 Sep 2024"
            },
            {
              id: 7,
              title: "Прочитати 50 сторінок книги",
              description: "Прочитати книгу 'Цифрова мінімізація' до 50 сторінки",
              isCompleted: false,
              dateEnd: "23 Sep 2024"
            },
            {
              id: 8,
              title: "Погуляти з собакою",
              description: "Вивести собаку на прогулянку на 30 хвилин",
              isCompleted: true,
              dateEnd: "27 Sep 2024"
            },
            {
              id: 9,
              title: "Зробити презентацію для роботи",
            description: "Підготувати презентацію для зустрічі з клієнтом",
              isCompleted: false,
              dateEnd: "16 Sep 2024"
            },
            {
              id: 10,
              title: "Завершити домашнє завдання з Vue.js",
              description: "Допрацювати проект і надіслати код інструктору",
              isCompleted: false,
              dateEnd: "15 Dec 2024"
            }
          ])
        const goToList = () => {
            showStartpage.value = 'TodoList';
           
        }
        const goToStart = () => {
            showStartpage.value = 'Start';
        }
        const goToAdd = () => {
          showStartpage.value = 'Add';
          resetForm();
      }
      const goToEdit = (todo) => {
        selectedTodo.value = todo;
        form.title = todo.title;
        form.description = todo.description;
        form.dateEnd = formatDateToInput(todo.dateEnd);
        form.id = todo.id;
        showStartpage.value = 'Fixed';
        
      };
  
        const filter = ref(null);
        const selectedTodo = ref(null);
        const buttonBack = ref('< Back');
        const counterall = ref(todos.length);
        const showAlert = ref(false);
      
        const counterOpen = computed(() => {
          return todos.filter(todo => !todo.isCompleted).length;
        });

        const counterClosed = computed(() => {
          return todos.filter(todo => todo.isCompleted).length;
        });
    
    
      
        const FilterToDos = computed(() => {
         
          if (filter.value === 'close') {
            return todos.filter((item) => item.isCompleted)
          }
         if (filter.value === 'open') {
            return todos.filter((item) => !item.isCompleted)
          }
          return todos
          
        }) 
 
        const filterOpen = ()=>{
          filter.value = 'open';
          counterOpen();
          counterClosed();
          counterall = counterall;
        }

        const filterClose = ()=>{
          filter.value = 'close';
          counterOpen();
          counterClosed();
          counterall = counterall;
         
        }
        const filterAll = ()=>{
          filter.value = null;
          counterall = todos.length;
         
        
        }
    
        const form = reactive({
          id: '',
          title: '',
          description: '',
          dateEnd: '',
        })

        const addTodo = () =>{
          if (form.title && form.description && form.dateEnd) {
            // Додаємо нове завдання в масив
            todos.push({
              id: todos.length + 1,
              title: form.title,
              description: form.description,
              dateEnd: formatDate(form.dateEnd),
              isCompleted: false,
            });
            goToList();

            
          } else {
            alert("Будь ласка, заповніть всі поля форми!");
          }
          
        
        }
         // Функція для форматування дати
      const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(',', '');
      };
      const formatDateToInput = (dateStr) => {
        const [day, month, year] = dateStr.split(' ');
        const months = {
          Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
          Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
        };
        return `${year}-${months[month]}-${day}`;
      };

      const saveTodo = () => {
        if (selectedTodo.value) {
          selectedTodo.value.title = form.title;
          selectedTodo.value.description = form.description;
          selectedTodo.value.dateEnd = formatDate(form.dateEnd);
          goToList();
        }
      };

      const resetForm = () => {
        form.title = '';
        form.description = '';
        form.dateEnd = '';
        selectedTodo.value = null;
      };
            
      const deleteTodo = () => {
        
        const index = todos.findIndex(todo => todo.id === form.id);
          todos.splice(index, 1);
          ShowDeletAlert();
        // Переходимо до списку
        
      };

        const ShowDeletAlert = () =>{
          showStartpage.value = 'Delet';
        }

        const afterdelet = () =>{
          goToList();
        }


        return{
            showStartpage,
            todos,
            goToList,
            goToStart,
            FilterToDos,
            filterOpen,
            filterClose,
            filterAll,
            goToAdd,
            form,
            addTodo,
            goToEdit,
            saveTodo,
            deleteTodo,
            showAlert,
            buttonBack,
            counterall,
            counterOpen,
            counterClosed,
            ShowDeletAlert,
            afterdelet,
        }
    }

}).mount('#app')
