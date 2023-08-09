const tableHeaders = [
  "CALENDAR_YEAR",
  "YEAR_LEVEL",
  "DOMAIN",
  "STATE",
  // "SUBGROUP",
  "ENROLLED_STUDENTS",
  "MEAN",
  // "MEAN_CI",
  // "MEAN_SD",
  "NMS",
  // "NMS_CI",
  // "GAIN",
  // "GAIN_CI",
  // "EXEMPT",
  // "ABSENT",
  // "ASSESSED",
  // "WITHDRAWN",
  // "NONATTEMPT",
  "PARTICIPATION_RATE",
  "PARTICIPATION_NUMBER",
  // "NOT_STATED",
  // "AVERAGE_AGE",
  // "YEARS_OF_SCHOOLING",
  // "BANDCOL1",
  // "BANDCOL2",
  // "BANDCOL3",
  // "BANDCOL4",
  // "BANDCOL5",
  // "BANDCOL6",
  // "PCTL05",
  // "PCTL20",
  // "PCTL80",
  // "PCTL95",
  // "NOD_MEAN_PREV",
  // "NOD_NMS_PREV",
  // "NOD_MEAN_BASE",
  // "NOD_NMS_BASE",
];
console.log("tableHeaders", tableHeaders);

async function getAllData() {
  const url = `/api/naplan/`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const tableBody = document.getElementById("data-table");

  let tableHTML = "<tr>";

  tableHeaders.forEach((header) => {
    tableHTML += `<th>${header}</th>`;
  });
  tableHTML += "</tr>";

  data.slice(0, 100).forEach((row) => {
    tableHTML += "<tr>";
    tableHeaders.forEach((field) => {
      tableHTML += `<td>${row[field]}</td>`;
    });
    tableHTML += "</tr>";
  });

  tableBody.innerHTML = tableHTML;
}

getAllData();

const yearFilterElement = document.getElementById("year-filter");
yearFilterElement.addEventListener("change", (e) => {
  const yearFilterElement = e.target;
  const yearFilterValue =
    yearFilterElement.options[yearFilterElement.selectedIndex].text;

  const domainFilterElement = document.getElementById("domain-filter");
  const domainFilterValue =
    domainFilterElement.options[domainFilterElement.selectedIndex].text;

  const stateFilterElement = document.getElementById("state-filter");
  const stateFilterValue =
    stateFilterElement.options[stateFilterElement.selectedIndex].text;

  console.log(yearFilterValue);
  console.log(domainFilterValue);
  console.log(stateFilterValue);
  getDataWithFilterValue(yearFilterValue, domainFilterValue, stateFilterValue);
});

const domainFilterElement = document.getElementById("domain-filter");
domainFilterElement.addEventListener("change", (e) => {
  const domainFilterElement = e.target;
  const domainFilterValue =
    domainFilterElement.options[domainFilterElement.selectedIndex].text;

  const yearFilterElement = document.getElementById("year-filter");
  const yearFilterValue =
    yearFilterElement.options[yearFilterElement.selectedIndex].text;

  const stateFilterElement = document.getElementById("state-filter");
  const stateFilterValue =
    stateFilterElement.options[stateFilterElement.selectedIndex].text;

  console.log(yearFilterValue);
  console.log(domainFilterValue);
  console.log(stateFilterValue);
  getDataWithFilterValue(yearFilterValue, domainFilterValue, stateFilterValue);
});

const stateFilterElement = document.getElementById("state-filter");
stateFilterElement.addEventListener("change", (e) => {
  const stateFilterElement = e.target;
  const stateFilterValue =
    stateFilterElement.options[stateFilterElement.selectedIndex].text;

  const yearFilterElement = document.getElementById("year-filter");
  const yearFilterValue =
    yearFilterElement.options[yearFilterElement.selectedIndex].text;

  const domainFilterElement = document.getElementById("domain-filter");
  const domainFilterValue =
    domainFilterElement.options[domainFilterElement.selectedIndex].text;

  console.log(yearFilterValue);
  console.log(domainFilterValue);
  console.log(stateFilterValue);
  getDataWithFilterValue(yearFilterValue, domainFilterValue, stateFilterValue);
});

async function getDataWithFilterValue(
  yearFilterValue,
  domainFilterValue,
  stateFilterValue
) {
  let url = `/api/filter?yearFilterValue=${yearFilterValue}&domainFilterValue=${domainFilterValue}&stateFilterValue=${stateFilterValue}`;

  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const tableBody = document.getElementById("data-table");

  let tableHTML = "<tr>";

  tableHeaders.forEach((header) => {
    tableHTML += `<th>${header}</th>`;
  });
  tableHTML += "</tr>";

  data.forEach((row) => {
    tableHTML += "<tr>";
    tableHeaders.forEach((field) => {
      tableHTML += `<td>${row[field]}</td>`;
    });
    tableHTML += "</tr>";
  });

  tableBody.innerHTML = tableHTML;
}
