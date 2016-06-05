'use strict';
const stream = require('stream');

class BunyanStreamEmail extends stream.Writable {
  constructor(mailOpts, transporter) {
    super({objectMode: true});
    this._transporter = transporter;
    this._sender = mailOpts.sender;
    this._recipient = mailOpts.recipient;
  }

  static formatLog(log) {
    return JSON.stringify(log, null, 4);
  }

  _sendMail(log, cb) {
    let mail = {
      from: this._sender,
      to: this._recipient,
      subject: `[Bunyan Log (${log.name}): ${log.level}]`,
      text: BunyanStreamEmail.formatLog(log)
    };

    this._transporter.sendMail(mail, (error, info) => {
      cb(error);
    });
  }

  _write(chunk, encode, cb) {
    this._sendMail(chunk, cb);
  }
}

module.exports = BunyanStreamEmail;
