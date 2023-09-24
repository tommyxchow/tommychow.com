const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <a className='link-colored font-medium' href={href} target='_blank'>
      {children}
    </a>
  );
};

interface ExternalLinkProps {
  children: React.ReactNode;
  href: string;
}

export default ExternalLink;
