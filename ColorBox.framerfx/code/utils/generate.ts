import * as chroma from 'chroma-js'
import { curves } from './easings'
import { distribute } from './distribute'

function generateNumberOfSteps(curve, steps) {
	const array = []
	for (const step in Array.from(Array(steps).keys())) {
		const value = curve(parseInt(step) / (steps - 1))
		array.push(value)
	}
	array.reverse()
	return array
}

export function generate({ specs }) {
	let lum_array = generateNumberOfSteps(curves[specs.lum_curve].bezier, specs.steps)
	let sat_array = generateNumberOfSteps(curves[specs.sat_curve].bezier, specs.steps)
	let hue_array = generateNumberOfSteps(curves[specs.hue_curve].bezier, specs.steps)
	const lum_array_adjusted: any[] = []
	const sat_array_adjusted: any[] = []
	const hue_array_adjusted: any[] = []

	for (let index in lum_array) {
		const step = lum_array[index]
		lum_array_adjusted.push(distribute(step, [0, 1], [specs.lum_end * 0.01, specs.lum_start * 0.01]))
	}

	for (let index in sat_array) {
		const step = sat_array[index]
		let sat_step = distribute(step, [0, 1], [specs.sat_start * 0.01, specs.sat_end * 0.01])

		sat_step = sat_step * (specs.sat_rate * 0.01)
		sat_array_adjusted.push(sat_step)
	}

	for (let index in hue_array) {
		const step = hue_array[index]
		hue_array_adjusted.push(distribute(step, [0, 1], [specs.hue_start, specs.hue_end]))
	}

	sat_array_adjusted.reverse()
	hue_array_adjusted.reverse()

	lum_array = lum_array_adjusted
	sat_array = sat_array_adjusted
	hue_array = hue_array_adjusted

	const colorMap = []

	for (let index in lum_array) {
		let step = lum_array[index]

		const hsv = {
			hue: Number(hue_array[index]),
			saturation: Number(sat_array[index]),
			luminosity: Number(lum_array[index])
		}

		if (hsv.saturation > 1) {
			hsv.saturation = 1
		}

		const hex = chroma.hsv(hsv.hue, hsv.saturation, hsv.luminosity)
		const contrastWhite = Number(chroma.contrast(hex, 'white').toFixed(2))
		const contrastBlack = Number(chroma.contrast(hex, 'black').toFixed(2))

		let displayColor = ''
		if (contrastWhite >= 4.5) {
			displayColor = 'white'
		} else {
			displayColor = 'black'
		}

		const colorObj = {
			hex: hex.hex(),
			hue: hex.hsv()[0],
			sat: hex.hsv()[1],
			lum: hex.hsv()[2],
			hsv: hex.hsv(),
			hsl: hex.hsl(),
			rgb: hex.rgb(),
			hueRange: [specs.hue_start, specs.hue_end],
			steps: specs.steps,
			label: specs.modifier * Number(index),
			contrastBlack,
			contrastWhite,
			displayColor
		}
		colorMap.push(colorObj)
	}

	return colorMap
}
