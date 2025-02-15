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

export default function SubscriptorList({ subscribers }) {
  const router = useRouter();

  // Função para gerar o CSV manualmente
  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Phone Number'];
    const rows = subscribers.map(subscriber => [
      subscriber.name,
      subscriber.email,
      subscriber.mobile_number,
    ]);

    // Converter os dados em formato CSV
    const csvContent = [
      headers.join(';'), // Cabeçalho
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

  return (
    <div>
      <h1 className='text-[26px]'>Subscribers</h1>
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
                <Button onClick={() => router.push(`/market-place/buyer-details?id=${subscriber.id}`)} size='sm' className='ml-auto'>
                  Details
                </Button>
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
