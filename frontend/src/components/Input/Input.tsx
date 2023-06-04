import { HTMLInputTypeAttribute } from 'react'

interface InputProps {
  id: string
  name?: string
  placeholder?: string
  label?: string
  type: HTMLInputTypeAttribute
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = props => {
  return(
    <div className="flex flex-col">
      {props.label && (
        <p className="text-gray-600 text-sm mb-1">{props.label}</p>
      )}
      <input
        className="border-2 border-gray-500 rounded-lg outline-none p-1"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Input