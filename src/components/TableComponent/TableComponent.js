import React, { useEffect, useState } from 'react';
import './TableComponent.css';
import sortIcon from '../../assets/icon/ArrowsDownUp.svg';

const TableComponent = ({ employData, tableConfig }) => {
	const {
		nameConfig,
		cityConfig,
		emailConfig,
		joiningDateConfig,
		roleConfig,
	} = tableConfig;
	//Select sorted field, which one going be sorted
	const [sortField, setSortField] = useState('');
	//Sorted Order or Type
	const [order, setOrder] = useState('asc');
	//Loading initial unsorted data
	const [sortedData, setSortedData] = useState([]);
	useEffect(() => {
		setSortedData(employData);
	}, [employData]);

	const handleSortingChange = (accessor) => {
		const sortOrder =
			accessor === sortField && order === 'asc' ? 'desc' : 'asc';
		setSortField(accessor);
		setOrder(sortOrder);
		handleSorting(accessor, sortOrder);
	};

	const handleSorting = (sortField, sortOrder) => {
		if (sortField) {
			const sorted = [...employData].sort((a, b) => {
				if (a[sortField]) {
					return (
						a[sortField]
							.toString()
							.localeCompare(b[sortField]?.toString(), 'en', {
								numeric: true,
							}) * (sortOrder === 'asc' ? 1 : -1)
					);
				} else {
					return (
						a.person[sortField]
							?.toString()
							.localeCompare(
								b.person[sortField].toString(),
								'en',
								{
									numeric: true,
								}
							) * (sortOrder === 'asc' ? 1 : -1)
					);
				}
			});
			setSortedData(sorted);
		}
	};
	const tableHeaders = [
		{
			label: 'Name',
			accessor: 'name',
			visibility: nameConfig.name,
			isSortable: nameConfig.sort,
		},
		{
			label: 'City',
			accessor: 'city',
			visibility: cityConfig.city,
			isSortable: cityConfig.sort,
		},
		{
			label: 'Email Address',
			accessor: 'email',
			visibility: emailConfig.email,
			isSortable: emailConfig.sort,
		},
		{
			label: 'Joining Date',
			accessor: 'joiningDate',
			visibility: joiningDateConfig.joiningDate,
			isSortable: joiningDateConfig.sort,
		},
		{
			label: 'Role',
			accessor: 'role',
			visibility: roleConfig.role,
			isSortable: roleConfig.sort,
		},
	];
	return (
		<div>
			<table className='table'>
				<thead>
					<tr>
						{tableHeaders.map(
							({ label, accessor, visibility, isSortable }) => {
								return (
									visibility && (
										<th
											style={{
												cursor: `${
													isSortable && 'pointer'
												}`,
											}}
											key={accessor}
											onClick={
												isSortable
													? () =>
															handleSortingChange(
																accessor
															)
													: null
											}
										>
											<span className='flex items-center gap-10px'>
												{label}
												{isSortable && (
													<img
														src={sortIcon}
														alt=''
													/>
												)}
											</span>
										</th>
									)
								);
							}
						)}
					</tr>
				</thead>
				<tbody>
					{sortedData.map((employ, index) => (
						<tr key={index}>
							{tableHeaders.map((tableHead) => {
								return tableHead.visibility &&
									employ.person[tableHead.accessor] ? (
									<td key={tableHead.accessor}>
										<span className='flex items-center gap-10px'>
											{' '}
											<span>
												<img
													src={employ.person?.avatar}
													className='person-img'
													alt=''
												/>
											</span>{' '}
											<span>{employ.person?.name}</span>
										</span>
									</td>
								) : (
									tableHead.visibility && (
										<td key={tableHead.accessor}>
											{employ[tableHead.accessor]}
										</td>
									)
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableComponent;
