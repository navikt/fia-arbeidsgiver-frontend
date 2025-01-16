import startsideStyles from './startside.module.css';

export default function Mobilpåminnelse() {
	return (
		<div className={startsideStyles.mobilpåminnelseContainer}>
			<div className={startsideStyles.mobilpåminnelse}>
				<div className={startsideStyles.snakkeboble}>
					Psst! Har du med mobiltelefonen din?
				</div>
				<MobilePhoneIcon />
			</div>
		</div>
	);
}

function MobilePhoneIcon() {
	return (
		<svg className={startsideStyles.mobilikon} width="121" height="112" viewBox="0 0 110 102" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M66.8144 76H44.1856C42.4255 76 41 74.5898 41 72.8497V29.1493C41 27.4102 42.4255 26 44.1856 26H66.8144C68.5745 26 70 27.4102 70 29.1493V72.8497C70 74.5898 68.5745 76 66.8144 76Z" fill="#A0A0A0" />
			<rect width="25" height="40" transform="translate(43 28)" fill="white" />
			<rect x="44" y="29" width="23" height="13" fill="#B5F1FF" />
			<path fillRule="evenodd" clipRule="evenodd" d="M45 46H66V48H45V46Z" fill="#99DEAD" />
			<path fillRule="evenodd" clipRule="evenodd" d="M45 51H66V53H45V51Z" fill="#99DEAD" />
			<path fillRule="evenodd" clipRule="evenodd" d="M45 56H66V58H45V56Z" fill="#99DEAD" />
			<path fillRule="evenodd" clipRule="evenodd" d="M58 72C58 73.1045 57.1051 74 55.9995 74C54.8959 74 54 73.1045 54 72C54 70.8955 54.8959 70 55.9995 70C57.1051 70 58 70.8955 58 72Z" fill="#6A6A6A" />
			<path fillRule="evenodd" clipRule="evenodd" d="M70 53V63.1039V63.977C70 63.977 69.8885 64.6484 69.74 65.6172L66.628 61.2431C65.6717 59.8996 63.8242 59.598 62.5032 60.5698L62.2232 60.7742C60.9012 61.746 60.6044 63.6235 61.5607 64.9669L70.0319 76.8718C70.1841 77.286 70.3445 77.6889 70.507 78.0749C70.8796 78.9603 71.7964 80.2709 72.6736 81.5248C73.623 82.8819 74.5259 84.1726 74.642 84.7857C74.8653 85.9665 75.0885 87 75.0885 87L89 82.1288L84.4225 66.4999C84.3507 66.2545 84.2244 66.0302 84.0517 65.8409C82.4443 64.0843 73.4782 54.7986 71.9587 53.2263C71.8183 53.0801 71.6253 53 71.4223 53H70Z" fill="#AAB0BA" />
			<path fillRule="evenodd" clipRule="evenodd" d="M91.7285 82L74 88.3939L78.7075 102H99L91.7285 82Z" fill="#CCE2F0" />
			<path fillRule="evenodd" clipRule="evenodd" d="M91.9758 81L73 87.4698L75.0242 93L94 86.5302L91.9758 81Z" fill="#66A3C4" />
			<path fillRule="evenodd" clipRule="evenodd" d="M90.9425 84.667C90.7584 84.1462 90.187 83.8734 89.667 84.0575C89.1462 84.2408 88.8734 84.8122 89.0575 85.333C89.2408 85.8538 89.8122 86.1266 90.333 85.9425C90.8538 85.7584 91.1266 85.187 90.9425 84.667Z" fill="#262626" />
		</svg>
	);
}