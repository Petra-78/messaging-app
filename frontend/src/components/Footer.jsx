import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 border-t-amber-50">
      <div className="container p-2 mx-auto flex items-center justify-center gap-2 text-gray-700">
        <a
          href="https://github.com/Petra-78/messaging-app"
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
