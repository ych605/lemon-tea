import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useFormContext } from "react-hook-form";
import { FaArrowDown } from "react-icons/fa";
import LemonTeaIcon from "../../../assets/lemon_tea.svg";
import { FormBody } from "../../../hooks/useForm";
import Button from "../../common/Button";

interface MapDetailsCardProps {
  totalDistance: number;
  totalTime: number;
  onResubmit: () => void;
}

const MapDetailsCard: React.FC<MapDetailsCardProps> = (props) => {
  const { totalDistance, totalTime, onResubmit } = props;
  const { watch } = useFormContext<FormBody>();

  const { origin, destination } = watch();

  return (
    <div className="pointer-events-none absolute bottom-0 right-0 flex items-center justify-center p-4">
      <Card
        isBlurred
        className="pointer-events-auto w-auto border-none bg-background/20"
        shadow="lg"
        classNames={{
          header: ["font-semibold", "text-sm", "items-start", "gap-2", "pt-5"],
          body: ["text-xs", "gap-2", "py-1"],
        }}
      >
        <CardHeader>
          <Image src={LemonTeaIcon} width={18} height={18} radius="none" />
          <span>{"Route details"}</span>
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex flex-col items-center">
            <div className="w-full rounded-md bg-gray-400/20 p-1">{origin}</div>
            <FaArrowDown />
            <div className="w-full rounded-md bg-gray-400/20 p-1">{destination}</div>
          </div>
          <p>{`Total distance: ${totalDistance.toLocaleString()}`}</p>
          <p>{`Total time: ${totalTime.toLocaleString()}`}</p>
        </CardBody>
        <CardFooter>
          <Button className="flex-1" onPress={onResubmit}>
            {"Resubmit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MapDetailsCard;
