class WebSocketClient {
    
    constructor(protocol, hostname, port, endpoint) {
        
        this.webSocket = null;
        
        this.protocol = protocol;
        this.hostname = hostname;
        this.port     = port;
        this.endpoint = endpoint;
        this.status = false;
    }
    
    getServerUrl() {
        return this.protocol + "://" + this.hostname + ":" + this.port + this.endpoint;
    }
    
    connect() {
        try {
            this.webSocket = new WebSocket(this.getServerUrl());
            
            this.webSocket.onopen = function(event) {
                console.log('onopen::' + JSON.stringify(event, null, 4));
            }
            this.webSocket.onmessage = function(event) {
                var msg = event.data;
                Send4D(JSON.parse(msg));
            }
            this.webSocket.onclose = function(event) {
                console.log('onclose::' + JSON.stringify(event, null, 4));                
            }
            this.webSocket.onerror = function(event) {
                console.log('onerror::' + JSON.stringify(event, null, 4));
            }
            
        } catch (exception) {
            console.error(exception);
        }
    }
    
    getStatus() {
        return this.webSocket.readyState;
    }
    send(message) {
        
        if (this.webSocket.readyState == WebSocket.OPEN) {
            let data = message.toString().split('\n');
            //console.log(data);
            for(let i = 0; i < data.length; i++){                
                this.webSocket.send(data[i] + '\n');
                //console.log(data[i]);
            }
            this.webSocket.send("Fin");
        } else {
            this.connect();
            //console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
        }
    }
    disconnect() {
        if (this.webSocket.readyState == WebSocket.OPEN) {
            this.webSocket.close();
            
        } else {
            console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
        }
    }
}

var client = new WebSocketClient('ws','localhost',9090,'/olc22/socket');
client.connect();