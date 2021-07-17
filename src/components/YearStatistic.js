import React from "react"
import {
	getTotalTime,
	getTotalNumber,
	getHigherDuration,
	getHigherAltitude,
	getHigherDistance,
	formatTime,
} from "../utils/utils"

function YearStatistic({ yearList, year }) {
	return (
		<div className='total-profile-break'>
			<div className='year typo'>{year}</div>
			<div className='total-profile-line'>
				Total Flight Time :
				<span className='total-profile-data'>
					{formatTime(getTotalTime(yearList, []))}
				</span>
			</div>
			<div className='total-profile-line'>
				Number of flights :
				<span className='total-profile-data'>
					{getTotalNumber(yearList, [])}
				</span>
			</div>
			<div className='total-profile-line'></div>
			<div className='total-profile-line-small'>
				Longest flight :
				<span className='total-profile-data'>
					{getHigherDuration(yearList)} minutes
				</span>
			</div>
			<div className='total-profile-line-small'>
				Altitude Max :
				<span className='total-profile-data'>
					{getHigherAltitude(yearList)} m
				</span>
			</div>
			<div className='total-profile-line-small'>
				Farest flight :
				<span className='total-profile-data'>
					{getHigherDistance(yearList)} km
				</span>
			</div>
		</div>
	)
}

export default YearStatistic
