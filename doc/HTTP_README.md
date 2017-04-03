# HTTP API

# get

```javascript
String get(String uri, String[] headers, function(String response))
```

**Description**

Perform a GET HTTP request on a remote host.

**Parameters**

 - *String*: URI to target for the request.
 - *String[]*: array of strings containing the headers to pass along the request. e.g.

```javascript
var headers = [
	"user-agent", "Artik browser",
	"Accept-Language", "en-US,en;q=0.8"
];
```

 - *function(String)*: optional callback function that will be called after
performing the request asynchronously. Response from the host is passed as a
parameter to the callback in a string. If no function is provided
the request will be performed synchronously.

**Return value**

*Undefined* if the callback function is provided, a *String* 
containing the response from the host otherwise (synchronous call).

**Example**

See [Full example](#full-example)

# post

```javascript
String post(String uri, String[] headers, String body, function(String response))
```

**Description**

Perform a POST HTTP request on a remote host.

**Parameters**

 - *String*: URI to target for the request.
 - *String[]*: array of strings containing the headers to pass along the request. e.g.

```javascript
var headers = [
	"user-agent", "Artik browser",
	"Accept-Language", "en-US,en;q=0.8"
];
```
 - *String*: body data to send along the request.
 - *function(String)*: optional callback function that will be called after
performing the request asynchronously. Response from the host is passed as a
parameter to the callback in a string. If no function is provided
the request will be performed synchronously.

**Return value**

*Undefined* if the callback function is provided, a *String* 
containing the response from the host otherwise (synchronous call).

**Example**

See [Full example](#full-example)

# put

```javascript
String put(String uri, String[] headers, String body, function(String response))
```

**Description**

Perform a PUT HTTP request on a remote host.

**Parameters**

 - *String*: URI to target for the request.
 - *String[]*: array of strings containing the headers to pass along the request. e.g.

```javascript
var headers = [
	"user-agent", "Artik browser",
	"Accept-Language", "en-US,en;q=0.8"
];
```
 - *String*: body data to send along the request.
 - *function(String)*: optional callback function that will be called after
performing the request asynchronously. Response from the host is passed as a
parameter to the callback in a string. If no function is provided
the request will be performed synchronously.

**Return value**

*Undefined* if the callback function is provided, a *String* 
containing the response from the host otherwise (synchronous call).

**Example**

See [Full example](#full-example)

# delete

```javascript
String delete(String uri, String[] headers, function(String response))
```

**Description**

Perform a DELETE HTTP request on a remote host.

**Parameters**

 - *String*: URI to target for the request.
 - *String[]*: array of strings containing the headers to pass along the request. e.g.

```javascript
var headers = [
	"user-agent", "Artik browser",
	"Accept-Language", "en-US,en;q=0.8"
];
```

 - *function(String)*: optional callback function that will be called after
performing the request asynchronously. Response from the host is passed as a
parameter to the callback in a string. If no function is provided
the request will be performed synchronously.

**Return value**

*Undefined* if the callback function is provided, a *String* 
containing the response from the host otherwise (synchronous call).

**Example**

See [Full example](#full-example)

# Full example

   * See [http-example.js](/examples/http-example.js)
