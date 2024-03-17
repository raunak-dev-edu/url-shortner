import { format } from 'date-fns';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface MonthData {
  [index: number]: string | number;
}

export const getMonthHit = async (linkId?: string): Promise<MonthData[]> => {
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

  const today = new Date();
  const last29day = ((d) => new Date(d.setDate(d.getDate() - 29)))(new Date());

  const logs = await prismadb.log.findMany({
    where: {
      ...(linkId ? { linkKeyword: link?.keyword } : {}),
      link: {
        userId: userId
      },
      createdAt: {
        lte: today.toISOString(),
        gte: last29day.toISOString()
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  // Convert the date strings to Date objects
  const dateObjects = logs.map(
    (item : any) => new Date(item.createdAt.toISOString().split('T')[0])
  );

  // Create a list of dates for the last 30 days
  const dateList = [];
  let currentDate = new Date(last29day);
  while (currentDate <= today) {
    dateList.push(format(currentDate, 'dd MMM'));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Count occurrences of each unique date
  const dateCountMap: { [date: string]: number } = {};
  dateList.forEach((dateString) => {
    dateCountMap[dateString] = 0; // Initialize with 0 count
  });

  dateObjects.forEach((date :any) => {
    const dateString = format(date, 'dd MMM');
    if (dateCountMap[dateString] !== undefined) {
      dateCountMap[dateString] += 1;
    }
  });

  // Create an array of arrays with date value and data count
  const resultList = dateList.map((dateString) => [
    dateString,
    dateCountMap[dateString]
  ]);

  const monthData: MonthData[] = [['Time', 'Hits'], ...resultList];

  return monthData;
};
