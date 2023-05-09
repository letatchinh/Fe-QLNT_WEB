import { PATH_APP } from './path';

// Dashboard
import Dashboard from '../pages/Dashboard/index';
import Rooms from '../pages/Rooms/index';
import CreateRoom from '../pages/CreateRoom/index';
import UpdateRoom from '../pages/UpdateRoom/index';
import Charge from '../pages/Charge/index';
import CreateBrem from '../pages/CreateBrem/index';
import User from '../pages/User/index';
import Login from '../pages/Login/Index';
import Account from '../pages/Account/Index';
import GroupRoom from '../pages/GroupRoom/Index';
import Hobby from '../pages/User/Hobby';
import RegisterPage from '../pages/User/RegisterPage';
import FindRoom from '../pages/User/FindRoom';

const adminRoutes = [
  { path: '/', element: <Dashboard/>, title:"Thống kê" },
  { path: '/login', element: <Login/>, title:"Đăng nhập" },
  {
    path: PATH_APP.rooms.root,
    element: <Rooms />,
    title:"Danh sách phòng"
  },
  {
    path: PATH_APP.rooms.create,
    element: <CreateRoom/>,
    title:"Tạo phòng"
  },
  {
    path:`${PATH_APP.rooms.update}/:id`,
    element: <UpdateRoom/>,
    title:"Cập nhật phòng"
  },
  {
    path: PATH_APP.rooms.charge,
    element: <Charge/>,
    title:"Tính tiền phòng"
  },
  {
    path: PATH_APP.brem.create,
    element: <CreateBrem/>,
    title:"Tạo brem phòng"
  },
  {
    path: PATH_APP.user.root,
    element: <User/>,
    title:"Quản lí sinh viên"
  },
  {
    path: PATH_APP.user.hobby,
    element: <Hobby/>,
    title:"Quản lí sở thích"
  },
  {
    path: PATH_APP.account.root,
    element: <Account/>,
    title:"Quản lí tài khoản"
  },
  {
    path: PATH_APP.groupRoom.root,
    element: <GroupRoom/>,
    title:"Quản lí Khu nhà"
  },
  {
    path: PATH_APP.user.register,
    element: <RegisterPage/>,
    title:"Đăng ký tài khoản cho sinh viên"
  },
  {
    path: PATH_APP.user.findRoom,
    element: <FindRoom/>,
    title:"Tìm phòng cho sinh viên"
  },
]
export { adminRoutes};
