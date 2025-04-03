
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { mockMentors, Mentor, MentorClass } from "@/data/mentorsData";

const MentorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundMentor = mockMentors.find(m => m.id === id);
    if (foundMentor) {
      setMentor(foundMentor);
    }
  }, [id]);

  if (!mentor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-muted-foreground">
          Mentor não encontrado.
        </h2>
        <Button variant="link" onClick={() => navigate("/mentors")}>
          Voltar para a lista de mentores
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        className="flex items-center mb-4"
        onClick={() => navigate("/mentors")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para a lista de mentores
      </Button>

      {/* Mentor info header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={mentor.photoUrl}
            alt={mentor.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-grow text-center sm:text-left">
            <h1 className="text-3xl font-bold text-primary">{mentor.name}</h1>
            <div className="flex items-center justify-center sm:justify-start mt-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-muted-foreground">
                {mentor.averageRating} ({mentor.classes.length} aulas)
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              {mentor.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-muted text-sm font-medium rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
            <p className="mt-4 text-muted-foreground">
              {mentor.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs for classes, availability, and reviews */}
      <Tabs defaultValue="classes">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="classes">Aulas</TabsTrigger>
          <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>
        
        {/* Classes tab */}
        <TabsContent value="classes" className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold text-primary">Aulas Oferecidas</h2>
          
          {mentor.classes.map((mentorClass: MentorClass) => (
            <Card key={mentorClass.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold">{mentorClass.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {mentorClass.description}
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-sm bg-secondary px-3 py-1 rounded-full">
                        {mentorClass.skill.name}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center">
                    <div className="text-2xl font-bold text-primary">
                      R${mentorClass.pricePerHour}
                      <span className="text-sm text-muted-foreground font-normal">/hora</span>
                    </div>
                    <Link to={`/booking/${mentor.id}?classId=${mentorClass.id}`}>
                      <Button className="mt-2 w-full">
                        <Calendar className="mr-2 h-4 w-4" /> Agendar Aula
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        {/* Availability tab */}
        <TabsContent value="availability" className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold text-primary">Horários Disponíveis</h2>
          <div className="bg-white rounded-lg p-4">
            {mentor.availableTimes.map((time, index) => (
              <div key={index} className="py-2 border-b last:border-0">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{time.day}</span>
                  <span>{time.startTime} - {time.endTime}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Reviews tab - In a real app, this would display actual reviews */}
        <TabsContent value="reviews" className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold text-primary">Avaliações (5)</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">Maria Oliveira</span>
              </div>
              <p className="text-muted-foreground">
                Excelente aula! Doroteia é muito paciente e explica tudo nos mínimos detalhes. Aprendi muito!
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">José Santos</span>
              </div>
              <p className="text-muted-foreground">
                Uma experiência incrível! Consegui aprender muito em pouco tempo e já estou fazendo meus primeiros projetos.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentorProfilePage;
