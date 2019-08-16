import styled from 'styled-components'

export const Container = styled.div`
	font-family: 'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
		'Segoe UI Symbol';
	width: 100%;
	height: 100%;
	font-variant-numeric: slashed-zero tabular-nums;
	display: flex;
	flex-direction: column;
`

export const Block = styled.div`
	width: ${props => props.width};
`

export const ColorSwatch = styled.div`
	display: flex;
	align-items: center;
	background-color: ${props => props.bg};
	flex-grow: 1;
	font-size: 12px;
	line-height: 100%;
	padding: 8px 16px;
`

export const LabelShade = styled.span`
	color: ${props => props.color};
	font-weight: bold;
	font-variant-numeric: slashed-zero tabular-nums;
`

export const LabelContrast = styled.span`
	color: ${props => props.color};
	font-size: 12px;
	font-variant-numeric: slashed-zero tabular-nums;
`

export const LabelHex = styled.span`
	color: ${props => props.color};
	font-size: 12px;
	font-variant-numeric: slashed-zero tabular-nums;
	text-transform: uppercase;
`
