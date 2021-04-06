import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ApiUtil } from "../../util/ApiUtil";
import { Table, Spinner } from "react-bootstrap";
import "./PaymentSummary.css";
import strings from "../../i18n/Strings";

const CompetitionPaymentSummary = React.memo(({ checkoutData }) => {
  const [payemtItems, setPayemtItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // deepclone checkoutData
    let apiData = JSON.parse(JSON.stringify(checkoutData));
    // delete uploaded_document
    delete apiData.formData["uploaded_document"];

    ApiUtil.postData(
      `${strings.apiRouter.competition}/${strings.apiRouter.paymentSummary}`,
      {
        checkoutData: apiData,
      }
    )
      .then((res) => {
        setPayemtItems(res.data.items);
        setTotalAmount(res.data.total);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div>
          <p className="bold-text">Payment Summary</p>
          <Table>
            <tbody>
              {payemtItems.map((event) => {
                return (
                  <tr key={event.competitionEventId}>
                    <td>
                      <span>{event.name} </span>
                      <span className="bold-text"> x {event.quantity}</span>
                      <div>{event.description}</div>
                    </td>
                    <td>${event.amount}</td>
                  </tr>
                );
              })}
              <tr>
                <td className="bold-text">Total </td>
                <td className="bold-text">${totalAmount} </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
});
CompetitionPaymentSummary.propTypes = {
  checkoutData: PropTypes.object,
};
export default CompetitionPaymentSummary;
