import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 mt-8">
      <div className="container mx-auto flex items-center justify-center gap-2 text-gray-700">
        <a
          href="https://github.com/Petra-78"
          target="_blank"
          rel="noopener noreferrer"
          className="flex hover:text-gray-900 transition-colors"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
          <p className="text-sm">Petra-78</p>
        </a>
      </div>
    </footer>
  );
}
