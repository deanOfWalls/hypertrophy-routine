function workingWeight(oneRepMax, reps) {
  return Math.round(oneRepMax / (1 + reps / 30));
}

fetch('lifts.json')
  .then(res => res.json())
  .then(data => {
    const output = document.getElementById('output');

    for (const [exercise, info] of Object.entries(data)) {
      const oneRM = info["1RM"];
      const reps = info["targetReps"];
      const sets = info["sets"];

      // Skip entries with no valid numeric 1RM
      if (typeof oneRM !== "number") continue;

      const target = workingWeight(oneRM, reps);
      const wrapper = document.createElement('li');
      wrapper.innerHTML = `
        <strong>${exercise}</strong><br>
        1RM: ${oneRM} lbs<br>
        Target: <strong>${sets}x${reps}</strong> @ ${target} lbs
      `;
      output.appendChild(wrapper);
    }
  });
