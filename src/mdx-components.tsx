/* eslint-disable jsx-a11y/anchor-has-content */
import { type MDXComponents } from 'mdx/types';
import { CustomImage } from './components/CustomImage';
import { HoverUnderline } from './components/HoverUnderline';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => (
      <HoverUnderline>
        <a target='_blank' {...props} />
      </HoverUnderline>
    ),
    CustomImage,
    ...components,
  };
}
