import {HTMLAttributes} from 'react';
import {icons} from 'lucide-react';
import {cn} from '../lib/cn';

type Props = HTMLAttributes<HTMLOrSVGElement> & {
  name: keyof typeof icons;
  size?: number;
  color?: string;
};

export default function LucideIcon({name, size, color, ...props}: Props) {
  const Icon = icons[name];
  const isClickEvent = !!props.onClick;
  const pointerStyle = isClickEvent ? 'cursor-pointer' : '';

  return <Icon color={color} size={size} className={cn(pointerStyle, props.className)} {...props} />;
}
