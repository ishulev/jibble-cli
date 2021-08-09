const https = require("https");
const options = {
  hostname: "services.odata.org",
  port: 443,
  path: "/TripPinRESTierService/People",
  method: "GET",
};

function get(path, resolve, reject) {
  const req = https.request({ ...options, path }, (res) => {
    if (res.statusCode === 302) {
      return get(res.headers.location, resolve, reject);
    }

    let rawData = "";
    res.on("data", (chunk) => {
      // process.stdout.write(d);
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        resolve(JSON.parse(rawData));
      } catch (error) {
        reject(error);
      }
    });
  });

  req.on("error", (error) => {
    reject(error);
  });
  req.end();
}

function getPeople() {
  return new Promise((resolve, reject) => {
    return get("/TripPinRESTierService/People", resolve, reject);
  });
}

function filterPeople(filterBy, value) {
  let filterPath = "";
  switch (filterBy) {
    case "Gender":
      filterPath = `?$filter=${filterBy} eq '${value}'`.replaceAll(" ", "%20");
      break;
    case "UserName":
      filterPath = `('${value}')`;
      break;
    default:
      filterPath = `?$filter=contains(${filterBy},'${value}')`;
      break;
  }
  return new Promise((resolve, reject) => {
    return get(options.path + filterPath, resolve, reject);
  });
}

module.exports = {
  getPeople,
  filterPeople,
};
