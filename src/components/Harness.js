import React, { useState } from "react"
import ReactDom from "react-dom"
import Axios from "axios"
import { format } from "date-fns"
import "../styles/modal.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { ReactComponent as FlyLogo } from "../styles/paragliding.svg"
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin4Line } from "react-icons/ri"

function Harness({ open, onClose, harnessList, getHarnessList, handleDelete }) {
	const [addHarness, setAddHarness] = useState(false)
	const [isHarness, setIsHarness] = useState(true)
	const [harness, setHarness] = useState("")
	const [harnessBrand, setHarnessBrand] = useState("")
	const [purchaseHarness, setPurchaseHarness] = useState("")
	const [parachute, setParachute] = useState("")
	const [parachuteBrand, setParachuteBrand] = useState("")
	const [purchaseParachute, setPurchaseParachute] = useState("")
	const [controlParachute, setControlParachute] = useState("")
	const [idToUpdate, setIdToUpdate] = useState("")
	const [selectValue, setSelectValue] = useState("")

	if (!open) return null

	function handleSelectGear(e) {
		if (e === "harness") {
			setSelectValue("harness")
			return setIsHarness(true)
		}
		if (e === "parachute") {
			setSelectValue("parachute")
			return setIsHarness(false)
		}
	}
	function handleCancel() {
		setAddHarness(false)
		setIdToUpdate("")
	}

	function saveHarness(e) {
		e.preventDefault()
		if (idToUpdate) {
			return Axios.put("http://localhost:3001/updateHarness", {
				id: idToUpdate,
				isHarness: isHarness,
				harness: harness,
				harnessBrand: harnessBrand,
				purchaseHarness: purchaseHarness,
				parachute: parachute,
				parachuteBrand: parachuteBrand,
				purchaseParachute: purchaseParachute,
				controlParachute: controlParachute,
			}).then(() => {
				intitializeHarnessStates()
			})
		}
		return Axios.post("http://localhost:3001/newHarness", {
			isHarness: isHarness,
			harness: harness,
			harnessBrand: harnessBrand,
			purchaseHarness: purchaseHarness,
			parachute: parachute,
			parachuteBrand: parachuteBrand,
			purchaseParachute: purchaseParachute,
			controlParachute: controlParachute,
		}).then(() => {
			intitializeHarnessStates()
		})
	}
	function handleEditHarness(id) {
		setIdToUpdate(id)
		setAddHarness(true)
		Axios.get(`http://localhost:3001/getHarness/${id}`).then(response => {
			setSelectValue(response.data.isHarness ? "harness" : "parachute")
			setIsHarness(response.data.isHarness)
			setHarness(response.data.harness || "")
			setParachute(response.data.parachute || "")
			setParachuteBrand(response.data.parachuteBrand || "")
			setHarnessBrand(response.data.parachuteBrand || "")
			setPurchaseHarness(
				format(new Date(response.data.purchaseHarness), "yyyy-MM-dd") || "",
			)
			setPurchaseParachute(
				format(new Date(response.data.purchaseParachute), "yyyy-MM-dd") || "",
			)
			setControlParachute(
				format(new Date(response.data.controlParachute), "yyyy-MM-dd") || "",
			)
		})
	}
	function intitializeHarnessStates() {
		getHarnessList()
		setIsHarness(true)
		setHarness("")
		setParachute("")
		setParachuteBrand("")
		setHarnessBrand("")
		setPurchaseHarness("")
		setPurchaseParachute("")
		setControlParachute("")
		setAddHarness(false)
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
						MY HARNESS & PARACHUTE
					</h2>
					{harnessList.map(harness => (
						<div className='glider-list-contener'>
							<div className='harness-list'>
								<div className='gliders-list-hours'>
									{harness.isHarness ? "Harness" : "Parachute"}
								</div>
								<div className='gliders-list-glider  typo'>
									<span className='gliders-list-brand'>
										{harness.isHarness
											? harness.harnessBrand
											: harness.parachuteBrand}
									</span>
									{harness.isHarness ? harness.harness : harness.parachute}
								</div>
							</div>
							<div className='control-glider'>
								<div>
									<span className='spacing-right'>Date of purchase :</span>
									{harness.isHarness
										? format(new Date(harness.purchaseHarness), "d MMMM yyyy")
										: format(
												new Date(harness.purchaseParachute),
												"d MMMM yyyy",
										  )}
								</div>
								{!harness.isHarness && (
									<div>
										<span className='spacing-right'>
											Last Parachute Folding :
										</span>
										{format(new Date(harness.controlParachute), "d MMMM yyyy")}
									</div>
								)}
								<div className='crud-glider'>
									<div
										className='edit-glider'
										onClick={() => handleEditHarness(harness._id)}>
										<FiEdit className='icon-modal' />
									</div>
									<div
										className='edit-glider'
										onClick={() =>
											handleDelete(
												harness._id,
												"deleteHarness",
												`${harness.isHarness ? "harness " : "parachute "} ${
													harness.isHarness
														? harness.harness
														: harness.parachute
												}`,
											)
										}>
										<RiDeleteBin4Line className='icon-modal' />
									</div>
								</div>
							</div>
						</div>
					))}
					{!addHarness ? (
						<div className='bloc-centered'>
							<div
								className='btn-form btn-glider typo centered'
								onClick={() => setAddHarness(!addHarness)}>
								Add New Gear
							</div>
						</div>
					) : (
						<div>
							<div className='bloc-centered'>
								<select
									required
									value={selectValue}
									onChange={e => handleSelectGear(e.target.value)}>
									<option>Select Gear</option>
									<option value='harness'>Harness</option>
									<option value='parachute'>Parachute</option>
								</select>
							</div>
							<div className='bloc-centered'>
								<form onSubmit={e => saveHarness(e)}>
									<div className=''>
										{isHarness ? (
											<>
												<div>
													<label className=''>Harness Model :</label>
													<input
														className=''
														type='text'
														placeholder='Enter your Harness model ...'
														value={harness}
														onChange={e => setHarness(e.target.value)}
														required
													/>
												</div>
												<div>
													<label className=''>Harness Brand :</label>
													<input
														className=''
														type='text'
														placeholder='Enter your Harness brand ...'
														value={harnessBrand}
														onChange={e => setHarnessBrand(e.target.value)}
														required
													/>
												</div>
												<div>
													<label className=''>Date of Purchase :</label>
													<input
														className=''
														type='date'
														value={purchaseHarness}
														onChange={e => setPurchaseHarness(e.target.value)}
														required
													/>
												</div>
											</>
										) : (
											<>
												<div>
													<label className=''>Parachute Model :</label>
													<input
														className='large-input'
														type='text'
														placeholder='Enter your Parachute model ...'
														value={parachute}
														onChange={e => setParachute(e.target.value)}
														required
													/>
												</div>
												<div>
													<label className=''>Parachute Brand :</label>
													<input
														className='large-input'
														type='text'
														placeholder='Enter your Parachute brand ...'
														value={parachuteBrand}
														onChange={e => setParachuteBrand(e.target.value)}
														required
													/>
												</div>
												<div>
													<label className=''>Date of Purchase :</label>
													<input
														className='large-input'
														type='date'
														value={purchaseParachute}
														onChange={e => setPurchaseParachute(e.target.value)}
														required
													/>
												</div>
												<div>
													<label className=''>Last Folding :</label>
													<input
														className='large-input'
														type='date'
														value={controlParachute}
														onChange={e => setControlParachute(e.target.value)}
														required
													/>
												</div>
											</>
										)}
										<button type='submit' className='btn-form typo'>
											{isHarness && !idToUpdate
												? "Add Harness"
												: isHarness && idToUpdate
												? "Update Harness"
												: !isHarness && !idToUpdate
												? "Add Parachute"
												: "Update Parachute"}
										</button>
										<button
											onClick={() => handleCancel()}
											className='btn-form typo'>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</>,
		document.getElementById("modal"),
	)
}

export default Harness
