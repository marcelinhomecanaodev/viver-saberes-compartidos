
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mentor, mockMentors, skills } from "@/data/mentorsData";

const MentorsPage = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    // Get skill from query params if available
    const queryParams = new URLSearchParams(location.search);
    const skillParam = queryParams.get("skill");
    if (skillParam) {
      setSelectedSkill(skillParam);
    }

    // Load mentors
    setMentors(mockMentors);
  }, [location.search]);

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.classes.some(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = selectedSkill === "" || 
      mentor.skills.some(skill => skill.name === selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already handled through state
  };

  return (
    <div>
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-6">Encontre seu Mentor</h1>
        
        <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="search"
              placeholder="Busque por aulas ou mentores..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">Todas as habilidades</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
          
          <Button type="submit">Buscar</Button>
        </form>
      </div>

      {filteredMentors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <h2 className="text-xl font-medium text-muted-foreground">
            Nenhum mentor encontrado com os critérios selecionados.
          </h2>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("");
              setSelectedSkill("");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={mentor.photoUrl}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{mentor.name}</h2>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-muted-foreground">
                        {mentor.averageRating} ({mentor.classes.length} aulas)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-muted text-xs font-medium rounded-full"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {mentor.bio}
                  </p>
                </div>

                <div className="space-y-3">
                  {mentor.classes.slice(0, 2).map((mentorClass) => (
                    <div key={mentorClass.id} className="border-t pt-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-foreground">{mentorClass.title}</h3>
                        <span className="text-sm font-bold">R${mentorClass.pricePerHour}/h</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {mentorClass.description}
                      </p>
                    </div>
                  ))}
                </div>

                <Link to={`/mentors/${mentor.id}`} className="mt-4 block">
                  <Button variant="default" className="w-full">
                    Ver Perfil
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorsPage;
