import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import Form from "./components/Form"
import Flights from "./components/Flights"
import Search from "./components/Search"
import Gliders from "./components/Gliders"
import Harness from "./components/Harness"
import Profile from "./components/Profile"
import Sorting from "./components/Sorting"
import Footer from "./components/Footer"
import Map from "./components/Map"
import Axios from "axios"
import "./styles/App.css"
import { format } from "date-fns"
import { getHigherNumber, getArrayOfGlider } from "./utils/utils"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

function App() {
	const [takeOff, setTakeOff] = useState("")
	const [windDir, setWindDir] = useState("")
	const [windSpeed, setWindSpeed] = useState("")
	const [startTime, setStartTime] = useState("")
	const [date, setDate] = useState("")
	const [duration, setDuration] = useState("")
	const [landing, setLanding] = useState("")
	const [above, setAbove] = useState("")
	const [climb, setClimb] = useState("")
	const [sink, setSink] = useState("")
	const [distance, setDistance] = useState("")
	const [comments, setComments] = useState("")
	const [number, setNumber] = useState("")
	const [selectedGlider, setSelectedGlider] = useState("")
	const [altitude, setAltitude] = useState("")
	const [speed, setSpeed] = useState("")
	const [list, setList] = useState([])
	const [listAll, setListAll] = useState([])
	const [openForm, setOpenForm] = useState(false)
	const [openProfile, setOpenProfile] = useState(false)
	const [openGliders, setOpenGliders] = useState(false)
	const [openHarness, setOpenHarness] = useState(false)
	const [openSearch, setOpenSearch] = useState(false)
	const [idToUpdate, setIdToUpdate] = useState("")
	const [nextFlight, setNextFlight] = useState("")
	const [sortDistance, setSortDistance] = useState(true)
	const [sortWindSpeed, setSortWindSpeed] = useState(true)
	const [sortDuration, setSortDuration] = useState(true)
	const [sortNumber, setSortNumber] = useState(true)
	const [sortAbove, setSortAbove] = useState(true)
	const [sortAltitude, setSortAltitude] = useState(true)
	const [sortSpeed, setSortSpeed] = useState(true)
	const [sortClimb, setSortClimb] = useState(true)
	const [sortSink, setSortSink] = useState(true)
	const [search, setSearch] = useState("")
	const [selectSearch, setSelectSearch] = useState("")
	const [searchMessage, setSearchMessage] = useState("")
	const [gliderList, setGliderList] = useState([])
	const [harnessList, setHarnessList] = useState([])
	const [selectGlider, setSelectGlider] = useState([])
	const [profileList, setProfileList] = useState([])
	const [currentPage, setCurrentPage] = useState(0)
	const [totalPage, setTotalPage] = useState(10)
	const [file, setFile] = useState("")
	const [url, setUrl] = useState("")
	const [original_filename, setOriginal_filename] = useState("")
	const [public_id, setPublic_id] = useState("")
	const [openMap, setOpenMap] = useState(false)

	useEffect(() => {
		getFlightsList()
		// eslint-disable-next-line
	}, [currentPage])

	useEffect(() => {
		getFlightsListAll()
		getFlightsList()
		getGlidersList()
		getHarnessList()
		getProfileList()
		// eslint-disable-next-line
	}, [])

	async function submitForm(e) {
		e.preventDefault()
		let newUrl = ""
		let newPublic_id = ""
		let newOriginal_filename = ""
		if (file) {
			const formData = new FormData()
			formData.append("file", file)
			formData.append(
				"upload_preset",
				`${process.env.REACT_APP_CLOUDINARY_PRESET}`,
			)
			await Axios.post(
				`${process.env.REACT_APP_CLOUDINARY_UPLOAD_API_URL}`,
				formData,
			).then(response => {
				newUrl = response.data.secure_url
				newPublic_id = response.data.public_id
				newOriginal_filename = response.data.original_filename
			})
		}

		if (idToUpdate) {
			if (newUrl === "") newUrl = url
			if (newPublic_id === "") newPublic_id = public_id
			if (newOriginal_filename === "") {
				newOriginal_filename = original_filename
			}
			return Axios.put(`${process.env.REACT_APP_DATABASE_URL}/update`, {
				id: idToUpdate,
				number: number,
				takeOff: takeOff,
				windDir: windDir,
				windSpeed: windSpeed,
				startTime: startTime,
				date: date,
				duration: duration,
				landing: landing,
				climb: climb,
				sink: sink,
				distance: distance,
				comments: comments,
				above: above,
				altitude: altitude,
				speed: speed,
				selectedGlider: selectedGlider,
				url: newUrl,
				public_id: newPublic_id,
				original_filename: newOriginal_filename,
			}).then(() => {
				intitializeStates()
			})
		}
		return Axios.post(`${process.env.REACT_APP_DATABASE_URL}/post`, {
			number: nextFlight,
			takeOff: takeOff,
			windDir: windDir,
			windSpeed: windSpeed,
			startTime: startTime,
			date: date,
			duration: duration,
			landing: landing,
			climb: climb,
			sink: sink,
			distance: distance,
			comments: comments,
			above: above,
			altitude: altitude,
			speed: speed,
			selectedGlider: selectedGlider,
			url: newUrl,
			public_id: newPublic_id,
			original_filename: newOriginal_filename,
		}).then(() => {
			intitializeStates()
		})
	}
	function handleEdit(id) {
		setIdToUpdate(id)
		setOpenForm(true)
		Axios.get(`${process.env.REACT_APP_DATABASE_URL}/get/${id}`).then(
			response => {
				setTakeOff(response.data.takeOff || "")
				setWindDir(response.data.windDir || "")
				setWindSpeed(response.data.windSpeed || "")
				setStartTime(response.data.startTime || "")
				setAbove(response.data.above || "")
				setDate(format(new Date(response.data.date), "yyyy-MM-dd") || "")
				setDuration(response.data.duration || "")
				setClimb(response.data.climb || "")
				setSink(response.data.sink || "")
				setDistance(response.data.distance || "")
				setComments(response.data.comments || "")
				setNumber(response.data.number)
				setAltitude(response.data.altitude || "")
				setSpeed(response.data.speed || "")
				setSelectedGlider(response.data.selectedGlider || "")
				setUrl(response.data.url || "")
				setOriginal_filename(response.data.original_filename || "")
				setPublic_id(response.data.public_id || "")
			},
		)
	}
	function handleDelete(id, path, message) {
		if (!window.confirm(`Do you really want to delete your ${message} ?`)) {
			return null
		}
		return Axios.delete(
			`${process.env.REACT_APP_DATABASE_URL}/${path}/${id}`,
		).then(() => {
			intitializeStates()
		})
	}
	function getFlightsListAll() {
		Axios.get(`${process.env.REACT_APP_DATABASE_URL}/getAll`).then(response => {
			setListAll(response.data)
			const lastNumber = getHigherNumber(response.data)
			setNextFlight(lastNumber + 1)
		})
	}
	function getFlightsList() {
		Axios.get(
			`${process.env.REACT_APP_DATABASE_URL}/get?page=${currentPage}`,
		).then(response => {
			setList(response.data.result)
			setTotalPage(response.data.totalPage)
		})
	}
	function getGlidersList() {
		Axios.get(`${process.env.REACT_APP_DATABASE_URL}/gliders`).then(
			response => {
				setGliderList(response.data)
				setSelectGlider(getArrayOfGlider(response.data))
			},
		)
	}
	function getHarnessList() {
		Axios.get(`${process.env.REACT_APP_DATABASE_URL}/harness`).then(
			response => {
				setHarnessList(response.data)
			},
		)
	}
	function getProfileList() {
		Axios.get(`${process.env.REACT_APP_DATABASE_URL}/profile`).then(
			response => {
				setProfileList(response.data)
			},
		)
	}
	function sortFlights(key, dir) {
		Axios.get(`${process.env.REACT_APP_DATABASE_URL}/sort/${key}/${dir}`).then(
			response => {
				setList(response.data)
			},
		)
	}
	function handleSortBtn(key) {
		let dir
		setCurrentPage(0)
		if (key === "distance" && sortDistance) {
			dir = "asc"
			setSortDistance(false)
		}
		if (key === "distance" && !sortDistance) {
			dir = "desc"
			setSortDistance(true)
		}
		if (key === "windSpeed" && sortWindSpeed) {
			dir = "asc"
			setSortWindSpeed(false)
		}
		if (key === "windSpeed" && !sortWindSpeed) {
			dir = "desc"
			setSortWindSpeed(true)
		}
		if (key === "above" && sortAbove) {
			dir = "asc"
			setSortAbove(false)
		}
		if (key === "above" && !sortAbove) {
			dir = "desc"
			setSortAbove(true)
		}
		if (key === "number" && sortNumber) {
			dir = "asc"
			setSortNumber(false)
		}
		if (key === "number" && !sortNumber) {
			dir = "desc"
			setSortNumber(true)
		}
		if (key === "duration" && sortDuration) {
			dir = "asc"
			setSortDuration(false)
		}
		if (key === "duration" && !sortDuration) {
			dir = "desc"
			setSortDuration(true)
		}
		if (key === "climb" && sortClimb) {
			dir = "asc"
			setSortClimb(false)
		}
		if (key === "climb" && !sortClimb) {
			dir = "desc"
			setSortClimb(true)
		}
		if (key === "sink" && sortSink) {
			dir = "asc"
			setSortSink(false)
		}
		if (key === "sink" && !sortSink) {
			dir = "desc"
			setSortSink(true)
		}
		if (key === "speed" && sortSpeed) {
			dir = "asc"
			setSortSpeed(false)
		}
		if (key === "speed" && !sortSpeed) {
			dir = "desc"
			setSortSpeed(true)
		}
		if (key === "altitude" && sortAltitude) {
			dir = "asc"
			setSortAltitude(false)
		}
		if (key === "altitude" && !sortAltitude) {
			dir = "desc"
			setSortAltitude(true)
		}
		sortFlights(key, dir)
	}
	function handleCloseModal() {
		setOpenForm(false)
		setOpenProfile(false)
		setOpenSearch(false)
		setOpenGliders(false)
		setOpenHarness(false)
		setOpenMap(false)
		intitializeStates()
	}
	function searchFlights(e) {
		e.preventDefault()
		Axios.get(
			`${process.env.REACT_APP_DATABASE_URL}/search/${selectSearch}/${search}`,
		).then(response => {
			if (response.data.length === 0) return setSearchMessage("%%message%%")
			setList(response.data)
			setOpenSearch(false)
			setSearchMessage("%%reset%%")
			setSearch("")
			setSelectSearch("")
		})
	}
	function nextPage() {
		if (currentPage + 1 === totalPage) return
		setCurrentPage(currentPage + 1)
	}
	function previousPage() {
		if (currentPage - 1 < 0) return
		setCurrentPage(currentPage - 1)
	}
	function handleOpenMap(url, filename, takeOff, date) {
		setOpenMap(true)
		setUrl(url)
		setOriginal_filename(filename)
		setTakeOff(takeOff)
		setDate(date)
	}
	function intitializeStates() {
		setTakeOff("")
		setWindDir("")
		setWindSpeed("")
		setStartTime("")
		setAbove("")
		setDate("")
		setDuration("")
		setClimb("")
		setSink("")
		setDistance("")
		setComments("")
		setIdToUpdate()
		setNumber("")
		setAltitude("")
		setSpeed("")
		setOpenForm(false)
		setLanding("")
		setOpenProfile(false)
		setOpenSearch(false)
		setSearch("")
		setSelectSearch("")
		setSearchMessage("")
		setSelectedGlider("")
		setSelectGlider([])
		setHarnessList([])
		setProfileList([])
		setGliderList([])
		setList([])
		getFlightsList()
		getGlidersList()
		getHarnessList()
		getProfileList()
		setCurrentPage(0)
		getFlightsListAll()
		setPublic_id("")
		setOriginal_filename("")
		setUrl("")
		setFile("")
	}

	return (
		<div className='App'>
			<Header
				openForm={openForm}
				setOpenForm={setOpenForm}
				setOpenProfile={setOpenProfile}
				openProfile={openProfile}
				setOpenSearch={setOpenSearch}
				openSearch={openSearch}
				setOpenGliders={setOpenGliders}
				openGliders={openGliders}
				setOpenHarness={setOpenHarness}
				openHarness={openHarness}
			/>
			{searchMessage === "%%reset%%" && (
				<div className='reset-search-btn'>
					<div className='header-btn' onClick={() => intitializeStates()}>
						RESET SEARCH
					</div>
				</div>
			)}
			<Flights
				list={list}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				nextFlight={nextFlight}
				handleSortBtn={handleSortBtn}
				handleOpenMap={handleOpenMap}
			/>
			{searchMessage === "%%reset%%" ? (
				""
			) : (
				<div className='pagination-contener'>
					<span className='tooltip'>
						<IoIosArrowBack
							className='pagination-icon'
							onClick={() => previousPage()}
						/>
						<span className='tooltiptext tooltiptext-left'>Previous page</span>
					</span>
					<span
						className='pagination-middle tooltip'
						onClick={() => setCurrentPage(0)}>
						{`Page ${currentPage + 1} / ${totalPage}`}
						<span className='tooltiptext tooltiptext-center'>
							Back to first page
						</span>
					</span>
					<span className='tooltip'>
						<IoIosArrowForward
							className='pagination-icon'
							onClick={() => nextPage()}
						/>
						<span className='tooltiptext tooltiptext-right'>Next page</span>
					</span>
				</div>
			)}
			<Sorting
				handleSortBtn={handleSortBtn}
				sortNumber={sortNumber}
				sortDuration={sortDuration}
				sortWindSpeed={sortWindSpeed}
				sortClimb={sortClimb}
				sortSink={sortSink}
				sortAbove={sortAbove}
				sortDistance={sortDistance}
				sortAltitude={sortAltitude}
				sortSpeed={sortSpeed}
			/>
			{openForm && (
				<Form
					open={openForm}
					onClose={() => handleCloseModal()}
					submitForm={submitForm}
					takeOff={takeOff}
					setTakeOff={setTakeOff}
					above={above}
					setAbove={setAbove}
					idToUpdate={idToUpdate}
					intitializeStates={intitializeStates}
					date={date}
					setDate={setDate}
					startTime={startTime}
					setStartTime={setStartTime}
					duration={duration}
					setDuration={setDuration}
					landing={landing}
					setLanding={setLanding}
					climb={climb}
					setClimb={setClimb}
					sink={sink}
					setSink={setSink}
					distance={distance}
					setDistance={setDistance}
					comments={comments}
					setComments={setComments}
					windSpeed={windSpeed}
					setWindSpeed={setWindSpeed}
					windDir={windDir}
					setWindDir={setWindDir}
					setAltitude={setAltitude}
					setSpeed={setSpeed}
					speed={speed}
					altitude={altitude}
					selectGlider={selectGlider}
					setSelectedGlider={setSelectedGlider}
					selectedGlider={selectedGlider}
					setFile={setFile}
					original_filename={original_filename}
				/>
			)}
			{openGliders && (
				<Gliders
					open={openGliders}
					onClose={() => handleCloseModal()}
					getGlidersList={getGlidersList}
					gliderList={gliderList}
					handleDelete={handleDelete}
					listAll={listAll}
					selectGlider={selectGlider}
				/>
			)}
			{openHarness && (
				<Harness
					open={openHarness}
					onClose={() => handleCloseModal()}
					getHarnessList={getHarnessList}
					harnessList={harnessList}
					handleDelete={handleDelete}
				/>
			)}
			{openSearch && (
				<Search
					open={openSearch}
					onClose={() => handleCloseModal()}
					searchFlights={searchFlights}
					setSearch={setSearch}
					search={search}
					setSelectSearch={setSelectSearch}
					searchMessage={searchMessage}
					selectSearch={selectSearch}
					selectGlider={selectGlider}
				/>
			)}
			{openProfile && (
				<Profile
					open={openProfile}
					onClose={() => handleCloseModal()}
					getGlidersList={getGlidersList}
					gliderList={gliderList}
					profileList={profileList}
					handleDelete={handleDelete}
					getProfileList={getProfileList}
					listAll={listAll}
				/>
			)}
			{openMap && (
				<Map
					open={openMap}
					onClose={() => handleCloseModal()}
					url={url}
					original_filename={original_filename}
					takeOff={takeOff}
					date={date}
				/>
			)}
			<Footer />
		</div>
	)
}

export default App
