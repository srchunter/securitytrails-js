const https = require('https');

function STAPI(api_key) {

    this.params = {
        host: "api.securitytrails.com",
        api_key: api_key || null
    };

}

STAPI.prototype.get = function (path, callback) {

    var opt = {
        host: this.params.host,
        path: path,
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.post = function (path, body, callback) {

    var opt = {
        host: this.params.host,
        path: path,
        method: "POST",
        headers: {
            "APIKEY": this.params.api_key,
            "Content-Type": "application/json"
        }
    };

    const req = https.request(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    })

    req.on("error", (err) => {
        callback(null, null, null, err);
    });

    var json_string = JSON.stringify(body)
    var buffer = Buffer.from(json_string, "utf-8")
    req.end(buffer);

}

STAPI.prototype.ping = function (callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/ping",
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.usage = function (callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/account/usage",
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.get_domain = function (hostname, callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/domain/" + hostname,
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.list_domain = function (domain, callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/domain/" + domain + "/subdomains",
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.list_tags = function (domain, callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/domain/" + domain + "/tags",
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.get_WHOIS = function (domain, callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/domain/" + domain + "/whois",
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.list_by_record_type = function (params, callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/history/" + params.hostname + "/dns/" + params.type,
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    if (params.page) {
        opt.path += "?page=" + params.page
    }

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.list_by_domain = function (params, callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/history/" + params.domain + "/whois",
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    if (params.page) {
        opt.path += "?page=" + params.page
    }

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.explore_ips = function (params, callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/explore/ip/",
        method: "GET",
        headers: { "APIKEY": this.params.api_key }
    };

    if (params.ip) {
        opt.path += params.ip;
    } else {
        opt.path += "1.1.1.1";
    }

    if (params.mask) {
        opt.path += "?mask=" + params.mask;
    }

    https.get(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    }).on("error", (err) => {
        callback(null, null, null, err);
    });

}

STAPI.prototype.search = function (params, callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/search/list",
        method: "POST",
        headers: {
            "APIKEY": this.params.api_key,
            "Content-Type": "application/json"
        }
    };

    if (params.page) {
        opt.page += "?page=" + params.page;
    }

    const req = https.request(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    })

    req.on("error", (err) => {
        callback(null, null, null, err);
    });

    var json = {
        filter : params.filter
    };

    var json_string = JSON.stringify(json)
    var buffer = Buffer.from(json_string, "utf-8")
    req.end(buffer);

}

STAPI.prototype.search_stats = function (params, callback) {

    var opt = {
        host: this.params.host,
        path: "/v1/search/list/stats",
        method: "POST",
        headers: {
            "APIKEY": this.params.api_key,
            "Content-Type": "application/json"
        }
    };

    const req = https.request(opt, (res) => {

        let data = "";

        res.on("data", (frag) => {
            data += frag;
        });

        res.on("end", () => {
            callback(JSON.parse(data), res.statusCode, res.headers, null);
        });

    })

    req.on("error", (err) => {
        callback(null, null, null, err);
    });

    var json = {
        filter : params.filter
    };

    var json_string = JSON.stringify(json)
    var buffer = Buffer.from(json_string, "utf-8")
    req.end(buffer);

}

module.exports = STAPI;
