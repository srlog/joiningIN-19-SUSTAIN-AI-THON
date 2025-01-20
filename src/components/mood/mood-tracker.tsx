import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown } from "lucide-react";
import { useState } from "react";

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  return (
    <Card className="gradient-card rainbow-border">
      <CardHeader>
        <CardTitle className="text-3xl font-bold gradient-text text-center">
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-6">
          <Button
            variant={selectedMood === 3 ? "default" : "ghost"}
            size="lg"
            onClick={() => setSelectedMood(3)}
            className={`flex flex-col items-center hover-glow transition-all duration-300 ${
              selectedMood === 3 ? 'button-gradient text-white scale-110' : 'hover:scale-105'
            }`}
          >
            <Smile className={`h-10 w-10 mb-2 ${selectedMood === 3 ? 'animate-bounce' : ''}`} />
            <span className="font-semibold">Good</span>
          </Button>
          <Button
            variant={selectedMood === 2 ? "default" : "ghost"}
            size="lg"
            onClick={() => setSelectedMood(2)}
            className={`flex flex-col items-center hover-glow transition-all duration-300 ${
              selectedMood === 2 ? 'button-gradient text-white scale-110' : 'hover:scale-105'
            }`}
          >
            <Meh className={`h-10 w-10 mb-2 ${selectedMood === 2 ? 'animate-bounce' : ''}`} />
            <span className="font-semibold">Okay</span>
          </Button>
          <Button
            variant={selectedMood === 1 ? "default" : "ghost"}
            size="lg"
            onClick={() => setSelectedMood(1)}
            className={`flex flex-col items-center hover-glow transition-all duration-300 ${
              selectedMood === 1 ? 'button-gradient text-white scale-110' : 'hover:scale-105'
            }`}
          >
            <Frown className={`h-10 w-10 mb-2 ${selectedMood === 1 ? 'animate-bounce' : ''}`} />
            <span className="font-semibold">Not Good</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}