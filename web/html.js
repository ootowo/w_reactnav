import { normalize } from "./styles";

export const mockHtml = (image, title, content, size = 17) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
            ${normalize}
            .container {
                width: calc(100vw - 20px);
                margin: 10px;
                overflow-y: scroll;
                overflow-x: hidden;
            }
            img.thumbnail {
                width: 100%;
            }
            h1 {
                font-size: ${size}px;
            }
            .content {
                font-size: ${size}px;
            }
        </style>
    </head>

    <body>
        <div class="container">
            ${image != null ? `<img class="thumbnail" src="${image}" />` : ""}
            ${title != null ? `<h1>${title}</h1><br />` : ""}
            ${content != null ? `<div class="content">${content}</div>` : ""}
        </div>
    </body>
    </html>
`;
