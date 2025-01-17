'use client';

import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const t = useTranslations();
  const router = useRouter();

  const goBack = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>{t('notFound.pageTitle')}</title>
      </Head>
      <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen">
        <Card className="max-w-md mx-auto shadow-lg p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {t('notFound.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{t('notFound.message')}</p>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{t('notFound.description')}</p>
            <Button variant="outline" onClick={goBack}>
              {t('notFound.goBack')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
