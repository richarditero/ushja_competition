import React, { useState } from 'react';
import _ from 'lodash';
import ReactExport from 'react-data-export';
import { Button } from '@material-ui/core';
import ApiUtil from '../../util/ApiUtil';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

export default function Download({ handlePageLoder }) {
  const [excelData, setExcelData] = useState(null);

  const exportToExcel = () => {
    handlePageLoder(true);
    ApiUtil.getWithToken(
      'open-competition?orderby=competitionName&order=ASC',
    ).then((result) => {
      if (result.status === 200) {
        const data = result.data.rows;
        const arr = [];
        data.map((d) => {
          arr.push({
            competitionName: d.competitionName,
            username: d.username,
            userEmail: d.userEmail,
            compFormName: d.compFormName,
            transactionId: d.transactionId,
            amount: d.amount,
            competitionDate: d.competitionDate,
            location: d.location,
            events: _.map(d.open_competition_purchaseds, 'name').join(' ,'),
            status: d.status,
          });
        });
        handlePageLoder(false);
        setExcelData(arr);
        setExcelData(null);
      }
      setExcelData(null);
    });
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        style={{
          height: 'fit-content',
          fontWeight: 600,
        }}
        onClick={() => exportToExcel()}
      >
        Export
      </Button>
      {excelData !== null ? (
        <ExcelFile
          hideElement
          filename="CompetitionTable"
          element={(
            <Button
              color="primary"
              variant="contained"
              style={{
                height: 'fit-content',
                fontWeight: 600,
              }}
              onClick={() => exportToExcel()}
            >
              Export
            </Button>
          )}
        >
          <ExcelSheet data={excelData} name="Payment Details">
            <ExcelColumn label="Competition Name" value="competitionName" />
            <ExcelColumn label="Applicant Name" value="username" />
            <ExcelColumn label="Email" value="userEmail" />
            <ExcelColumn label="Competition Form" value="compFormName" />
            <ExcelColumn label="Transaction Id" value="transactionId" />
            <ExcelColumn label="Amount" value="amount" />
            <ExcelColumn label="Competition Date" value="competitionDate" />
            <ExcelColumn label="Events" value="events" />
            <ExcelColumn label="Location" value="location" />
            <ExcelColumn label="Status" value="status" />
          </ExcelSheet>
        </ExcelFile>
      ) : null}
    </>
  );
}
