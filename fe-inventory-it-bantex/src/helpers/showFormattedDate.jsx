const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const showFormattedDate2 = (dateString) => {
  const date = new Date(dateString);

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

export { showFormattedDate, showFormattedDate2 };
