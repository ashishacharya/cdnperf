module.exports = {
    updateData: updateData,
    getNames: getNames,
    get: get
};

var data = {};

function updateData(err, d) {
    if(err) return console.error(err);
    if(!d || !d.providers) return console.warn('updateData: missing data. Could not update API data.');

    d.providers.map(function(provider) {
        var name = provider.name.split(' ')[0].toLowerCase();

        if(!(name in data)) data[name] = {};

        data[name][provider.type] = last(provider.latency);
    });
}

function last(arr) {
    return arr[arr.length - 1];
}

function getNames(request, response) {
    response.json(Object.keys(data));
}

function get(request, response) {
    var name = request.params.name;

    if(name in data) return response.json(data[name]);

    response.send(403);
}
