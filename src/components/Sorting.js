import React from "react"

function Sorting({
	handleSortBtn,
	sortNumber,
	sortDuration,
	sortWindSpeed,
	sortClimb,
	sortSink,
	sortAbove,
	sortDistance,
	sortAltitude,
	sortSpeed,
}) {
	return (
		<>
			<h3 className='typo'>SORTING OPTIONS</h3>
			<div className='row-sort-btn'>
				<div className='sort-btn' onClick={() => handleSortBtn("number")}>
					{!sortNumber ? "Latest" : "Oldest"}
				</div>
				<div className='sort-btn' onClick={() => handleSortBtn("duration")}>
					{!sortDuration ? "Longest" : "Shortest"}
				</div>
				<div className='sort-btn' onClick={() => handleSortBtn("windSpeed")}>
					{!sortWindSpeed ? "Wind max" : "Wind min"}
				</div>
				<div className='sort-btn' onClick={() => handleSortBtn("above")}>
					{!sortAbove ? "Above max" : "Above min"}
				</div>
				<div className='sort-btn' onClick={() => handleSortBtn("altitude")}>
					{!sortAltitude ? "Altitude max" : "Altitude min"}
				</div>
				<div className='sort-btn' onClick={() => handleSortBtn("climb")}>
					{!sortClimb ? "Climb max" : "Climb min"}
				</div>
				<div className='sort-btn' onClick={() => handleSortBtn("sink")}>
					{!sortSink ? "Sink max" : "Sink min"}
				</div>
				<div className='sort-btn' onClick={() => handleSortBtn("speed")}>
					{!sortSpeed ? "Speed max" : "Speed min"}
				</div>
				<div className='sort-btn' onClick={() => handleSortBtn("distance")}>
					{!sortDistance ? "Distance max" : "Distance min"}
				</div>
			</div>
		</>
	)
}

export default Sorting
