import React from "react"
import ReactDom from "react-dom"
import "../styles/modal.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { ReactComponent as FlyLogo } from "../styles/paragliding.svg"

function Form({
	open,
	onClose,
	submitForm,
	takeOff,
	setTakeOff,
	idToUpdate,
	intitializeStates,
	date,
	setDate,
	startTime,
	setStartTime,
	duration,
	setDuration,
	landing,
	setLanding,
	climb,
	setClimb,
	sink,
	setSink,
	distance,
	setDistance,
	comments,
	setComments,
	above,
	setAbove,
	windDir,
	windSpeed,
	setWindDir,
	setWindSpeed,
	selectGlider,
	setSelectedGlider,
	selectedGlider,
	setAltitude,
	altitude,
	setSpeed,
	speed,
	setFile,
	original_filename,
	newSpot,
	setNewSpot,
}) {
	if (!open) return null
	return ReactDom.createPortal(
		<>
			<div className='overlay-styles' onClick={onClose} />
			<div className='modal-styles'>
				<div className='modal-close-contener'>
					<div className='modal-close-btn' onClick={onClose}>
						<AiFillCloseCircle />
					</div>
				</div>
				<h2 className=' typo'>
					<FlyLogo />
					{idToUpdate ? "UPDATE MY FLIGHT :" : "CREATE A NEW FLIGHT :"}
				</h2>
				<div className='centered-form'>
					<select
						value={selectedGlider}
						onChange={e => setSelectedGlider(e.target.value)}
						placeholder='glider'>
						<option>Select your glider</option>
						{selectGlider.map(glider => (
							<option key={glider} value={glider}>
								{glider}
							</option>
						))}
					</select>

					<label className='label-checkbox'>New Spot :</label>
					<input
						type='checkbox'
						className='checkbox'
						checked={newSpot}
						onChange={e => setNewSpot(e.target.checked)}
					/>
				</div>
				<form className='form' onSubmit={e => submitForm(e)}>
					<div className='input-group'>
						<div>
							<label>Take Off :</label>
							<input
								type='text'
								placeholder='Take off name ...'
								value={takeOff}
								onChange={e => setTakeOff(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Date :</label>
							<input
								type='date'
								placeholder='Date of flight ...'
								value={date}
								onChange={e => setDate(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Start Time :</label>
							<input
								type='time'
								placeholder='Time of flight ...'
								value={startTime}
								onChange={e => setStartTime(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Flight duration :</label>
							<input
								type='number'
								placeholder='Duration in minutes ...'
								value={duration}
								onChange={e => setDuration(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Wind direction :</label>
							<input
								type='text'
								placeholder='N / W / S / E / NW / SSE ...'
								value={windDir}
								onChange={e => setWindDir(e.target.value)}
							/>
						</div>
						<div>
							<label>Wind speed :</label>
							<input
								type='text'
								placeholder='Wind speed in Km/h ...'
								value={windSpeed}
								onChange={e => setWindSpeed(e.target.value)}
							/>
						</div>
						<div>
							<label>Altitude above Take off :</label>
							<input
								type='number'
								placeholder='Altitude in meter ...'
								value={above}
								onChange={e => setAbove(e.target.value)}
							/>
						</div>
						<div>
							<label>Max Altitude :</label>
							<input
								type='number'
								placeholder='Altitude in meter ...'
								value={altitude}
								onChange={e => setAltitude(e.target.value)}
							/>
						</div>
						<div>
							<label>Max Climb Rate :</label>
							<input
								type='number'
								placeholder='Max climb in m/s...'
								step='.1'
								value={climb}
								onChange={e => setClimb(e.target.value)}
							/>
						</div>
						<div>
							<label>Max Sink Rate :</label>
							<input
								type='number'
								placeholder='Max sink in m/s...'
								step='.1'
								value={sink}
								onChange={e => setSink(e.target.value)}
							/>
						</div>
						<div>
							<label>Max Speed :</label>
							<input
								type='number'
								placeholder='Max speed in km/h...'
								step='.1'
								value={speed}
								onChange={e => setSpeed(e.target.value)}
							/>
						</div>
						<div>
							<label>Distance :</label>
							<input
								type='number'
								placeholder='Distance in Km ...'
								step='.1'
								value={distance}
								onChange={e => setDistance(e.target.value)}
							/>
						</div>
						<div>
							<label>Landing :</label>
							<input
								type='text'
								placeholder='Landing spot ...'
								value={landing}
								onChange={e => setLanding(e.target.value)}
							/>
						</div>
					</div>
					<div className='input-group'>
						<label>Comments :</label>
						<textarea
							type='text'
							placeholder='Your comments ...'
							value={comments}
							onChange={e => setComments(e.target.value)}
						/>
					</div>
					{original_filename && (
						<>
							<label>File saved : {original_filename}.gpx</label>
							<div>
								<label>To update, below select a new one ...</label>
							</div>
						</>
					)}
					<input
						className='file-input'
						onChange={event => setFile(event.target.files[0])}
						type='file'
						name='file'
						id='file'
					/>
					<div className='btn-container'>
						<button className='btn-form typo' type='submit'>
							{idToUpdate ? "Update" : "Save New Flight"}
						</button>
						{idToUpdate && (
							<div className='btn-form  typo' onClick={intitializeStates}>
								Cancel
							</div>
						)}
					</div>
				</form>
			</div>
		</>,
		document.getElementById("modal"),
	)
}

export default Form
