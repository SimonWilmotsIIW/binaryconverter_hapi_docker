const Hapi = require('hapi');
const server = Hapi.server({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'POST',
  path: '/binary/to',
  handler: (request, h) => {
    const string = request.payload;
    const binary = string.split('').map(char => {
      return char.charCodeAt(0).toString(2);
    }).join(' ');

    return binary;
  }
});

server.route({
  method: 'POST',
  path: '/binary/from',
  handler: (request, h) => {
    const binary = request.payload;

    const binaryChars = binary.split(' ');

    const string = binaryChars.map(binaryChar => {
      return String.fromCharCode(parseInt(binaryChar, 2));
    }).join('');

    return string;
  }
});

const start = async () => {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('1001000 1100101 1110100 100000 1110111 1100101 1110010 1101011 1110100 100001')
  console.log('Server running at:', server.info.uri, '\n');
  console.log('Routes:')
  console.log('\t(0) /binary/to \t\t-> Encode a string to binary')
  console.log('\t(1) /binary/from \t-> Decode binary to a string')
  console.log('')
  console.log('Use Postman or other software to send a POST-request to the routes\n')
  console.log('1001000 1100101 1110100 100000 1110111 1100101 1110010 1101011 1110100 100001')
};

start();