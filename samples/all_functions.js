const STAPI = require("securitytrails-js")

const stapi = new STAPI(API_KEY) // Insert your API key here

// Running all the requests instantly after each other would
// exceed the rate limit. Choose one and uncomment to see an example.


// stapi.ping(
//     function(data, status, header, err) { 
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.usage(
//     function(data, status, header, err) { 
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.get_domain(
//     "securitytrails.com", // hostname
//     function(data, status, header, err) { 
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.list_domain(
//     "securitytrails.com", // domain
//     function(data, status, header, err) { 
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.list_tags(
//     "pornhub.com", // domain
//     function(data, status, header, err) { 
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.get_WHOIS(
//     "netflix.com", // domain
//     function(data, status, header, err) { 
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.list_by_record_type(
//     {
//         hostname    : "securitytrails.com",
//         type        : "a",
//         page        : 1     // Optional
//     },
//     function(data, status, header, err) { 
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.search(
//     {
//         page   : 1,   // Optional
//         filter : {
//             mx      : "alt4.aspmx.l.google.com",
//             keyword : "stackover"
//         }
//     },
//     function(data, status, header, err) { 
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.search_stats(
//     {
//         page   : 1,   // Optional
//         filter : {
//             mx      : "alt4.aspmx.l.google.com",
//             keyword : "stackover"
//         }
//     },
//     function(data, status, header, err) { 
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.get("/v1/domain/securitytrails.com",
//     function (data, status, header, err) {
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });

// stapi.post("/v1/search/list?page=1",
//     {
//         filter: {
//             mx: "alt4.aspmx.l.google.com",
//             keyword: "stackover"
//         }
//     },
//     function (data, status, header, err) {
//         console.log("Data:", data);
//         console.log("Status:", status);
//         console.log("Header:", header);
//         console.log("Error:", err);
//     });