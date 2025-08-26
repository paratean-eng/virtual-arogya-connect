import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Heart,
  Thermometer,
  Pill,
  Activity,
  Upload,
  FileText,
  Loader2
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
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
      text: "Hello! I'm Arogya Mitra, your health assistant. You can also upload PDF medical reports for analysis. How can I help you with your health concerns today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const quickQuestions = [
    { icon: Heart, text: "I have chest pain", hindi: "मुझे सीने में दर्द है" },
    { icon: Thermometer, text: "I have fever", hindi: "मुझे बुखार है" },
    { icon: Activity, text: "Check my symptoms", hindi: "मेरे लक्षण जांचें" },
    { icon: Pill, text: "Medicine interaction", hindi: "दवा का सेवन" }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: selectedFile ? `${inputMessage}\n📎 Attached: ${selectedFile.name}` : inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    const loadingMessage: Message = {
      id: messages.length + 2,
      text: "Analyzing your request...",
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('user_query', inputMessage);
      formData.append('user_id', 'web_user_' + Date.now());
      
      if (selectedFile) {
        formData.append('pdf_file', selectedFile);
      }

      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      
      const botResponse: Message = {
        id: messages.length + 3,
        text: data.response || "I couldn't process your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => prev.slice(0, -1).concat(botResponse));
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: messages.length + 3,
        text: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running on localhost:8000 and try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => prev.slice(0, -1).concat(errorMessage));
      
      toast({
        title: "Connection Error",
        description: "Unable to connect to the AI backend. Please check if the server is running.",
        variant: "destructive",
      });
    } finally {
      setInputMessage('');
      setSelectedFile(null);
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = async (question: typeof quickQuestions[0]) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: question.text,
      sender: 'user',
      timestamp: new Date()
    };

    const loadingMessage: Message = {
      id: messages.length + 2,
      text: "Processing your question...",
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('user_query', question.text);
      formData.append('user_id', 'web_user_' + Date.now());

      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      
      const botResponse: Message = {
        id: messages.length + 3,
        text: data.response || "I couldn't process your question. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => prev.slice(0, -1).concat(botResponse));
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: messages.length + 3,
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => prev.slice(0, -1).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      toast({
        title: "PDF Selected",
        description: `${file.name} is ready to upload`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a PDF file only",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-primary to-accent mb-4">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Smart Health Reports in Seconds
          </h1>
          <p className="text-xl text-muted-foreground">
            Chat with Arogya Mitra (आरोग्य मित्र) - Your AI Health Assistant
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Upload PDF reports for detailed analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="medical-card border-2 border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:border-primary/30 transition-all duration-200"
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading}
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
            <Card className="medical-card h-[600px] flex flex-col border-2 border-primary/20 shadow-xl">
              <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div>Arogya Mitra</div>
                    <div className="text-sm font-normal text-muted-foreground">
                      (आरोग्य मित्र - Your Health Assistant)
                    </div>
                  </div>
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary ml-auto" />}
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
                          <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                            {message.isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div
                        className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-primary to-accent text-white'
                            : message.isLoading 
                            ? 'bg-muted animate-pulse' 
                            : 'bg-card border'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
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
              <div className="border-t p-4 bg-gradient-to-r from-primary/5 to-accent/5">
                {selectedFile && (
                  <div className="mb-3 p-2 bg-card rounded-lg border flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="flex-1">{selectedFile.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedFile(null)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                )}
                <div className="flex gap-2">
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Ask about medical reports, symptoms, or health questions... / मेडिकल रिपोर्ट, लक्षण या स्वास्थ्य प्रश्न पूछें..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="pdf-upload"
                      disabled={isLoading}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => document.getElementById('pdf-upload')?.click()}
                      disabled={isLoading}
                      className="shrink-0"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={(!inputMessage.trim() && !selectedFile) || isLoading}
                    className="btn-medical bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-200 shrink-0"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Upload PDF reports for analysis. Always consult healthcare professionals for medical advice.
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