import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, 
  Users, 
  ShieldCheck, 
  Clock,
  Heart,
  UserCheck,
  Phone,
  Award
} from 'lucide-react';
import heroImage from '@/assets/hero-medical.jpg';

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Health Assistant',
      description: 'Get instant health guidance and symptom analysis through our advanced AI chatbot - Arogya Mitra.'
    },
    {
      icon: Users,
      title: 'Find Expert Doctors',
      description: 'Connect with qualified healthcare professionals across various specialties near you.'
    },
    {
      icon: Phone,
      title: 'Emergency Services',
      description: 'Quick access to emergency contacts and first aid guidance when you need it most.'
    },
    {
      icon: UserCheck,
      title: 'ABHA Integration',
      description: 'Seamlessly integrate with India\'s Ayushman Bharat Digital Health Mission for unified healthcare records.'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Healthcare guidance available round the clock'
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Private',
      description: 'Your health data is protected with enterprise-grade security'
    },
    {
      icon: Heart,
      title: 'Trusted Care',
      description: 'Recommendations from certified healthcare professionals'
    },
    {
      icon: Award,
      title: 'Government Approved',
      description: 'Aligned with ABDM standards and regulations'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6">
                Your Virtual Doctor, 
                <span className="block text-primary-light">Anywhere, Anytime</span>
              </h1>
              
              <div className="mb-8 space-y-4">
                <p className="text-xl text-white/90 leading-relaxed">
                  अपने घर की सुविधा से प्राथमिक स्वास्थ्य सेवा तक पहुँचें।
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  Get primary healthcare from the comfort of your home. Collect symptoms, receive preliminary diagnosis, and easily connect with telemedicine portals.
                </p>
                <p className="text-sm text-primary-light font-medium">
                  ✓ Integrated with India's Ayushman Bharat Digital Health Mission (ABDM)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  asChild 
                  size="lg" 
                  className="btn-medical bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8"
                >
                  <Link to="/chatbot">Get Started</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="btn-medical border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8"
                >
                  <Link to="/doctors">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Virtual Doctor Consultation" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-secondary mb-4">
              Complete Healthcare Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From AI-powered consultations to emergency services, we provide comprehensive digital healthcare support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="medical-card text-center group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-secondary mb-4">
              Why Choose VirtualDoc?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience healthcare that's secure, accessible, and built for the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 card-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-secondary mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust VirtualDoc for their healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="btn-medical bg-primary hover:bg-primary-dark font-semibold text-lg px-8"
              >
                <Link to="/chatbot">Start Your Health Journey</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="btn-medical border-primary text-primary hover:bg-primary hover:text-white font-semibold text-lg px-8"
              >
                <Link to="/emergency">Emergency Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;