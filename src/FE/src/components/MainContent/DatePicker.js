import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import "./DatePicker.css";

const DatePicker = forwardRef(({ type, nextInputRef, isEnd, onDateChange }, ref) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      toggleCalendar();
    },
  }));

  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month];
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendarDays = () => {
    const days = [];
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // Ngày đầu tiên trong tháng
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  
    // Tính toán các ô trống chỉ để căn lề cho các ngày trong tháng.
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
  
    // Vẽ các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;
  
      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </div>
      );
    }
  
    return days;
  };
  

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);

    if (onDateChange) {
      onDateChange(date, isEnd); 
    }

    if (nextInputRef?.current) {
      nextInputRef.current.focus();
    }
  };

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setCalendarVisible(false);
    }
  };

  useEffect(() => {
    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible]);

  return (
    <div
      className={`date-picker ${isEnd ? 'input-enddate' : ''}`}
    >
      <div className="date-display" onClick={toggleCalendar}>
        {selectedDate
          ? selectedDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
          : type}
      </div>

      {isCalendarVisible && (
        <div className="calendar" ref={calendarRef}>
          <div className="calendar-header">
            <button onClick={handlePrevMonth} style={{paddingBottom: "2px"}}>&lt;</button>
            <span>
              {getMonthName(currentMonth)} {currentYear}
            </span>
            <button onClick={handleNextMonth} style={{paddingBottom: "2px", paddingRight: "3px"}}>&gt;</button>
          </div>

          <div className="calendar-days">{renderCalendarDays()}</div>
        </div>
      )}
    </div>
  );
});

export default DatePicker;
