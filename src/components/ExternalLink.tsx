const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <a className='link-colored' href={href} target='_blank' rel='noreferrer'>
      {children}
    </a>
  );
};

interface ExternalLinkProps {
  children: React.ReactNode;
  href: string;
}

export default ExternalLink;
