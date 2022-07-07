import React, { Fragment, useState } from "react";
import styles from './InvoiceReport.module.css';
import Card from "../../components/historyCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingLeft: "100px",
        marginTop: "20px"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

}))

var currDate = new Date();
var currYear = currDate.getFullYear();
console.log(currYear);
var prevMonth = currDate.getMonth();
console.log(prevMonth);
if (prevMonth < 0) {
    currYear = currYear - 1;
    prevMonth = 12;
}

const Months = {
    "Jan": '01',
    "Feb": '02',
    "Mar": '03',
    "Apr": '04',
    "May": '05',
    "Jun": '06',
    "Jul": '07',
    "Aug": '08',
    "Sep": '09',
    "Oct": '10',
    "Nov": '11',
    "Dec": '12'
}
const InvoiceReport = () => {
    const [toEmail, setToEmail] = useState('');
    const [ccEmails, setccEmails] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState([]);
    const classes = useStyles();

    React.useEffect(() => {
        const fetchData = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/invoice`)
                .then((res) => {
                    setData(res.data.data.results);
                })
        };
        fetchData();
    }, []);
    const filteredData = data.filter(data => { return Number(data.date.split(" ")[3]) === currYear && Number(Months[data.date.split(" ")[1]]) === prevMonth })

    const dateChangeHandler = (event) => {
        var selectedDate = event.target.value;
        currYear = Number(selectedDate.split('-')[0]);
        prevMonth = Number(selectedDate.split('-')[1]);
        setDate(selectedDate);
    }
    const toChangeHandler = (event) => {
        setToEmail(event.target.value);
    }
    const ccChangeHandler = (event) => {
        setccEmails(event.target.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        var currentDate = new Date();
        currYear = currentDate.getFullYear();
        prevMonth = currentDate.getMonth();
        if (prevMonth < 0) {
            currYear = currYear - 1;
            prevMonth = 12;
        }
        setToEmail('');
        setccEmails('');
        setDate('')
    }
    return (
        <Fragment>
            <form className={styles["container"]} onSubmit={onSubmitHandler}  >
                <div className={styles["date"]} >
                    <label>Date :</label>
                    <input type="month" required onChange={dateChangeHandler} value={date}></input>
                </div>
                <div className={styles["email"]}>
                    <div >
                        <label>To :</label>
                        <input type="email" placeholder="Receivers Email"
                            onChange={toChangeHandler} value={toEmail} required></input>
                    </div>
                    <div >
                        <label>CC :</label>
                        <input type="email" multiple
                            onChange={ccChangeHandler} value={ccEmails}
                            placeholder="Add , seperated emails"></input>
                    </div>
                </div>
                <button type="sumbit">Send Invoices</button>
            </form>
            {filteredData.length === 0 && <h2>There is no Invoices for {date.split('-')[1]} {date.split('-')[0]} </h2>}

            {filteredData.length !== 0 && <Grid container spacing={1} className={classes.gridContainer}>
                {filteredData.map((historyData, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card data={historyData} idx={index} />
                        </Grid>
                    );
                })}
            </Grid>
            }
        </Fragment>
    )
}
export default InvoiceReport;


