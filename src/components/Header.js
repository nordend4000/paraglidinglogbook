import React from "react"
import { ReactComponent as FlyLogo } from "../styles/paragliding.svg"

function Header({
	openForm,
	setOpenForm,
	setOpenProfile,
	openProfile,
	openSearch,
	setOpenSearch,
	setOpenGliders,
	openGliders,
	openHarness,
	setOpenHarness,
}) {
	return (
		<header className='App-header'>
			<div className='title-container'>
				<div className='title-icon typo'>
					<FlyLogo /> Paragliding
				</div>
				<div className='title-text typo'>LOG BOOK</div>
			</div>
			<div className='row-header-btn'>
				<div className='header-btn' onClick={() => setOpenForm(!openForm)}>
					New Flight
				</div>
				<div
					className='header-btn'
					onClick={() => setOpenGliders(!openGliders)}>
					Gliders
				</div>
				<div
					className='header-btn'
					onClick={() => setOpenHarness(!openHarness)}>
					Harness
				</div>
				<div className='header-btn' onClick={() => setOpenSearch(!openSearch)}>
					Search
				</div>
				<div
					className='header-btn'
					onClick={() => setOpenProfile(!openProfile)}>
					Profile
				</div>
			</div>
		</header>
	)
}

export default Header
