document.addEventListener('DOMContentLoaded', () => {
    const startTestButton = document.getElementById('start-test');
    const startTraceButton = document.getElementById('start-trace');
    const speedResultDiv = document.getElementById('speed-result');
    const traceResultUl = document.getElementById('trace-result');
    const errorMessageDiv = document.getElementById('error-message');

    const mockSpeedTest = async () => {
        // 모의 데이터
        return {
            download: 50.5, // Mbps
            upload: 10.3 // Mbps
        };
    };

    const mockTraceRoute = async () => {
        // 모의 데이터
        return {
            hops: [
                { number: 1, address: '192.168.1.1', time: 5 },
                { number: 2, address: '10.0.0.1', time: 15 },
                { number: 3, address: '172.16.0.1', time: 25 },
                { number: 4, address: '8.8.8.8', time: 50 }
            ]
        };
    };

    startTestButton.addEventListener('click', async () => {
        errorMessageDiv.classList.add('hidden');
        speedResultDiv.classList.add('hidden');

        try {
            const data = await mockSpeedTest();

            document.getElementById('download-speed').textContent = data.download;
            document.getElementById('upload-speed').textContent = data.upload;
            speedResultDiv.classList.remove('hidden');
        } catch (error) {
            errorMessageDiv.textContent = '속도 테스트 중 오류가 발생했습니다.';
            errorMessageDiv.classList.remove('hidden');
            console.error('Speed test error:', error);
        }
    });

    startTraceButton.addEventListener('click', async () => {
        errorMessageDiv.classList.add('hidden');
        traceResultUl.innerHTML = '';
        traceResultUl.classList.add('hidden');

        try {
            const data = await mockTraceRoute();

            data.hops.forEach(hop => {
                const listItem = document.createElement('li');
                listItem.textContent = `Hop ${hop.number}: ${hop.address} - ${hop.time}ms`;
                traceResultUl.appendChild(listItem);
            });
            traceResultUl.classList.remove('hidden');
        } catch (error) {
            errorMessageDiv.textContent = '트레이스 루트 중 오류가 발생했습니다.';
            errorMessageDiv.classList.remove('hidden');
            console.error('Traceroute error:', error);
        }
    });
});
