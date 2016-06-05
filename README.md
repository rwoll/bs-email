Bunyan Stream Email
===================

## About

A stream interface that sends email with each write through common
[`nodemailer`][nodemailer] [`transporters`][transporters] and is meant to be
used with the NodeJS logger [`bunyan`][bunyan].

Currently, the log record will simply be emailed as pretty-printed JSON text;
however, in the future, the log messages will be formatted.

## Example

```javascript
'use strict';
const BunyanStreamEmail = require('bs-email');
const nodemailer = require('nodemailer');
const bunyan = require('bunyan');
const sendmailTransport = require('nodemailer-sendmail-transport');

// Create transporter (could be any number of the nodemailer transporters)
const transporter = nodemailer.createTransport(sendmailTransport());

// Create a stream
const emailStream = new BunyanStreamEmail(
  {
    sender: 'sender@example.com',
    recipient: 'admin@example.com'
  },
  transporter);

// Create the logger and register the stream
const log = bunyan.createLogger({
  name: 'ExampleAppLogger',
  streams: [
    {
      stream: emailStream,
      type: 'raw',
      level: 'fatal'
    }
  ]
});

// Trigger some logs! Our email stream will be written to for log events meeting
// the set level filter
log.fatal('I\'m a fatal log message.');
log.fatal('Did you get my last email?');
```

[nodemailer]: https://www.npmjs.com/package/nodemailer
[transporters]: https://github.com/nodemailer/nodemailer#send-using-a-transport-plugin
[bunyan]: [https://www.npmjs.com/package/bunyan]
