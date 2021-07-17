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
	getTotalNumber,
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
	const [flightNumber, setFlightNumber] = useState("")
	const [totalHours, setTotalHours] = useState("")
	const [idToUpdate, setIdToUpdate] = useState("")

	if (!open) return null

	const year = getYear(new Date())

	function handleEditProfile(id) {
		setIdToUpdate(id)
		setAddProfile(true)
		setTotalHours(profileList[0].totalHours)
		setFlightNumber(profileList[0].flightNumber)
	}
	function handleCancel() {
		setAddProfile(false)
		setIdToUpdate("")
	}
	function saveProfile(e) {
		e.preventDefault()
		if (idToUpdate) {
			return Axios.put("http://localhost:3001/updateProfile", {
				id: idToUpdate,
				totalHours: totalHours,
				flightNumber: flightNumber,
			}).then(() => {
				initializeProfileStates()
			})
		}
		return Axios.post("http://localhost:3001/newProfile", {
			totalHours: totalHours,
			flightNumber: flightNumber,
		}).then(() => {
			initializeProfileStates()
		})
	}
	function initializeProfileStates() {
		getProfileList()
		setFlightNumber("")
		setTotalHours("")
		setAddProfile(false)
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
									{getTotalNumber(listAll, profileList)}
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
					<div className='bloc-centered'>
						{profileList && (
							<div className=''>
								<span className='total-profile-line'>
									My initial data before using this log book :
								</span>
								<div className='total-profile-line-small'>
									Total Time before :
									<span className='total-profile-data'>
										{formatTime(profileList[0].totalHours)}
									</span>
								</div>
								<div className='total-profile-line-small'>
									Number of flights before :
									<span className='total-profile-data'>
										{profileList[0].flightNumber}
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
											required
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
											required
										/>
									</div>
								</div>
								<div className='centered'>
									<button type='submit' className='btn-form typo'>
										Save Profile
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
								onClick={() => handleEditProfile(profileList[0]._id)}
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
