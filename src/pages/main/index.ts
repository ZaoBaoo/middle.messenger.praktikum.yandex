import './main.scss';
import Handlebars from 'handlebars';
import { tmpl } from './main.tmpl.ts';

// Layouts
import { Navbar } from '../../layouts/navbar/index.ts';

export const Main = (props) =>
  Handlebars.compile(tmpl)({ ...props, navbar: Navbar() });
