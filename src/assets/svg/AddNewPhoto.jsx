import React, { useState } from 'react'
import './AddNewPhot.css'

const AddNewPhoto = ({ onChanges }) => {
	const [imagePreview, setImagePreview] = useState(null) // Стейт для зберігання попереднього перегляду фото

	const handleFileChange = e => {
		const file = e.target.files[0] // Отримуємо перший обраний файл
		onChanges(e) // Передаємо подію зміни файлу далі

		// Створюємо URL для попереднього перегляду обраного зображення
		const reader = new FileReader()
		reader.onload = () => {
			setImagePreview(reader.result)
		}
		reader.readAsDataURL(file)
	}

	const handleDelete = () => {
		setImagePreview(null) // Змінюємо стан, щоб видалити попередній перегляд
		// Додайте тут додаткову логіку, яка повинна бути виконана при видаленні фото
	}

	return (
		<div className='addNewPhotoStyle'>
			<input
				type='file'
				className='addNewPhotoStyleInput'
				onChange={handleFileChange} // Викликаємо функцію обробки зміни файлу
			/>
			{/* Показуємо SVG або попередній перегляд обраного зображення */}
			{imagePreview ? (
				<div className='addNewPhotoPreviewContainer'>
					<img
						src={imagePreview}
						alt='Preview'
						className='addNewPhotoPreview'
					/>
					<span className='addNewPhotoDelete' onClick={handleDelete}>
						✖
					</span>
				</div>
			) : (
				<svg
					width='315'
					height='300'
					viewBox='0 0 315 300'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onClick={() =>
						document.querySelector('.addNewPhotoStyleInput').click()
					} 
					style={{ cursor: 'pointer' }} 
				>
					<g clipPath='url(#clip0_730_1415)'>
						<path
							d='M184.19 190.476H117.524V123.81H160.381V114.286H117.524C112.286 114.286 108 118.571 108 123.81V190.476C108 195.714 112.286 200 117.524 200H184.19C189.429 200 193.714 195.714 193.714 190.476V147.619H184.19V190.476ZM147.095 175.381L137.762 164.143L124.667 180.952H177.048L160.19 158.524L147.095 175.381ZM193.714 114.286V100H184.19V114.286H169.905C169.952 114.333 169.905 123.81 169.905 123.81H184.19V138.048C184.238 138.095 193.714 138.048 193.714 138.048V123.81H208V114.286H193.714Z'
							fill='#272444'
						/>
					</g>
					<defs>
						<clipPath id='clip0_730_1415'>
							<rect width='315' height='300' fill='white' />
						</clipPath>
					</defs>
				</svg>
			)}
		</div>
	)
}

export default AddNewPhoto
