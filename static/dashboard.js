async function getEnrolledStudentsData() {
  const url = `/api/enrolled_students`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("getEnrolledStudentsData", data);
  return data;
}
async function getMeanScoresData() {
  const url = `/api/mean_scores`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("getMeanScoresData", data);
  return data;
}
async function getMeanScoresByStateData() {
  const url = `/api/mean_scores_by_state`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("getMeanScoresByStateData", data);
  return data;
}

(async function () {
  // Mixed charts showing top 10 movies by gross along with their IMDB scores
  const enrolledData = await getEnrolledStudentsData();
  const scoreData = await getMeanScoresData();
  const scoreByStateData = await getMeanScoresByStateData();
  console.log("enrolledData", enrolledData);
  console.log("scoreData", scoreData);
  console.log("scoreByStateData", scoreByStateData);

  new Chart(document.getElementById("enrolled-students"), {
    data: {
      labels: enrolledData.map((x) => x.STATE),
      datasets: [
        {
          type: "bar",
          yAxisID: "A",
          label: "Enrolled Students",
          data: enrolledData.map((x) => x.ENROLLED_STUDENTS),
          backgroundColor: "orange",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Average number of students attending NAPLAN test by state (2008-2022)",
          font: {
            size: 20,
          },
        },
      },

      scales: {
        x: {
          title: {
            display: true,
            text: "State",
            font: {
              size: 16,
            },
            padding: {
              top: 16,
            },
          },
        },
        A: {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Enrolled Students",
            font: {
              size: 16,
            },
            padding: {
              bottom: 16,
            },
          },
          ticks: {
            callback: (label) => `${new Intl.NumberFormat().format(label)}`, // Convert year to string
          },
        },
      },
    },
  });

  // Doughnut chart showing proportions of genres
  new Chart(document.getElementById("enrolled-students-pie"), {
    type: "doughnut",
    data: {
      labels: enrolledData.map((x) => x.STATE),
      datasets: [
        {
          label: "%",
          data: enrolledData.map((x) => (x.ENROLLED_STUDENTS / 290724) * 100),
          hoverOffset: 50,
        },
      ],
    },
    options: {
      responsive: true,
      // cutoutPercentage: 65,

      plugins: {
        title: {
          display: false,
          text: "",
          font: {
            size: 20,
          },
          color: "white",
        },
      },
    },
  });

  new Chart(document.getElementById("mean-scores"), {
    data: {
      labels: scoreData.map((x) => x.STATE),
      datasets: [
        {
          type: "bar",
          yAxisID: "A",
          label: "Mean Score",
          data: scoreData.map((x) => x.MEAN),
          backgroundColor: "gray",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Average score of NAPLAN test by state (2008-2022)",
          font: {
            size: 20,
          },
        },
      },

      scales: {
        x: {
          title: {
            display: true,
            text: "State",
            font: {
              size: 16,
            },
            padding: {
              top: 16,
            },
          },
        },
        A: {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Mean Score",
            font: {
              size: 16,
            },
            padding: {
              bottom: 16,
            },
          },
          ticks: {
            callback: (label) => `${new Intl.NumberFormat().format(label)}`, // Convert year to string
          },
        },
      },
    },
  });

  const Years = [
    ...new Set(scoreByStateData.map((item) => item.CALENDAR_YEAR)),
  ];

  const getDataByState = (state) => {
    return [
      ...new Set(
        scoreByStateData
          .filter((item) => item.STATE === state)
          .map((item) => item.MEAN)
      ),
    ];
  };
  console.log("Years", Years);
  console.log("getDataByState", getDataByState("NSW"));

  new Chart(document.getElementById("mean-scores-by-state"), {
    type: "line",
    data: {
      labels: Years,
      datasets: [
        {
          data: getDataByState("ACT"),
          label: "ACT",
          borderColor: "#3cba9f",
          fill: false,
        },
        {
          data: getDataByState("VIC"),
          label: "VIC",
          // borderColor: "#e43202",
          fill: false,
        },
        {
          data: getDataByState("NSW"),
          label: "NSW",
          // borderColor: "#e43202",
          fill: false,
        },
        {
          data: getDataByState("AUS"),
          label: "AUS",
          borderColor: "#e43202",
          fill: false,
        },
        {
          data: getDataByState("WA"),
          label: "WA",
          // borderColor: "#e43202",
          fill: false,
        },
        {
          data: getDataByState("QLD"),
          label: "QLD",
          // borderColor: "#e43202",
          fill: false,
        },
        {
          data: getDataByState("SA"),
          label: "SA",
          // borderColor: "#e43202",
          fill: false,
        },
        {
          data: getDataByState("TAS"),
          label: "TAS",
          // borderColor: "#e43202",
          fill: false,
        },
        {
          data: getDataByState("NT"),
          label: "NT",
          // borderColor: "#e43202",
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Chart JS Multiple Lines Example",
      },
    },
  });
})();

// async function getAllMovieData() {
//   const url = `/api/movies/`;
//   console.log(url);
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("getAllMovieData", data);
//   return data;
// }

// async function getTop10MovieData(attribute) {
//   const url = `/api/top_movies/${attribute}`;
//   console.log(url);
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("getTop10MovieData", data);
//   return data;
// }

// async function getGenreData() {
//   const url = `/api/genre/`;
//   console.log(url);
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("getGenreData", data);
//   return data;
// }

// async function getTop10DirectorByGross() {
//   const url = `/api/director/Gross`;
//   console.log(url);
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("getTop10DirectorByGross", data);
//   return data;
// }

// async function getTop10GenresByGross() {
//   const url = `/api/genre/Gross`;
//   console.log(url);
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("getTop10GenresByGross", data);
//   return data;
// }

// (async function () {
//   // Bubble chart showing top 100 IMDB
//   const allMovieData = await getAllMovieData();
//   new Chart(document.getElementById("bubble-chart"), {
//     type: "bubble",
//     data: {
//       labels: allMovieData.map(
//         (x) => `${x.Title}: $${new Intl.NumberFormat().format(x.Gross)}`
//       ),
//       datasets: [
//         {
//           label: "Gross",
//           data: allMovieData.map((row) => ({
//             x: row.Year,
//             y: row.IMDB,
//             r: row.Gross / 25000000,
//           })),
//           hoverBackgroundColor: "#c70039",
//         },
//       ],
//     },
//     options: {
//       plugins: {
//         title: {
//           display: true,
//           text: "Top 1000 IMDB",
//           font: {
//             size: 20,
//           },
//         },
//         tooltip: {
//           callbacks: {
//             label: function (context) {
//               let label = "";
//               label += "Year (";
//               label += context.parsed.x;
//               label += "), IMDB (";
//               label += context.parsed.y;
//               label += ")";
//               return label;
//             },
//           },
//         },
//       },
//       scales: {
//         y: {
//           title: {
//             display: true,
//             text: "IMDB",
//             font: {
//               size: 16,
//             },
//             padding: {
//               bottom: 16,
//             },
//           },
//         },
//         x: {
//           title: {
//             display: true,
//             text: "Released Year",
//             font: {
//               size: 16,
//             },
//             padding: {
//               top: 16,
//             },
//           },
//           ticks: {
//             callback: (label) => `${label}`, // Convert year to string
//           },
//         },
//       },
//     },
//   });

//   // Doughnut chart showing proportions of genres
//   const genreData = await getGenreData();
//   new Chart(document.getElementById("top-genre"), {
//     type: "doughnut",
//     data: {
//       labels: genreData.map((x) => x.Genre1),
//       datasets: [
//         {
//           label: "%",
//           data: genreData.map((x) => (x.count / 999) * 100),
//           // borderWidth: 0,
//           // hoverBorderWidth: 6,
//           // hoverBackgroundColor: "#c70039",
//           // hoverBorderColor: "#0096ff",
//           hoverOffset: 50,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       // cutoutPercentage: 65,

//       plugins: {
//         title: {
//           display: true,
//           text: "Proportions of Genres",
//           font: {
//             size: 20,
//           },
//         },
//       },
//     },
//   });

//   // Table showing top 10 movies by IMDB
//   const top10IMDBData = await getTop10MovieData("IMDB");
//   const top10IMDBTable = document.getElementById("top-imdb");
//   let html = `
//         <tr>
//           <th>Title</th>
//           <th>IMDB</th>
//           <th>Year</th>
//           <th>Director</th>
//           <th>Gross</th>
//         </tr>
//         `;
//   top10IMDBData.forEach((row) => {
//     html += `
//           <tr>
//             <td>${row.Title}</td>
//             <td>${row.IMDB}</td>
//             <td>${row.Year}</td>
//             <td>${row.Director}</td>
//             <td>$${new Intl.NumberFormat().format(row.Gross)}</td>
//           </tr>`;
//   });
//   top10IMDBTable.innerHTML = html;

//   // Mixed charts showing top 10 movies by gross along with their IMDB scores
//   const top10GrossData = await getTop10MovieData("Gross");
//   new Chart(document.getElementById("top-gross"), {
//     data: {
//       labels: top10GrossData.map((x) => x.Title),
//       datasets: [
//         {
//           type: "bar",
//           yAxisID: "A",
//           label: "Gross",
//           data: top10GrossData.map((x) => x.Gross),
//           // backgroundColor: "orange",
//         },
//         {
//           type: "line",
//           yAxisID: "B",
//           label: "IMDB",
//           data: top10GrossData.map((x) => x.IMDB),
//           // backgroundColor: "#ff6384",
//         },
//       ],
//     },
//     options: {
//       plugins: {
//         title: {
//           display: true,
//           text: "Top 10 Movies By Gross",
//           font: {
//             size: 20,
//           },
//         },
//       },

//       scales: {
//         x: {
//           title: {
//             display: false,
//             text: "Movie",
//             font: {
//               size: 16,
//             },
//             padding: {
//               top: 16,
//             },
//           },
//         },
//         A: {
//           type: "linear",
//           position: "left",
//           title: {
//             display: true,
//             text: "Gross",
//             font: {
//               size: 16,
//             },
//             padding: {
//               bottom: 16,
//             },
//           },
//           ticks: {
//             callback: (label) => `$${new Intl.NumberFormat().format(label)}`, // Convert year to string
//           },
//         },
//         B: {
//           type: "linear",
//           position: "right",
//           title: {
//             display: true,
//             text: "IMDB",
//             font: {
//               size: 16,
//             },
//             padding: {
//               bottom: 16,
//             },
//           },
//         },
//       },
//     },
//   });

//   // Mixed charts showing top 10 genres by gross along with their numbers of movies
//   const top10GenresByGrossData = await getTop10GenresByGross();
//   new Chart(document.getElementById("top-genre-by-gross"), {
//     data: {
//       labels: top10GenresByGrossData.map((x) => `${x.Genre1}`),
//       datasets: [
//         {
//           type: "bar",
//           yAxisID: "A",
//           label: "Average Gross",
//           data: top10GenresByGrossData.map((x) => x.avg_gross),
//           // backgroundColor: "#800080",
//         },
//         {
//           type: "line",
//           yAxisID: "B",
//           label: "Number of Movies",
//           data: top10GenresByGrossData.map((x) => x.count),
//           // backgroundColor: "#800080",
//         },
//       ],
//     },
//     options: {
//       plugins: {
//         title: {
//           display: true,
//           text: "Top 10 Genres By Average Gross",
//           font: {
//             size: 20,
//           },
//         },
//       },
//       scales: {
//         x: {
//           title: {
//             display: false,
//             text: "Genre",
//             font: {
//               size: 16,
//             },
//             padding: {
//               top: 16,
//             },
//           },
//         },

//         A: {
//           type: "linear",
//           position: "left",
//           title: {
//             display: true,
//             text: "Average Gross",
//             font: {
//               size: 16,
//             },
//             padding: {
//               bottom: 16,
//             },
//           },
//           ticks: {
//             callback: (label) => `$${new Intl.NumberFormat().format(label)}`, // Convert year to string
//           },
//         },
//         B: {
//           type: "linear",
//           position: "right",
//           title: {
//             display: true,
//             text: "Numbers of Movies",
//             font: {
//               size: 16,
//             },
//             padding: {
//               bottom: 16,
//             },
//           },
//         },
//       },
//     },
//   });

//   // Table showing top 10 directors by gross
//   const top10DirectorByGrossData = await getTop10DirectorByGross();
//   const top10DirectorByGrossTable = document.getElementById(
//     "top-director-by-gross"
//   );
//   let html2 = `
//         <tr>
//           <th>Director</th>
//           <th>Gross</th>
//           <th>Number of Movies</th>
//           <th>Average Gross</th>
//         </tr>
//         `;
//   top10DirectorByGrossData.forEach((row) => {
//     html2 += `
//           <tr>
//             <td>${row.Director}</td>
//             <td>$${new Intl.NumberFormat().format(row.gross)}</td>
//             <td>${row.count}</td>
//             <td>$${new Intl.NumberFormat().format(
//               Math.round(row.avg_gross)
//             )}</td>
//           </tr>`;
//   });
//   console.log();
//   top10DirectorByGrossTable.innerHTML = html2;
// })();
