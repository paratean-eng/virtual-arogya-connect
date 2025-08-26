import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  QrCode, 
  FileText, 
  Shield,
  CheckCircle,
  User,
  Calendar,
  Phone,
  Download,
  Share,
  History
} from 'lucide-react';

type Step = 'create' | 'verify' | 'records' | 'qr';

const ABHA = () => {
  const [currentStep, setCurrentStep] = useState<Step>('create');
  const [formData, setFormData] = useState({
    aadhaar: '',
    dob: '',
    gender: '',
    mobile: '',
    otp: ''
  });

  const steps = [
    { id: 'create', title: 'Create ABHA', icon: User },
    { id: 'verify', title: 'Verify with OTP', icon: Shield },
    { id: 'records', title: 'Fetch Health Records', icon: FileText },
    { id: 'qr', title: 'Generate Emergency QR', icon: QrCode }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Unified Health Records',
      description: 'All your medical records in one secure digital place'
    },
    {
      icon: History,
      title: 'Medical History Access',
      description: 'Quick access to past consultations and treatments'
    },
    {
      icon: Share,
      title: 'Easy Sharing',
      description: 'Share health records with doctors instantly'
    },
    {
      icon: QrCode,
      title: 'Emergency QR Code',
      description: 'Quick access to critical health info during emergencies'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    const stepOrder: Step[] = ['create', 'verify', 'records', 'qr'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'create':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={formData.aadhaar}
                  onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                  maxLength={12}
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  maxLength={10}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleNextStep} className="w-full btn-medical bg-primary hover:bg-primary-dark">
              Generate OTP
            </Button>
          </div>
        );

      case 'verify':
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Verify Your Identity</h3>
              <p className="text-muted-foreground">
                We've sent an OTP to your mobile number ending with **{formData.mobile.slice(-2)}
              </p>
            </div>
            
            <div className="max-w-xs mx-auto">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value)}
                maxLength={6}
                className="text-center text-2xl tracking-wider"
              />
            </div>

            <Button onClick={handleNextStep} className="w-full btn-medical bg-primary hover:bg-primary-dark">
              Verify & Create ABHA
            </Button>
          </div>
        );

      case 'records':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">ABHA Created Successfully!</h3>
              <p className="text-muted-foreground">Your ABHA ID: <span className="font-mono font-semibold">91-1234-5678-9012</span></p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold text-secondary mb-4">Available Health Records</h4>
              <div className="space-y-3">
                {[
                  { name: 'Blood Test Report', date: '2024-12-15', hospital: 'Apollo Diagnostics' },
                  { name: 'Cardiology Consultation', date: '2024-11-28', hospital: 'Max Hospital' },
                  { name: 'Vaccination Certificate', date: '2024-10-10', hospital: 'Government Hospital' }
                ].map((record, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium text-secondary">{record.name}</h5>
                        <p className="text-sm text-muted-foreground">{record.hospital} • {record.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Button onClick={handleNextStep} className="w-full btn-medical bg-primary hover:bg-primary-dark">
              Generate Emergency QR Code
            </Button>
          </div>
        );

      case 'qr':
        return (
          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Emergency QR Code Generated</h3>
              <p className="text-muted-foreground">
                This QR code contains your critical health information for emergency situations
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg inline-block border-2 border-primary/20">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <QrCode className="h-32 w-32 text-secondary" />
              </div>
            </div>

            <div className="bg-accent/10 p-4 rounded-lg">
              <h4 className="font-semibold text-secondary mb-2">QR Code Contains:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ABHA ID and basic demographics</li>
                <li>• Emergency contact information</li>
                <li>• Critical allergies and conditions</li>
                <li>• Current medications</li>
                <li>• Blood group and organ donor status</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Button className="btn-medical">
                <Download className="h-4 w-4 mr-2" />
                Download QR
              </Button>
              <Button variant="outline" className="btn-medical">
                <Share className="h-4 w-4 mr-2" />
                Share QR
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">
            ABHA-Linked Smart Healthcare
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Create your Ayushman Bharat Health Account and access unified digital healthcare services across India
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits Sidebar */}
          <div className="lg:col-span-1">
            <Card className="medical-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  ABHA Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Step Progress */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep === step.id 
                          ? 'bg-primary text-primary-foreground' 
                          : steps.findIndex(s => s.id === currentStep) > index
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        <step.icon className="h-4 w-4" />
                      </div>
                      <span className={`text-sm ${
                        currentStep === step.id ? 'font-semibold text-primary' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">
                  {steps.find(s => s.id === currentStep)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Section */}
        <section className="mt-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-secondary mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                About Ayushman Bharat Digital Health Mission (ABDM)
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-secondary mb-2">What is ABHA?</h4>
                  <p>
                    Ayushman Bharat Health Account (ABHA) is a unique health ID that enables you to access 
                    and share your health records digitally across healthcare providers and facilities in India.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary mb-2">Security & Privacy</h4>
                  <p>
                    Your health data is secured using advanced encryption and is only accessible with your 
                    explicit consent. You maintain complete control over who can access your health information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ABHA;