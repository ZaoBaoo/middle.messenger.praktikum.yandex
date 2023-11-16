export const parseDate = (dateString: string) => {
  const dateText = new Date(dateString)
    .toLocaleTimeString([], {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    })
    .slice(0, 8);

  const timeText = new Date(dateString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { dateText, timeText };
};
