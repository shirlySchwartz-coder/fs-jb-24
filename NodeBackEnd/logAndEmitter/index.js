//web server
const http = require('http');
//file system for writting to logger file
const fs = require('fs');
//handle events
const events = require('events');
//eventEmitter
const eventEmitter = new events.EventEmitter();
const LOGGER_FILE_URL = 'logger/site.log';

const PORT = 8080;

//can be used onyl in type script....
// enum myEvents {
//     "connected","exited","refreshed"
// }

const userEvents = {
	CallDel: "CallDel",
	DispatchDel: "DispatchDel",
	ArriveDel: "ArriveDel",
	DelGive: "DelGive",
    DelReturned: "DelReturned"
}



 
const CallDelHandler = setTimeout(()=>{
    console.log("Call delivery");
    eventEmitter.emit(userEvents.DispatchDel);
},5000)

const dispatchHandler = setTimeout(()=>{
    console.log("delivery is on the way");
    eventEmitter.emit(userEvents.ArriveDel);
},5000)

const arriveHandler = setTimeout(()=>{
    console.log("delivery as arrived");
    eventEmitter.emit(userEvents.DelGive);
},5000)

const giveHandler = setTimeout(()=>{
    console.log("the package was delivered");
    eventEmitter.emit(userEvents.DelReturned);
},5000);

const returnHandler = ()=>{
    console.log("yeruslav can go home :)");
}

const beHappyHandler = ()=>{
    console.log("the package is here, the package is here.....");
} 


eventEmitter.on(userEvents.CallDel,CallDelHandler);
eventEmitter.on(userEvents.DispatchDel,dispatchHandler);
eventEmitter.on(userEvents.ArriveDel,arriveHandler);
eventEmitter.on(userEvents.DelGive,giveHandler);
eventEmitter.on(userEvents.DelReturned,returnHandler);
eventEmitter.on(userEvents.DelGive,beHappyHandler);



http.createServer((request,response)=>{
    eventEmitter.emit(userEvents.CallDel);
    response.end("sending yeruslav");
}).listen(PORT);
console.log(`server was started: http://localhost:${PORT}`);
