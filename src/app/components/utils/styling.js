import classNames from 'classnames';

export const gameCardClasses = (additionalClasses = '') => classNames(
  'game-card',
  'transition-all',
  'duration-300',
  'ease-in-out',
  'hover:transform',
  'hover:-translate-y-2',
  'hover:scale-105',
  additionalClasses
);

export const gameButtonClasses = (variant = 'primary', disabled = false) => classNames(
  'game-button',
  'text-sm',
  'font-semibold',
  'uppercase',
  'tracking-wider',
  {
    'bg-blue-600 hover:bg-blue-700': variant === 'primary' && !disabled,
    'bg-green-600 hover:bg-green-700': variant === 'success' && !disabled,
    'bg-red-600 hover:bg-red-700': variant === 'danger' && !disabled,
    'opacity-50 cursor-not-allowed': disabled
  }
);

export const inputClasses = (error = false) => classNames(
  'input-web',
  'w-full',
  'rounded-md',
  'p-2',
  'focus:ring-2',
  'focus:ring-blue-500',
  {
    'border-red-500 text-red-900': error,
    'border-transparent': !error
  }
);

export const responsiveGridClasses = () => classNames(
  'grid',
  'gap-4',
  'grid-cols-1',
  'sm:grid-cols-2',
  'md:grid-cols-3',
  'lg:grid-cols-4'
);