import Link from 'next/link';

import { isNotFoundError } from '@/tinygrid-client';
import { Header } from '@/components/Conversation/Header';
import { Icon } from '@/components/Shared/Icon';
import { Text } from '@/components/Shared/Text';
import { cn } from '@/utils';

type Props = {
  error: Error;
};

export const ConversationError: React.FC<Props> = ({ error }) => {
  return (
    <>
      <Header />
      <section className={cn('grid h-full w-full place-content-center gap-2 px-8 md:px-0')}>
        <Icon name="warning" size="lg" className="mx-auto" />

        <Text className="max-w-sm text-center">
          {isNotFoundError(error) ? (
            <>
              This conversation does not exist, <br /> why not create a{' '}
              <Link href="/" className="underline">
                new one
              </Link>
              ?
            </>
          ) : (
            <>
              Something went wrong. <br /> Please try again later.
            </>
          )}
        </Text>
      </section>
    </>
  );
};
