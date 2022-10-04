import {useGlobalContext} from "../context";
import {BsHandThumbsUp} from "react-icons/bs";

const Meals = () => {
	// заберем из контекстта переменные
	const {meals, loading} = useGlobalContext();
	if (loading) {
		return <section className="section">
			<h4>данные загружаются.......</h4>
		</section>
	}
	if (meals.length < 1) {
		return <section className="section">
			<h4>no data, sorry.......</h4>
		</section>
	}
	return <section className="section-center">
		{meals.map((singleMeal)=>{
			const {idMeal, strMeal:title, strMealThumb:image} = singleMeal
			console.log(idMeal);
			return <article key={idMeal} className="single-meal">
					<img src={image} className="img"/>
					<footer>
						<h5>{title}</h5>
						<button className="like-btn"><BsHandThumbsUp/></button>
					</footer>
					</article>
		})}
	</section>
}
export default Meals