import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Heart,
  Thermometer,
  Pill,
  Activity
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "नमस्कार! मैं आरोग्य मित्र हूं। आपके स्वास्थ्य की जानकारी में आपकी सहायता करूंगा। कृपया अपने लक्षण या स्वास्थ्य संबंधी प्रश्न बताएं।",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Hello! I'm Arogya Mitra, your health assistant. How can I help you with your health concerns today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickQuestions = [
    { icon: Heart, text: "I have chest pain", hindi: "मुझे सीने में दर्द है" },
    { icon: Thermometer, text: "I have fever", hindi: "मुझे बुखार है" },
    { icon: Activity, text: "Check my symptoms", hindi: "मेरे लक्षण जांचें" },
    { icon: Pill, text: "Medicine interaction", hindi: "दवा का सेवन" }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Thank you for sharing your concern. Based on what you've described, I recommend consulting with a healthcare professional for proper diagnosis. Would you like me to help you find a nearby doctor or provide some general guidance?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickQuestion = (question: typeof quickQuestions[0]) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: question.text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);

    // Simulate bot response based on the question
    setTimeout(() => {
      let botResponseText = "";
      
      if (question.text.includes("chest pain")) {
        botResponseText = "Chest pain can have various causes. If you're experiencing severe chest pain, difficulty breathing, or pain radiating to your arm or jaw, please seek immediate medical attention or call emergency services. For mild discomfort, please describe when it occurs and any associated symptoms.";
      } else if (question.text.includes("fever")) {
        botResponseText = "Fever is your body's natural response to infection. Please monitor your temperature and other symptoms. If fever is above 103°F (39.4°C), persists for more than 3 days, or is accompanied by severe symptoms, please consult a doctor. Stay hydrated and get rest.";
      } else if (question.text.includes("symptoms")) {
        botResponseText = "I'll help you check your symptoms. Please describe what you're experiencing - any pain, discomfort, changes in your body, or unusual feelings. The more details you provide, the better I can assist you.";
      } else {
        botResponseText = "Medicine interactions are important to monitor. Please tell me which medications you're currently taking, and I'll provide general guidance. Always consult your doctor or pharmacist before starting new medications.";
      }

      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold font-poppins text-secondary mb-4">
            Smart Health Reports in Seconds
          </h1>
          <p className="text-xl text-muted-foreground">
            Chat with Arogya Mitra (आरोग्य मित्र) - Your AI Health Assistant
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <div className="flex items-start gap-2">
                      <question.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-medium">{question.text}</div>
                        <div className="text-muted-foreground text-xs">{question.hindi}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="medical-card h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  Arogya Mitra
                  <span className="text-sm font-normal text-muted-foreground">
                    (आरोग्य मित्र - Your Health Assistant)
                  </span>
                </CardTitle>
              </CardHeader>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-50 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>

                      {message.sender === 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about medical reports, symptoms, or health questions... / मेडिकल रिपोर्ट, लक्षण या स्वास्थ्य प्रश्न पूछें..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="btn-medical"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This is a demonstration. Always consult healthcare professionals for medical advice.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 border-accent/20 bg-accent/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-secondary mb-2">Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Arogya Mitra provides general health information and should not replace professional medical advice. 
              For emergencies, call 108. Always consult qualified healthcare providers for diagnosis and treatment. 
              This service is aligned with India's Ayushman Bharat Digital Health Mission guidelines.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;