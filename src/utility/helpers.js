export const formattedTimer = (time) => {
    const {hours, minutes, seconds} = time;
    return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`
}