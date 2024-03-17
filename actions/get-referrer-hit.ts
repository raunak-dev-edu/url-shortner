import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface ReferrerData {
  [index: number]: string | number;
}

export const getReferrerHit = async (
  linkId?: string
): Promise<ReferrerData[]> => {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const link = linkId
    ? await prismadb.link.findUnique({
        where: {
          id: linkId
        }
      })
    : undefined;

  if (linkId && !link) {
    notFound();
  }

  const logs = await prismadb.log.findMany({
    where: {
      ...(linkId ? { linkKeyword: link?.keyword } : {}),
      link: {
        userId: userId
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  if (logs.length < 1) {
    return [['Referrer', 'Hits']];
  }

  // Create a Map to store referrer counts
  const referrerCounts = new Map();

  // Iterate through the data array
  logs.forEach((item: any) => {
    // Get hostname
    const { hostname } =
      item.referrer !== 'Direct'
        ? new URL(item.referrer)
        : { hostname: 'Direct' };
    if (referrerCounts.has(hostname)) {
      referrerCounts.set(hostname, referrerCounts.get(hostname) + 1);
    } else {
      referrerCounts.set(hostname, 1);
    }
  });

  // Convert referrerCounts Map to a list of arrays
  const resultList = [...referrerCounts].map(([hostname, count]) => [
    hostname,
    count
  ]);

  const referrerData: ReferrerData[] = [['Referrer', 'Hits'], ...resultList];

  return referrerData;
};
