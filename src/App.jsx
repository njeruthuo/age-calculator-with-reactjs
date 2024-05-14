import { useState } from "react";
import arrowSVG from "./img/icon-arrow.svg";

const App = () => {
  const [birthDate, setBirthDate] = useState({
    years: "",
    months: "",
    age: "",
  });

  const [isError, setIsError] = useState(false);
  const validateDate = (day, month, year) => {
    // Validate day, month, and year
    const isValidDay = day >= 1 && day <= 31;
    const isValidMonth = month >= 1 && month <= 12;
    const currentYear = new Date().getFullYear();
    const isValidYear = year >= 1900 && year <= currentYear;

    return isValidDay && isValidMonth && isValidYear;
  };

  const calculateAge = (day, month, year) => {
    // Get current date
    const currentDate = new Date();

    // Get input date
    const inputDate = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript

    // Calculate age
    let age = currentDate.getFullYear() - inputDate.getFullYear();
    const monthDiff = currentDate.getMonth() - inputDate.getMonth();
    const dayDiff = currentDate.getDate() - inputDate.getDate();

    // Adjust age if current date is before the birthday this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    // Calculate months and days
    let months = currentDate.getMonth() - inputDate.getMonth();
    if (
      months < 0 ||
      (months === 0 && currentDate.getDate() < inputDate.getDate())
    ) {
      months += 12;
    }

    let days = currentDate.getDate() - inputDate.getDate();
    if (days < 0) {
      months--;
      const daysInLastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        0
      ).getDate();
      days += daysInLastMonth;
    }

    return { years: age, months, days };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let collectedInput = new FormData(event.currentTarget);

    // Get input values
    const day = collectedInput.get("day");
    const month = collectedInput.get("month");
    const year = collectedInput.get("year");

    // Validate date
    if (!validateDate(day, month, year)) {
      // alert("Please enter a valid date.");
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }

    // Calculate age
    const age = calculateAge(day, month, year);
    setBirthDate({
      years: age.years,
      months: age.months,
      age: age.days, // or any other property you want to set here
    });

    console.log(birthDate);
  };

  const labelColor = `
  ${isError ? "text-lightRed" : "text-smokeyGrey"}
  
  `;

  const borderStyles = `
  ${
    isError ? "border-lightRed" : "border-smokeyGrey"
  } mr-4 p-3 border hover:cursor-pointer text-black font-custom  rounded-md
  `;

  return (
    <section className="bg-lightGrey min-h-screen w-full pt-28 font-custom">
      <div className="w-[90%] sm:w-1/3 mx-auto bg-white text-red custom-div p-8 text-smokeyGrey font-bold">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="w-1/3 flex flex-col">
              <label className={labelColor} htmlFor="day">
                DAY
              </label>
              <input
                className={borderStyles}
                type="number"
                placeholder="DD"
                name="day"
                id="day"
              />
              {isError && (
                <span className="text-lightRed text-[10px] font-italic mt-2">
                  Must be a valid date
                </span>
              )}
            </div>

            <div className="w-1/3 flex flex-col">
              <label className={labelColor} htmlFor="month">
                MONTH
              </label>
              <input
                className={borderStyles}
                type="number"
                placeholder="MM"
                name="month"
                id="month"
              />

              {isError && (
                <span className="text-lightRed text-[10px] font-italic mt-2">
                  Must be a valid month
                </span>
              )}
            </div>

            <div className="w-1/3 flex flex-col">
              <label className={labelColor} htmlFor="year">
                YEAR
              </label>
              <input
                className={borderStyles}
                type="number"
                placeholder="YY"
                name="year"
                id="year"
              />
              {isError && (
                <span className="text-lightRed text-[10px] font-italic mt-2">
                  Must be a valid year
                </span>
              )}
            </div>
          </div>
          <hr className="mt-14 text-smokeyGrey font-bold" />
          <div className="flex justify-center sm:justify-end">
            <button
              type="submit"
              className="rounded-full bg-purple p-3 -mt-8 hover:bg-black"
            >
              <img src={arrowSVG} alt="" />
            </button>
          </div>
        </form>

        <div className="font-extrabold text-4xl mt-8 mx-4 text-black">
          <div>
            {" "}
            <span className="text-purple">
              {birthDate.years !== "" ? ` ${birthDate.years}` : "- -"}
            </span>{" "}
            years
          </div>

          <div>
            {" "}
            <span className="text-purple">
              {birthDate.months !== "" ? ` ${birthDate.months}` : "- -"}
            </span>{" "}
            months
          </div>

          <div>
            {" "}
            <span className="text-purple">
              {birthDate.age !== "" ? ` ${birthDate.age}` : "- -"}
            </span>{" "}
            days
          </div>
        </div>
      </div>
    </section>
  );
};
export default App;
