import { HTMLInputTypeAttribute } from 'react'

interface InputProps {
  id: string
  name?: string
  placeholder?: string
  label?: string | React.ReactElement
  type: HTMLInputTypeAttribute
  value?: any
  error?: boolean
  helperText?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = props => {
  return(
    <div className='flex flex-col'>
      {props.label && (
        <p className={`mb-1 text-md ${props.error ? 'text-red-500' : 'text-gray-600'}`}>
          {props.label}
        </p>
      )}
      <input
        className={`rounded-lg outline-none p-1 border-2 ${props.error ? 'border-red-500' : 'border-gray-500'}`}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
      {props.error && (
        <p className='text-red-500 mt-1'>
          {props.helperText}
        </p>
      )}
    </div>
  )
}

export default Input