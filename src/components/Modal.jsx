import {useGlobalContext} from "../context";

const Modal = () => {
	const {selectedMeal, closeModal} = useGlobalContext();
	const {strMealThumb:image, strMeal:title, strInstructions:text, strSource:source} = selectedMeal;
	return <aside className="modal-overlay">
		<div className="modal-container">
			<img src={image} alt={title} className="img modal-img"/>
			<div className="modal-content">
				<h4>{title}</h4>
				<p>Instructions</p>
				<p>{text}</p>
				<a href={source} rel="noreferrer" target="_blank">original {title} </a>
				<button className="btn btn-hipster close-btn" onClick={closeModal}>X</button>
			</div>
		</div>
	</aside>
}

export default Modal