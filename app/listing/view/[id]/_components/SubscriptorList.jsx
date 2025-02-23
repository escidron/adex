import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { Divider } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function SubscriptorList({ subscribers }) {
  const router = useRouter();

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Phone Number', "Post Link"];
    const rows = subscribers.map(subscriber => [
      subscriber.name,
      subscriber.email,
      subscriber.mobile_number,
      subscriber.evidence
    ]);

    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.join(';')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'subscribers.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenEvidence = (text) => {
    window.open(text, '_blank');
  };
  

  return (
    <div>
      <h1 className='text-[26px]'>Registered ADEXer</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell>{subscriber.name}</TableCell>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>{subscriber.mobile_number}</TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <div>
                    <Button onClick={() => router.push(`/market-place/buyer-details?id=${subscriber.id}`)} size='sm' className='ml-auto'>
                      Details
                    </Button>
                  </div>
                  {
                    subscriber.evidence && (
                      <div>
                        <Button onClick={() => handleOpenEvidence(subscriber.evidence)} size='sm' className='ml-auto' variant='secondary'>
                          <OpenInNewIcon  sx={{ marginRight: '4px',fontSize: '16px' }}/>
                          Post Link
                        </Button>
                      </div>
                    )
                  }
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider className='my-4' />
      <div className='flex justify-center'>
        <Button onClick={downloadCSV} size='sm' variant='outline'>
          Download CSV
        </Button>
      </div>
    </div>
  );
}
