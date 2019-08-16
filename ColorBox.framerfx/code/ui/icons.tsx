import * as React from 'react'
const getPath = (name, props) => {
	switch (name) {
		case 'aa':
			return (
				<path
					{...props}
					d="M39 1c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm3.1 4.3l-3.9 3.9s-.2.2-.3.2-.2-.1-.3-.2L36 7.6v-.2l.5-.5h.2L38 8.2l3.5-3.5h.2l.4.6c0-.1 0 0 0 0zM14.8 11.3H14l3.2-8.7h.9l3.2 8.7h-.8l-2.7-7.7h-.1l-2.9 7.7zm.6-3.4h4.3v.7h-4.3v-.7zM22.6 11.3h-.8L25 2.5h.9l3.2 8.7h-.8l-2.7-7.7h-.1l-2.9 7.8zm.6-3.4h4.3v.7h-4.3v-.7z"
				/>
			)
		case 'no-aa':
			return (
				<>
					<path
						fill={props.fill}
						d="M19.8 2.6l-2.9 8.7h.6l.9-2.7h3.3l.9 2.7h.6l-2.9-8.7h-.5zm-1.3 5.5L20 3.5l1.5 4.6h-3zM27.8 2.6h-.4l-2.9 8.7h.6l.9-2.7h3.3l.9 2.7h.6l-3-8.7zm-1.7 5.5l1.5-4.6 1.5 4.6h-3z"
					/>
					<path
						fill={props.fill}
						d="M16.6 6.8h13.8v.5H16.6zM39 1c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm1.5 8.2L39 7.7l-1.5 1.5c-.2.2-.5.2-.7 0-.1-.1-.1-.2-.1-.3 0-.1 0-.2.1-.3L38.3 7l-1.5-1.5c-.1-.1-.1-.2-.1-.3s0-.2.1-.3c.2-.2.5-.2.7 0L39 6.3l1.5-1.5c.2-.2.5-.2.7 0 .2.2.2.5 0 .7L39.7 7l1.5 1.5c.2.2.2.5 0 .7-.2.2-.5.2-.7 0z"
					/>
				</>
			)
		case 'aaa':
			return (
				<path
					{...props}
					d="M39 1c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm3.1 4.3l-3.9 3.9s-.2.2-.3.2-.2-.1-.3-.2L36 7.6v-.2l.5-.5h.2L38 8.2l3.5-3.5h.2l.4.6c0-.1 0 0 0 0zM7.6 11.4h-.9l3.2-8.7h.9l3.2 8.7h-.8l-2.7-7.7h-.1l-2.8 7.7zM8.2 8h4.3v.7H8.2V8zM15.4 11.4h-.8l3.2-8.7h.9l3.2 8.7H21l-2.7-7.7h-.1l-2.8 7.7zM16 8h4.3v.7H16V8zM23.3 11.4h-.8l3.2-8.7h.9l3.2 8.7H29l-2.7-7.7h-.1l-2.9 7.7zm.6-3.4h4.3v.7h-4.3V8z"
				/>
			)
		case 'no-aaa':
			return (
				<>
					<g fill="none" fillRule="evenodd" strokeWidth={1}>
						<path {...props} strokeLinecap="square" d="M1,8 L25,8" />
						<path
							fill={props.fill}
							d="M4.267 3h.649l3.245 7.81h-.814L6.335 8.368H2.826L1.825 10.81H1L4.267 3zm1.892 4.763L4.586 3.902 2.991 7.763h3.168zM12.506 3h.649l3.245 7.81h-.814l-1.012-2.442h-3.509l-1.001 2.442h-.825L12.506 3zm1.892 4.763l-1.573-3.861-1.595 3.861h3.168zM20.745 3h.649l3.245 7.81h-.814l-1.012-2.442h-3.509l-1.001 2.442h-.825L20.745 3zm1.892 4.763l-1.573-3.861-1.595 3.861h3.168z"
						/>
					</g>
				</>
			)
		default:
			return <path />
	}
}

export const AccessibleContrast = ({
	name = '',
	style = {},
	fill = '#000',
	stroke = 'transparent',
	width = 46,
	className = '',
	height = 14,
	viewBox = '0 0 46 14'
}) => (
	<svg
		width={width}
		style={style}
		height={height}
		viewBox={viewBox}
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		{getPath(name, { fill, stroke })}
	</svg>
)
