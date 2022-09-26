import iconRemove from '../assets/icons8-remove-48.svg'

export function Task(marcado:boolean, text:string) {
    return (
        <li className={marcado ? 'completo' : 'task'}>
            <label className={marcado ? 'checked' : ''}>
                <input type="checkbox" name='checkbox' checked={marcado}/>
                    <h2>{text}</h2>
            </label>
            <button>
                <img className="remove" src={iconRemove} alt="remove"/>
            </button>
        </li>
    )
}