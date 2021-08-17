const fetch = require("node-fetch");
const fs = require("fs");

/**
 * SecurityTrails API Class
 */
class STAPI {
  /**
   * Initilize STAPI class
   * @param {string} apiKey
   */
  constructor(apiKey) {
    this.host = "https://api.securitytrails.com/v1";
    this.options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        APIKEY: apiKey || null,
      },
    };
  }

  /**
   * Utility for handling node-fetch errors.
   * @param {object} response
   * @return {object}
   */
  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  /**
   * Node fetch wrapper
   * @param {string} url The full URL for the API endpoint.
   * @param {object} options Request options, including headers and methods.
   * @return {Promise}
   */
  request(url, options) {
    return fetch(url, options);
    // .then(this.handleErrors)
    // .then(data => {
    //     return data
    // })
    // .catch(err => console.error('error:' + err))
  }

  /**
   * Get request
   * @param {string} path API endpoint path
   * @return {Promise}
   */
  getRequest(path) {
    const opts = Object.assign({}, this.options);
    opts.method = "GET";
    const url = this.host + path;
    return this.request(url, opts);
  }

  /**
   * Post request
   * @param {string} path API endpoint path
   * @param {*} body Request payload
   * @return {Promise}
   */
  postRequest(path, body = {}) {
    const opts = Object.assign({}, this.options);
    opts.method = "POST";
    opts.body = JSON.stringify(body);
    const url = this.host + path;
    return this.request(url, opts);
  }

  /**
   * Post a file to an endpoint
   * @param {string} path API endpoint path
   * @param {string} file Path to a file.
   * @return {Promise}
   */
  postFileRequest(path, file) {
    const opts = Object.assign({}, this.options);

    const stats = fs.statSync(file);
    const fileSizeInBytes = stats.size;
    const readStream = fs.createReadStream(file);

    opts.method = "POST";
    opts.body = readStream;
    opts["Content-length"] = fileSizeInBytes;

    const url = this.host + path;
    return this.request(url, opts);
  }

  /**
   * Generate string of querystring parameters.
   * @param {object} obj Key value pairs of parameters.
   * @return {string}
   */
  querystring(obj) {
    const params = new URLSearchParams();
    for (const key in obj) {
      if (obj[key] !== null) {
        params.append(key, obj[key]);
      }
    }
    return params.toString();
  }

  /**
   * Ping
   * You can use this simple endpoint to test your authentication and access to the SecurityTrails API.
   *
   * @return {Promise}
   */
  ping() {
    return this.getRequest("/ping");
  }

  /**
   * Usage
   * Usage statistics of the API for the current month
   *
   * @return {Promise}
   */
  usage() {
    return this.getRequest("/account/usage");
  }

  /**
   * Scroll
   * A fast and easy way to fetch many results. Currently only available for the DSL API endpoints.
   * @param {string} scrollId The scroll_id returned in the scroll request.
   * @return {Promise}
   */
  scroll(scrollId) {
    return this.getRequest(`/scroll/${scrollId}`);
  }

  /**
   * Details
   * Returns details for a company domain.
   *
   * @param {string} domain A domain
   * @return {Promise}
   */
  company_details(domain) {
    return this.getRequest(`/company/${domain}`);
  }

  /**
   * Associated IPs
   * Returns associated IPs for a company domain. The result is not paginated nor limited. The data is based on whois data with the names matched to the domains.
   *
   * @param {string} domain A domain
   * @return {Promise}
   */
  company_associated_ips(domain) {
    return this.getRequest(`/company/${domain}/associated-ips`);
  }

  /**
   * Details
   * Returns the current data about the given hostname. In addition to the current data, you also get the current statistics associated with a particular record. For example, for a records you'll get how many other hostnames have the same IP
   *
   * @param {string} hostname A domain
   * @return {Promise}
   */
  domains_details(hostname) {
    return this.getRequest(`/domain/${hostname}`);
  }

  /**
   * Subdomains
   * Returns child and sibling subdomains for a given hostname. Limited to 2000 results for the Free plan and to 10000 for all paid subscriptions.
   *
   * @param {string} hostname A domain
   * @param {boolean} childrenOnly Only return children subdomains
   * @param {boolean} includeInactive Include domains that don't have active DNS records
   * @return {Promise}
   */
  domains_subdomains(hostname, childrenOnly = false, includeInactive = true) {
    return this.getRequest(
      `/domain/${hostname}/subdomains?children_only=${childrenOnly}&include_inactive=${includeInactive}`
    );
  }

  /**
   * Tags
   * Returns tags for a given hostname
   *
   * @param {string} hostname A domain
   * @return {Promise}
   */
  domains_tags(hostname) {
    return this.getRequest(`/domain/${hostname}/tags`);
  }

  /**
   * WHOIS
   * Returns the current WHOIS data about a given hostname with the stats merged together
   *
   * @param {string} hostname A domain
   * @return {Promise}
   */
  domains_whois(hostname) {
    return this.getRequest(`/domain/${hostname}/whois`);
  }

  /**
   * Search
   * Filter and search specific records using this endpoint. With pagination a maximum of 10000 results can be retrieved. To access more results you can use scrolling.
   *
   * @param {boolean} includeIps Resolves any A records and additionally returns IP addresses.
   * @param {int} page The page of the returned results, starting at 1. A page returns 100 results.
   * @param {boolean} scroll Request scrolling. Only supported when query is used and not filter. See the Scrolling API endpoint. https://docs.securitytrails.com/reference#scroll
   * @param {Object} body Body parameters. See https://docs.securitytrails.com/reference#domain-search
   * @return {Promise}
   */
  domains_search(includeIps = false, page = 1, scroll = false, body = {}) {
    return this.postRequest(
      `/domains/list?include_ips=${includeIps}&page=${page}&scroll=${scroll}`,
      body
    );
  }

  /**
   * Statistics
   * Domain statistics
   *
   * @param {Object} body Body parameters. See https://docs.securitytrails.com/reference#domain-statistics
   * @return {Promise}
   */
  domains_statistics(body = {}) {
    return this.postRequest("/domains/stats", body);
  }

  /**
   * Associated domains
   * Find all domains that are related to a hostname you input. Limited to 10000 results.
   *
   * @param {string} hostname A domain
   * @param {int} page The page of the returned results, starting at 1. A page returns 100 results.
   * @return {Promise}
   */
  domains_associated_domains(hostname, page = 1) {
    return this.getRequest(`/domain/${hostname}/associated?page=${page}`);
  }

  /**
   * SSL Certificates (Pages)
   * Fetch current and historical certificate information for any hostname. Limited to 10000 results
   *
   * @param {string} hostname A domain
   * @param {boolean} includeSubdomains Default is false.
   * @param {string} status Valid values are "valid", "all", and "expired". Default is valid.
   * @param {int} page The page of the returned results, starting at 1. A page returns 100 results.
   * @return {Promise}
   */
  domains_ssl(hostname, includeSubdomains = false, status = "valid", page = 1) {
    const qs = this.querystring({
      include_subdomains: includeSubdomains,
      status: status,
      page: page,
    });
    return this.getRequest(`/domain/${hostname}/ssl?${qs}`);
  }

  /**
   * SSL Certificates (Stream)
   * Fetch current and historical certificate information for any hostname. Returns all results.
   *
   * @param {string} hostname A domain
   * @param {boolean} includeSubdomains Default is false.
   * @param {string} status Valid values are "valid", "all", and "expired". Default is valid.
   * @return {Promise}
   */
  domains_ssl_stream(hostname, includeSubdomains = false, status = "valid") {
    const qs = this.querystring({
      include_subdomains: includeSubdomains,
      status: status,
    });
    return this.getRequest(`/domain/${hostname}/ssl_stream?${qs}`);
  }

  /**
   * DNS
   * Lists out specific historical information about the given hostname parameter. In addition of fetching the historical data for a particular type, the count statistic is returned as well, which represents the number of that particular resource against current data. (a records will have an ip_count field which will represent the number of records that has the same IP as that particular record) The results are sorted first_seen descending. The number of results is not limited.
   * @param {string} hostname A domain
   * @param {string} type Allowed values: a, aaaa, mx, ns, soa or txt
   * @param {int} page The page of the returned results, starting at 1. A page returns 100 results.
   * @return {Promise}
   */
  history_dns(hostname, type = "a", page = 1) {
    return this.getRequest(`/history/${hostname}/dns/${type}?page=${page}`);
  }

  /**
   * WHOIS
   * Returns historical WHOIS information about the given domain. The number of results is not limited.
   *
   * @param {string} hostname A domain
   * @param {int} page The page of the returned results, starting at 1. A page returns 100 results.
   * @return {Promise}
   */
  history_whois(hostname, page = 1) {
    return this.getRequest(`/history/${hostname}/whois?page=${page}`);
  }

  /**
   * Neighbors
   * Returns the neighbors in any given IP level range and essentially allows you to explore closeby IP addresses. It will divide the range into 16 groups. Example: a /28 would be divided into 16 /32 blocks or a /24 would be divided into 16 /28 blocks
   *
   * @param {string} ipAddress Starting IP address (optionally with CIDR subnet mask)
   * @return {Promise}
   */
  ips_neighbors(ipAddress) {
    return this.getRequest(`/ips/nearby/${ipAddress}`);
  }

  /**
   * Search with DSL
   * Search for IP addresses. A maximum of 10000 results can be retrieved.
   *
   * @param {int} page The page of the returned results, starting at 1. A page returns 100 results.
   * @param {Object} body The DSL query you want to run. See How to use the DSL. (https://docs.securitytrails.com/docs/how-to-use-the-dsl)
   * @return {Promise}
   */
  ips_dsl(page = 1, body = {}) {
    return this.postRequest(`/ips/list?page=${page}`, body);
  }

  /**
   * Statistics
   * Statistics like Reverse DNS pattern identification (RDNS entries are grouped and displayed as x), ports (number of open ports found) or total results are returned
   *
   * @param {Object} body The DSL query you want to run. See How to use the DSL. (https://docs.securitytrails.com/docs/how-to-use-the-dsl)
   * @return {Promise}
   */
  ips_statistics(body = {}) {
    return this.postRequest("/ips/stats", body);
  }

  /**
   * Whois
   * Fetch current IP information for a single IPv4 address.
   *
   * @param {string} ipAddress The IPv4 address you want to fetch the WHOIS for.
   * @return {Promise}
   */
  ips_whois(ipAddress) {
    return this.getRequest(`/ips/${ipAddress}/whois`);
  }

  /**
   * Useragents
   * Fetch user agents seen during the last 30 days for a specific IPv4 address. It shows devices with egressing traffic based on large scale web server logs. The number of results is not limited.
   *
   * @param {string} ipAddress The IPv4 address you want to fetch user agents for.
   * @param {int} page The page of the returned results, starting at 1. A page returns 100 results.
   * @return {Promise}
   */
  ips_useragents(ipAddress, page = 1) {
    return this.getRequest(`/ips/${ipAddress}/useragents?page=${page}`);
  }

  /**
   * Domains
   * Fetch zone files including authoritative nameservers with ease. The method returns a .csv.gz file if successful. If ns is true the columns are apex_domain,nameservers (namerservers delimiter: |) and just apex_domain if ns is false.
   *
   * @param {string} type Valid values are all (all currently active domains), deleted (all domains deleted as of today), new (all domains first seen today (never seen before or previously registered in the past)) or registered (domains enabled today. So new plus domains that previously were deleted but added again)
   * @param {string} filter Valid values are "cctld" and "gtld"
   * @param {string} tld Can be used to only return domains of a specific tld, such as "com"
   * @param {boolean} ns Show nameservers in the list. This parameter is supported for most gTLDs and most ccTLDs are not supported.
   * @param {string} date Date to fetch data for, format YYYY-MM-DD, e.g. 2019-06-11. Default is latest available.
   * @return {Promise}
   */
  feeds_domains(type = "all", filter = "", tld = "", ns = "", date = "") {
    const qs = this.querystring({
      filter: filter,
      tld: tld,
      ns: ns,
      date: date,
    });
    return this.getRequest(`/feeds/domains/${type}?${qs}`);
  }

  /**
   * DMARC
   * Download a list of DMARC records. The column is apex_domain.
   *
   * @param {string} type Valid values are all (Complete list of DMARC records), new (first seen DMARC records)
   * @param {string} date Date to fetch data for, format YYYY-MM-DD, e.g. 2020-07-11. Default is latest available.
   * @return {Promise}
   */
  feeds_dmarc(type = "all", date = "") {
    const qs = this.querystring({ date: date });
    return this.getRequest(`/feeds/dmarc/${type}?${qs}`);
  }

  /**
   * Subdomains
   * Download a list of subdomains, with the possibility of filtering by TLD. The response itself is streamed to a file, which means the data is received in chunks. When using filter you must specify the tld parameter and vise versa. The method returns a .csv.gz file if successful. The columns are apex_domain,hostname.
   *
   * @param {string} type Valid values are "all" (all currently active subdomains), "new" (all subdomains first seen today (never seen before or previously registered in the past)) or "deleted" (all subdomains deleted as of today)
   * @param {string} filter Valid value is "bytld" if you want to filter by TLD
   * @param {string} tld Required if "filter" is set to "bytld". Can be used to only return subdomains of a specific TLD, such as "com".
   * @param {string} date Date to fetch data for, format YYYY-MM-DD, e.g. 2019-10-11. Default is latest available. Subdomains are available starting from 2019-10-01
   * @return {Promise}
   */
  feeds_subdomains(type = "all", filter = "", tld = "", date = "") {
    const qs = this.querystring({ filter: filter, tld: tld, date: date });
    return this.getRequest(`/feeds/subdomains/${type}?${qs}`);
  }

  /**
   * Certificate Transparency
   * Stream Certificate Transparency entries
   *
   * @param {int} start Start UNIX timestamp. Without a value it starts whenever the call is sent. Due to technical reasons there might be records with up to 5 minutes delay.
   * @param {int} end End UNIX timestamp. Without a value it continues to stream results.
   * @return {Promise}
   */
  firehose_ct(start = "", end = "") {
    const qs = this.querystring({ start: start, end: end });
    return this.getRequest(`/firehose/ct-logs?${qs}`);
  }

  /**
   * Submit Hostnames
   * Submit discovered hostnames. With the request header 'Content-Encoding: gzip' it is also possible to submit gzip'd data
   *
   * @param {string} filePath
   * @return {Promise}
   */
  misc_submit(filePath) {
    return this.postFileRequest("/submit/hostnames", filePath);
  }
}

module.exports = STAPI;
