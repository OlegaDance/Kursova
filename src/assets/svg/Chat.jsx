import './Chat.css'

const Chat = () => {
	return (
		<div className='chatContainer'>
			<svg
				className='ChatSvg'
				width='82'
				height='81'
				viewBox='0 0 82 81'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<rect y='11' width='70' height='70' rx='10' fill='white' />
				<g clipPath='url(#clip0_576_1645)'>
					<path
						d='M51.6668 25.1667H18.3334C16.0417 25.1667 14.1667 27.0417 14.1667 29.3334V66.8334L22.5001 58.5001H51.6668C53.9584 58.5001 55.8334 56.6251 55.8334 54.3334V29.3334C55.8334 27.0417 53.9584 25.1667 51.6668 25.1667ZM51.6668 54.3334H20.7709L18.3334 56.7709V29.3334H51.6668V54.3334ZM24.5834 39.7501H28.7501V43.9167H24.5834V39.7501ZM41.2501 39.7501H45.4167V43.9167H41.2501V39.7501ZM32.9167 39.7501H37.0834V43.9167H32.9167V39.7501Z'
						fill='#323232'
					/>
				</g>
				<circle cx='67' cy='15' r='15' fill='#D9D9D9' />
				<text
					x='67'
					y='20'
					textAnchor='middle'
					fill='black'
					fontSize='20px'
					fontFamily='Arial'
					dy='.3em'
				>
					1
				</text>
				<defs>
					<clipPath id='clip0_576_1645'>
						<rect
							width='50'
							height='50'
							fill='white'
							transform='translate(10 21)'
						/>
					</clipPath>
				</defs>
			</svg>
		</div>
	)
}

export default Chat
