import { t } from 'tasai';
import EventEmitter from 'events';
// ### The following code is experimental !!!, not tested yet ###
export const Event = {
    name: 'errorHandler',
    CustomEvent: true,
    run: async () => {
        const eventEmitter = new EventEmitter();

        eventEmitter.on('unhandledRejection', async (reason, error) => {
            console.log(t.bgBrightBlack.toFunction()('[unhandledRejection] ') + t.bold.white.toFunction()(`Unhandled Rejection, reason: ${reason} || error: ${error}`))
        });

        eventEmitter.on('uncaughtException', async (error, reason) => {
            console.log(t.bgBrightBlack.toFunction()('[uncaughtException] ') + t.bold.white.toFunction()(`Uncaught Exception: ${error} || reason: ${reason}`))
        });

        eventEmitter.on('rejectionHandled', async (error, reason) => {
            console.log(t.bgBrightBlack.toFunction()('[rejectionHandled] ') + t.bold.white.toFunction()(`Rejection Handled: ${error} || reason: ${reason}`))
        });

        eventEmitter.on('uncaughtExceptionMonitor', async (error, reason) => {
            console.log(t.bgBrightBlack.toFunction()('[uncaughtExceptionMonitor] ') + t.bold.white.toFunction()(`Uncaught Exception Monitor: ${error} || reason: ${reason}`))
        });

        eventEmitter.on('warning', async (warning) => {
            console.log(t.bgBrightBlack.toFunction()('[warning] ') + t.bold.white.toFunction()(`Warning: ${warning}`))
        });

        eventEmitter.on('beforeExit', async (error) => {
            console.log(t.brightBlack.toFunction()('[beforeExit] ') + t.bold.white.toFunction()(`Before Exit: ${error}`))
        });

        eventEmitter.on('exit', async (error) => {
            console.log(t.brightBlack.toFunction('[exit] ') + t.bold.white.toFunction()(`Exit: ${error}`))
        });
        eventEmitter.on('TypeError', async (error) => {
            console.log(t.bgBrightBlack.toFunction()('[TypeError] ') + t.bold.white.toFunction()(`Type Error: ${error}`))
        })
    }
}

console.log(t.bgBrightBlack.toFunction()('[errorHandler] ') + t.bold.white.toFunction()(('Loaded')))
