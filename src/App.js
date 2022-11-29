import { useEffect, useState } from 'react';
import './App.css';
import TableComponent from './components/TableComponent/TableComponent';

function App() {
	const [employData, setEmployData] = useState([]);
	useEffect(() => {
		fetch('employData.json')
			.then((res) => res.json())
			.then((data) => setEmployData(data))
			.catch((err) => console.log(err));
  }, []);
  
  
	return (
		<div>
			<h3>Table 1</h3>
			<TableComponent
				employData={employData}
				tableConfig={{
					nameConfig: {
						name: true,
						sort: true,
					},
					cityConfig: {
						city: true,
						sort: true,
					},
					joiningDateConfig: {
						joiningDate: true,
						sort: true,
					},
					emailConfig: {
						email: true,
						sort: true,
					},
					roleConfig: {
						role: true,
						sort: true,
					},
				}}
			/>
			<br />
			<h3>Table 2</h3>
			<TableComponent
				employData={employData}
				tableConfig={{
					nameConfig: {
						name: true,
						sort: true,
					},
					cityConfig: {
						city: false,
						sort: false,
					},

					joiningDateConfig: {
						joiningDate: false,
						sort: false,
					},
					emailConfig: {
						email: true,
						sort: false,
					},
					roleConfig: {
						role: true,
						sort: false,
					},
				}}
			/>
			<br />
			<h3>Table 3</h3>
			<TableComponent
				employData={employData}
				tableConfig={{
					nameConfig: {
						name: false,
						sort: false,
					},
					cityConfig: {
						city: false,
						sort: false,
					},

					joiningDateConfig: {
						joiningDate: true,
						sort: true,
					},
					emailConfig: {
						email: true,
						sort: false,
					},
					roleConfig: {
						role: true,
						sort: true,
					},
				}}
			/>
			<br />
			<h3>Table 4</h3>
			<TableComponent
				employData={employData}
				tableConfig={{
					nameConfig: {
						name: true,
						sort: false,
					},
					cityConfig: {
						city: true,
						sort: true,
					},

					joiningDateConfig: {
						joiningDate: true,
						sort: false,
					},
					emailConfig: {
						email: false,
						sort: false,
					},
					roleConfig: {
						role: true,
						sort: true,
					},
				}}
			/>
		</div>
	);
}

export default App;
