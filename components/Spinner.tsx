import { Loader } from 'lucide-react';

const Spinner = () => {
  return (
    <div className="h-6xl flex w-90 items-center justify-center p-26">
      <Loader className="size-9 animate-spin" />
    </div>
  );
};

export default Spinner;
