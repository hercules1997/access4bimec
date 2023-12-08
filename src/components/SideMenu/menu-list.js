import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import paths from "../../constants";
const listLinks = [
  {
    id: 1,
    label: "Novo Cadastro",
    link: paths.Cadastro,
    icon: GroupAddIcon,
    s2: false
  },
  {
    id: 2,
    label: "Pessoas Cadastradas",
    link: paths.ListRegisters,
    icon: RecentActorsIcon,

  },
  {
    id: 3,
    label: "Status de visitas",
    link: paths.Status,
    icon: HourglassBottomIcon,
  
  },
  {
    id: 4,
    label: "Dashboard",
    link: paths.Deshboard,
    icon: EqualizerIcon,

   
  },
  {
    id: 5,
    label: "Gerar Relatório",
    link: paths.GenerateReport,
    icon: DescriptionIcon,
  
    
  },
  {
    id: 6,
    label: "Criar usuarios",
    link: paths.CreateUsers,
    icon: PersonAddIcon,
    adminOnly: true,
    s2: false
  },
  {
    id: 7,
    label: "Usuários",
    icon: GroupIcon,
    link: paths.Users,
    adminOnly: true,
    s2: false
  },
];

export default listLinks;
