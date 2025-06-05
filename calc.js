function workingWeight(oneRepMax, reps) {
  return oneRepMax / (1 + reps / 30);
}

function roundToNearestFive(weight) {
  return Math.round(weight / 5) * 5;
}

function abbreviateAll(days) {
  return days.map(d => d.slice(0, 3)).join('/');
}

fetch('lifts.json')
  .then(res => res.json())
  .then(data => {
    const output = document.getElementById('output');

    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Day</th>
          <th>Exercise</th>
          <th>Sets x Reps</th>
          <th>Target</th>
          <th>Recommended</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    for (const [exercise, info] of Object.entries(data)) {
      const { sets, targetReps, "1RM": oneRM, day } = info;
      const dayLabel = Array.isArray(day) && day.length > 0
        ? abbreviateAll(day)
        : "—";

      let target = "—";
      let recommended = "—";

      if (typeof oneRM === "number") {
        const raw = workingWeight(oneRM, targetReps);
        target = raw.toFixed(1) + " lbs";
        recommended = roundToNearestFive(raw) + " lbs";
      } else if (oneRM === "bodyweight") {
        target = recommended = "Bodyweight";
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${dayLabel}</td>
        <td>${exercise}</td>
        <td>${sets}x${targetReps}</td>
        <td>${target}</td>
        <td>${recommended}</td>
      `;
      tbody.appendChild(row);
    }

    output.appendChild(table);
  });
