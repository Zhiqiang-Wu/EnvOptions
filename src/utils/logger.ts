// @author 吴志强
// @date 2021/9/11

import {createLogger, transports, format} from 'winston';

const customFormat = format.printf(({level, message, timestamp}) => {
    return `${timestamp} ${level} - ${message}`;
});

const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'HH:mm:ss.SSS'
        }),
        customFormat
    ),
    transports: [
        new transports.Console()
    ]
});

export default logger;
