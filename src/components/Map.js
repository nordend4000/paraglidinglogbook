import React from "react"
import ReactDom from "react-dom"
import "../styles/modal.css"
import { AiFillCloseCircle } from "react-icons/ai"
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import { MapContainer, TileLayer, MapConsumer } from "react-leaflet"
import start from "../styles/start.svg"
import legend from "../styles/start-legend.svg"
import land from "../styles/land.svg"
import shadow from "../styles/shadow.png"
import { ReactComponent as FlyLogo } from "../styles/paragliding.svg"
import { format } from "date-fns"
// eslint-disable-next-line
import { GPX } from "leaflet-gpx"

function Map({ open, onClose, url, original_filename, takeOff, date }) {
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
				<div className='body-modal'>
					<h2 className=' typo'>
						<FlyLogo />
						MY TRACK LOG
					</h2>
					<div className='title-map'>
						Flight from {takeOff} on {format(new Date(date), "d MMMM yyyy")}
					</div>
					<a href={url} className='file-map'>
						Download file: {original_filename}.gpx
					</a>
					<div className='map-modal'>
						<MapContainer
							center={[46.53, 7.52]}
							zoom={5}
							scrollWheelZoom={false}
							style={{ height: "500px" }}>
							<TileLayer
								attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
								url={process.env.REACT_APP_OPEN_MAP_URL_KEY}
							/>
							<MapConsumer>
								{map => {
									const gpx = url
									new L.GPX(gpx, {
										async: true,
										marker_options: {
											startIconUrl: start,
											endIconUrl: land,
											shadowUrl: shadow,
										},
									})
										.on("loaded", function (e) {
											map.fitBounds(e.target.getBounds())
										})
										.addTo(map)
									return null
								}}
							</MapConsumer>
						</MapContainer>
					</div>
				</div>
				<div className='legend-map'>
					<img src={legend} alt='Paragliding launch icon' /> Launch
					<img src={land} alt='Paragliding landing icon' /> Landing
				</div>
			</div>
		</>,
		document.getElementById("modal"),
	)
}

export default Map
