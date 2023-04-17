import moment from "moment";
export const formatDate = "YYYY-MM-DD"
export const getDateNow = () => moment().format('YYYY-MM-DD')
export const getPreMonth = () => moment().subtract(1,'M').format('YYYY-MM-DD')
export const getDatePreMonth = () => {
    const date = moment().subtract(1,'M').format('YYYY-MM-DD')
    const month = moment(date).format("MM")
    const year = moment(date).format("YYYY")
    return [date, month, year]
}
export const getDateMonthYearNow = () => {
    const date = moment().format('YYYY-MM-DD')
    const month = moment(date).format("MM")
    const year = moment(date).format("YYYY")
    return [date, month, year]
}
export const formatNumberThreeComma = (num) => num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getMonthNow = () => {
    const startDate = moment().startOf('M').format(formatDate)
    const endDate = moment().endOf('M').format(formatDate)
    return {startDate,endDate}
}