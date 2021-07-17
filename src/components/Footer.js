import React from "react"
import { ReactComponent as FlyLogo } from "../styles/paragliding-footer.svg"

function Footer() {
	return (
		<div className=''>
			<div className='bloc-centered typo footer-bloc'>
				<FlyLogo />
				<span className='title-footer'>Paragliding - LogBook</span>
			</div>
		</div>
	)
}

export default Footer
