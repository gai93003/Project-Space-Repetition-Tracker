export function getUserIDs() {
  return ["1", "2", "3", "4", "5"];
}

export const dateFormat = (topicDate) => {
  const date = new Date(topicDate);

  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();
  const dateSuffix = (day === 1 || day === 21 || day === 31) ? 'st' :
                     (day === 2 || day === 22) ? 'nd' :
                     (day === 3 || day === 23) ? 'rd' : 'th';

  return `${day}${dateSuffix} ${month} ${year}`;
}

const dayD = new Date();
const dateObj = {topic: 'Read biology', date: new Date("03/25/2015")};

export const dateRepetion = (revision) => {
  const revisionDate = new Date(revision.date); //Creates a new date object from the date of the topic

  const dayRepetions = [
    {
      topic: revision.topic,
      date: new Date(new Date(revision.date).setDate(revisionDate.getDate() + 7))
    },
    {
      topic: revision.topic,
      date: new Date(new Date(revision.date).setMonth(revisionDate.getMonth() + 1))
    },
    {
      topic: revision.topic,
      date: new Date(new Date(revision.date).setMonth(revisionDate.getMonth() + 3))
    },
    {
      topic: revision.topic,
      date: new Date(new Date(revision.date).setMonth(revisionDate.getMonth() + 6))
    },
    {
      topic: revision.topic,
      date: new Date(new Date(revision.date).setFullYear(revisionDate.getFullYear() + 1))
    }

  ];

  console.log(revisionDate)
  console.log(dayRepetions)


  return dayRepetions;
}

dateRepetion(dateObj)

console.log(dateFormat(new Date()))