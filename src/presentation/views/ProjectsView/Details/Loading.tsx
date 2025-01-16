import { Skeleton } from '@/presentation/components/ui/skeleton'

export default function ProjectDetailsSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-1/4" />
      </div>

      <Skeleton className="h-6 w-3/4 mt-4" />
      <Skeleton className="h-6 w-1/2 mt-2" />

      <div className="mt-6">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <ul className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="flex justify-between items-center p-4 rounded-lg border">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-6 w-6" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
