import './Button.css'

export default function Button(props) {
	const classes = `btn line-animation ${props.className ? props.className : ''}`
	const type = props.type || 'button'

	return (
		<button
			className={classes}
			type={type}
			onClick={props.onClick}
			onBlur={props.onBlur}
		>
			{props.children}
		</button>
	)
}
