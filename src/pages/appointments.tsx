import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { counselorApi, appointmentApi } from '@/lib/api';
import type { Counselor, Appointment } from '@/lib/types';

export function Appointments() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [counselorsData, appointmentsData] = await Promise.all([
          counselorApi.getCounselors(),
          appointmentApi.getAppointments(),
        ]);
        setCounselors(counselorsData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  const handleBooking = async (counselorId: string, time: string) => {
    try {
      const appointment = await appointmentApi.bookAppointment({
        counselorId,
        date: new Date(time),
        type: 'video',
      });
      navigate('/chat');
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Book an Appointment</h1>
        <Button 
          onClick={() => navigate('/chat')}
          className="button-gradient hover:opacity-90"
        >
          Schedule Appointment
        </Button>
      </div>
      
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
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${counselor.id}`} alt={counselor.bio.split(' ')[0]} />
                  <AvatarFallback>{counselor.bio[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{counselor.bio.split(' ')[0]}</h3>
                  <p className="text-sm text-muted-foreground">{counselor.specializations.join(', ')}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {counselor.availability.map((slot) => (
                      <Dialog key={slot.id}>
                        <DialogTrigger asChild>
                          <Badge 
                            variant="outline" 
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          >
                            {slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Badge>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Appointment</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Counselor</Label>
                              <p>{counselor.bio.split(' ')[0]}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Date</Label>
                              <p>{date?.toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Time</Label>
                              <p>{slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
                              onClick={() => handleBooking(counselor.id, slot.startTime.toISOString())}
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