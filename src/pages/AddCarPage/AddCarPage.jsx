import React, { useState } from 'react'
import NumberQuest from '../../component/numberQuest/NumberQuest'
import ZnakOkluky from '../../assets/svg/ZnakOkluky'
import AddNewPhoto from '../../assets/svg/AddNewPhoto'
import './AddCarPage.css'



const AddCarForm = () => {
	const userInfo = JSON.parse(localStorage.getItem('user-info'))
	const [type_of_transport, setType_of_transport] = useState('')
	const [brand, setBrand] = useState('')
	const [model, setModel] = useState('')
	const [year, setYear] = useState('')
	const [runs, setRuns] = useState('')
	const [body_type, setBody_type] = useState('')
	const [region, setRegion] = useState('')
	const [city, setCity] = useState('')
	const [vin_code, setVin_code] = useState('')
	const [verified_vin, setVerified_vin] = useState('0')
	const [is_sold, setsold] = useState('0')
	const [number_of_owners, setNumber_of_owners] = useState('')
	const [phone_owner, setPhone_owner] = useState(userInfo.number)
	const [description, setDescription] = useState('')
	const [gearbox, setGearbox] = useState('')
	const [fuel_type, setFuel_type] = useState('')
	const [fuel_consumption_city, setFuel_consumption_city] = useState('')
	const [fuel_consumption_highway, setFuel_consumption_highway] = useState('')
	const [fuel_consumption_combined, setFuel_consumption_combined] = useState('')
	const [engine_power, setEngine_power] = useState('')
	const [number_of_doors, setNumber_of_doors] = useState('')
	const [color, setColor] = useState('')
	const [price, setPrice] = useState('')
	const [photo_paths, setPhoto_paths] = useState('')

	const calculateCombinedFuelConsumption = () => {
		if (fuel_consumption_city && fuel_consumption_highway) {
			return (
				(parseFloat(fuel_consumption_city) +
					parseFloat(fuel_consumption_highway)) /
				2
			)
		}
		return ''
	}


	async function addProduct() {
		const formData = new FormData()
		formData.append('type_of_transport', type_of_transport)
		formData.append('brand', brand)
		formData.append('model', model)
		formData.append('year', year)
		formData.append('runs', runs)
		formData.append('body_type', body_type)
		formData.append('region', region)
		formData.append('city', city)
		formData.append('vin_code', vin_code)
		formData.append('verified_vin', verified_vin)
		formData.append('is_sold', is_sold)
		formData.append('number_of_owners', number_of_owners)
		formData.append('phone_owner', phone_owner)
		formData.append('description', description)
		formData.append('gearbox', gearbox)
		formData.append('fuel_type', fuel_type)
		formData.append('fuel_consumption_city', fuel_consumption_city)
		formData.append('fuel_consumption_highway', fuel_consumption_highway)
		formData.append(
			'fuel_consumption_combined',
			calculateCombinedFuelConsumption()
		)
		formData.append('engine_power', engine_power)
		formData.append('number_of_doors', number_of_doors)
		formData.append('color', color)
		formData.append('price', price)
		formData.append('photo_paths', photo_paths)

		try {
			let result = await fetch('http://localhost:8000/api/testAdd', {
				method: 'POST',
				body: formData,
			})

			if (!result.ok) {
				const errorText = await result.text()
				console.error('Error:', errorText)
				alert(`Error: ${result.status} ${result.statusText}`)
			} else {
				alert('Data has been saved')
			}
		} catch (error) {
			console.error('Request failed', error)
			alert('Request failed: ' + error.message)
		}
	}

	return (
		<>
			<div className='addCarPageHeader'>Додати авто</div>
			<div className='addCarPageAddPhoto'>
				<NumberQuest title={'1'} />
				Додайте фото
			</div>
			<div className='addCarPageAddPhotoMain'>
				<AddNewPhoto onChanges={e => setPhoto_paths(e.target.files[0])} />
			</div>
			<div className='addCarPageAddMoreInfo'>
				<NumberQuest title={'2'} />
				Основна інформація
			</div>
			<div className='fieldsAreMandatory'>
				<ZnakOkluky /> <p>Поля обов`язкові для заповнення</p>
			</div>
			<div className='addCarPageAddInfoCar'>
				<div className='addCarPageInfoCarName'>
					<ZnakOkluky />
					Тип транспорту
				</div>

				<select
					name='type_of_transport'
					className='addCarPageAddInfoCarSelector'
					onChange={e => setType_of_transport(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='Легкові'>Легкові</option>
					<option value='Мото'>Мото</option>
					<option value='Вантажівки'>Вантажівки</option>
					<option value='Причепи'>Причепи</option>
					<option value='Спецтехніка'>Спецтехніка</option>
					<option value='Автобуси'>Автобуси</option>
				</select>
				<div>
					<ZnakOkluky />
					Марка авто
				</div>
				<select
					name='brand'
					className=' addCarPageAddInfoCarSelector'
					onChange={e => setBrand(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='BMW'>BMW</option>
					<option value='Audi'>Audi</option>
					<option value='Mercedes-Benz'>Mercedes-Benz</option>
					<option value='Opel'>Opel</option>
					<option value='Porche'>Porche</option>
					<option value='Mini'>Mini</option>
				</select>
				<div>
					<ZnakOkluky />
					Модель авто
				</div>
				<select
					name='model'
					className='addCarPageAddInfoCarSelector'
					onChange={e => setModel(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='E46'>E 46</option>
					<option value='A6'>A 6</option>
					<option value='CS300'>CS 300</option>
					<option value='Insignia'>Insignia</option>
					<option value='Tiguan'>Tiguan</option>
					<option value='F10'>F 10</option>
				</select>
				<div>
					<ZnakOkluky />
					Рік випуску
				</div>
				<input
					onChange={e => setYear(e.target.value)}
					type='number'
					name='year'
					className='addCarPageInfoCarInput'
					placeholder='Введіть рік випуску'
				/>
				<div>
					<ZnakOkluky />
					Пробіг
				</div>
				<input
					type='number'
					onChange={e => setRuns(e.target.value)}
					name='runs'
					className='addCarPageInfoCarInput'
					placeholder='тис.км'
				/>
				<div>
					<ZnakOkluky />
					Тип кузова
				</div>
				<select
					name='body_type'
					className='addCarPageAddInfoCarSelector'
					onChange={e => setBody_type(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='Кабріолет'>Кабріолет</option>
					<option value='Купе'>Купе</option>
					<option value='Седан'>Седан</option>
					<option value='Універсал'>Універсал</option>
					<option value='Хетчбек'>Хетчбек</option>
					<option value='Мінівен'>Мінівен</option>
				</select>
				<div>
					<ZnakOkluky />
					Регіон
				</div>
				<select
					name='region'
					className='addCarPageAddInfoCarSelector'
					onChange={e => setRegion(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='Київ'>Київ</option>
					<option value='Харків'>Харків</option>
					<option value='Львів'>Львів</option>
					<option value='Одеса'>Одеса</option>
					<option value='Дніпро'>Дніпро</option>
					<option value='Донецьк'>Донецьк</option>
				</select>
				<div>
					<ZnakOkluky />
					Місто
				</div>
				<select
					name='city'
					className='addCarPageAddInfoCarSelector'
					onChange={e => setCity(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='Київ'>Київ</option>
					<option value='Харків'>Харків</option>
					<option value='Львів'>Львів</option>
					<option value='Одеса'>Одеса</option>
					<option value='Дніпро'>Дніпро</option>
					<option value='Донецьк'>Донецьк</option>
				</select>
				<div>
					<ZnakOkluky />
					VIN-код
				</div>
				<input
					onChange={e => setVin_code(e.target.value)}
					type='number'
					name='vin_code'
					className='addCarPageInfoCarInput'
					placeholder='Введіть VIN-код'
				/>
			</div>
			<div className='addCarPageAddMoreInfo'>
				<NumberQuest title={'3'} />
				Опис авто
			</div>
			<div className='descrption'>
				Введіть опис для авто
				<textarea
					onChange={e => setDescription(e.target.value)}
					name='description'
					className='addCarPageInfoCarInputDescription'
					placeholder='Введіть опис'
				></textarea>
			</div>
			<div className='addCarPageAddMoreInfo'>
				<NumberQuest title={'4'} />
				Характеристики авто
			</div>
			<div className='addCarPageAddInfoCar'>
				<div>Кількість власників</div>
				<select
					name='number_of_owners'
					className='addCarPageAddInfoCarSelector'
					onChange={e => setNumber_of_owners(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
					<option value='5'>5</option>
				</select>
				<div>Телефон власника</div>
				<input
					value={phone_owner}
					className='addCarPageInfoCarInput'
					readOnly
				/>
				<div>Коробка передач</div>
				<select
					name='gearbox'
					className='addCarPageAddInfoCarSelector'
					onChange={e => setGearbox(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='Автомат'>Автомат</option>
					<option value='Механіка'>Механіка</option>
				</select>
				<div>Тип палива</div>
				<select
					name='fuel_type'
					className='addCarPageAddInfoCarSelector'
					onChange={e => setFuel_type(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='Газ'>Газ</option>
					<option value='Дизель'>Дизель</option>
					<option value='Бензин'>Бензин</option>
					<option value='Електро'>Електро</option>
				</select>
				<div>Витрата палива (місто)</div>
				<input
					onChange={e => setFuel_consumption_city(e.target.value)}
					type='number'
					name='fuel_consumption_city'
					className='addCarPageInfoCarInput'
					placeholder='Введіть витрату палива в місті'
				/>
				<div>Витрата палива (трасса)</div>
				<input
					onChange={e => setFuel_consumption_highway(e.target.value)}
					type='number'
					name='fuel_consumption_highway'
					className='addCarPageInfoCarInput'
					placeholder='Введіть витрату палива на трассі'
				/>
				<div>Потужність двигуна (к.с.)</div>
				<input
					onChange={e => setEngine_power(e.target.value)}
					type='number'
					name='engine_power'
					className='addCarPageInfoCarInput'
					placeholder='Введіть потужність двигуна'
				/>
				<div>Кількість дверей</div>
				<select
					name='number_of_doors'
					className='addCarPageAddInfoCarSelector'
					onChange={e => setNumber_of_doors(e.target.value)}
				>
					<option value=''>Оберіть</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
					<option value='5'>5</option>
				</select>
				<div>Колір</div>
				<input
					onChange={e => setColor(e.target.value)}
					type='text'
					name='color'
					className='addCarPageInfoCarInput'
					placeholder='Введіть колір'
				/>
			</div>
			<div className='addCarPageAddMoreInfo'>
				<NumberQuest title={'5'} />
				Ціна авто
			</div>
			<div className='addCarPageAddInfoCar'>
				<div>Ціна ($)</div>
				<input
					onChange={e => setPrice(e.target.value)}
					type='number'
					name='price'
					className='addCarPageInfoCarInput'
					placeholder='Введіть ціну'
				/>
			</div>

			<button className='buttonAddCar' onClick={addProduct} type='submit'>
				Додати авто
			</button>
		</>
	)
}

export default AddCarForm
