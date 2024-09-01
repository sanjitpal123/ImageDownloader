import { useContext } from 'react';
import { MyContext } from "../Store/Contextapi";
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const { SetQuery } = useContext(MyContext);
  const Navigator = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault(); 
    const input = event.target.querySelector('input');
    if (input.value.trim()) {
      SetQuery(input.value);
      Navigator('/');
      input.value = '';
    }
  }
function GotoHome()
{
Navigator('/')
}
  return (
    <div className="navbar bg-black w-full z-[10] fixed left-0 top-0">
      <div className="flex-1">
        <a className="btn btn-ghost text-[12px] text-white sm:text-xl" onClick={()=>GotoHome()}>ImgDownloader</a>
      </div>
      <div className="flex-none gap-1">
        <form onSubmit={handleSearchSubmit} className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 h-8 sm:w-auto"
          />
          <button type="submit" className="hidden">Search</button> {/* Hidden button for form submission */}
        </form>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
