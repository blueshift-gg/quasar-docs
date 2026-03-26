import Link from 'fumadocs-core/link';
import { Cards } from 'fumadocs-ui/components/card';
import type { HTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';

function cx(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(' ');
}

export { Cards };

type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  external?: boolean;
  /** Image URL shown as a header band above the card body (MDX: `image="/path.png"`). */
  image?: string;
  imageAlt?: string;
  /** Span both columns in the parent `Cards` grid at `lg` and up. */
  span?: 1 | 2;
};

function Card({
  icon,
  title,
  description,
  image,
  imageAlt,
  span = 1,
  className,
  ...props
}: CardProps) {
  const Root = props.href ? Link : 'div';

  return (
    <Root
      {...props}
      data-card
      className={cx(
        'block rounded-xl border bg-fd-card text-fd-card-foreground transition-colors @max-lg:col-span-full',
        span === 2 && 'lg:col-span-2',
        image ? 'overflow-hidden p-0' : 'p-4',
        props.href && 'hover:bg-fd-accent/80',
        className
      )}
    >
      {image ? (
        <div className="relative aspect-[2/1] w-full overflow-hidden border-b border-fd-border bg-fd-muted">
          <Image
            src={`/images/${image}`}
            alt={imageAlt ?? ''}
            fill
            quality={95}
            className="object-cover py-0! my-0!"
            draggable={false}
          />
        </div>
      ) : null}
      <div className={cx(image && 'p-4')}>
        {icon ? (
          <div className="not-prose mb-2 w-fit rounded-lg border bg-fd-muted p-1.5 text-fd-muted-foreground shadow-md [&_svg]:size-4">
            {icon}
          </div>
        ) : null}
        <h3 className="not-prose mb-1 text-sm font-medium">{title}</h3>
        {description ? (
          <p className="my-0! text-sm text-fd-muted-foreground">{description}</p>
        ) : null}
        <div className="prose-no-margin empty:hidden text-sm text-fd-muted-foreground">
          {props.children}
        </div>
      </div>
    </Root>
  );
}

export { Card };
