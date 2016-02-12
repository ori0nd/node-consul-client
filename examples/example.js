var client = require('../lib')();

client.getServiceNodes('consul')
    .then(nodes => {
        nodes.forEach((node, idx) => {
            console.log(`[${idx}] node:`);
            console.dir(node);
        })
    })
    .catch(err => console.error(err.toString()));


client.getServices()
    .then(services => console.dir(services))
    .catch(err => console.error(err.toString()));

client.getNodes()
    .then(nodes => console.dir(nodes))
    .catch(err => console.error(err.toString()));

client.getNode('Heisenbug.local')
    .then(node => console.dir(node));

