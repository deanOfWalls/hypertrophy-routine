function workingWeight(oneRepMax, reps) {
  return oneRepMax / (1 + reps / 30);
}

function roundToNearestRealistic(weight) {
  return Math.round(weight / 5) * 5;
}

fetch('lifts.json')
  .then(res => res.json())
  .then(data => {
    const output = document.getElementById('output');

    for (const [exercise, info] of Object.entries(data)) {
      const oneRM = info["1RM"];
      const reps = info["targetReps"];
      const sets = info["sets"];

      if (typeof oneRM !== "number") continue;

      const raw = workingWeight(oneRM, reps);
      const rounded = roundToNearestRealistic(raw);

      const wrapper = document.createElement('li');
      wrapper.innerHTML = `
        <strong>${exercise}</strong><br>
        1RM: ${oneRM} lbs<br>
        Target: ${sets}x${reps} @ ${raw.toFixed(1)} lbs<br>
        Recommended: <strong>${rounded} lbs</strong>
      `;
      output.appendChild(wrapper);
    }
  });
