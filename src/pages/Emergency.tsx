import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Ambulance, 
  Shield, 
  Flame,
  Users,
  Baby,
  AlertTriangle,
  Heart,
  Droplet,
  Thermometer,
  Skull,
  MapPin,
  Clock,
  UserCheck
} from 'lucide-react';

const Emergency = () => {
  const emergencyNumbers = [
    {
      number: '108',
      service: 'Medical Emergency',
      description: 'Ambulance Service',
      icon: Ambulance,
      color: 'bg-emergency text-emergency-foreground'
    },
    {
      number: '100',
      service: 'Police Emergency',
      description: 'Police Help & Security',
      icon: Shield,
      color: 'bg-secondary text-secondary-foreground'
    },
    {
      number: '101',
      service: 'Fire Emergency',
      description: 'Fire Department',
      icon: Flame,
      color: 'bg-orange-500 text-white'
    },
    {
      number: '1091',
      service: 'Women Helpline',
      description: 'Women Safety & Support',
      icon: Users,
      color: 'bg-pink-500 text-white'
    },
    {
      number: '1098',
      service: 'Child Helpline',
      description: 'Child Protection & Welfare',
      icon: Baby,
      color: 'bg-purple-500 text-white'
    }
  ];

  const emergencyConditions = [
    {
      title: 'Heart Problems',
      icon: Heart,
      symptoms: ['Severe chest pain', 'Difficulty breathing', 'Pain in arm/jaw', 'Cold sweats'],
      action: 'Call 108 immediately and chew aspirin if available'
    },
    {
      title: 'Severe Bleeding',
      icon: Droplet,
      symptoms: ['Heavy bleeding', 'Deep cuts', 'Blood won\'t stop', 'Weakness/dizziness'],
      action: 'Apply direct pressure and call 108'
    },
    {
      title: 'High Fever',
      icon: Thermometer,
      symptoms: ['Fever above 104°F', 'Severe headache', 'Confusion', 'Stiff neck'],
      action: 'Seek immediate medical attention'
    },
    {
      title: 'Poisoning',
      icon: Skull,
      symptoms: ['Nausea/vomiting', 'Confusion', 'Difficulty breathing', 'Unconsciousness'],
      action: 'Call 108 and poison control immediately'
    }
  ];

  const firstAidSteps = [
    {
      condition: 'Heart Attack',
      steps: [
        'Call 108 immediately',
        'Keep the person calm and seated',
        'Give aspirin if not allergic',
        'Monitor breathing and pulse',
        'Be ready to perform CPR'
      ]
    },
    {
      condition: 'Severe Bleeding',
      steps: [
        'Apply direct pressure to wound',
        'Elevate the injured area if possible',
        'Don\'t remove embedded objects',
        'Cover with clean cloth',
        'Get medical help immediately'
      ]
    },
    {
      condition: 'High Fever',
      steps: [
        'Remove excess clothing',
        'Apply cool, damp cloth to forehead',
        'Give plenty of fluids',
        'Monitor temperature regularly',
        'Seek medical attention if persistent'
      ]
    }
  ];

  const locationInfo = [
    'Your exact location (street address)',
    'Nearest landmark (hospital, market, metro station)',
    'Patient\'s condition and symptoms',
    'Number of people affected',
    'Your contact number'
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold font-poppins text-secondary mb-4">
            Emergency Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Quick access to emergency contacts and first aid guidance
          </p>
        </div>

        {/* Emergency Numbers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
            <Phone className="h-6 w-6 text-emergency" />
            Emergency Numbers
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyNumbers.map((emergency, index) => (
              <Card key={index} className="medical-card hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${emergency.color} flex items-center justify-center mx-auto mb-4`}>
                    <emergency.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-secondary mb-2">{emergency.number}</h3>
                  <h4 className="font-semibold text-secondary mb-1">{emergency.service}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{emergency.description}</p>
                  <Button 
                    onClick={() => handleCall(emergency.number)}
                    className={`w-full btn-medical ${emergency.color}`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* When to Call Emergency */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-emergency" />
            When to Call Emergency Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyConditions.map((condition, index) => (
              <Card key={index} className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <condition.icon className="h-6 w-6 text-emergency" />
                    {condition.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-secondary mb-2">Symptoms:</h4>
                    <ul className="space-y-1">
                      {condition.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emergency rounded-full"></div>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-emergency/10 p-3 rounded-lg">
                    <h4 className="font-semibold text-emergency mb-1">Immediate Action:</h4>
                    <p className="text-sm text-secondary">{condition.action}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Location Information */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Location Information to Provide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  When calling emergency services, provide these details:
                </p>
                <ul className="space-y-2">
                  {locationInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm text-secondary">{info}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="medical-card border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-accent" />
                  Emergency Response Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">Urban Areas</span>
                    <span className="font-semibold text-accent">8-12 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary">Semi-Urban Areas</span>
                    <span className="font-semibold text-accent">15-20 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">  
                    <span className="text-sm text-secondary">Rural Areas</span>
                    <span className="font-semibold text-accent">20-30 minutes</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Response times may vary based on traffic, weather, and availability.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Basic First Aid */}
        <section>
          <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-accent" />
            Basic First Aid Steps
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {firstAidSteps.map((firstAid, index) => (
              <Card key={index} className="medical-card">
                <CardHeader>
                  <CardTitle className="text-secondary">{firstAid.condition}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {firstAid.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-sm text-secondary">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <Card className="mt-12 border-emergency/20 bg-emergency/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-secondary mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-emergency" />
              Important Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This information is for guidance only and should not replace professional medical training. 
              In any emergency situation, always call the appropriate emergency number immediately. 
              First aid should only be administered by trained individuals when possible.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;