const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const categories = ['yulu','yuedu','test'];


if (cluster.isMaster) {
  let index = 0;
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < categories.length; i++) {
    cluster.fork();
  }

  cluster.on('message', (worker, code, signal) => {
    console.log(`woker for ${worker.process.pid} :`,categories[index]);
    index++;
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  // http.createServer((req, res) => {
  //   res.writeHead(200);
  //   res.end('hello world\n');
  // }).listen(8000);

  process.send({ cmd: 'notifyRequest' });
  console.log(`Worker ${process.pid} started`);
}
