```mermaid
sequenceDiagram

    participant browser
    participant server
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server->>browser: HTML document
    Note right of browser: contents of HTML document are different than before. Different JS file and form setup
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: css document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->>browser: SPA javascript code file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: JSON data file back
    deactivate server
    Note right of browser: executing Javascript file initiates this request to server
```
