import React, { useState } from "react";
import _ from "lodash";
import ReactExport from "react-data-export";
import { Button } from "@material-ui/core";
import ApiUtil from "../../util/ApiUtil";

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

export default function Download({ handlePageLoder }) {
  const [excelData, setExcelData] = useState(null);

  const exportToExcel = () => {
    handlePageLoder(true);
    ApiUtil.getWithToken(
      "open-competition?orderby=competitionName&order=ASC"
    ).then((result) => {
      if (result.status === 200) {
        const data = result.data.rows;
        let arr = [];

        for (let i = 0; i < data.length; i++) {
          let temp = data[i].open_competition_purchaseds.map((val) => {
            return {
              competitionName: data[i].competitionName,
              competitionId:data[i].competitionId, 
              username: data[i].username,
              userEmail: data[i].userEmail,
              compFormName: data[i].compFormName,
              transactionId: data[i].transactionId,
              event: val.name,
              eventTotal: val.amount,
              total: data[i].amount,
              horses:val.quantity,
              competitionDate: data[i].competitionDate,
              location: data[i].location,
              status: data[i].status,
              card:data[i].cardType,
              transactionDate:new Date(data[i].createdAt)
            };
          });
          arr = [...arr, ...temp];
        }

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
          height: "fit-content",
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
          element={
            <Button
              color="primary"
              variant="contained"
              style={{
                height: "fit-content",
                fontWeight: 600,
              }}
              onClick={() => exportToExcel()}
            >
              Export
            </Button>
          }
        >
          <ExcelSheet data={excelData} name="Payment Details">
            <ExcelColumn label="Competition Name" value="competitionName" />
            <ExcelColumn label="Competition Id" value="competitionId" />
            <ExcelColumn label="Applicant Name" value="username" />
            <ExcelColumn label="Email" value="userEmail" />
            <ExcelColumn label="Competition Form" value="compFormName" />
            <ExcelColumn label="Transaction Id" value="transactionId" />
            <ExcelColumn label="Competition Date" value="competitionDate" />
            <ExcelColumn label="Event Name" value="event" />
            <ExcelColumn label="Event Total" value="eventTotal" />
            <ExcelColumn label="Total" value="total" />
            <ExcelColumn label="Horses" value="horses" />
            <ExcelColumn label="Location" value="location" />
            <ExcelColumn label="Card" value="card" />
            <ExcelColumn label="Status" value="status" />
            <ExcelColumn label="Transaction Date" value="transactionDate" />
          </ExcelSheet>
        </ExcelFile>
      ) : null}
    </>
  );
}
