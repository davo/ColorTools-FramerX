import * as React from 'react'
import { useEffect, useState } from 'react'
import { addPropertyControls, ControlType } from 'framer'
import { generate } from './utils/generate'
import { curves } from './utils/easings'
import { Container, Block, ColorSwatch, LabelShade, LabelContrast, LabelHex } from './ui/components'
import { AccessibleContrast } from './ui/icons'

const curvesItems = Object.keys(curves)
const curvesTitles = curvesItems.map(key => curves[key].name)

const WCAG_REQ_RATIO_AA_LG = 3.0
const WCAG_REQ_RATIO_AA_SM = 4.5
const WCAG_REQ_RATIO_AAA_LG = 4.5
const WCAG_REQ_RATIO_AAA_SM = 7.0
const WCAG_FONT_CUTOFF = 18

interface Props {
	width?: number
	height?: number
	showColorMetadata: boolean
	modifier: number
	steps: number
	hueStart: number
	hueEnd: number
	hueCurve: string
	satStart: number
	satEnd: number
	satCurve: string
	satRate: number
	lumStart: number
	lumEnd: number
	lumCurve: string
}

const checkContrastRatio = (ratio: number) => {
	return {
		aa: ratio >= WCAG_REQ_RATIO_AA_SM ? 'aa' : 'no-aa',
		wcag_aa_passed: ratio >= WCAG_REQ_RATIO_AA_SM,
		aaa: ratio >= WCAG_REQ_RATIO_AAA_SM ? 'aaa' : 'no-aaa',
		wcag_aaa_passed: ratio >= WCAG_REQ_RATIO_AAA_SM
	}
}

function ContrastChecker({ color, type = 'black' }) {
	const { displayColor, contrastBlack, contrastWhite } = color
	const [contrast, setContrast] = useState({ aa: 'aa', wcag_aa_passed: true, aaa: 'aaa', wcag_aaa_passed: true })

	useEffect(() => {
		switch (type) {
			case 'black':
				// const _contrastBlack = checkContrastRatio(contrastBlack)
				setContrast(checkContrastRatio(contrastBlack))
				// setContrastAAA(_contrastBlack.aaa)
				break
			case 'white':
				setContrast(checkContrastRatio(contrastWhite))
				break
		}
	}, [type])

	return (
		<>
			<Block
				width="60px"
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<>
					<AccessibleContrast name={contrast.aa} stroke={contrast.wcag_aa_passed ? 'transparent' : displayColor} fill={displayColor} style={{}} />
					<AccessibleContrast name={contrast.aaa} stroke={contrast.wcag_aaa_passed ? 'transparent' : displayColor} fill={displayColor} style={{}} />
				</>
			</Block>
		</>
	)
}

function ColorMetadata({ color }) {
	return (
		<>
			<Block width="10%">
				<LabelShade color={color.displayColor}>{color.label}</LabelShade>
			</Block>
			<Block
				width="50%"
				style={{
					display: 'flex',
					alignItems: 'baseline'
				}}
			>
				<Block
					width="50%"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end'
					}}
				>
					<ContrastChecker color={color} />
					<LabelContrast color="black">{`B: ${color.contrastBlack}`}</LabelContrast>
				</Block>
				<Block width="50%" style={{ marginLeft: '16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
					<ContrastChecker color={color} type={'white'} />
					<LabelContrast color="white">{`W: ${color.contrastWhite}`}</LabelContrast>
				</Block>
			</Block>
			<div
				style={{
					width: '40%',
					display: 'flex',
					justifyContent: 'flex-end',
					textAlign: 'right'
				}}
			>
				<LabelHex color={color.displayColor}>{color.hex}</LabelHex>
			</div>
		</>
	)
}

export function ColorBox({ showColorMetadata, modifier, steps, hueStart, hueEnd, hueCurve, satStart, satEnd, satCurve, satRate, lumStart, lumEnd, lumCurve }) {
	const colorBoxContext = {
		specs: {
			steps: steps,
			hue_start: hueStart,
			hue_end: hueEnd,
			hue_curve: hueCurve,
			sat_start: satStart,
			sat_end: satEnd,
			sat_curve: satCurve,
			sat_rate: satRate,
			lum_start: lumStart,
			lum_end: lumEnd,
			lum_curve: lumCurve,
			modifier: modifier
		}
	}

	return (
		<Container>
			{generate(colorBoxContext).map(color => {
				return (
					<ColorSwatch bg={color.hex} key={color.hex}>
						{showColorMetadata && <ColorMetadata color={color} />}
					</ColorSwatch>
				)
			})}
		</Container>
	)
}

ColorBox.defaultProps = {
	width: 400,
	height: 600,
	showColorMetadata: true,
	steps: 3,
	modifier: 5,
	hueStart: 315,
	hueEnd: 293,
	hueCurve: 'easeInQuad',
	satStart: 4,
	satEnd: 90,
	satCurve: 'easeOutQuad',
	satRate: 130,
	lumStart: 100,
	lumEnd: 53,
	lumCurve: 'easeOutQuad'
}

addPropertyControls(ColorBox, {
	showColorMetadata: {
		type: ControlType.Boolean,
		title: 'Metadata',
		enabledTitle: 'Show',
		disabledTitle: 'Hide'
	},
	steps: {
		title: 'Steps',
		type: ControlType.Number,
		max: 21,
		min: 3,
		step: 1
	},
	modifier: {
		title: 'Increment',
		type: ControlType.Number,
		min: 1,
		step: 1
	},
	hueStart: {
		title: 'Hue Start',
		type: ControlType.Number,
		max: 359,
		min: 0,
		step: 1,
		unit: '°'
	},
	hueEnd: {
		title: 'Hue End',
		type: ControlType.Number,
		max: 359,
		min: 0,
		step: 1,
		unit: '°'
	},
	hueCurve: {
		title: 'Hue Curve',
		type: ControlType.Enum,
		options: curvesItems,
		optionTitles: curvesTitles
	},
	satStart: {
		title: 'Sat Start',
		type: ControlType.Number,
		max: 100,
		min: 0,
		step: 1,
		unit: '%'
	},
	satEnd: {
		title: 'Sat End',
		type: ControlType.Number,
		max: 100,
		min: 0,
		step: 1,
		unit: '%'
	},
	satCurve: {
		title: 'Sat Curve',
		type: ControlType.Enum,
		options: curvesItems,
		optionTitles: curvesTitles
	},
	satRate: {
		title: 'Sat Rate',
		type: ControlType.Number,
		max: 200,
		min: 0,
		step: 1
	},
	lumStart: {
		title: 'Lum Start',
		type: ControlType.Number,
		max: 100,
		min: 0,
		step: 1,
		unit: '%'
	},
	lumEnd: {
		title: 'Lum End',
		type: ControlType.Number,
		max: 100,
		min: 0,
		step: 1,
		unit: '%'
	},
	lumCurve: {
		title: 'Lum Curve',
		type: ControlType.Enum,
		options: curvesItems,
		optionTitles: curvesTitles
	}
})
