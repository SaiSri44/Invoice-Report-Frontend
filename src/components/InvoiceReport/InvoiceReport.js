import React, { Fragment, useState } from "react";
import styles from './InvoiceReport.module.css';

const InvoiceReport = () => {
    const [toEmail, setToEmail] = useState('');
    const [ccEmails, setCcEmails] = useState('');
    const toChangeHandler = (event) => {
        // console.log(event.target.value);
        setToEmail(event.target.value);
    }
    const ccChangeHandler = (event) => {
        // console.log(event.target.value)
        setCcEmails(event.target.value)
    }
    const onSubmitHandler = () => {
        console.log(toEmail);
        console.log(ccEmails);
        setToEmail('');
        setCcEmails('');
    }
    return (
        <Fragment>
            <div className={styles["container"]}>
                <div className={styles["date"]}>
                    <label>Date :</label>
                    <input type="month"></input>
                </div>
                <div className={styles["email"]}>
                    <div >
                        <label>To :</label>
                        <input type="email" title="Please Provide a Valid Email Address" placeholder="Receivers Email"
                            onChange={toChangeHandler}></input>
                    </div>
                    <div >
                        <label>CC :</label>
                        <input type="email" title="Please Provide a Valid Email Address" multiple
                            onChange={ccChangeHandler}></input>
                    </div>
                </div>
                <button type="sumbit" onSubmit={onSubmitHandler}>Send Invoices</button>
            </div>
        </Fragment>
    )
}
export default InvoiceReport;     