import { useModalContext } from "../../hooks/useModalContext";
import Button from "../common/Button";

interface MapProps {}

const Map: React.FC<MapProps> = (props) => {
  const { onOpen } = useModalContext();

  return (
    <div className="h-screen w-screen bg-map-placeholder bg-cover bg-center bg-no-repeat">
      <Button onPress={onOpen}>Open</Button>
    </div>
  );
};

export default Map;
