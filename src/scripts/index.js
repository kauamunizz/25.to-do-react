import '../styles/styles.scss';

"strict mode"

const main = (() => {

    const state = {
        list: []
    }

    function saveLocalStorage() {
        const tasksStr = JSON.stringify(state.list);

        localStorage.setItem('@todo:list', tasksStr);
    }

    function loadLocalStorage() {
        const tasksStr = localStorage.getItem('@todo:list');
        const loadedTasks = tasksStr ? JSON.parse(tasksStr) : [];
        state.list = loadedTasks;

        renderTask();
    }

    function createTask(text) {
        const newTask = {
            id: Date.now(),
            task: text,
            marcado: false
        }

        state.list.push(newTask);
        renderTask();
    }

    function renderTask() {
        saveLocalStorage();

        const { list } = state;
        const container = document.querySelector('.myTask');
        container.innerHTML = '';

        if (list.length) {
            list.forEach(({id, task, marcado}) => {
                container.insertAdjacentHTML('beforeend', `
                    <li class="${marcado ? 'completo' : 'task'}" data-id=${id}>
                        <label class="${marcado ? 'checked' : ''}">
                            <input type="checkbox" name='checkbox' ${marcado ? 'checked' : ''}>
                            <h2>${task}</h2>
                        </label>
                        <button>
                            <img class="remove" src="/icons8-remove-48.svg" alt="remove">
                        </button>
                    </li>
                `);
            });
        }
        else {
            container.insertAdjacentHTML('beforeend', `
                <h1>Você ainda não possui tarefas 🙁</h1>
            `);
        }

    }

    function updateTask(id, checked) {
        const task = state.list.find(atual => atual.id === Number(id));

        task.marcado = checked;
        renderTask();
    }

    function deleteTask(id) {
        state.list = state.list.filter(atual => atual.id !== Number(id));
        renderTask();
    }


    function events() {
        document.forms.form.addEventListener('submit', event => {
            event.preventDefault();

            const { text } = document.forms.form;
            createTask(text.value);
            text.value = '';
        } )
        
        document.querySelector('.myTask').addEventListener('click', event => {
            const click = event.target;

            if (click.classList.contains('remove')){
                const lista = click.closest('li');
                const id = lista.dataset.id;

                deleteTask(id);
            }
            else if (click.tagName === 'INPUT'){
                const lista = click.closest('li');
                const id = lista.dataset.id;

                updateTask(id, click.checked);
            }
        })
    }


    function init() {
        loadLocalStorage();
        events();
    }


    return {
        init
    }
})();

document.addEventListener('DOMContentLoaded', main.init);