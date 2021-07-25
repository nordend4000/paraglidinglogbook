import React, { useState } from "react"
import ReactDom from "react-dom"
import Axios from "axios"
import { format } from "date-fns"
import "../styles/modal.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { ReactComponent as FlyLogo } from "../styles/paragliding.svg"
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin4Line } from "react-icons/ri"
import { getGliderFlightTime, formatTime } from "../utils/utils"

function Gliders({
	open,
	onClose,
	gliderList,
	getGlidersList,
	handleDelete,
	listAll,
}) {
	const [addGlider, setAddGlider] = useState(false)
	const [glider, setGlider] = useState("")
	const [hours, setHours] = useState("")
	const [brand, setBrand] = useState("")
	const [control, setControl] = useState("")
	const [purchaseGlider, setPurchaseGlider] = useState("")
	const [idToUpdate, setIdToUpdate] = useState("")

	if (!open) return null

	function handleCancel() {
		setAddGlider(false)
		setIdToUpdate("")
	}
	function saveGlider(e) {
		e.preventDefault()
		if (idToUpdate) {
			return Axios.put(`${process.env.REACT_APP_DATABASE_URL}/updateGlider`, {
				id: idToUpdate,
				glider: glider,
				brand: brand,
				hours: hours,
				purchase: purchaseGlider,
				control: control,
			}).then(() => {
				intitializeGliderStates()
			})
		}
		return Axios.post(`${process.env.REACT_APP_DATABASE_URL}/newGlider`, {
			glider: glider,
			brand: brand,
			hours: hours,
			purchase: purchaseGlider,
			control: control,
		}).then(() => {
			intitializeGliderStates()
		})
	}
	function handleEditGlider(id) {
		setIdToUpdate(id)
		setAddGlider(true)
		Axios.get(`${process.env.REACT_APP_DATABASE_URL}/getGlider/${id}`).then(
			response => {
				setGlider(response.data.glider || "")
				setHours(response.data.hours || "")
				setBrand(response.data.brand || "")
				setPurchaseGlider(
					format(new Date(response.data.purchase), "yyyy-MM-dd") || "",
				)
				setControl(format(new Date(response.data.control), "yyyy-MM-dd") || "")
			},
		)
	}
	function intitializeGliderStates() {
		getGlidersList()
		setGlider("")
		setHours("")
		setBrand("")
		setPurchaseGlider("")
		setControl("")
		setAddGlider(false)
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
					<h2 className=' typo'>
						<FlyLogo />
						MY GLIDERS
					</h2>
					<div className='gliders-list-title'>
						<div className='gliders-list-title-glider typo'>
							<b>Glider</b>
						</div>
						<div className='gliders-list-title-hour typo'>
							<b>Actual Hours</b>
						</div>
						<div className='gliders-list-title-hour typo'>
							<b>Initial Hours</b>
						</div>
					</div>
					{gliderList.map(glider => (
						<div className='glider-list-contener' key={glider.control}>
							<div className='gliders-list'>
								<div className='gliders-list-glider  typo'>
									<span className='gliders-list-brand'>{glider.brand}</span>
									{glider.glider}
								</div>
								<div className='gliders-list-hours typo'>
									<b>
										{formatTime(
											getGliderFlightTime(glider.glider, gliderList, listAll),
										)}
									</b>
								</div>
								<div className='gliders-list-hours  typo'>
									<span className='initial-hours'>{glider.hours} h</span>
								</div>
							</div>
							<div className='control-glider'>
								<div>
									<b>Date of purchase : </b>
									{format(new Date(glider.purchase), "d MMMM yyyy")}
								</div>
								<div>
									<b>Last glider control : </b>
									{format(new Date(glider.control), "d MMMM yyyy")}
								</div>
								<div className='crud-glider'>
									<div
										className='edit-glider'
										onClick={() => handleEditGlider(glider._id)}>
										<FiEdit className='icon-modal' />
									</div>
									<div
										className='edit-glider'
										onClick={() =>
											handleDelete(
												glider._id,
												"deleteGlider",
												`glider ${glider.glider}`,
											)
										}>
										<RiDeleteBin4Line className='icon-modal' />
									</div>
								</div>
							</div>
						</div>
					))}
					{!addGlider ? (
						<div className='bloc-centered'>
							<div
								className='btn-form btn-glider typo centered'
								onClick={() => setAddGlider(!addGlider)}>
								Add New Glider
							</div>
						</div>
					) : (
						<div className='bloc-centered'>
							<form className='' onSubmit={e => saveGlider(e)}>
								<div className=''>
									<div>
										<label className=''>Glider model :</label>
										<input
											className=''
											type='text'
											placeholder='Enter your Glider name ...'
											value={glider}
											onChange={e => setGlider(e.target.value)}
											required
										/>
									</div>
									<div>
										<label className=''>Glider Brand :</label>
										<input
											className=''
											type='text'
											placeholder='Enter your Glider brand ...'
											value={brand}
											onChange={e => setBrand(e.target.value)}
											required
										/>
									</div>
									<div>
										<label className=''>Initial hours :</label>
										<input
											className=''
											type='number'
											placeholder='Total hours of your glider ...'
											value={hours}
											onChange={e => setHours(e.target.value)}
											required
										/>
									</div>
									<div>
										<label className=''>Date of Purchase :</label>
										<input
											className=''
											type='date'
											value={purchaseGlider}
											onChange={e => setPurchaseGlider(e.target.value)}
											required
										/>
									</div>
									<div>
										<label className=''>Last Glider Control :</label>
										<input
											className=''
											type='date'
											value={control}
											onChange={e => setControl(e.target.value)}
											required
										/>
									</div>
									<button type='submit' className='btn-form typo'>
										{!idToUpdate ? "Add Glider" : "Update Glider"}
									</button>
									<button
										onClick={() => handleCancel(false)}
										className='btn-form  typo'>
										Cancel
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		</>,
		document.getElementById("modal"),
	)
}

export default Gliders
