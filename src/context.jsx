import React, {useContext, useEffect, useState} from "react";
//axios - выполнение ассинхронных http запросов и получение ответов в json виде
import axios from "axios";
import favorites from "./components/Favorites";

const AppContext = React.createContext();

const allMealsUrl='https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl='https://www.themealdb.com/api/json/v1/1/random.php';
const getFavoritesFromLocalStorage = () => {
	let favorites = localStorage.getItem('favorites');
	if (favorites)
		favorites = JSON.parse(localStorage.getItem('favorites'));
	else
		favorites=[];
	return favorites;
}

const AppProvider = ({children}) => {
	const [loading, setLoading]=useState(false);
	const [meals, setMeals] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [showModal, setShowModal]= useState(false);
	const [selectedMeal, setSelectedMeal] =useState(null);
	const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
	const fetchMeals = async(url) => {
		setLoading(true);       // установоим признак (loading = true) загрузки данных для вывода заглушки "данные згружаются"
		try {
			const {data} = await axios(url);
			if (data.meals) {
				setMeals(data.meals);
				//console.log(data.meals);
			}
			else {
				setMeals([]);
			}
		}
		catch (error) {
			setMeals([]);
			console.log(error.response);
		}
		setLoading(false);
	}

	const fetchRamdomMeal = () => {
		fetchMeals(randomMealUrl)

	}

	const selectMeal = (idMeal, favoriteMeal) => {
		let meal;
		if (favoriteMeal) {
			meal = favorites.find((meal)=>meal.idMeal === idMeal);
		}
		else {
			meal = meals.find((meal)=>meal.idMeal === idMeal);
		}
		setSelectedMeal(meal);
		setShowModal(true);
	}

	const addToFavorites =(idMeal) => {
		const alreadyFavorite = favorites.find((meal)=> meal.idMeal === idMeal);
		if (alreadyFavorite) return;
		const meal = meals.find((meal)=> meal.idMeal === idMeal);
		const updatedFavorites = [...favorites, meal];
		setFavorites(updatedFavorites);
		localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
	}

	const removeFromFavorites =(idMeal) => {
		const updatedFavorites = favorites.filter((meal)=> meal.idMeal !== idMeal);
		setFavorites(updatedFavorites);
		localStorage.setItem('favorites',JSON.stringify(updatedFavorites));
	}

	// useEffect запускается после каждой отрисовки страницы
	// указывая [] (пустой массив зависимостей)  - означает, что он будет запускаться только 1 раз при начальной отрисовке
	// если [] указать внутри массива зависимостей какой либо элемент, то он будет вызываться при его изменении
	useEffect(() => {
		fetchMeals(allMealsUrl);
	},[]);



	// это другой useEffect, который должен сладить за состоянием "переменной состояния" SearchTerm, по изменению которой будет отправляться запрос на получение новых данных с удаленного сервера
	useEffect(() => {
		// чтобы дважды не отправлять запрос добавлем проверку если нет SearchTerm то не отправляем запрос
		if(!searchTerm) return
			fetchMeals(`${allMealsUrl}${searchTerm}`);
	},[searchTerm]);

	const closeModal =() => {
		setShowModal(false);
	}

	// благодаря тому, что мы в index.jsx app обернули в  provider это позволяет видеть экспортируемый контекст (указывается в скобках )  внутри приложения.
	// этот сдлано для того, чтобы не передавать через вызовы необходимые нам  парамеры
	// children это специальное свойство, через которое мы будем получать контекст (указанный в скобках)
	return <AppContext.Provider value={{ loading, meals,setSearchTerm, fetchRamdomMeal, showModal, selectedMeal, selectMeal, closeModal, favorites, addToFavorites, removeFromFavorites}}>
		{children}
	</AppContext.Provider>
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}

export {AppContext, AppProvider}
