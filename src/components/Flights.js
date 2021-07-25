import React from "react"
import { format } from "date-fns"
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin4Line } from "react-icons/ri"

function Flights({
	list,
	handleDelete,
	handleEdit,
	handleSortBtn,
	handleOpenMap,
}) {
	return (
		<div className=''>
			<h1 className=' typo'>MY FLIGHTS </h1>
			<div className='grid-container flight-row'>
				<div
					className='table-flight sort-click'
					onClick={() => handleSortBtn("number")}>
					N°
				</div>
				<div className='table-flight'>Date</div>
				<div className='table-flight'>Time</div>
				<div
					className='table-flight sort-click'
					onClick={() => handleSortBtn("duration")}>
					Duration <small>(min)</small>
				</div>
				<div className='table-flight'>Take Off</div>
				<div className='table-flight'>Wind direction</div>
				<div
					className='table-flight sort-click'
					onClick={() => handleSortBtn("windSpeed")}>
					Wind Speed <small>(km/h)</small>
				</div>
				<div
					className='table-flight sort-click'
					onClick={() => handleSortBtn("above")}>
					Above take off <small> (m) </small>
				</div>
				<div
					className='table-flight sort-click'
					onClick={() => handleSortBtn("altitude")}>
					Max Altitude <small> (m) </small>
				</div>
				<div
					className='table-flight sort-click'
					onClick={() => handleSortBtn("climb")}>
					Max climb <small>(m/s)</small>
				</div>
				<div
					className='table-flight sort-click'
					onClick={() => handleSortBtn("sink")}>
					Max sink <small>(m/s)</small>
				</div>
				<div
					className='table-flight sort-click'
					onClick={() => handleSortBtn("speed")}>
					Max speed <small>(km/h)</small>
				</div>
				<div
					className='table-flight sort-click'
					onClick={() => handleSortBtn("distance")}>
					Distance <small>(km)</small>
				</div>
				<div className='table-flight'>Landing</div>
				<small className='icon-edit-delete-title'>Edit</small>
				<small className='icon-edit-delete-title'>Delete</small>
			</div>
			{list.map(element => (
				<div className='flight-row' key={element._id}>
					<div className='grid-container data-flight'>
						<div className='flight-data'>{element.number}</div>
						<div className='flight-data'>
							{format(new Date(element.date), "dd MMMM Y")}
						</div>
						<div className='flight-data'>{element.startTime}</div>
						<div className='flight-data'>{element.duration}</div>
						<div className={element.newSpot ? "new-takeoff" : "flight-data"}>
							{element.takeOff}
						</div>
						<div className='flight-data'>{element.windDir || "-"}</div>
						<div className='flight-data'>{element.windSpeed || "-"}</div>
						<div className='flight-data'>{element.above || "-"}</div>
						<div className='flight-data'>{element.altitude || "-"}</div>
						<div className='flight-data'>{element.climb || "-"}</div>
						<div className='flight-data'>{element.sink || "-"}</div>
						<div className='flight-data'>{element.speed || "-"}</div>
						<div className='flight-data'>{element.distance || "-"}</div>
						<div className='flight-data'>{element.landing || "-"}</div>
						<div
							className='icon-edit-delete crud-btn'
							onClick={() => handleEdit(element._id)}>
							<FiEdit />
						</div>
						<div
							className='icon-edit-delete crud-btn'
							onClick={() =>
								handleDelete(
									element._id,
									"delete",
									`flignt N°${element.number}`,
								)
							}>
							<RiDeleteBin4Line />
						</div>
					</div>
					<div className='row-comment-glider'>
						<div className='gpx-tier'>
							{element.url && (
								<span
									className='gpx'
									onClick={() =>
										handleOpenMap(
											element.url,
											element.original_filename,
											element.takeOff,
											element.date,
										)
									}>
									GPX
								</span>
							)}
						</div>
						<div className='glider-tier'>
							<span className='row-comment-glider-header'>Glider : </span>
							<span className='row-comment-glider-wing'>
								{element.selectedGlider || "-"}
							</span>
						</div>
						<div className='comment-tier'>
							<span className='row-comment-glider-header'>Comment :</span>
							<span className='row-comment-glider-text'>
								{element.comments || "-"}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Flights
