import {FiFileText, FiImage, FiMusic, FiVideo} from "react-icons/fi";
import {BiFile, BiSolidFilePdf} from "react-icons/bi";
import {
  DiCss3,
  DiGo,
  DiHtml5,
  DiJava,
  DiJavascript,
  DiMarkdown,
  DiPhp,
  DiPython,
  DiRuby,
  DiSwift
} from "react-icons/di";
import {BsBoxSeam } from "react-icons/bs";
import {TbFileTypeJsx, TbFileTypeTsx, TbFileTypeTxt, TbFileTypeXml, TbJson, TbToml} from "react-icons/tb";
import {SiGitignoredotio, SiTypescript} from "react-icons/si";
import {FaFolder, FaRust} from "react-icons/fa";
import {RiFolderSettingsFill} from "react-icons/ri";
import {MdFolderShared, MdSnippetFolder} from "react-icons/md";
import {FileMetadata} from "../types/files";
import {PiFileCppBold} from "react-icons/pi";

const getFileIcon = (file: Readonly<FileMetadata>) => {
  if(file.is_dir) {
    switch(file.name) {
      case 'node_modules': return MdSnippetFolder;
      case 'public': return MdFolderShared;
      case 'assets': return BsBoxSeam;
      default: return FaFolder;  // folder or unknown file
    }
  }

  switch (file.extension) {
    case 'js':
      return DiJavascript; // Іконка для JS
    case 'jsx':
      return TbFileTypeJsx; // Іконка для JSX
    case 'ts':
      return SiTypescript; // Іконка для TS
    case 'tsx':
      return TbFileTypeTsx; // Іконка для TSX
    case 'py':
      return DiPython; // Іконка для Python
    case 'cpp':
      return PiFileCppBold;
    case 'java':
      return DiJava; // Іконка для Java
    case 'php':
      return DiPhp; // Іконка для PHP
    case 'rb':
      return DiRuby; // Іконка для Ruby
    case 'rs':
      return FaRust; // Іконка для Rust
    case 'css':
      return DiCss3; // Іконка для CSS
    case 'html':
      return DiHtml5; // Іконка для HTML
    case 'swift':
      return DiSwift; // Іконка для Swift
    case 'go':
      return DiGo; // Іконка для Go
    case 'json':
      return TbJson; // Іконка для JSON
    case 'toml':
      return TbToml; // Іконка для TOML
    case 'xml':
      return TbFileTypeXml; // Іконка для XML
    case 'txt':
      return TbFileTypeTxt;
    case 'log':
      return FiFileText; // Іконка для текстових файлів
    case '.gitignore':
    case '.git':
      return SiGitignoredotio;
    case 'md':
      return DiMarkdown;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'svg':
      return FiImage; // Іконка для зображень
    case 'mp4':
    case 'mkv':
    case 'avi':
    case 'mov':
      return FiVideo; // Іконка для відео
    case 'mp3':
    case 'wav':
    case 'ogg':
      return FiMusic; // Іконка для музики
    case 'pdf':
      return BiSolidFilePdf; // Іконка для PDF
    case 'idea':
    case 'vscode':
      return RiFolderSettingsFill;
    default:
      return BiFile; // За замовчуванням — іконка для файлів
  }
};

export default getFileIcon;