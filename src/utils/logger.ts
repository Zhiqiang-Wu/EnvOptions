// @author 吴志强
// @date 2021/9/11

import {createLogger, transports, format} from 'winston';
// import 'winston-daily-rotate-file';

const isDevelopment = process.env.NODE_ENV === 'development';

const customFormat = format.printf(({level, message, timestamp}) => {
    return `${timestamp} ${level} - ${message}`;
});

const transportList: Array<any> = [
];

if (isDevelopment) {
    transportList.push(new transports.Console());
}

const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'HH:mm:ss.SSS'
        }),
        customFormat
    ),
    transports: transportList
});

export default logger;
