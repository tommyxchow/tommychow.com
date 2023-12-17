/* eslint-disable jsx-a11y/anchor-has-content */
import { type MDXComponents } from 'mdx/types';
import { CustomImage } from './components/CustomImage';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <a target='_blank' {...props} />,
    CustomImage,
    ...components,
  };
}
