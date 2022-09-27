import { FormEvent, useEffect, useState } from "react";
import iconRemove from '../../assets/icons8-remove-48.svg'

interface ITask {
    id: number,
    text: string,
    marcado: boolean
}

function Todo() {

    const [loaded, setLoaded] = useState(false);
    const [taskName, setTaskName] = useState<ITask[]>([]);
    const [inputText, setInputText] = useState('');

    function create(text: string) {
        const newTask: ITask = {
            id: Date.now(),
            text: text,
            marcado: false
        };

        setTaskName([...taskName, newTask]);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        create(inputText);
        setInputText('');
    }

    function remove(id: Number) {
        setTaskName(taskName.filter(f => f.id !== id))
    }

    function update(id: number, checked: boolean) {
        const task = taskName.find(f => f.id === id);

        if (task) {
            task.marcado = checked;

            setTaskName([...taskName]);
        }
    }

    function saveLocalStorage() {
        const tasksStr = JSON.stringify(taskName);

        localStorage.setItem('@todo:listReact', tasksStr);
    }

    function loadLocalStorage() {
        const tasksStr = localStorage.getItem('@todo:listReact');
        const loadedTasks = tasksStr ? JSON.parse(tasksStr) : [];

        setTaskName(loadedTasks);
    }
    
    useEffect(() => {
        loadLocalStorage();
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) saveLocalStorage();
    }, [taskName,loaded]);

    return (
        <div className="main">

            <form className="add" name="form" onSubmit={handleSubmit}>
                <input
                    value={inputText}
                    type="text"
                    className="tarefa"
                    name="text"
                    placeholder="Qual sua proxima tarefa?"
                    required
                    onChange={e => setInputText(e.target.value)}
                />

                <button>add</button>
            </form>

            <ul className="myTask">
                {
                    taskName.length
                        ?
                        taskName.map(({ marcado, id, text }) => (
                            <li key={id} className={marcado ? 'completo' : 'task'}>
                                <label className={marcado ? 'checked' : ''}>
                                    <input
                                        onChange={event => update(id, event.target.checked)}
                                        type="checkbox"
                                        name='checkbox'
                                        checked={marcado}
                                    />
                                    <h2>{text}</h2>
                                </label>

                                <button onClick={() => remove(id)}>
                                    <img className="remove" src={iconRemove} alt="remove" />
                                </button>
                            </li>
                        ))
                        :
                        <h1>Você ainda não possui tarefas 🙁</h1>
                }
            </ul>

        </div>
    )
}

export default Todo