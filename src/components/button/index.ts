import './button.scss';
import Handlebars from 'handlebars';
import { tmpl } from './button.tmpl.ts';

// Types
import { ButtonType } from './types.ts';

export const Button: ButtonType = (props) => Handlebars.compile(tmpl)(props);
