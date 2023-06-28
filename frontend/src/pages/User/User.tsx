import Input from '../../components/Input'

const User: React.FC = () => {
  return(
    <div className='w-full p-2'>
      <h1 className='text-white text-4xl font-bold'>Edit user settings</h1>
      <form onSubmit={() => null} className='mt-5'>
        <Input
          label={<p className='text-white'>Name</p>}
          id='edit-user-name'
          type='text'
          onChange={event => console.log(event.target.value)}
        />
        <Input
          label={<p className='text-white'>Email</p>}
          id='edit-user-email'
          type='text'
          onChange={event => console.log(event.target.value)}
        />
        <Input
          label={<p className='text-white'>Password</p>}
          id='edit-user-password'
          type='text'
          onChange={event => console.log(event.target.value)}
        />
      </form>
    </div>
  )
}

export default User