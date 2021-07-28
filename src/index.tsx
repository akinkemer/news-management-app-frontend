import { render } from "react-dom";
import App from "./App";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "bootswatch/dist/flatly/bootstrap.min.css";
import {Provider} from 'react-redux';
import store from "./service";


const root = document.querySelector("#root");

render(<Provider store={store}><App/></Provider>, root);