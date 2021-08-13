const fetch = require('node-fetch');
const querystring = require('querystring');
const fs = require('fs');

class STAPI = {

    constructor(api_key) {
        this.host: "https://api.securitytrails.com/v1";
        this.options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                'APIKEY': api_key || null
            }
        };
    }

    #handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    async #fetch(url, options) => {
        return await fetch(url, options)
            .then(this.handleErrors)
            .then(data => {
                return data;
            })
            .catch(err => console.error('error:' + err));
    }

    async #getRequest(path) => {
        let options = Object.assign({}, this.options);
        options.method = 'GET';
        const url = this.host + path;
        return await this.fetch(url, options);
    }

    async #postRequest(path, body = {}) => {
        let options = Object.assign({}, this.options);
        options.method = 'POST';
        options.body = JSON.stringify(body);
        const url = this.host + path;
        return await this.fetch(url, options);
    }

    async #postFileRequest(path, file) => {
        let options = Object.assign({}, this.options);

        const stats = fs.statSync(file);
        const fileSizeInBytes = stats.size;
        let readStream = fs.createReadStream('file);

        options.method = 'POST';
        options.body = readStream;
        options["Content-length"] = fileSizeInBytes;

        const url = this.host + path;
        return await this.fetch(url, options);
    }

    async ping() => {
        return await this.getRequest('/ping');
    }

    async usage() => {
        return await this.getRequest('/account/usage');
    }

    async scroll(scroll_id) => {
        return await this.getRequest('/scroll/' . scroll_id);
    }

    STAPI.company = {
        async details(domain) => {
            return await this.getRequest('/company/' . domain);
        }
        async associatedIps(domain) => {
            return await this.getRequest('/company/' . domain . '/associated-ips');
        }
    }

    STAPI.domains = {
        async details(hostname) => {
            return await this.getRequest('/domain/' . hostname);
        }

        async subdomains(hostname, children_only = false, include_inactive = true) => {
            return await this.getRequest('/domain/' . hostname . `/subdomains?children_only=${children_only}&include_inactive=${include_inactive}`);
        }

        async tags(hostname) => {
            return await this.getRequest('/domain/' . hostname . '/tags');
        }

        async whois(hostname) => {
            return await this.getRequest('/domain/' . hostname . '/whois');
        }

        async search(include_ips = false, page = 1, scroll = false, body = {}) => {
            return await this.postRequest(`/domains/list?include_ips=${include_ips}&page=${page}&scroll=${scroll}`, body);
        }

        async statistics(body = {}) => {
            return await this.postRequest('/domains/stats', body);
        }

        async associatedDomains(hostname, page = 1) => {
            return await this.getRequest(`/domain/${hostname}/associated?page=${page}`);
        }

        async ssl(hostname, include_subdomains = false, status = 'valid', page = 1) => {
            const qs = querystring.encode({include_subdomains: include_subdomains, status: status, page: page});
            return await this.getRequest(`/domain/${hostname}/ssl?${qs}`);
        }

        async sslStream(hostname, include_subdomains = false, status = 'valid') => {
            const qs = querystring.encode({include_subdomains: include_subdomains, status: status});
            return await this.getRequest(`/domain/${hostname}/ssl_stream?${qs}`);
        }
    }

    STAPI.history = {
        async dns(hostname, type = 'a', page = 1) => {
            return await this.getRequest(`/history/${hostname}/dns/${type}?page=${page}`);
        }

        async whois(hostname, page = 1) => {
            return await this.getRequest(`/history/${hostname}/whois?page=${page}`);
        }
    }

    STAPI.ips = {
        async neighbors(ipAddress) => {
            return await this.getRequest(`/ips/nearby/${ipAddress}`);
        }

        async dsl(page = 1, body = {}) => {
            return await this.postRequest(`/ips/list?page=${page}`, body);
        }

        async statistics(body = {}) => {
            return await this.postRequest(`/ips/stats`, body);
        }

        async whois(ipAddress) => {
            return await this.getRequest(`/ips/${ipAddress}/whois`);
        }

        async useragents(ipAddress, page = 1) => {
            return await this.getRequest(`/ips/${ipAddress}/useragents?page=${page}`);
        }
    }

    STAPI.feeds = {
        async domains(type = all, filter = '', tld = '', ns = '', date = '') => {
            const qs = querystring.encode({filter: filter, tld: tld, ns: ns, date: date});
            return await this.getRequest(`/feeds/domains/${type}?${qs}`);
        }

        async domains(type = all, date = '') => {
            const qs = querystring.encode({date: date});
            return await this.getRequest(`/feeds/dmarc/${type}?${qs}`);
        }

        async domains(type = all, filter = '', tld = '', date = '') => {
            const qs = querystring.encode({filter: filter, tld: tld, date: date});
            return await this.getRequest(`/feeds/subdomains/${type}?${qs}`);
        }
    }

    STAPI.firehose = {
        async ct(start = '', end = '') => {
            const qs = querystring.encode({start: start, end: end});
            return await this.getRequest(`/firehose/ct-logs?${qs}`);
        }
    }

    STAPI.misc = {
        async submit(filePath) => {
            return await this.postFileRequest(`/submit/hostnames`, filePath);
        }
    }
}

module.exports = STAPI;