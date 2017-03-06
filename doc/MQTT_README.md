#MQTT API

##Constructor

```javascript
var mqtt_client = new mqtt(String client_id, String user_name, String user_pass,
    		      		   Boolean clean_session, Number keep_alive_time, Boolean asynchronous,
				   	       function callbackConnect(String result),
				   	       function callbackDisconnect(String result),
				   	       function callbackSubscribe(Integer message_id),
				   	       function callbackUnsubscribe(Integer message_id),
				   	       function callbackPublish(Integer message_id),
				   	       function callbackReceive(Integer message_id, String topic, Buffer buffer,
					       						    Integer qos, Boolean retain));
```

**Description**

Create and configure a new mqtt client object.

**Parameters**

 - *String*: client_id of the mqtt client.
 - *String*: user_name of the mqtt client.
 - *String*: user_pass password corresponding to the user name.
 - *Boolean*: clean_session permits to delete all the message when the client is disconnected.
 - *Number*: keep_alive_time in milliseconds.
 - *Boolean*: asynchronous let the mqtt client to be non-blocking.
 - *function*: callbackConnect call every time the client succeed to connect to the broker.
   For more details see [on_connect](#on_connect).
 - *function*: callbackDisconnect call every time the client succeed to disconnect from the broker.
   For more details see [on_disconnect](#on_disconnect).
 - *function*: callbackSubscribe call every time the client succeed to subscribe to a topic.
   For more details see [on_subscribe](#on_subcribe).
 - *function*: callbackSubscribe call every time the client succeed to unsubscribe from a topic.
   For more details see [on_unsubscribe](#on_unsubcribe).
 - *function*: callbackPublish call every time the client succeed to publish a message.
   For more details see [on_publish](#on_publish).
 - *function*: callbackReceive call every time the client receives a message.
   For more details see [on_receive](#on_receive).

**Return value**

New instance.

**Example**

See [full example](#full-example)

##set_willmsg

```javascript
Number set_willmsg(String willtopic, Buffer willmessage, Number qos, Boolean retain)
```

**Description**

Set the WILLTOPIC and WILLMSG for connection.

**Parameters**

 - *String*: willtopic of the mqtt client to target.
 - *Buffer*: willmessage to publish on the topic.
 - *Number*: qos is the quality of service (0, 1 or 2 are the indicators of quality).
 - *Boolean*: retain permits to tell to the broker to keep the last message.

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##free_willmsg

```javascript
Number free_willmsg()
```

**Description**

Free the will message memory which is allocated by [set_willmsg](#set_willmsg).

**Parameters**

None

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##clear_willmsg

```javascript
Number clear_willmsg()
```

**Description**

Remove a previously configured will.
This must be called before calling [connect](#connect).

**Parameters**

None

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##tls_set

```javascript
Number tls_set(String ca_file, String ca_path, String cert_file, String key_file)
```

**Description**

Configure the client for certificate based SSL/TLS support.
Must be called before [connect](#connect).

**Parameters**

 - *String*: ca_file path to a file containing the PEM encoded trusted CA certificate files.
   	     Either cafile or capath must not be NULL.
 - *String*: ca_path path to a directory containing the PEM encoded trusted CA certificate files.
 - *String*: cert_file path to a file containing the PEM encoded certificate file for this client.
   	     If NULL, keyfile must also be NULL and no client certificate will be used.
 - *String*: key_file path to a file containing the PEM encoded private key for this client.
   	     If NULL, certfile must also be NULL and no client certificate will be used.

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##tls_insecure_set

```javascript
Number tls_insecure_set(Boolean insecure)
```

**Description**

Configure verification of the server host name in the server certificate.
If value is set to true, it is impossible to guarantee that the host
you are connecting to is not impersonating your server.
This can be useful in initial server testing, but makes it possible
for a malicious third party to impersonate your server through DNS spoofing, for example.
Do not use this function in a real system. Setting value to true makes
the connection encryption pointless. Must be called before [connect](#connect).

**Parameters**

 - *Boolean*: insecure if set to false, the default, certificate host name		checking is performed. If set to true, no host name checking
   	      is performed and the connection is insecure.

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##tls_opts_set

```javascript
Number tls_opts_set(String cert_reqs, String version, String ciphers)
```

**Description**

Configure the client for certificate based SSL/TLS support.
Must be called before [connect](#connect).

**Parameters**

 - *String*: cert_reqs an integer defining the verification requirements
   	     the client will impose on the server. This can be one of:
	     	 	SSL_VERIFY_NONE (0): the server will not be verified in any way.
			SSL_VERIFY_PEER (1): the server certificate will be verified
					     and the connection aborted if the verification fails.
	     The default and recommended value is SSL_VERIFY_PEER.
	     Using SSL_VERIFY_NONE provides no security.
 - *String*: version the version of the SSL/TLS protocol to use as a string.
   	     If NULL, the default value is used.
	     The default value and the available values depend on the
	     version of openssl that the library was compiled against.
	     For openssl >= 1.0.1, the available options are tlsv1.2,
	     tlsv1.1 and tlsv1, with tlv1.2 as the default.
	     For openssl < 1.0.1, only tlsv1 is available.
 - *String*: ciphers a string describing the ciphers available for use.
   	     See the "openssl ciphers" tool for more information.
	     If NULL, the default ciphers will be used.

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##tls_psk_set

```javascript
Number tls_psk_set(String key, String identity, String ciphers)
```

**Description**

Configure the client for pre-shared-key based TLS support.
Must be called before [connect](#connect). Cannot be used in conjunction
with [tls_set](#tls_set).

**Parameters**

 - *String*: key the pre-shared-key in hex format with no leading "0x".
 - *String*: identity the identity of this client. May be used as the
   	     username depending on the server settings.
 - *String*: ciphers a string describing the ciphers available for use.
   	     See the "openssl ciphers" tool for more information.
	     If NULL, the default ciphers will be used.

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##connect

```javascript
Number connect(String host, String port, function callback(String result))
```

**Description**

Connect to an MQTT broker. This is a non-blocking call.

**Parameters**

 - *String*: host of the remote broker.
 - *Integer*: port of the remote broker.
 - *function*: callback is call every time the client succeed to connect to the remote broker.
   For more details see [on_connect](#on_connect).

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##disconnect

```javascript
Number disconnect(function callback(String result))
```

**Description**

Disconnect from the broker.

**Parameters**

 - *function*: callback is call every time the client is disconnecting from the broker.
   For more details see [on_disconnect](#on_disconnect).

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##subscribe

```javascript
Number subscribe(Integer qos, String topic,
       			 function callbackSubscribe(Integer mid),
			     function callbackReceive(Integer mid, String topic, Buffer message,
			    	     			      Integer qos, Boolean retain))
```

**Description**

Subscribe to a topic.

**Parameters**

 - *Integer*: qos is the quality of service (0, 1 or 2 are the indicators of quality).
 - *String*: topic to wich we will publish the message.
 - *function*: callbackSubscribe is call every time the client succeed to register to a topic.
   For more details see [on_subscribe](#on_subscribe).
 - *function*: callbackReceive is call every time the client received a message from the broker.
   For more details see [on_receive](#on_receive).

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##unsubscribe

```javascript
Number unsubscribe(String topic, function callback(Integer mid))
```

**Description**

Unsubscribe from a topic.

**Parameters**

 - *String*: topic to wich we will publish the message.
 - *function*: callback is call every time the client succeed to unsubscribe from a topic.
   For more details see [on_unsubscribe](#on_unsubscribe).

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

##publish

```javascript
Number publish(Integer qos, Boolean retain, String topic, Buffer message,
       		   function callback(Integer mid))
```

**Description**

Publish a message on a given topic.

**Parameters**

 - *Integer*: qos is the quality of service (0, 1 or 2 are the indicators of quality).
 - *Boolean*: retain permits to tell to the broker to keep the last message.
 - *String*: topic to wich we will publish the message.
 - *Buffer*: message to publish on the topic.
 - *function*: callback is call every time the client succeed to send a message.
   For more details see [on_publish](#on_publish).

**Return value**

*Number*: Error code

**Example**

See [full example](#full-example)

#Events

##on_connect

```javascript
mqtt_client.on('connected', function (String result))
```

**Description**

Called every time when the mqtt client succeed to connect.

**Parameters**

 - *String*: result is the state of the connection

**Example**

See [full example](#full-example)

##on_disconnect

```javascript
mqtt_client.on('disconnected', function (String result))
```

**Description**

Called every time when the mqtt client is disconnected.

**Parameters**

 - *String*: result is the state of the disconnection

**Example**

See [full example](#full-example)

##on_subscribe

```javascript
mqtt_client.on('subscribed', function (Integer message_id))
```

**Description**

Called every time when the mqtt client succeed to subscribe to a topic.

**Parameters**

 - *Integer*: message_id of the topic from which the client will subcribe.

**Example**

See [full example](#full-example)

##on_unsubscribe

```javascript
mqtt_client.on('unsubscribed', function (Integer message_id))
```

**Description**

Called every time when the mqtt client is unsubscribed from a topic.

**Parameters**

 - *Integer*: message_id of the topic from which the client was subcribed.

**Example**

See [full example](#full-example)

##on_publish

```javascript
mqtt_client.on('published', function (Integer message_id))
```

**Description**

Called every time when the mqtt client succeed to publish a message on a topic.

**Parameters**

 - *Integer*: message_id of the message published.

**Example**

See [full example](#full-example)

##on_receive

```javascript
mqtt_client.on('received', function (Integer message_id, String topic, Buffer buffer,
									 Integer qos, Boolean retain))
```

**Description**

Called every time when the mqtt client receives a message.

**Parameters**

 - *Integer*: message_id of the message to send.
 - *String*: topic to wich we will publish the message.
 - *Buffer*: message to publish on the topic.
 - *Integer*: qos is the quality of service (0, 1 or 2 are the indicators of quality).
 - *Boolean*: retain permits to tell to the broker to keep the last message.

**Example**

See [full example](#full-example)

#Full example

   * See [mqtt-example.js](/examples/mqtt-example.js)
