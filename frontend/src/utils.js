export const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    return `${formattedDate} ${formattedTime}`;
};
