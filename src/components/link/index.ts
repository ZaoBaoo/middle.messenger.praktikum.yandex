import './link.scss';
import Handlebars from 'handlebars';
import { tmpl } from './link.tmpl.ts';

// Types
import { LinkType } from './types.ts';

export const Link: LinkType = (props) => Handlebars.compile(tmpl)(props);
