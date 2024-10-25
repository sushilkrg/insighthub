'use client'

import React from 'react';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Message } from '@/model/User';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

type MessageCardProps = {
  message: Message;
};

export default function MessageCard({ message }: MessageCardProps) {

  return (
    <Card className="card-bordered transform transition duration-300 hover:scale-103 hover:shadow-lg ">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
          </AlertDialog>
        </div>
        <div className="text-sm italic opacity-40">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>
      {/* reconsider here  */}
      <CardContent></CardContent>
    </Card>
  );
}