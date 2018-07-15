const csv = require("csv-streamify");
const fs = require("fs");

var ws = fs.createWriteStream("file.xml");

var number_columns_to_segregate = [1, 2, 3]; //indexing starts with 0

var parseroptions = {
  delimiter: ",", // comma, semicolon, whatever
  newline: "\n", // newline character (use \r\n for CRLF files)
  quote: '"', // what's considered a quote
  empty: "", // empty fields are replaced by this,

  // if true, emit arrays instead of stringified arrays or buffers
  objectMode: false,

  // if set to true, uses first row as keys -> [ { column1: value1, column2: value2 }, ...]
  columns: true
};

var builder = require("xmlbuilder");
var xml = builder.create("document");

const parser = csv(parseroptions, function(err, result) {
  if (err) throw err;
  // our csv has been parsed succesfully
  result.forEach(function(line) {
    var record = xml.ele("record");
    var numbers = record.ele("numbers");

    Object.keys(line).forEach(function(key, index) {
      if (number_columns_to_segregate.includes(index)) {
        numbers.ele(key, line[key]);
      } else {
        record.ele(key, line[key]);
      }
    });
  });
  ws.write(xml.end({ pretty: true }));
  ws.end();
});

//now pipe some data into it
fs.createReadStream("file.csv").pipe(parser);
