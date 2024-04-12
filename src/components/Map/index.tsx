import { useFormContext } from "../../hooks/useFormContext";
import Button from "../common/Button";

interface MapProps {}

const Map: React.FC<MapProps> = (props) => {
  const { onOpen } = useFormContext();

  return (
    <div className="w-screen h-screen bg-map-placeholder bg-cover bg-center bg-no-repeat">
      <Button onPress={onOpen}>Open</Button>
    </div>
  );
};

export default Map;
