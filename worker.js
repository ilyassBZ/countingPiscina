export default function count(arr) {
  try {
    const total = arr.reduce(
      (totals, currentCount) => {
        totals.active += currentCount.active;
        totals.valid += currentCount.valid;
        totals.disabled += currentCount.disabled;
        return totals;
      },
      { active: 0, valid: 0, disabled: 0 },
    );
    return total;
  } catch (err) {
    console.log(err);
  }
}
