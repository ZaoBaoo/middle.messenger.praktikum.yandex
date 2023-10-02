import './main.scss';
import Handlebars from 'handlebars';
import { tmpl } from './main.tmpl.js';

// Layouts
import { Navbar } from '../../layouts/navbar';

export const Main = (props) => {
  return Handlebars.compile(tmpl)({ ...props, navbar: Navbar() });
};
