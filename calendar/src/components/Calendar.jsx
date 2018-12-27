import React, {Component} from 'react'
import dateFns from 'date-fns'

class Calendar extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    }

    renderHeader() {
        const DATE_FORMAT = "MMMM YYYY"

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>

                <div className="col col-center">
                    <span>
                      {dateFns.format(this.state.currentMonth, DATE_FORMAT)}
                    </span>
                </div>

                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const DATE_FORMAT = "dddd",
            DAYS = []

        let startDate = dateFns.startOfWeek(this.state.currentMonth)

        for (let i = 0; i < 7; i++) {
            DAYS.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), DATE_FORMAT)}
                </div>
            );
        }
        return <div className="days row">{DAYS}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const MONTH_START = dateFns.startOfMonth(currentMonth);
        const MONTH_END = dateFns.endOfMonth(MONTH_START);
        const START_DATE = dateFns.startOfWeek(MONTH_START);
        const END_DATE = dateFns.endOfWeek(MONTH_END);

        const DATE_FORMAT = "D";
        const ROWS = [];

        let days = [];
        let day = START_DATE;
        let formattedDate = "";

        while (day <= END_DATE) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, DATE_FORMAT);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, MONTH_START)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            ROWS.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{ROWS}</div>;
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    }

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    }

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    }

    render() {
        return (
            <div className='calendar'>
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        )
    }
}

export default Calendar