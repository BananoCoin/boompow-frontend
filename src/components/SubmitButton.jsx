import Loader from "./Loader"

const SubmitButton = ({disabled, text}) => {
  return <button
  className={`w-full h-[40px] px-4 py-2 rounded-md transition-colors ${
    !disabled
      ? `bg-accent hover:bg-accent-secondary text-gray-900 hover:text-gray-800`
      : `bg-primary  text-slate-500 flex justify-center items-center`
  } font-bold flex justify-center items-center`}
  type="submit"
  disabled={disabled}
>
  {disabled ? <Loader /> : text}
</button>
}

export default SubmitButton