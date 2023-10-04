import './errorPage.scss';
import Handlebars from 'handlebars';
import { tmpl } from './errorPage.tmpl.ts';

// Components
import { Link } from '../../components/link/index.ts';

// Types
import { ErrorPageType } from './types.ts';

export const ErrorPage: ErrorPageType = (props) => {
  const combineProps = {
    link: Link({ text: props.redirectText, to: props.redirectTo }),
    ...props,
  };
  return Handlebars.compile(tmpl)(combineProps);
};
