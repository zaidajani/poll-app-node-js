async function getData() {
  const redirectKey = document.getElementById("redirectkey");
  const apikey = `/api/raw/votes/${redirectKey.innerText}`;
  fetch(apikey, {
    method: 'GET'
  })
  .then(response => response.json())
    .then((data) => {
      let first = data.first;
      let second = data.second;
      let third = data.third;
      let fourth = data.fourth;

      const options = {
        chart: {
          type: "bar",
        },
        series: [
          {
            name: "votes",
            data: [first.votes, second.votes, third.votes, fourth.votes],
          },
        ],
        xaxis: {
          categories: [first.name, second.name, third.name, fourth.name],
        },
      };
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    });
}

getData();
