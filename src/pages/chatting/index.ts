import './chatting.scss';
import Handlebars from 'handlebars';
import { tmpl } from './chatting.tmpl.ts';
import avatar from '../../images/placeholder-photo-icon.svg';

// Types
import { ChattingType } from './types.ts';

export const Chatting: ChattingType = () => {
  return Handlebars.compile(tmpl)({ avatar });
};
