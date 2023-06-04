import { TailSpin } from 'react-loader-spinner'

interface ButtonProps {
  id: string
  title: string
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = props => {
  return(
    <button
      className="flex justify-center w-full p-1 font-bold text-white bg-slate-950 rounded-lg enabled:hover:bg-white enabled:hover:text-slate-950 border-2 border-slate-950"
      id={props.id}
      disabled={props.isLoading}
    >
      {props.isLoading ? (
        <TailSpin
          height='25'
          width='25'
          color='#FFFFFF'
        />
      ) : (
        props.title
      )}
    </button>
  )
}

export default Button