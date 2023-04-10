import { PATH_APP } from './path';

// Dashboard
import Dashboard from '../pages/Dashboard/index';
import Rooms from '../pages/Rooms/index';
import CreateRoom from '../pages/CreateRoom/index';
import UpdateRoom from '../pages/UpdateRoom/index';
import Charge from '../pages/Charge/index';

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
    path: PATH_APP.rooms.update,
    element: <UpdateRoom/>,
    title:"Cập nhật phòng"
  },
  {
    path: PATH_APP.rooms.charge,
    element: <Charge/>,
    title:"Tính tiền phòng"
  },
]
export { adminRoutes};
