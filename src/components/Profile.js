import React, { useState } from "react"
import ReactDom from "react-dom"
import { getYear } from "date-fns"
import YearStatistic from "./YearStatistic"
import Axios from "axios"
import "../styles/modal.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { ReactComponent as FlyLogo } from "../styles/paragliding.svg"
import { RiDeleteBin4Line } from "react-icons/ri"
import {
	getTotalTime,
	getHigherNumber,
	getYearFlight,
	getYearBeforeFlight,
	getHigherDuration,
	getHigherAltitude,
	getHigherDistance,
	formatTime,
} from "../utils/utils"

function Profile({
	open,
	onClose,
	handleDelete,
	profileList,
	listAll,
	getProfileList,
}) {
	const [addProfile, setAddProfile] = useState(false)
	const [flightNumber, setFlightNumber] = useState(null)
	const [spotNumber, setSpotNumber] = useState(null)
	const [totalHours, setTotalHours] = useState(null)
	const [idToUpdate, setIdToUpdate] = useState(null)

	if (!open) return null
	const year = getYear(new Date())

	function handleEditProfile() {
		setIdToUpdate(profileList.length > 0 ? profileList[0]._id : null)
		setAddProfile(true)
		setTotalHours(profileList.length > 0 ? profileList[0].totalHours : null)
		setFlightNumber(profileList.length > 0 ? profileList[0].flightNumber : null)
		setSpotNumber(profileList.length > 0 ? profileList[0].spotNumber : null)
	}
	function handleCancel() {
		setAddProfile(false)
		setIdToUpdate("")
	}
	function saveProfile(e) {
		e.preventDefault()
		if (idToUpdate != null) {
			let newTotalHours = totalHours
			let newFlightNumber = flightNumber
			let newSpotNumber = spotNumber
			if (profileList[0].totalHours && totalHours === null) {
				newTotalHours = profileList[0].totalHours
			}
			if (profileList[0].flightNumber && flightNumber === null) {
				newFlightNumber = profileList[0].flightNumber
			}
			if (profileList[0].spotNumber && spotNumber === null) {
				newSpotNumber = profileList[0].spotNumber
			}

			return Axios.put(`${process.env.REACT_APP_DATABASE_URL}/updateProfile`, {
				id: idToUpdate,
				totalHours: newTotalHours,
				flightNumber: newFlightNumber,
				spotNumber: newSpotNumber,
			}).then(() => {
				initializeProfileStates()
			})
		}
		return Axios.post(`${process.env.REACT_APP_DATABASE_URL}/newProfile`, {
			totalHours: totalHours,
			flightNumber: flightNumber,
			spotNumber: spotNumber,
		}).then(() => {
			initializeProfileStates()
		})
	}
	function initializeProfileStates() {
		getProfileList()
		setFlightNumber("")
		setTotalHours("")
		setAddProfile(false)
		setSpotNumber("")
	}

	return ReactDom.createPortal(
		<>
			<div className='overlay-styles' onClick={onClose} />
			<div className='modal-styles'>
				<div className='modal-close-contener'>
					<div className='modal-close-btn' onClick={onClose}>
						<AiFillCloseCircle />
					</div>
				</div>
				<div className='body-modal'>
					<h2 className='typo'>
						<FlyLogo />
						MY PROFILE
					</h2>
					{listAll && (
						<>
							<div className='year-stat'>
								<div className='total-profile-break'>
									<div className='year typo'>My Statistic</div>
									<div className='total-profile-line'>
										Total Flight Time :
										<span className='total-profile-data'>
											{formatTime(getTotalTime(listAll, profileList))}
										</span>
									</div>
									<div className='total-profile-line'>
										Number of flights :
										<span className='total-profile-data'>
											{getHigherNumber(listAll)}
										</span>
									</div>
									<div className='total-profile-line'>
										Number of Spots :
										<span className='total-profile-data'>
											{profileList[0].spotNumber}
										</span>
									</div>
								</div>
								<div className='total-profile-break'>
									<div className='total-profile-line-small'>
										Longest flight :
										<span className='total-profile-data'>
											{getHigherDuration(listAll)} minutes
										</span>
									</div>
									<div className='total-profile-line-small'>
										Altitude Max :
										<span className='total-profile-data'>
											{getHigherAltitude(listAll)} m
										</span>
									</div>
									<div className='total-profile-line-small'>
										Farest flight :
										<span className='total-profile-data'>
											{getHigherDistance(listAll)} km
										</span>
									</div>
								</div>
							</div>
							<div className='year-stat'>
								<YearStatistic yearList={getYearFlight(listAll)} year={year} />
								<YearStatistic
									yearList={getYearBeforeFlight(listAll)}
									year={year - 1}
								/>
							</div>
						</>
					)}
					<div className='bloc-centered'>
						{profileList && (
							<div className=''>
								<span className='total-profile-line'>
									My initial data before using this log book :
								</span>
								<div className='total-profile-line-small'>
									Total Time before :
									<span className='total-profile-data'>
										{profileList.length > 0
											? formatTime(profileList[0].totalHours)
											: "0"}
									</span>
								</div>
								<div className='total-profile-line-small'>
									Number of flights before :
									<span className='total-profile-data'>
										{profileList.length > 0
											? formatTime(profileList[0].flightNumber)
											: "0"}
									</span>
								</div>
								<div className='total-profile-line-small'>
									Number of spots before :
									<span className='total-profile-data'>
										{profileList.length > 0 ? profileList[0].spotNumber : "0"}
									</span>
								</div>
							</div>
						)}
					</div>
					{addProfile && (
						<>
							<form className='' onSubmit={e => saveProfile(e)}>
								<div className=''>
									<div>
										<label className='centered'>
											Total Flight Time before using this logbook :
										</label>
									</div>
									<div>
										<input
											className='centered'
											type='number'
											placeholder='Total flight hours ...'
											value={totalHours}
											onChange={e => setTotalHours(e.target.value)}
										/>
									</div>
									<div>
										<label className='centered'>
											Number Of Flight before using this logbook :
										</label>
									</div>
									<div>
										<input
											className='centered'
											type='number'
											placeholder='Total flight Number ...'
											value={flightNumber}
											onChange={e => setFlightNumber(e.target.value)}
										/>
									</div>
									<div>
										<label className='centered'>
											Number of Spot before using this logbook :
										</label>
									</div>
									<div>
										<input
											className='centered'
											type='number'
											placeholder='Total Spots Number ...'
											value={spotNumber}
											onChange={e => setSpotNumber(e.target.value)}
										/>
									</div>
								</div>
								<div className='centered'>
									<button type='submit' className='btn-form typo'>
										{idToUpdate ? "Update Profile" : "Save Profile"}
									</button>
									<button
										onClick={() => handleCancel()}
										className='btn-form typo'>
										Cancel
									</button>
								</div>
							</form>
							<span
								className='edit-glider centered'
								onClick={() =>
									handleDelete(profileList[0]._id, "deleteProfile", `Profile `)
								}>
								<RiDeleteBin4Line className='delete-profile' />
							</span>
						</>
					)}
					<div className='bloc-centered'>
						{!addProfile && profileList && (
							<button
								onClick={() => handleEditProfile()}
								className='btn-form typo'>
								Update Profile
							</button>
						)}
						{!profileList && !addProfile && (
							<div
								className='btn-form btn-glider typo'
								onClick={() => setAddProfile(!addProfile)}>
								Profile Settings
							</div>
						)}
					</div>
				</div>
			</div>
		</>,
		document.getElementById("modal"),
	)
}

export default Profile
