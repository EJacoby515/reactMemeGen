import Background from '../assets/images/code-bg.jpeg'

function Home() {
  return (
    <div style = {{backgroundImage: `url(${Background})`}}
    className='flex flex-row justify-center mx-auto bg-cover bg-fixed'>
        <div className='flex place-items-center h-screen'>
            <div className='p-5 bg-white bg-opacity-50 text-black rounded'>
                <h2>This is our homebase</h2>
            </div>
      </div>
    </div>
  )
}

export default Home
