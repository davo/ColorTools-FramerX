import * as React from 'react'
import { useState, useEffect } from 'react'
import { Frame, addPropertyControls, ControlType } from 'framer'
import { SketchPicker } from 'react-color'

type IColorPickerProps = {
	width: number
	height: number
	target?: string | any
	color?: string | any
}

export function ColorPicker(props: Partial<IColorPickerProps>) {
	const [current, setVariant] = useState('variantA')
	const toggleVariant = () => setVariant(current === 'variantA' ? 'variantB' : 'variantA')

	const variants = {
		variantA: { width: props.width },
		variantB: { width: 200 }
	}

	const [target, setTarget] = useState(props.target)
	const [colorResult, setColorResult] = useState({ hex: props.color })
	const [pickerVisible, setPickerVisible] = useState(false)

	const handleClick = () => {
		setPickerVisible(!pickerVisible)
		toggleVariant()
	}
	const handleClose = () => {
		// setVariant('variantA')
		setPickerVisible(!pickerVisible)
	}
	const handleChange = color => {
		setColorResult(color)
	}

	useEffect(() => {
		setColorResult({ hex: props.color })
		setTarget(props.target)
	}, [props])

	return (
		<>
			<Frame background={null}>
				<Frame
					variants={variants}
					style={{
						padding: 0,
						width: props.width,
						height: props.height,
						borderRadius: props.width / 2,
						background: `${colorResult.hex} `,
						cursor: 'pointer',
						display: 'inline-block',
						verticalAlign: 'top',
						marginRight: 10
					}}
					animate={current}
					transition={{ duration: 0.5 }}
					onClick={handleClick}
				/>
			</Frame>
			{pickerVisible ? (
				<Frame background={null} style={{ position: 'fixed', zIndex: 999 }}>
					<input
						value={colorResult.hex}
						style={{
							width: '100%',
							height: 22,
							cursor: 'pointer',
							WebkitBoxSizing: 'border-box',
							background: 'transparent'
						}}
					/>
					<div
						style={{
							position: 'fixed',
							top: 0,
							right: 0,
							bottom: 0,
							left: 0
						}}
						onClick={handleClose}
					/>
					<SketchPicker color={colorResult.hex} onChange={handleChange} />
				</Frame>
			) : null}
		</>
	)
}

ColorPicker.defaultProps = {
	width: 40,
	height: 40,
	target: 'ultramarine30',
	color: '#6790FF'
}

addPropertyControls(ColorPicker, {
	color: {
		type: ControlType.Color,
		title: 'Color',
		defaultValue: ColorPicker.defaultProps.color
	}
})
