const button = document.getElementById("button");
const header1 = document.querySelector(".redirectKey").id;

button.addEventListener("click", () => {
  const choice = document.querySelector("input[name=vote]:checked").value;
  const index = document.querySelector("input[name=vote]:checked").id;
  const apiUrl = `/poll/vote?redirectKey=${header1}&pollId=${index}`;

  button.style.display = "none";

  fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      var options = {
        chart: {
          type: "bar",
          animations: {
            enabled: true,
          },
        },
        series: [
          {
            name: "votes",
            data: [
              data.first.votes,
              data.second.votes,
              data.third.votes,
              data.fourth.votes,
            ],
          },
        ],
        xaxis: {
          categories: [
            data.first.name,
            data.second.name,
            data.third.name,
            data.fourth.name,
          ],
        },
      };
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    });
});
