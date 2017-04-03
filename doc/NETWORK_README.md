# Network API

## get_current_ip

```javascript
String get_current_ip()
```

**Description**

Get the current public IP address exposed by the device on the web.

**Parameters**

None.

**Return value**

*String* containing the public IP address by which the device is known on the web.

**Example**

```javascript
console.log('Public IP: ' + network.get_current_ip());
```

## get_online_status

```javascript
Boolean get_online_status()
```

**Description**

Get the web connectivity status.

**Parameters**

None.

**Return value**

*Boolean* containing the web connectivity status.

**Example**

```javascript
console.log('Connectivity status: ' + network.get_online_status());
```
# Events

## connectivity-change

```javascript
network.on("connectivity-change", function(Boolean))
```

**Description**

Get notified of web connectivity changes.

**Parameters**
 - *Boolean* containing the web connectivity status.

**Example**

```javascript
network.on("connectivity-change", function(status) {
	console.log('New connectivity status: ' + status);
});
```

# Full example

   * See [network-example.js](/examples/network-example.js)
