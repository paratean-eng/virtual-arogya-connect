import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star,
  Phone,
  Heart,
  Baby,
  Stethoscope,
  Users
} from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  experience: number;
  fee: number;
  rating: number;
  location: string;
  availability: string;
  languages: string[];
}

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: Stethoscope },
    { id: 'cardiologist', name: 'Cardiologist', icon: Heart },
    { id: 'gynaecologist', name: 'Gynaecologist', icon: Baby },
    { id: 'general', name: 'General Physician', icon: Users },
    { id: 'oncologist', name: 'Oncologist', icon: Stethoscope }
  ];

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Nitin Tiwari',
      specialty: 'Cardiologist',
      hospital: 'Apollo Hospital',
      experience: 28,
      fee: 1000,
      rating: 4.8,
      location: 'Delhi',
      availability: 'Available Today',
      languages: ['Hindi', 'English']
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Gynaecologist',
      hospital: 'Fortis Healthcare',
      experience: 15,
      fee: 800,
      rating: 4.9,
      location: 'Mumbai',
      availability: 'Available Tomorrow',
      languages: ['Hindi', 'English', 'Marathi']
    },
    {
      id: 3,
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      hospital: 'Max Super Speciality',
      experience: 20,
      fee: 600,
      rating: 4.6,
      location: 'Bangalore',
      availability: 'Available Today',
      languages: ['Hindi', 'English', 'Kannada']
    },
    {
      id: 4,
      name: 'Dr. Sunita Gupta',
      specialty: 'Oncologist',
      hospital: 'Tata Memorial Hospital',
      experience: 22,
      fee: 1200,
      rating: 4.9,
      location: 'Mumbai',
      availability: 'Next Week',
      languages: ['Hindi', 'English']
    },
    {
      id: 5,
      name: 'Dr. Amit Patel',
      specialty: 'Cardiologist',
      hospital: 'Medanta Hospital',
      experience: 18,
      fee: 900,
      rating: 4.7,
      location: 'Gurgaon',
      availability: 'Available Today',
      languages: ['Hindi', 'English', 'Gujarati']
    },
    {
      id: 6,
      name: 'Dr. Kavita Singh',
      specialty: 'General Physician',
      hospital: 'AIIMS',
      experience: 12,
      fee: 500,
      rating: 4.8,
      location: 'Delhi',
      availability: 'Available Tomorrow',
      languages: ['Hindi', 'English']
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'all' || 
                           doctor.specialty.toLowerCase().includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold font-poppins text-secondary mb-4">
            Find Expert Doctors
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with qualified healthcare professionals near you
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="medical-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by specialty, doctor name, or hospital..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="btn-medical bg-primary hover:bg-primary-dark">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Specialty Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-secondary mb-4">Filter by Specialty</h2>
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <Button
                key={specialty.id}
                variant={selectedSpecialty === specialty.id ? "default" : "outline"}
                onClick={() => setSelectedSpecialty(specialty.id)}
                className="btn-medical"
              >
                <specialty.icon className="h-4 w-4 mr-2" />
                {specialty.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="medical-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-secondary">{doctor.name}</CardTitle>
                    <p className="text-primary font-medium">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {doctor.hospital}, {doctor.location}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {doctor.experience} साल experience
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-secondary">₹{doctor.fee}</p>
                    <p className="text-sm text-muted-foreground">Consultation Fee</p>
                  </div>
                  <Badge 
                    variant={doctor.availability.includes('Today') ? 'default' : 'secondary'}
                    className={doctor.availability.includes('Today') ? 'bg-accent text-accent-foreground' : ''}
                  >
                    {doctor.availability}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((language) => (
                      <Badge key={language} variant="outline" className="text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 btn-medical bg-primary hover:bg-primary-dark">
                    <Phone className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="btn-medical">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card className="medical-card text-center py-12">
            <CardContent>
              <Stethoscope className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">No doctors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all specialties.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-secondary mb-4">How to Book an Appointment</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-secondary mb-2">1. Choose Your Doctor</h4>
                <p className="text-muted-foreground">Browse specialists and select based on experience, ratings, and availability.</p>
              </div>
              <div>
                <h4 className="font-medium text-secondary mb-2">2. Book Online</h4>
                <p className="text-muted-foreground">Schedule your appointment at a convenient time slot.</p>
              </div>
              <div>
                <h4 className="font-medium text-secondary mb-2">3. Get Consultation</h4>
                <p className="text-muted-foreground">Meet the doctor in-person or via telemedicine as per your preference.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindDoctors;