# Websocket API

## Constructor

```javascript
var ws = new websocket(String host, String uri, Number port, Number ssl, Boolean use_se);
```

**Description**

Create and configure a new websocket object.

**Parameters**

 - *String*: address of the websocket host to connect to.
 - *String*: URI to target on the websocket host.
 - *Number*: port of the websocket.
 - *Number*: **1** to use SSL for connection to the websocket, **0** otherwise.
 - *Boolean*: **1** to use the onboard Secure Element for SSL handshake, **0**
otherwise.

**Return value**

New instance.

**Example**

```javascript
var cloud = new websocket('api.artik.cloud', '/v1.1/websocket', 443, 1, 0);
```

## open_stream

```javascript
Number open_stream()
```

**Description**

Initiate the connection to the websocket host. After calling this function,
the application should catch the [connected](#connected) event to get notified
of the connection status change.

**Parameters**

None.

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

## close_stream

```javascript
Number close_stream()
```

**Description**

Close the current websocket connection. After calling this function,
the application should catch the [connected](#connected) event to get notified
of the connection status change.

**Parameters**

None.

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

## write_stream

```javascript
Number write_stream(String data)
```

**Description**

Send data over the websocket.

**Parameters**

 - *String*: string containing the data to send over the websocket.

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

# Events

## connected

```javascript
ws.on('connected', function(String))
```

**Description**

Called after a status change of the websocket connection.

**Parameters**

 - *String*: string containing the current state of the connection. 
**CONNECTED** if the connection was successful, **CLOSED** if it was closed
manually or by the remote host.

**Example**

See [full example](#full-example)

## receive

```javascript
ws.on('receive', function(String))
```

**Description**

Called after a data was received on the websocket.

**Parameters**

 - *String*: string containing the received data.

**Example**

See [full example](#full-example)

# Full example

   * See [websocket-example.js](/examples/websocket-example.js)
