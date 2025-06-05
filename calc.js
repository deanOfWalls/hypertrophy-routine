function targetWeight(oneRepMax, reps) {
  return Math.round(oneRepMax / (1 + reps / 30));
}

const repTargets = [5, 8, 10, 12]; // Modify if needed

fetch('lifts.json')
  .then(res => res.json())
  .then(data => {
    const output = document.getElementById('output');

    for (const [exercise, stats] of Object.entries(data)) {
      const wrapper = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = exercise;
      wrapper.appendChild(title);

      const list = document.createElement('ul');
      repTargets.forEach(reps => {
        const est = targetWeight(stats["1RM"], reps);
        const li = document.createElement('li');
        li.textContent = `${reps}RM → ${est} lbs`;
        list.appendChild(li);
      });

      wrapper.appendChild(list);
      output.appendChild(wrapper);
    }
  });
