import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div>
      <div className={'flex items-center bg-stone-700 gap-2.5 p-5'}>
        <h1>React Quiz</h1>
      </div>
      <div className={'mb-8 mt-8 w-full'}>
        <div className={'flex justify-center mx-auto my-0 max-w-7xl'}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
