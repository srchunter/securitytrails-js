# SecurityTrails API Wrapper

## Installation

```
npm install securitytrails-js
```

## How to use

In Node.js to create a new API Client:

```js
const securitytrails = require("securitytrails-js");

const STAPI = new securitytrails(API_KEY);
```

You can then run the API functions which will return a node-fetch Promise, and handle the responses as needed.

See ([SecurityTrails API Reference](https://docs.securitytrails.com/reference))

### Example

```javascript
const securitytrails = require("securitytrails-js");
const STAPI = new securitytrails(process.env.API_KEY);

const domain = "example.com";
const associatedDomains = await STAPI.domains_associated_domains(domain)
  .then(STAPI.handleErrors)
  .then((response) => {
    return response.json();
  })
  .catch((err) => console.error("error:" + err));

console.log(associatedDomains);
```

## Available Methods

### General

#### Ping

You can use this simple endpoint to test your authentication and access to the SecurityTrails API.

```js
STAPI.ping();
```

#### Usage

Usage statistics of the API for the current month

```js
STAPI.usage();
```

### Scroll

A fast and easy way to fetch many results. Currently only available for the DSL API endpoints.

```js
STAPI.scroll(scrollId);
```

### Company

#### Details

Returns details for a company domain.

```js
STAPI.company_details(domain);
```

#### Associated IPs

Returns associated IPs for a company domain. The result is not paginated nor limited. The data is based on whois data with the names matched to the domains.

```js
STAPI.company_associated_ips(domain);
```

### Domains

#### Details

Returns the current data about the given hostname. In addition to the current data, you also get the current statistics associated with a particular record. For example, for a records you'll get how many other hostnames have the same IP

```js
STAPI.domains_details(hostname);
```

#### Subdomains

Returns child and sibling subdomains for a given hostname. Limited to 2000 results for the Free plan and to 10000 for all paid subscriptions.

```js
STAPI.domains_subdomains(
  hostname,
  (childrenOnly = false),
  (includeInactive = true)
);
```

#### Tags

Returns tags for a given hostname

```js
STAPI.domains_tags(hostname);
```

#### WHOIS

Returns the current WHOIS data about a given hostname with the stats merged together

```js
STAPI.domains_whois(hostname);
```

#### Search

Filter and search specific records using this endpoint. With pagination a maximum of 10000 results can be retrieved. To access more results you can use scrolling.

```js
STAPI.domains_search(
  (includeIps = false),
  (page = 1),
  (scroll = false),
  (body = {})
);
```

#### Statistics

Domain statistics

```js
STAPI.domains_statistics((body = {}));
```

#### Associated domains

Find all domains that are related to a hostname you input. Limited to 10000 results.

```js
STAPI.domains_associated_domains(hostname, (page = 1));
```

#### SSL Certificates (Pages)

Fetch current and historical certificate information for any hostname. Limited to 10000 results

```js
STAPI.domains_ssl(
  hostname,
  (includeSubdomains = false),
  (status = "valid"),
  (page = 1)
);
```

#### SSL Certificates (Stream)

Fetch current and historical certificate information for any hostname. Returns all results.

```js
STAPI.domains_ssl_stream(
  hostname,
  (includeSubdomains = false),
  (status = "valid")
);
```

## History

#### DNS

Lists out specific historical information about the given hostname parameter. In addition of fetching the historical data for a particular type, the count statistic is returned as well, which represents the number of that particular resource against current data. (a records will have an ip_count field which will represent the number of records that has the same IP as that particular record) The results are sorted first_seen descending. The number of results is not limited.

```js
STAPI.history_dns(hostname, (type = "a"), (page = 1));
```

#### WHOIS

Returns historical WHOIS information about the given domain. The number of results is not limited.

```js
STAPI.history_whois(hostname, (page = 1));
```

### IPs

#### Neighbors

Returns the neighbors in any given IP level range and essentially allows you to explore closeby IP addresses. It will divide the range into 16 groups. Example: a /28 would be divided into 16 /32 blocks or a /24 would be divided into 16 /28 blocks

```js
STAPI.ips_neighbors(ipAddress);
```

#### Search with DSL

Search for IP addresses. A maximum of 10000 results can be retrieved.

```js
STAPI.ips_dsl((page = 1), (body = {}));
```

#### Statistics

Statistics like Reverse DNS pattern identification (RDNS entries are grouped and displayed as x), ports (number of open ports found) or total results are returned

```js
STAPI.ips_statistics((body = {}));
```

#### Whois

Fetch current IP information for a single IPv4 address.

```js
STAPI.ips_whois(ipAddress);
```

#### Useragents

Fetch user agents seen during the last 30 days for a specific IPv4 address. It shows devices with egressing traffic based on large scale web server logs. The number of results is not limited.

```js
STAPI.ips_useragents(ipAddress, (page = 1));
```

### Feeds

#### Domains

Fetch zone files including authoritative nameservers with ease. The method returns a .csv.gz file if successful. If ns is true the columns are apex_domain,nameservers (namerservers delimiter: |) and just apex_domain if ns is false.

```js
STAPI.feeds_domains(
  (type = "all"),
  (filter = ""),
  (tld = ""),
  (ns = ""),
  (date = "")
);
```

#### DMARC

Download a list of DMARC records. The column is apex_domain.

```js
STAPI.feeds_dmarc((type = "all"), (date = ""));
```

#### Subdomains

Download a list of subdomains, with the possibility of filtering by TLD. The response itself is streamed to a file, which means the data is received in chunks. When using filter you must specify the tld parameter and vise versa. The method returns a .csv.gz file if successful. The columns are apex_domain,hostname.

```js
STAPI.feeds_subdomains((type = "all"), (filter = ""), (tld = ""), (date = ""));
```

### Firehose

#### Certificate Transparency

Stream Certificate Transparency entries

```js
STAPI.firehose_ct((start = ""), (end = ""));
```

### Miscellaneous

#### Submit Hostnames

Submit discovered hostnames. With the request header 'Content-Encoding: gzip' it is also possible to submit gzip'd data

```js
STAPI.misc_submit(filePath);
```
