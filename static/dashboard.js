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
async function getMeanScoresByYearLevelData() {
  const url = `/api/mean_scores_by_year_level`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log("getMeanScoresByYearData", data);
  return data;
}

(async function () {
  // Mixed charts showing top 10 movies by gross along with their IMDB scores
  const enrolledData = await getEnrolledStudentsData();
  const scoreData = await getMeanScoresData();
  const scoreByStateData = await getMeanScoresByStateData();
  const scoreByYearLevelData = await getMeanScoresByYearLevelData();

  console.log("enrolledData", enrolledData);
  console.log("scoreData", scoreData);
  console.log("scoreByStateData", scoreByStateData);
  console.log("scoreByYearLevelData", scoreByYearLevelData);

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
          backgroundColor: "purple",
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

  new Chart(document.getElementById("mean-scores-by-state"), {
    type: "line",
    data: {
      labels: Years,
      datasets: [
        {
          data: getDataByState("ACT"),
          label: "ACT",
          borderColor: "#26a68a",
          fill: false,
        },
        {
          data: getDataByState("VIC"),
          label: "VIC",
          borderColor: "#3cba9f",
          fill: false,
        },
        {
          data: getDataByState("NSW"),
          label: "NSW",
          borderColor: "#62e3c7",
          fill: false,
        },
        {
          data: getDataByState("AUS"),
          label: "AUS",
          borderColor: "#e43202",
          fill: true,
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
          borderColor: "#8054de",
          fill: false,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Yearly average score of NAPLAN test by state (2008-2022)",
          font: {
            size: 20,
          },
        },
      },
    },
  });

  const getDataByYearLevel = (level) => {
    return [
      ...new Set(
        scoreByYearLevelData
          .filter((item) => item.YEAR_LEVEL == level)
          .map((item) => item.MEAN)
      ),
    ];
  };
  new Chart(document.getElementById("mean-scores-by-year-level"), {
    type: "line",
    data: {
      labels: Years,
      datasets: [
        {
          data: getDataByYearLevel("3"),
          label: "3",
          borderColor: "#ff3600",
          fill: true,
        },
        {
          data: getDataByYearLevel("5"),
          label: "5",
          borderColor: "#db2f00",
          fill: true,
        },
        {
          data: getDataByYearLevel("7"),
          label: "7",
          borderColor: "#b32600",
          fill: true,
        },
        {
          data: getDataByYearLevel("9"),
          label: "9",
          borderColor: "#8f1e00",
          fill: true,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Yearly average score of NAPLAN test by year level (2008-2022)",
          font: {
            size: 20,
          },
        },
      },
    },
  });
})();
