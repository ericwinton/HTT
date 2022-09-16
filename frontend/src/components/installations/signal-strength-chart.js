app.components.signalStrengthChart = (props) => {
    return {
        template: `
            <canvas id="ss-chart"></canvas>
        `,

        styles: `
            #ss-chart {
                width: 100%;
            }
        `,

        onFirstRender: () => {
            var s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js';
            s.onload = () => {
                var xValues = ['7/28', '7/29', '7/30', '7/31', '8/1'];
                var yValues = [-68, -62, -64, -72, -68];

                new Chart("ss-chart", {
                    type: "line",
                    data: {
                        labels: xValues,
                        datasets: [{
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(0,0,0,1.0)",
                            borderColor: "rgba(0,0,0,0.1)",
                            data: yValues
                        }]
                    },
                    options: {
                        legend: {display: false}
                    }
                });
            };
            document.body.append(s);
        }
    }
};