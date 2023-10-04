export type ErrorPageType = (props: {
  code: string;
  text: string;
  redirectTo: string;
  redirectText: string;
}) => string;
