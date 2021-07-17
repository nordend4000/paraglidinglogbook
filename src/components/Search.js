import React from "react"
import ReactDom from "react-dom"
import "../styles/modal.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { ReactComponent as FlyLogo } from "../styles/paragliding.svg"

function Search({
	open,
	onClose,
	searchFlights,
	setSearch,
	search,
	setSelectSearch,
	searchMessage,
	selectSearch,
	selectGlider,
}) {
	if (!open) return null

	let selectType = "text"
	if (selectSearch === "date") selectType = "date"
	if (selectSearch === "number") selectType = "number"
	if (selectSearch === "windDir") selectType = "text"

	return ReactDom.createPortal(
		<>
			<div className='overlay-styles' onClick={onClose} />
			<div className='modal-styles'>
				<div className='modal-close-contener'>
					<div className='modal-close-btn' onClick={onClose}>
						<AiFillCloseCircle />
					</div>
				</div>
				<div className='body-modal '>
					<h2 className='typo'>
						<FlyLogo />
						SEARCH FLIGHTS :
					</h2>
					<label className='centered'>
						Select a field and enter your search :
					</label>
					<form className='form' onSubmit={e => searchFlights(e)}>
						<div className='search-bar'>
							<select required onChange={e => setSelectSearch(e.target.value)}>
								<option>Select the field</option>
								<option value='takeOff'>Take off</option>
								<option value='landing'>Landing</option>
								<option value='date'>Date</option>
								<option value='number'>Number</option>
								<option value='windDir'>Wind Direction</option>
								<option value='selectedGlider'>Glider</option>
							</select>
							{selectSearch === "selectedGlider" ? (
								<select required onChange={e => setSearch(e.target.value)}>
									<option>Select a glider</option>
									{selectGlider.map(glider => (
										<option value={glider} key={glider}>
											{glider}
										</option>
									))}
								</select>
							) : (
								<input
									className='search-input'
									type={selectType}
									placeholder='Enter your Search here ...'
									value={search}
									onChange={e => setSearch(e.target.value)}
									required
								/>
							)}
							<div className='bloc-centered'>
								<button type='submit' className='btn-form typo centered'>
									Search
								</button>
							</div>
						</div>
						<div className='search-message'>
							{searchMessage === "%%message%%" &&
								"Sorry nothing found... try again"}
						</div>
					</form>
				</div>
			</div>
		</>,
		document.getElementById("modal"),
	)
}

export default Search
