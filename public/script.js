async function fetchData() {
    try {
        const response = await fetch('/data');
        const data = await response.json();
        console.log(data);
        const timeSeries = data['Time Series (5min)'];
        const labels = Object.keys(timeSeries).reverse(); 
        const values = labels.map(label => parseFloat(timeSeries[label]['4. close'])); 

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'IBM - Quote',
                    data: values,
                    borderColor: 'blue',
                    backgroundColor: '#00aae4',
                    pointBackgroundColor: '#00aae4',
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute',
                            displayFormats: {
                                minute: 'HH:mm'
                            }
                        }
                    }
                }
            }
        }); 

    } catch (error) {
        console.error('Error al obtener o procesar los datos:', error);
    }
} 

fetchData();
