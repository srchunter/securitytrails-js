# SecurityTrails API Wrapper

## Installation

```
npm install securitytrails-js
```

## How to use

In Node.js to create a new API Client:
```
const STAPI = require("securitytrails-js")

const stapi = new STAPI(API_KEY)
```

You can then run the API functions which will pass parsed JSON response, status, header and errors to a callback: `callback(data, status, header, err)`

### Available API functions ([API Documentation](https://securitytrails.com/corp/apidocs))
 - [ping](#ping)
 - [usage](#usage)
 - [get_domain](#get_domain)
 - [list_domain](#list_domain)
 - [list_tags](#list_tags)
 - [get_WHOIS](#get_WHOIS)
 - [list_by_record_type](#list_by_record_type)
 - [list_by_domain](#list_by_domain)
 - [explore_ips](#explore_ips)
 - [search](#search)
 - [search_stats](#search_stats)

 ### Other
 - [get](#get)
 - [post](#post)

---

## ping

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/general/ping)

Example:
```
stapi.ping(
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## usage

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/general/usage)

Example:
```
stapi.usage(
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## get_domain

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/domains/domain-info/get-domain)

Example:
```
stapi.get_domain(
    "securitytrails.com", // hostname
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## list_domain

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/domains/domain-info/list-subdomains)

Example:
```
stapi.list_domain(
    "securitytrails.com", // domain
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## list_tags

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/domains/tags/list-tags)

Example:
```
stapi.list_tags(
    "twitter.com", // domain
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## get_WHOIS

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/domains/tags/get-whois)

Example:
```
stapi.get_WHOIS(
    "netflix.com", // domain
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## list_by_record_type

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/history/dns/list-by-record-type)

Example:
```
stapi.list_by_record_type(
    {
        hostname    : "securitytrails.com",
        type        : "a",
        page        : 1     // Optional
    },
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## list_by_domain

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/history/whois/list-by-domain)

Example:
```
stapi.list_by_domain(
    {
        hostname    : "securitytrails.com",
        page        : 1     // Optional
    },
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## explore_ips

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/exploration/ipv4-explorer/explore-ips)

Example:
```
stapi.explore_ips(
    {
        ip      : "1.1.1.1",    // Optional
        mask    : 28            // Optional
    },
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## search

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/exploration/searching-domains/search)

Example:
```
stapi.search(
    {
        page   : 1,   // Optional
        filter : {
            mx      : "alt4.aspmx.l.google.com",
            keyword : "stackover"
        }
    },
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## search_stats

[SecurityTrails API Doc](https://securitytrails.com/corp/apidocs#/reference/exploration/search-stats/search)

Example:
```
stapi.search_stats(
    {
        page   : 1,   // Optional
        filter : {
            mx      : "alt4.aspmx.l.google.com",
            keyword : "stackover"
        }
    },
    function(data, status, header, err) { 
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## get

This serves as a base function for GET requests if you want specify the API path yourself:

Example:
```
stapi.get("/v1/domain/securitytrails.com",
    function (data, status, header, err) {
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```

---

## post

This serves as a base function for POST requests if you want specify the API path yourself:

Example:
```
stapi.post("/v1/search/list?page=1",
    {
        filter: {
            mx: "alt4.aspmx.l.google.com",
            keyword: "stackover"
        }
    },
    function (data, status, header, err) {
        console.log("Data:", data);
        console.log("Status:", status);
        console.log("Header:", header);
        console.log("Error:", err);
    });
```
