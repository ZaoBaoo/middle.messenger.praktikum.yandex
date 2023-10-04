import './input.scss';
import Handlebars from 'handlebars';
import { tmpl } from './input.tmpl.ts';

// Types
import { InputType } from './types.ts';

export const Input: InputType = (props) => Handlebars.compile(tmpl)(props);
