import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  availability: { time: string; slots: number }[];
}

export function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [counselors] = useState<Counselor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Anxiety & Depression',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      availability: [
        { time: '9:00 AM', slots: 2 },
        { time: '10:00 AM', slots: 1 },
        { time: '2:00 PM', slots: 3 },
        { time: '4:00 PM', slots: 2 }
      ],
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Stress Management',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      availability: [
        { time: '9:30 AM', slots: 1 },
        { time: '11:00 AM', slots: 2 },
        { time: '1:00 PM', slots: 2 },
        { time: '3:00 PM', slots: 1 }
      ],
    },
  ]);

  const handleBooking = (counselorId: string, time: string) => {
    console.log('Booking appointment:', { counselorId, date, time });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Book an Appointment</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Counselors</h2>
          {counselors.map((counselor) => (
            <Card key={counselor.id}>
              <CardContent className="flex items-center space-x-4 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={counselor.avatar} alt={counselor.name} />
                  <AvatarFallback>{counselor.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{counselor.name}</h3>
                  <p className="text-sm text-muted-foreground">{counselor.specialization}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {counselor.availability.map(({ time, slots }) => (
                      <Dialog key={time}>
                        <DialogTrigger asChild>
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          >
                            {time} ({slots} slots)
                          </Badge>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Appointment</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Counselor</Label>
                              <p>{counselor.name}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Date</Label>
                              <p>{date?.toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Time</Label>
                              <p>{time}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Session Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select session type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Video Call</SelectItem>
                                  <SelectItem value="audio">Audio Call</SelectItem>
                                  <SelectItem value="chat">Chat Session</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button 
                              className="w-full" 
                              onClick={() => handleBooking(counselor.id, time)}
                            >
                              Confirm Booking
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}