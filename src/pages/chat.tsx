import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Chat() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chat with Counselor</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The chat feature is currently under development. Please check back later!</p>
        </CardContent>
      </Card>
    </div>
  );
}