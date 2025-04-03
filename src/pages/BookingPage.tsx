
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { mockMentors, Mentor, MentorClass } from "@/data/mentorsData";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

const BookingPage = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");
  const { isAuthenticated, currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [mentorClass, setMentorClass] = useState<MentorClass | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      toast({
        title: "Acesso negado",
        description: "Você precisa fazer login para agendar uma aula.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Find mentor data
    const foundMentor = mockMentors.find(m => m.id === mentorId);
    if (foundMentor) {
      setMentor(foundMentor);
      
      // Find class data if classId is provided
      if (classId) {
        const foundClass = foundMentor.classes.find(c => c.id === classId);
        if (foundClass) {
          setMentorClass(foundClass);
        }
      } else {
        // If no specific class, just use the first one
        setMentorClass(foundMentor.classes[0]);
      }
    }
  }, [mentorId, classId, isAuthenticated, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, selecione uma data e horário para a sua aula.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate booking request
    setTimeout(() => {
      toast({
        title: "Aula agendada com sucesso!",
        description: `Sua aula com ${mentor?.name} foi agendada para ${format(date, "dd/MM/yyyy", { locale: ptBR })} às ${timeSlot}.`,
      });
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1500);
  };

  if (!mentor || !mentorClass) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-muted-foreground">
          Carregando detalhes da aula...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Button
        variant="ghost"
        className="flex items-center mb-6"
        onClick={() => navigate(`/mentors/${mentorId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para o perfil do mentor
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Agendar Aula</CardTitle>
          <CardDescription>
            Preencha os detalhes para agendar sua aula com {mentor.name}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Lesson Information */}
            <div className="mb-6 bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-4">
                <img
                  src={mentor.photoUrl}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{mentor.name}</h3>
                  <p className="text-lg font-medium text-primary">{mentorClass.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{mentorClass.description}</p>
                  <div className="mt-2 font-medium">
                    Valor: R${mentorClass.pricePerHour} por hora
                  </div>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="date" className="text-base font-medium">
                  Data
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => 
                        date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                        date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot Selection */}
              {date && (
                <div>
                  <Label className="text-base font-medium">
                    Horário
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={timeSlot === time ? "default" : "outline"}
                        className={cn(
                          "flex items-center justify-center py-6",
                          timeSlot === time ? "border-2 border-primary" : ""
                        )}
                        onClick={() => setTimeSlot(time)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-base font-medium">
                  Informações adicionais (opcional)
                </Label>
                <Input
                  id="additionalInfo"
                  placeholder="Ex: Tenho alguma experiência prévia, gostaria de abordar um tema específico, etc."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="h-24"
                />
              </div>
            </div>

            <div className="text-sm mb-4 p-4 bg-secondary/50 rounded-lg">
              <p className="font-medium">Informações importantes:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>O pagamento será feito diretamente ao mentor na data da aula</li>
                <li>Você pode cancelar a aula com até 24 horas de antecedência</li>
                <li>Após a aula, você poderá avaliar o mentor</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !date || !timeSlot}
            >
              {isSubmitting ? "Processando..." : "Confirmar Agendamento"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
