import {useState} from 'react';
import {useGlobalContext} from '../context';

const Search = () => {
	const [text, setText] = useState('');
	// переменная состояния, получаемая из  ../context
	const {setSearchTerm, fetchRamdomMeal} = useGlobalContext();

	const handleChange = (e) => {
		// устанавливаем поисковое значение через получения введенного такста в input поиска
		setText(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(text) {
			setSearchTerm(text);
			// если нужно очистить поисковую строку..
			setText('');
		}
	}
	
	const handleRamdomMeal = () => {
		setSearchTerm('');
		//setText('');
		fetchRamdomMeal();
	}

	return <header className="search-container">
	<form onSubmit={handleSubmit}>
		<input type="text" value={text} onChange={handleChange} placeholder="найди меня" className="form-input"/>
		<button type="submit "className="btn">искать</button>
		<button type="button" onClick={handleRamdomMeal} className="btn btn-hipster">удиви меня</button>
	</form>
	</header>
}

export default Search