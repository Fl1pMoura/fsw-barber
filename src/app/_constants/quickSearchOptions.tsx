import BeardIcon from "../_components/svgs/beardIcon";
import EyebrowIcon from "../_components/svgs/eyebrowIcon";
import HairIcon from "../_components/svgs/hairIcon";
import HydrateIcon from "../_components/svgs/HydrateIcon";
import MassageIcon from "../_components/svgs/massageIcon";
import TrimIcon from "../_components/svgs/trimIcon";

interface quickSearchOptions {
  label: string;
  imageUrl: React.ReactNode;
}

export const quickSearchOptions: quickSearchOptions[] = [
  {
    label: "Cabelo",
    imageUrl: <HairIcon />,
  },
  {
    label: "Acabamento",
    imageUrl: <TrimIcon />,
  },
  {
    label: "Barba",
    imageUrl: <BeardIcon />,
  },
  {
    label: "Sobrancelha",
    imageUrl: <EyebrowIcon />,
  },
  {
    label: "Massagem",
    imageUrl: <MassageIcon />,
  },
  {
    label: "Hidratação",
    imageUrl: <HydrateIcon />,
  },
];
