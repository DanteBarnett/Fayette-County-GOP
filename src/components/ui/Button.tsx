import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  children?: ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary';
  const variantStyles =
    variant === 'primary'
      ? 'bg-accent text-white hover:bg-accent/90'
      : 'border border-current text-primary hover:bg-primary hover:text-white';
  const sizeStyles =
    size === 'sm'
      ? 'px-4 py-2 text-sm'
      : size === 'lg'
      ? 'px-8 py-4 text-lg'
      : 'px-6 py-3 text-base';

  const Tag = as as any;

  return (
    <Tag href={href} className={clsx(baseStyles, variantStyles, sizeStyles, className)} {...props} />
  );
}