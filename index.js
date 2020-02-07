// Include Nodejs' net module.
const Net = require('net');
const player = require('play-sound')(opts = {})

// The port on which the server is listening.
const port = 8080;

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const com = new SerialPort('/dev/ttyS3', { baudRate: 115200, autoOpen: false})

const stateMaschine =  require('./state-maschine')

const parser = new Readline()
com.pipe(parser)

com.open(function (err) {
    if (err) {
      console.log('Error opening port: ', err.message);
      process.exit(0);
    }
  })
  
  // The open event is always emitted
  com.on('open', function() {
    // open logic
    console.log('COM opened OK ')
  })

const stateM = stateMaschine.create();
let audio;

// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
const server = new Net.Server();
// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});

// When a client requests a connection with the server, the server creates a new
// socket dedicated to that client.
server.on('connection', function(socket) {

    console.log('A new connection has been established.');
    com.write("AT\n");
    com.write("AT+DDET=1\n");
    
    com.on('data', function (data) {
    // Now that a TCP connection has been established, the server can send data to
    // the client by writing to its socket.
    socket.write(data);
    console.log(`Data send to client: ${data.toString()}`);
    });

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function(chunk) {
        console.log(`Data received from client: ${chunk.toString()}`);
        com.write(chunk);
    });

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});


parser.on('data', function(line){ 
        if (line.includes("+DTMF: 0")){
            stateM.press0();
        }
        if (line.includes("+DTMF: 1")){
            stateM.press1();
        }
        if (line.includes("+DTMF: 2")){
            stateM.press2();
        }
        if (line.includes("+DTMF: 3")){
            stateM.press3();
        }
        if (line.includes("RING")){
            stateM.ring();
        }
        if (line.includes("NO CARRIER")){
            stateM.noCarrier();
        }        
    }
    );


stateM.em.on('StateChanged', function (data) {
    console.log('onStateChanging: ', data.from.name,"->", data.to.name);
    
    //init reset
    if (data.to.name==="0"){
        //com.write("ATH0\n");
    }
    //play 1
    if ( data.to.name==="1"){
        if (audio) audio.kill();
        com.write("ATA\n");
        setTimeout(function(){ audio = player.play('1.mp3', function(err){ }); }, 500);    
    }    
    //play 1.1
    if (data.to.name==="1.1"){
        if (audio) audio.kill();
        setTimeout(function(){ audio = player.play('2.mp3', function(err){ }); }, 500);
    }
    //play 1.2
    if (data.to.name==="1.2"){
        if (audio) audio.kill();
        setTimeout(function(){ audio = player.play('3.mp3', function(err){ }); }, 500);    
    }
    //play 1.3
    if (data.to.name==="1.3"){
        if (audio) audio.kill();
        setTimeout(function(){ audio = player.play('3.mp3', function(err){ }); }, 500);   
    }
});  
