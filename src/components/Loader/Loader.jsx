import { RotatingLines } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <div className="spiner">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="48"
        visible={true}
      />
    </div>
  );
};
