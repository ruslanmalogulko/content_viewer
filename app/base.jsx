import { render } from 'react-dom';
import React from 'react';
import Root from './containers/Root.jsx';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

$(document).ready(function () {
    render(
        <Root />,
        document.getElementById('root')
    );
});
