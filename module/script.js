document.getElementById('waterJugForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const x = parseInt(document.getElementById('x').value);
    const y = parseInt(document.getElementById('y').value);
    const z = parseInt(document.getElementById('z').value);
  
    resetState();
  
    fetch('http://localhost:3000/api/waterjug', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x, y, z })
    })
    .then(response => response.json())
    .then(data => {
      if (data.steps) {
        displayResult(data.steps, x, y);
      } else {
        document.getElementById('result').innerHTML = '<span style="color: red;">No Solution.</span>';
      }
    })
    .catch(error => console.error('Error:', error));
  });
  
  function resetState() {
    const jugA = document.getElementById('jugA');
    const jugB = document.getElementById('jugB');
    const resultDiv = document.getElementById('result');
  
    updateJug(jugA, 0);
    updateJug(jugB, 0);
    jugA.classList.remove('empty-left', 'empty-right', 'transfer');
    jugB.classList.remove('empty-left', 'empty-right', 'transfer');
  
    resultDiv.innerHTML = '<h2>Steps to follow:</h2>';
  }
  
  function updateJug(jugElement, percent) {
    let waterSurface = jugElement.querySelector('.water-surface');
    if (!waterSurface) {
      waterSurface = document.createElement('div');
      waterSurface.classList.add('water-surface');
      jugElement.querySelector('.water').appendChild(waterSurface);
    }
  
    jugElement.querySelector('.water').style.height = `${percent}%`;
  }
  
  function displayResult(steps, x, y) {
    const resultDiv = document.getElementById('result');
  
    const jugA = document.getElementById('jugA');
    const jugB = document.getElementById('jugB');
    const streamA = document.createElement('div');
    const streamB = document.createElement('div');
  
    jugA.appendChild(streamA);
    jugB.appendChild(streamB);
  
    streamA.className = 'stream stream-right';
    streamB.className = 'stream stream-left';
  
    let a = 0, b = 0;
  
    steps.forEach((action, index) => {
      const listItem = document.createElement('p');
      listItem.textContent = `Step ${index + 1}: ${action}`;
      resultDiv.appendChild(listItem);
  
      setTimeout(() => {
        jugA.classList.remove('empty-left', 'empty-right', 'transfer');
        jugB.classList.remove('empty-left', 'empty-right', 'transfer');
        streamA.style.opacity = '0';
        streamB.style.opacity = '0';
  
        if (action.includes("Empty jug A")) {
          jugA.classList.add('empty-left');
          streamA.style.opacity = '1';
          a = 0;
          updateJug(jugA, 0);
  
          setTimeout(() => {
            jugA.classList.remove('empty-left');
          }, 1000);
  
        } else if (action.includes("Empty jug B")) {
          jugB.classList.add('empty-right');
          streamB.style.opacity = '1';
          b = 0;
          updateJug(jugB, 0);
  
          setTimeout(() => {
            jugB.classList.remove('empty-right');
          }, 1000);
  
        } else if (action.includes("Fill jug A")) {
          addFallingDrops(jugA);
          setTimeout(() => {
            a = x;
            updateJug(jugA, (a / x) * 100);
          }, 1500);
  
        } else if (action.includes("Fill jug B")) {
          addFallingDrops(jugB);
          setTimeout(() => {
            b = y;
            updateJug(jugB, (b / y) * 100);
          }, 1500);
  
        } else if (action.includes("Transfer jug A into B")) {
          jugA.classList.add('transfer');
          streamA.style.opacity = '1';
  
          const transfer = Math.min(a, y - b);
          a -= transfer;
          b += transfer;
          updateJug(jugA, (a / x) * 100);
          updateJug(jugB, (b / y) * 100);
  
          setTimeout(() => {
            jugA.classList.remove('transfer');
          }, 1000);
  
        } else if (action.includes("Transfer jug B into A")) {
          jugB.classList.add('empty-left');
          streamB.style.opacity = '1';
  
          const transfer = Math.min(b, x - a);
          b -= transfer;
          a += transfer;
          updateJug(jugA, (a / x) * 100);
          updateJug(jugB, (b / y) * 100);
  
          setTimeout(() => {
            jugB.classList.remove('empty-left');
          }, 1000);
        }
      }, index * 3000);
    });
  }
  
  function addFallingDrops(jugElement) {
    const dropInterval = setInterval(() => {
      const drop = document.createElement('div');
      drop.classList.add('drop');
      jugElement.appendChild(drop);
  
      setTimeout(() => {
        jugElement.removeChild(drop);
      }, 800);
    }, 300);
  
    setTimeout(() => {
      clearInterval(dropInterval);
    }, 1500);
  }
