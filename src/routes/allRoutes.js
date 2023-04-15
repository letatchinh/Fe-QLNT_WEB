import { PATH_APP } from './path';

// Dashboard
import Dashboard from '../pages/Dashboard/index';
import Rooms from '../pages/Rooms/index';
import CreateRoom from '../pages/CreateRoom/index';
import UpdateRoom from '../pages/UpdateRoom/index';
import Charge from '../pages/Charge/index';
import CreateBrem from '../pages/CreateBrem/index';
import User from '../pages/User/index';

const adminRoutes = [
  { path: '/', element: <Dashboard/>, title:"Thống kê" },
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
    title:"Quản lí người dùng"
  },
]
export { adminRoutes};
