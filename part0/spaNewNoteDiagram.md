```mermaid
sequenceDiagram

    participant browser
    participant server

    loop BrowserJSCode
        browser->>browser: create note, save in
        browser->>browser: save note in memory
        browser->>browser: clear form field
        browser->>browser: redraw screen by recreating list items

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server->>browser: (assuming valid note + no network issues) - 201 success response

```
