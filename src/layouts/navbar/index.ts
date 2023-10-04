import './navbar.scss';
import Handlebars from 'handlebars';
import { tmpl } from './navbar.tmpl.ts';
import { links } from '../../data/links.ts';

// Components
import { Link } from '../../components/link/index.ts';

export const Navbar = (): string => {
  const tmplLinks = links.map((link) => Link(link));

  return Handlebars.compile(tmpl)({ tmplLinks });
};
