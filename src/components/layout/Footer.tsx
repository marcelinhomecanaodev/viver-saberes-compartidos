
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Saber Viver</h3>
            <p className="text-sm text-muted-foreground">
              Conectando gerações através da transmissão de saberes práticos.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="text-sm text-muted-foreground hover:text-primary">
                  Mentores
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-muted-foreground hover:text-primary">
                  Torne-se um mentor
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Contato</h3>
            <p className="text-sm text-muted-foreground">
              Email: contato@saberviver.com<br />
              Telefone: (11) 99999-9999
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Saber Viver. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
