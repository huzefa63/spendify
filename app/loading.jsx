import { ImSpinner9 } from "react-icons/im";
function Loading() {
  return(
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ImSpinner9 className="animate-spin text-3xl text-black dark:text-white"/>
    </div>
  )
}

export default Loading;
