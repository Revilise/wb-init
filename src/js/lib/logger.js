export default class Logger {
    static log() { console.log(...arguments) };
    static error() { console.error(...arguments) };
    static warn() { console.warn(...arguments) };
}