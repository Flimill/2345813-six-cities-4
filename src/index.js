"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var react_1 = require("react");
var client_1 = require("react-dom/client");
var app_1 = require("./app/app");
var root = client_1.default.createRoot(document.getElementById('root'));

root.render(<react_1.default.StrictMode>
    <app_1.default offersCount={5}/>
  </react_1.default.StrictMode>);
