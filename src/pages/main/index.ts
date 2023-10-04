import './main.scss';
import Handlebars from 'handlebars';
import { tmpl } from './main.tmpl.ts';

// Layouts
import { Navbar } from '../../layouts/navbar/index.ts';

// Types
import { MainType } from './types.ts';

export const Main: MainType = () =>
  Handlebars.compile(tmpl)({ navbar: Navbar() });
