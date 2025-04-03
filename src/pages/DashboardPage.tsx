
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Calendar, Clock, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Mock booking data
interface Booking {
  id: string;
  mentorName: string;
  mentorPhotoUrl: string;
  className: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "canceled";
}

const DashboardPage = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      toast({
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar seu painel.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Load mock bookings depending on user role
    if (currentUser?.role === "learner") {
      setBookings([
        {
          id: "1",
          mentorName: "Doroteia Silva",
          mentorPhotoUrl: "/lovable-uploads/5cc21906-e3d5-4796-9da4-1ae84e78820d.png",
          className: "Aprenda a fazer bainha",
          date: "15/05/2023",
          time: "14:00",
          status: "upcoming"
        },
        {
          id: "2",
          mentorName: "Carlos Mendes",
          mentorPhotoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          className: "Pratos típicos brasileiros",
          date: "10/05/2023",
          time: "10:00",
          status: "completed"
        }
      ]);
    } else {
      // For mentors, show scheduled classes they'll teach
      setBookings([
        {
          id: "1",
          mentorName: "João Pereira", // Student name in this case
          mentorPhotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
          className: "Aprenda a fazer bainha",
          date: "15/05/2023",
          time: "14:00",
          status: "upcoming"
        },
        {
          id: "2",
          mentorName: "Maria Oliveira", // Student name in this case
          mentorPhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          className: "Customização de roupas",
          date: "20/05/2023",
          time: "15:00",
          status: "upcoming"
        }
      ]);
    }
  }, [isAuthenticated, currentUser, navigate, toast]);

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: "canceled" as const } : booking
    ));
    
    toast({
      title: "Aula cancelada",
      description: "A aula foi cancelada com sucesso.",
    });
  };

  if (!currentUser) {
    return null; // Let the useEffect handle the redirect
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-primary">
          Meu Painel
        </h1>
        <p className="text-muted-foreground mt-2">
          {currentUser.role === "learner" 
            ? "Gerencie suas aulas agendadas e favoritadas"
            : "Gerencie suas aulas agendadas e criadas"}
        </p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Próximas Aulas</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
          <TabsTrigger value="canceled">Canceladas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 pt-4">
          {bookings.filter(b => b.status === "upcoming").length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-lg text-muted-foreground">
                  Você não possui aulas agendadas.
                </p>
                <Link to="/mentors">
                  <Button variant="link" className="mt-2">
                    Encontrar mentores
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            bookings
              .filter(booking => booking.status === "upcoming")
              .map(booking => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-6 flex-grow">
                        <div className="flex items-center mb-4">
                          <img
                            src={booking.mentorPhotoUrl}
                            alt={booking.mentorName}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="font-bold">
                              {currentUser.role === "learner" ? booking.mentorName : "Seu aluno: " + booking.mentorName}
                            </h3>
                            <p className="text-primary font-medium">{booking.className}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{booking.date}</span>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-6 flex flex-col justify-center md:w-48">
                        <Button variant="outline" className="mb-2">
                          <Edit className="w-4 h-4 mr-2" />
                          Reagendar
                        </Button>
                        <Button 
                          variant="outline" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 pt-4">
          {bookings.filter(b => b.status === "completed").length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-lg text-muted-foreground">
                  Você não possui aulas concluídas.
                </p>
              </CardContent>
            </Card>
          ) : (
            bookings
              .filter(booking => booking.status === "completed")
              .map(booking => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={booking.mentorPhotoUrl}
                        alt={booking.mentorName}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold">{booking.mentorName}</h3>
                        <p className="text-primary font-medium">{booking.className}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{booking.date}</span>
                      <Clock className="w-4 h-4 ml-4 mr-2" />
                      <span>{booking.time}</span>
                    </div>
                    
                    {currentUser.role === "learner" && (
                      <Button variant="outline" className="mt-2">
                        Avaliar esta aula
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
        
        <TabsContent value="canceled" className="space-y-4 pt-4">
          {bookings.filter(b => b.status === "canceled").length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-lg text-muted-foreground">
                  Você não possui aulas canceladas.
                </p>
              </CardContent>
            </Card>
          ) : (
            bookings
              .filter(booking => booking.status === "canceled")
              .map(booking => (
                <Card key={booking.id} className="overflow-hidden opacity-70">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={booking.mentorPhotoUrl}
                        alt={booking.mentorName}
                        className="w-12 h-12 rounded-full object-cover mr-4 grayscale"
                      />
                      <div>
                        <h3 className="font-bold">{booking.mentorName}</h3>
                        <p className="text-muted-foreground">{booking.className}</p>
                        <span className="text-destructive text-sm">Cancelada</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{booking.date}</span>
                      <Clock className="w-4 h-4 ml-4 mr-2" />
                      <span>{booking.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
      
      {currentUser.role === "mentor" && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Aulas</CardTitle>
              <CardDescription>
                Gerencie as aulas que você oferece na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Aprenda a fazer bainha</h3>
                    <span className="font-bold">R$25/hora</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nessa aula prática, vou te ensinar a fazer uma bainha a mão, com todos os passos e dicas!
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" /> Editar
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Customização de roupas</h3>
                    <span className="font-bold">R$30/hora</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aprenda a dar nova vida às suas peças de roupa com técnicas de customização simples e eficazes.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" /> Editar
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4">
                Adicionar Nova Aula
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
