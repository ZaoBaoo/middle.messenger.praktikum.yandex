import './button.scss';
import Handlebars from 'handlebars';
import { tmpl } from './button.tmpl.js';

export const Button = (props) => Handlebars.compile(tmpl)(props);
