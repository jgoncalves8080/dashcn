'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProjectStatus } from '@/models/Project/Project';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { fetchProjectStatus } from '@/service/api';

const DashboardView: React.FC = () => {
  const t = useTranslations();
  const [projectStatus, setProjectStatus] = useState<ProjectStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProjectStatus();
        setProjectStatus(data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar os dados. Tente novamente.');
        toast.error('Erro ao carregar os dados.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProjects = projectStatus.reduce((acc, curr) => acc + curr.count, 0);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {t('dashboard.title')}
        </h1>{' '}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader>
                <Skeleton className="w-32 h-5" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-24 h-12 mb-4" />
                <Skeleton className="w-full h-2" />
                <Skeleton className="w-1/2 h-2 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Card className="shadow-md">
            <CardHeader>
              <Skeleton className="w-48 h-5" />
            </CardHeader>
            <CardContent className="h-64">
              <Skeleton className="w-full h-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {t('dashboard.title')}
        </h1>{' '}
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {t('dashboard.title')}
      </h1>{' '}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectStatus.map((status) => (
          <Card key={status.title} className="shadow-md">
            <CardHeader>
              <CardTitle>{status.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">{status.count}</p>
              <Progress value={(status.count / totalProjects) * 100} />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {((status.count / totalProjects) * 100).toFixed(1)}% {t('dashboard.projects')}{' '}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{t('dashboard.projectDistribution')}</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatus}
                  dataKey="count"
                  nameKey="title"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {projectStatus.map((_, index) => (
                    <Cell key={index} fill={projectStatus[index].color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
