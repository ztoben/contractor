import React from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button';

const ButtonLinkComponent = React.forwardRef(({href, hrefAs, prefetch, className, children}, ref) => (
  <Link href={href} as={hrefAs} prefetch={prefetch} ref={ref}>
    <a className={className}>
      {children}
    </a>
  </Link>
));

export default function ButtonLink ({href, text, className, hrefAs, children, prefetch}) {
  return (
    <Button
      component={ButtonLinkComponent}
      href={href}
      className={className}
      hrefAs={hrefAs}
      children={children}
      prefetch={prefetch}
    >
      {text}
    </Button>
  );
}
