import {cn} from '../lib/cn';
import LucideIcon from './LucideIcon';

type Props = {
  className?: HTMLDivElement['className'];
  iconSize?: string;
};

export default function LoadingSpinner({className, iconSize = 'w-[40px] h-[40px] md:w-[45px] md:h-[45px]'}: Props) {
  return (
    <section className={cn('w-full h-full flex flex-col justify-center items-center animate-pulse', className)}>
      <LucideIcon name="Disc3" className={cn('animate-spin', iconSize)} />
    </section>
  );
}
