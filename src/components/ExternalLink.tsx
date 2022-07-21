const ExternalLink = ({ text, href }: ExternalLinkProps) => {
  return (
    <a className='link-colored' href={href} target='_blank' rel='noreferrer'>
      {text}
    </a>
  );
};

interface ExternalLinkProps {
  text: string;
  href: string;
}

export default ExternalLink;
