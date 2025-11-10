function monthStrFromDate(d) {
  const year = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${m}`;
}

module.exports = { monthStrFromDate };
