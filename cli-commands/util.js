const ethersUtils = require("ethers").utils;
const colors = require('./../utils/colors');
const Table = require('cli-table');
const moment = require('moment');

const printReportTable = (recordActions) => {

	const table = new Table();

	for (const action of recordActions) {
		table.push(
			{ 'Event Time': `${moment(action.eventTimestamp).format('D MMM, HH:MM:ss')}` },
			{ 'Executor': `${action.deployerType}` },
			{ 'Name or Label': `${colors.colorName(action.nameOrLabel)}` },
			{ 'Tx Hash': `${action.transactionHash}` },
			{ 'Status': `${getReadableStatus(action.status)}` },
			{ 'Gas Price': `${ethersUtils.formatUnits(action.gasPrice, 'gwei')} Gwei` },
			{ 'Gas Used': `${action.gasUsed}` },
			{ 'Result': `${action.result}` }
		)
	}

	console.log(table.toString());
}

const getReadableStatus = (status) => {
	if (status === 0) {
		return `${colors.colorSuccess('Success')}`
	}

	return `${colors.colorFailure('Fail')}`
}

module.exports = {
	printReportTable,
	getReadableStatus
}