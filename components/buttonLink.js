import React, {Children} from 'react'
import Link from 'next/link'
import {withRouter} from 'next/router';
import Button from '@material-ui/core/Button';

const ButtonLinkComponent = React.forwardRef(({href, hrefAs, prefetch, className, children, router}, ref) => (
  <Link href={href} as={hrefAs} prefetch={prefetch} ref={ref}>
    <a
      className={className}
      style={{
        ...(router.asPath === href || router.asPath === hrefAs) && {
          borderBottom: '2px solid black',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          marginTop: 2
        }
      }}
    >
      {children}
    </a>
  </Link>
));

function ButtonLink({href, text, className, hrefAs, children, prefetch, router}) {
  return (
    <Button
      component={ButtonLinkComponent}
      href={href}
      className={className}
      hrefAs={hrefAs}
      children={children}
      prefetch={prefetch}
      router={router}
    >
      {text}
    </Button>
  );
}

export default withRouter(ButtonLink);
