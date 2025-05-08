const images = document.querySelectorAll('.image');
const canvases = document.querySelectorAll('.chart');
const spinners = document.querySelectorAll('.spinner');

ml5.imageClassifier('MobileNet', () => {
    images.forEach((img, index) => {
        const spinner = spinners[index];
        const ctx = canvases[index].getContext('2d');

        spinner.style.display = 'block';

        const classifier = ml5.imageClassifier('MobileNet', () => {
            classifier.classify(img, (err, results) => {
                spinner.style.display = 'none';

                const labels = results.slice(0, 3).map(r => r.label);
                const scores = results.slice(0, 3).map(r => r.confidence);

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Wahrscheinlichkeit',
                            data: scores
                        }]
                    },
                    options: {
                        responsive: false,
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
            });
        });
    });
});