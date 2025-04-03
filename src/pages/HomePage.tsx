
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
                <span className="block">Conectando</span>
                <span className="block text-accent">Gerações e Saberes</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto md:mx-0 text-lg text-muted-foreground sm:text-xl md:mt-5">
                Aprenda habilidades práticas com mentores experientes que desejam compartilhar seu conhecimento
              </p>
              <div className="mt-8 sm:flex sm:justify-center md:justify-start gap-4">
                <Link to="/mentors">
                  <Button size="lg" className="rounded-md shadow px-8">
                    Encontrar Mentores
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="mt-3 sm:mt-0 rounded-md px-8">
                    Torne-se um Mentor
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:max-w-sm mt-10 md:mt-0">
              <img 
                src="/lovable-uploads/5cc21906-e3d5-4796-9da4-1ae84e78820d.png"
                alt="Mentora Dorotéia" 
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12 bg-white rounded-xl shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
              Como Funciona
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Três passos simples para começar sua jornada de aprendizado
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-secondary/50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full text-white text-xl font-bold">
                1
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">Escolha um Mentor</h3>
              <p className="mt-2 text-muted-foreground">
                Explore nossa lista de mentores especializados em várias habilidades práticas
              </p>
            </div>

            <div className="bg-secondary/50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full text-white text-xl font-bold">
                2
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">Agende uma Aula</h3>
              <p className="mt-2 text-muted-foreground">
                Selecione o dia e horário que melhor se adapta à sua agenda
              </p>
            </div>

            <div className="bg-secondary/50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full text-white text-xl font-bold">
                3
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground">Aprenda e Compartilhe</h3>
              <p className="mt-2 text-muted-foreground">
                Desfrute de uma experiência de aprendizado prática e enriquecedora
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-12 bg-white rounded-xl shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
              Habilidades em Destaque
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Descubra algumas das habilidades que você pode aprender na nossa plataforma
            </p>
          </div>

          <div className="mt-12 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {["Culinária", "Costura", "Jardinagem", "Marcenaria", "Artesanato", "Pintura", "Crochê", "Fotografia"].map((skill) => (
              <Link 
                to={`/mentors?skill=${skill}`} 
                key={skill}
                className="text-center p-4 bg-secondary/30 rounded-lg hover:bg-secondary transition-colors"
              >
                <h3 className="font-medium text-foreground">{skill}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-primary rounded-xl shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Pronto para compartilhar ou adquirir conhecimento?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
            Junte-se à nossa comunidade e faça parte dessa troca de saberes que atravessa gerações
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/mentors">
              <Button size="lg" variant="secondary" className="rounded-md shadow px-8">
                Encontrar Mentores
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="rounded-md px-8 text-white border-white hover:bg-white/10">
                Torne-se um Mentor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
