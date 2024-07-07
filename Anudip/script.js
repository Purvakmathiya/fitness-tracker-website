document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('statsForm');
    const stepsElement = document.getElementById('steps');
    const caloriesElement = document.getElementById('calories');
    const distanceElement = document.getElementById('distance');
    const ctx = document.getElementById('myChart').getContext('2d');

    let stepsData = [];
    let datesData = [];

    // Initialize chart
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datesData,
            datasets: [{
                label: 'Steps',
                data: stepsData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get input values
        const steps = parseInt(document.getElementById('stepsInput').value);
        const calories = parseInt(document.getElementById('caloriesInput').value);
        const distance = parseFloat(document.getElementById('distanceInput').value);

        // Update stats only if inputs are valid numbers
        if (!isNaN(steps) && !isNaN(calories) && !isNaN(distance)) {
            // Update today's stats
            stepsElement.textContent = steps;
            caloriesElement.textContent = calories;
            distanceElement.textContent = distance.toFixed(2); // Display distance with 2 decimal places

            // Update chart data
            stepsData.push(steps);
            datesData.push(new Date().toLocaleDateString());

            // Update chart
            myChart.update();

            // Clear form inputs
            form.reset();
        } else {
            alert('Please enter valid numbers for steps, calories, and distance.');
        }
    });
});
