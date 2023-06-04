const ErrorFallback: React.FC = () => {
  return(
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-primary">
      <h1 className="text-alternative text-8xl mb-5">Oops!</h1>
      <h2 className="text-alternative text-2xl">The requested resource was not found.</h2>
    </div>
  )
}

export default ErrorFallback