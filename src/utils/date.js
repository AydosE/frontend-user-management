function convertToLocalTime(utcTime, userTimezone) {
  return lastLogin(
    new Date(utcTime).toLocaleString("en-US", { timeZone: userTimezone })
  );
}

function lastLogin(date) {
  // console.log(date);
  date = formatDate(date);
  console.log(date);

  const lastLoginDate = new Date(Date.parse(date));
  const now = new Date();
  const diffInMs = now - lastLoginDate;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInSeconds < 60) {
    return "less than a minute ago";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  } else {
    return `${diffInDays} days ago`;
  }
}

function formatDate(date) {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Date(date).toLocaleDateString("en-US", options);
}
export { lastLogin, formatDate, convertToLocalTime };
