const log = (textToLog, fileName, row,objectToLog) =>
{
    const date = new Date();
    console.log(`${date.toLocaleTimeString()} | ${fileName} (${row}) - ${textToLog}. Object -`, objectToLog);
};

module.exports = { log }