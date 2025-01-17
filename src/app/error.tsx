'use client';

import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
  error: Error
  reset(): void
}

export default function Error({ error, reset }: Props) {
  const t = useTranslations();
  const router = useRouter();

  const handleReset = () => {
    reset();
    router.push('/');
  };

  useEffect(() => {
    console.error(error);
  }, [error, reset]);

  return (
    <>
      <Head>
        <title>{t('error.pageTitle')}</title>
      </Head>
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
        <Card className="max-w-md mx-auto shadow-lg p-8 bg-red-50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-red-600">{t('error.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{t('error.message')}</p>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleReset}>
                {t('error.retry')}
              </Button>
              <Button variant="secondary" onClick={() => router.push('/')}>
                {t('error.goHome')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
