import './link.scss';
import Handlebars from 'handlebars';
import { tmpl } from './link.tmpl.js';

export const Link = (props) => Handlebars.compile(tmpl)(props);
