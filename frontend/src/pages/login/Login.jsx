import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  return (
      <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
          <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
              <h1 className='text-3xl font-semibold text-center text-gray-300'>
                  Login
                  <span className='text-blue-500'> ChatApp</span>
              </h1>


              <form>
                  <div className="my-4">
                      <label>
                          <span className='text-sm text-[#333] font-medium'>Username</span>
                      </label>
                      <input
                          type='text'
                          placeholder='Enter username'
                          className='w-full input input-bordered h-10 bg-white text-black'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                      />
                  </div>

                  <div className="mb-4">
                      <label>
                          <span className='text-sm text-[#333] font-medium'>Password</span>
                      </label>
                      <input
                          type='password'
                          placeholder='Enter Password'
                          className='w-full input input-bordered h-10 bg-white text-black'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <a href='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                      {"Don't"} have an account?
                  </a>

                  <div>
                      <button className='btn btn-block btn-sm mt-2' >
                          {/* {loading ? <span className='loading loading-spinner '></span> : "Login"} */}
                          Login
                      </button>
                  </div>
              </form>
        </div>
    </div>
  )
}

export default Login