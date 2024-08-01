



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TaskList, TaskForm } from './TaskComponents'; // Импортируем новые компоненты

// // Компонент для отображения списка пользователей
// const UserList = ({ users, onSelect }) => (
//   <div style={{ flex: 1, overflowY: 'scroll', maxHeight: '90vh', padding: '10px', borderRight: '1px solid #ccc' }}>
//     <h2>Список пользователей</h2>
//     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//       <thead>
//         <tr>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>ID</th>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Никнейм</th>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Количество монет</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map(user => (
//           <tr key={user.id} onClick={() => onSelect(user.id)} style={{ cursor: 'pointer' }}>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{user.id}</td>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{user.username}</td>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{user.coins}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// // Компонент для отображения деталей пользователя
// const UserDetails = ({ user, boosters, coins, referrals, referralEarnings }) => (
//   <div style={{ flex: 2, padding: '10px' }}>
//     <h2>Детали пользователя</h2>
//     {user ? (
//       <div>
//         <p><strong>ID:</strong> {user.id}</p>
//         <p><strong>Имя:</strong> {user.username}</p>
//         <p><strong>Реферальный код:</strong> {user.referralCode}</p>
//         <p><strong>Этапы роста травы:</strong> {user.grassGrowthStages?.join(', ') || 'Нет данных'}</p>
//         <p><strong>Монеты:</strong> {coins.length > 0 ? (
//           coins.map(coin => (
//             <div key={coin.id}>
//               <p>Name: {coin.name}, Cost: {coin.cost}, Hourly Income: {coin.hourlyIncome}</p>
//             </div>
//           ))
//         ) : 'Нет данных'}</p>
//         <p><strong>Бустеры:</strong> {boosters.length > 0 ? (
//           boosters.map(booster => (
//             <div key={booster.id}>
//               <p>Name: {booster.name}, Cost: {booster.cost}, Yield Increase: {booster.yieldIncrease}, League: {booster.league}</p>
//             </div>
//           ))
//         ) : 'Нет данных'}</p>
//         <p><strong>Реферальная ссылка:</strong> {user.referralLink || 'Нет данных'}</p>
//         <p><strong>Рефералы:</strong> {referrals.length > 0 ? referrals.map(referral => referral.username).join(', ') : 'Нет данных'}</p>
//         <p><strong>Заработок от рефералов:</strong> {referralEarnings || 0}</p>
//       </div>
//     ) : (
//       <p>Выберите пользователя для отображения деталей.</p>
//     )}
//   </div>
// );

// // Компонент для формы пользователя (создание/обновление)
// const UserForm = ({ onSubmit, user }) => {
//   const [name, setName] = useState(user?.username || '');
//   const [referralCode, setReferralCode] = useState(user?.referralCode || '');
//   const [grassGrowthStages, setGrassGrowthStages] = useState(user?.grassGrowthStages || []);

//   useEffect(() => {
//     setName(user?.username || '');
//     setReferralCode(user?.referralCode || '');
//     setGrassGrowthStages(user?.grassGrowthStages || []);
//   }, [user]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ ...user, username: name, referralCode, grassGrowthStages });
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
//       <div style={{ marginBottom: '10px' }}>
//         <label>Имя</label>
//         <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ marginLeft: '10px', padding: '5px' }} />
//       </div>
//       <div style={{ marginBottom: '10px' }}>
//         <label>Реферальный код</label>
//         <input type="text" value={referralCode} onChange={e => setReferralCode(e.target.value)} style={{ marginLeft: '10px', padding: '5px' }} />
//       </div>
//       <div style={{ marginBottom: '10px' }}>
//         <label>Этапы роста травы</label>
//         <input type="text" value={grassGrowthStages.join(', ')} onChange={e => setGrassGrowthStages(e.target.value.split(', '))} style={{ marginLeft: '10px', padding: '5px' }} />
//       </div>
//       <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Сохранить</button>
//     </form>
//   );
// };

// // Основной компонент админской страницы
// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(undefined);
//   const [boosters, setBoosters] = useState([]);
//   const [coins, setCoins] = useState([]);
//   const [referrals, setReferrals] = useState([]);
//   const [referralEarnings, setReferralEarnings] = useState(0);
//   const [coinAmount, setCoinAmount] = useState(0);
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(undefined);
//   // State variables for statistics
//   const [totalPlayers, setTotalPlayers] = useState(0);
//   const [onlineUsersCount, setOnlineUsersCount] = useState(0);
//   const [recentlyOnlineUsersCount, setRecentlyOnlineUsersCount] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
// // src/AdminPage.jsx

// useEffect(() => {
//   // Получение списка пользователей
//   axios.get('https://coinfarm.club/api/user')
//     .then(response => {
//       setUsers(response.data);
//       setFilteredUsers(response.data);
//     })
//     .catch(error => console.error('Ошибка при загрузке пользователей', error));
    
//   // Получение списка задач
//   axios.get('https://coinfarm.club/api/reward/')
//     .then(response => setTasks(response.data))
//     .catch(error => console.error('Ошибка при загрузке задач', error));
// }, []);

//   useEffect(() => {
//     const fetchTotalPlayers = async () => {
//       try {
//         const response = await axios.get('https://coinfarm.club/api/user');
//         const data = response.data;
//         setTotalPlayers(data.length);
//         const onlineCount = data.filter(user => user.isOnline).length;
//         setOnlineUsersCount(onlineCount);
//         const now = new Date();
//         const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
//         const recentlyOnlineCount = data.filter(user => {
//           const lastOnlineDate = new Date(user.lastOnline);
//           return lastOnlineDate > twentyFourHoursAgo;
//         }).length;
//         setRecentlyOnlineUsersCount(recentlyOnlineCount);
//         setUsers(data);
//         setFilteredUsers(data);
//       } catch (error) {
//         console.error('Error fetching total players:', error);
//       }
//     };

//     fetchTotalPlayers();
//   }, []);

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     if (term === '') {
//       setFilteredUsers(users);
//     } else {
//       setFilteredUsers(users.filter(user => user.username.toLowerCase().includes(term)));
//     }
//   };

//   useEffect(() => {
//     // Получение списка пользователей
//     axios.get('https://coinfarm.club/api/user')
//       .then(response => setUsers(response.data))
//       .catch(error => console.error('Ошибка при загрузке пользователей', error));
//   }, []);

//   const handleSelectUser = (id) => {
//     axios.get(`https://coinfarm.club/api/user/${id}`)
//       .then(response => {
//         setSelectedUser(response.data);
//         // Дополнительно загружаем данные пользователя
//         handleGetUserBoosters(id);
//         handleGetUserCoins(id);
//         handleGetUserReferrals(id);
//         handleGetUserReferralEarnings(id);
//       })
//       .catch(error => console.error('Ошибка при загрузке пользователя', error));
//   };
//   const handleCreateTask = (task) => {
//     axios.post('https://coinfarm.club/api/reward/task', task)
//       .then(response => {
//         setTasks(prevTasks => [...prevTasks, response.data]);
//       })
//       .catch(error => console.error('Ошибка при создании задачи', error));
//   };

//   const handleDeleteTask = (id) => {
//     axios.delete(`https://coinfarm.club/api/reward/task/${id}`)
//       .then(() => setTasks(prevTasks => prevTasks.filter(task => task.id !== id)))
//       .catch(error => console.error('Ошибка при удалении задачи', error));
//   };


//   const handleCreateOrUpdateUser = (user) => {
//     const request = user.id ? axios.put(`https://coinfarm.club/api/user/${user.id}`, user) : axios.post('https://coinfarm.club/api/user', user);
//     request
//       .then(response => {
//         setUsers(prevUsers => user.id 
//           ? prevUsers.map(u => u.id === user.id ? response.data : u)
//           : [...prevUsers, response.data]);
//         setSelectedUser(response.data);
//       })
//       .catch(error => console.error('Ошибка при сохранении пользователя', error));
//   };

//   const handleDeleteUser = (id) => {
//     axios.delete(`https://coinfarm.club/api/user/${id}`)
//       .then(() => setUsers(prevUsers => prevUsers.filter(user => user.id !== id)))
//       .catch(error => console.error('Ошибка при удалении пользователя', error));
//   };

//   const handleUpdateGrassStages = (id, stages) => {
//     axios.patch(`https://coinfarm.club/api/user/${id}/grass-stages`, { stages })
//       .then(response => {
//         setSelectedUser(response.data);
//         setUsers(prevUsers => prevUsers.map(u => u.id === id ? response.data : u));
//       })
//       .catch(error => console.error('Ошибка при обновлении этапов роста травы', error));
//   };

//   const handleEarnCoins = (id, amount) => {
//     axios.patch(`https://coinfarm.club/api/user/${id}/earn/${amount}`)
//       .then(response => {
//         setSelectedUser(response.data);
//         setUsers(prevUsers => prevUsers.map(u => u.id === id ? response.data : u));
//       })
//       .catch(error => console.error('Ошибка при добавлении монет', error));
//   };

//   const handleAddXP = (id, amount) => {
//     axios.patch(`https://coinfarm.club/api/user/${id}/xp/${amount}`)
//       .then(response => {
//         setSelectedUser(response.data);
//         setUsers(prevUsers => prevUsers.map(u => u.id === id ? response.data : u));
//       })
//       .catch(error => console.error('Ошибка при добавлении XP', error));
//   };

//   const handleSetUserOnline = (userId) => {
//     axios.post('https://coinfarm.club/api/user/online', { userId })
//       .then(response => console.log('Пользователь онлайн', response))
//       .catch(error => console.error('Ошибка при установке пользователя онлайн', error));
//   };

//   const handleGetOnlineUsersCount = () => {
//     axios.get('https://coinfarm.club/api/user/online-count')
//       .then(response => console.log('Количество онлайн пользователей', response.data))
//       .catch(error => console.error('Ошибка при получении количества онлайн пользователей', error));
//   };

//   const handleGetUserBoosters = (id) => {
//     axios.get(`https://coinfarm.club/api/user/${id}/boosters`)
//       .then(response => setBoosters(response.data))
//       .catch(error => console.error('Ошибка при получении бустеров пользователя', error));
//   };

//   const handleGetUserCoins = (id) => {
//     axios.get(`https://coinfarm.club/api/user/${id}/coins`)
//       .then(response => setCoins(response.data))
//       .catch(error => console.error('Ошибка при получении монет пользователя', error));
//   };

//   const handleGetUserReferrals = (id) => {
//     axios.get(`https://coinfarm.club/api/user/${id}/referrals`)
//       .then(response => setReferrals(response.data))
//       .catch(error => console.error('Ошибка при получении рефералов пользователя', error));
//   };

//   const handleGetUserReferralEarnings = (id) => {
//     axios.get(`https://coinfarm.club/api/user/${id}/referrals/earnings`)
//       .then(response => setReferralEarnings(response.data))
//       .catch(error => console.error('Ошибка при получении заработка от рефералов', error));
//   };

//   const handleCoinAmountChange = (e) => {
//     setCoinAmount(e.target.value);
//   };

//   const handleEarnCoinsSubmit = () => {
//     handleEarnCoins(selectedUser.id, coinAmount);
//   };

//   return (
//     <div style={{ display: "flex", height: '100vh' }}>
//        <div style={{ 
//         display: 'flex',
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         position: 'absolute', 
//         top: '0', 
//         left: '50%', 
//         transform: 'translateX(-50%)', 
//         width: '200px', 
//         height: '20px', 
//         borderRadius: '8px', 
//         textAlign: 'center'}}>
          
//           <p>Online: {onlineUsersCount}</p>
//           <p>Daily: {recentlyOnlineUsersCount}</p>
//           <p>Total{totalPlayers}</p>
//         </div>
//         <div style={{position: 'absolute', 
//         top: '0', 
//         left: '80%', }} >
//           <input 
//             type="text" 
//             value={searchTerm} 
//             onChange={handleSearch} 
//             placeholder="Поиск по нику..." 
//             style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
//           />
//         </div>
//       <UserList users={users} onSelect={handleSelectUser} />
//       <div style={{ flex: 2, padding: '10px', overflowY: 'scroll', maxHeight: '90vh' }}>
//         <UserDetails 
//           user={selectedUser} 
//           boosters={boosters} 
//           coins={coins} 
//           referrals={referrals} 
//           referralEarnings={referralEarnings} 
//         />
//         <UserForm onSubmit={handleCreateOrUpdateUser} user={selectedUser} />
//         {selectedUser && (
//           <div style={{ marginTop: '20px' }}>
//             <button onClick={() => handleDeleteUser(selectedUser.id)} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Удалить пользователя</button>
//             <button onClick={() => handleUpdateGrassStages(selectedUser.id, [1, 2, 3])} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Обновить этапы роста травы</button>
//             <div style={{ marginTop: '10px' }}>
//               <input 
//                 type="number" 
//                 value={coinAmount} 
//                 onChange={handleCoinAmountChange} 
//                 placeholder="Введите количество монет" 
//                 style={{ padding: '5px', marginRight: '10px' }} 
//               />
//               <button onClick={handleEarnCoinsSubmit} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Добавить монеты</button>
//             </div>
//             <button onClick={() => handleAddXP(selectedUser.id, 50)} style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Добавить 50 XP</button>
//             <button onClick={() => handleSetUserOnline(selectedUser.id)} style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Установить онлайн</button>
//             <button onClick={handleGetOnlineUsersCount} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Получить количество онлайн пользователей</button>
//           </div>
//         )}
//         <TaskList tasks={tasks} onDelete={handleDeleteTask} /> {/* Изменено */}
//         <TaskForm onSubmit={handleCreateTask} task={selectedTask} />
//       </div>
//     </div>
//   );
// };

// export default AdminPage;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskList, TaskForm } from './TaskComponents'; // Импортируем новые компоненты

// Компонент для отображения списка пользователей
const UserList = ({ users, onSelect }) => (
  <div style={{ flex: 1, overflowY: 'scroll', maxHeight: '90vh', padding: '10px', borderRight: '1px solid #ccc' }}>
    <h2>Список пользователей</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>ID</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Никнейм</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Количество монет</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} onClick={() => onSelect(user.id)} style={{ cursor: 'pointer' }}>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{user.id}</td>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{user.username}</td>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{user.coins}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Компонент для отображения деталей пользователя
const UserDetails = ({ user, boosters, coins, referrals, referralEarnings }) => (
  <div style={{ flex: 2, padding: '10px' }}>
    <h2>Детали пользователя</h2>
    {user ? (
      <div>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Имя:</strong> {user.username}</p>
        <p><strong>Реферальный код:</strong> {user.referralCode}</p>
        <p><strong>Этапы роста травы:</strong> {user.grassGrowthStages?.join(', ') || 'Нет данных'}</p>
        <p><strong>Монеты:</strong> {coins.length > 0 ? (
          coins.map(coin => (
            <div key={coin.id}>
              <p>Name: {coin.name}, Cost: {coin.cost}, Hourly Income: {coin.hourlyIncome}</p>
            </div>
          ))
        ) : 'Нет данных'}</p>
        <p><strong>Бустеры:</strong> {boosters.length > 0 ? (
          boosters.map(booster => (
            <div key={booster.id}>
              <p>Name: {booster.name}, Cost: {booster.cost}, Yield Increase: {booster.yieldIncrease}, League: {booster.league}</p>
            </div>
          ))
        ) : 'Нет данных'}</p>
        <p><strong>Реферальная ссылка:</strong> {user.referralLink || 'Нет данных'}</p>
        <p><strong>Рефералы:</strong> {referrals.length > 0 ? referrals.map(referral => referral.username).join(', ') : 'Нет данных'}</p>
        <p><strong>Заработок от рефералов:</strong> {referralEarnings || 0}</p>
      </div>
    ) : (
      <p>Выберите пользователя для отображения деталей.</p>
    )}
  </div>
);

// Компонент для формы пользователя (создание/обновление)
const UserForm = ({ onSubmit, user }) => {
  const [name, setName] = useState(user?.username || '');
  const [referralCode, setReferralCode] = useState(user?.referralCode || '');
  const [grassGrowthStages, setGrassGrowthStages] = useState(user?.grassGrowthStages || []);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setName(user?.username || '');
    setReferralCode(user?.referralCode || '');
    setGrassGrowthStages(user?.grassGrowthStages || []);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      await onSubmit({ ...user, username: name, referralCode, grassGrowthStages });
    } catch (error) {
      console.error('Error submitting user data', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Имя</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ marginLeft: '10px', padding: '5px' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Реферальный код</label>
        <input type="text" value={referralCode} onChange={e => setReferralCode(e.target.value)} style={{ marginLeft: '10px', padding: '5px' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Этапы роста травы</label>
        <input type="text" value={grassGrowthStages.join(', ')} onChange={e => setGrassGrowthStages(e.target.value.split(', '))} style={{ marginLeft: '10px', padding: '5px' }} />
      </div>
<button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
      {isLoading ? 'Сохранение...' : 'Сохранить'}
    </button>
        </form>
  );
};

// Основной компонент админской страницы
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [boosters, setBoosters] = useState([]);
  const [coins, setCoins] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [coinAmount, setCoinAmount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(undefined);
  // State variables for statistics
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [recentlyOnlineUsersCount, setRecentlyOnlineUsersCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
// src/AdminPage.jsx

useEffect(() => {
  // Получение списка пользователей
  axios.get('https://coinfarm.club/api/user')
    .then(response => {
      setUsers(response.data);
      setFilteredUsers(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке пользователей', error));
    
  // Получение списка задач
  axios.get('https://coinfarm.club/api/reward/')
    .then(response => setTasks(response.data))
    .catch(error => console.error('Ошибка при загрузке задач', error));
}, []);

  useEffect(() => {
    const fetchTotalPlayers = async () => {
      try {
        const response = await axios.get('https://coinfarm.club/api/user');
        const data = response.data;
        setTotalPlayers(data.length);
        const onlineCount = data.filter(user => user.isOnline).length;
        setOnlineUsersCount(onlineCount);
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const recentlyOnlineCount = data.filter(user => {
          const lastOnlineDate = new Date(user.lastOnline);
          return lastOnlineDate > twentyFourHoursAgo;
        }).length;
        setRecentlyOnlineUsersCount(recentlyOnlineCount);
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching total players:', error);
      }
    };

    fetchTotalPlayers();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.username.toLowerCase().includes(term)));
    }
  };

  useEffect(() => {
    // Получение списка пользователей
    axios.get('https://coinfarm.club/api/user')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Ошибка при загрузке пользователей', error));
  }, []);

  const handleSelectUser = (id) => {
    axios.get(`https://coinfarm.club/api/user/${id}`)
      .then(response => {
        setSelectedUser(response.data);
        // Дополнительно загружаем данные пользователя
        handleGetUserBoosters(id);
        handleGetUserCoins(id);
        handleGetUserReferrals(id);
        handleGetUserReferralEarnings(id);
      })
      .catch(error => console.error('Ошибка при загрузке пользователя', error));
  };
  const handleCreateTask = (task) => {
    axios.post('https://coinfarm.club/api/reward/task', task)
      .then(response => {
        setTasks(prevTasks => [...prevTasks, response.data]);
      })
      .catch(error => console.error('Ошибка при создании задачи', error));
  };

  const handleDeleteTask = (id) => {
    axios.delete(`https://coinfarm.club/api/reward/task/${id}`)
      .then(() => setTasks(prevTasks => prevTasks.filter(task => task.id !== id)))
      .catch(error => console.error('Ошибка при удалении задачи', error));
  };


  const handleCreateOrUpdateUser = (user) => {
    const request = user.id ? axios.put(`https://coinfarm.club/api/user/${user.id}`, user) : axios.post('https://coinfarm.club/api/user', user);
    request
      .then(response => {
        setUsers(prevUsers => user.id 
          ? prevUsers.map(u => u.id === user.id ? response.data : u)
          : [...prevUsers, response.data]);
        setSelectedUser(response.data);
      })
      .catch(error => console.error('Ошибка при сохранении пользователя', error));
  };

  const handleDeleteUser = (id) => {
    axios.delete(`https://coinfarm.club/api/user/${id}`)
      .then(() => setUsers(prevUsers => prevUsers.filter(user => user.id !== id)))
      .catch(error => console.error('Ошибка при удалении пользователя', error));
  };

  const handleUpdateGrassStages = (id, stages) => {
    axios.patch(`https://coinfarm.club/api/user/${id}/grass-stages`, { stages })
      .then(response => {
        setSelectedUser(response.data);
        setUsers(prevUsers => prevUsers.map(u => u.id === id ? response.data : u));
      })
      .catch(error => console.error('Ошибка при обновлении этапов роста травы', error));
  };

  const handleEarnCoins = (id, amount) => {
    axios.patch(`https://coinfarm.club/api/user/${id}/earn/${amount}`)
      .then(response => {
        setSelectedUser(response.data);
        setUsers(prevUsers => prevUsers.map(u => u.id === id ? response.data : u));
      })
      .catch(error => console.error('Ошибка при добавлении монет', error));
  };

  const handleAddXP = (id, amount) => {
    axios.patch(`https://coinfarm.club/api/user/${id}/xp/${amount}`)
      .then(response => {
        setSelectedUser(response.data);
        setUsers(prevUsers => prevUsers.map(u => u.id === id ? response.data : u));
      })
      .catch(error => console.error('Ошибка при добавлении XP', error));
  };

  const handleSetUserOnline = (userId) => {
    axios.post('https://coinfarm.club/api/user/online', { userId })
      .then(response => console.log('Пользователь онлайн', response))
      .catch(error => console.error('Ошибка при установке пользователя онлайн', error));
  };

  const handleGetOnlineUsersCount = () => {
    axios.get('https://coinfarm.club/api/user/online-count')
      .then(response => console.log('Количество онлайн пользователей', response.data))
      .catch(error => console.error('Ошибка при получении количества онлайн пользователей', error));
  };

  const handleGetUserBoosters = (id) => {
    axios.get(`https://coinfarm.club/api/user/${id}/boosters`)
      .then(response => setBoosters(response.data))
      .catch(error => console.error('Ошибка при получении бустеров пользователя', error));
  };

  const handleGetUserCoins = (id) => {
    axios.get(`https://coinfarm.club/api/user/${id}/coins`)
      .then(response => setCoins(response.data))
      .catch(error => console.error('Ошибка при получении монет пользователя', error));
  };

  const handleGetUserReferrals = (id) => {
    axios.get(`https://coinfarm.club/api/user/${id}/referrals`)
      .then(response => setReferrals(response.data))
      .catch(error => console.error('Ошибка при получении рефералов пользователя', error));
  };

  const handleGetUserReferralEarnings = (id) => {
    axios.get(`https://coinfarm.club/api/user/${id}/referrals/earnings`)
      .then(response => setReferralEarnings(response.data))
      .catch(error => console.error('Ошибка при получении заработка от рефералов', error));
  };

  const handleCoinAmountChange = (e) => {
    setCoinAmount(e.target.value);
  };

  const handleEarnCoinsSubmit = () => {
    handleEarnCoins(selectedUser.id, coinAmount);
  };

  return (
    <div style={{ display: "flex", height: '100vh' }}>
       <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute', 
        top: '0', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '200px', 
        height: '20px', 
        borderRadius: '8px', 
        textAlign: 'center'}}>
          
          <p>Online: {onlineUsersCount}</p>
          <p>Daily: {recentlyOnlineUsersCount}</p>
          <p>Total{totalPlayers}</p>
        </div>
        <div style={{position: 'absolute', 
        top: '0', 
        left: '80%', }} >
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleSearch} 
            placeholder="Поиск по нику..." 
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
          />
        </div>
      <UserList users={users} onSelect={handleSelectUser} />
      <div style={{ flex: 2, padding: '10px', overflowY: 'scroll', maxHeight: '90vh' }}>
        <UserDetails 
          user={selectedUser} 
          boosters={boosters} 
          coins={coins} 
          referrals={referrals} 
          referralEarnings={referralEarnings} 
        />
        <UserForm onSubmit={handleCreateOrUpdateUser} user={selectedUser} />
        {selectedUser && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => handleDeleteUser(selectedUser.id)} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Удалить пользователя</button>
            <button onClick={() => handleUpdateGrassStages(selectedUser.id, [1, 2, 3])} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Обновить этапы роста травы</button>
            <div style={{ marginTop: '10px' }}>
              <input 
                type="number" 
                value={coinAmount} 
                onChange={handleCoinAmountChange} 
                placeholder="Введите количество монет" 
                style={{ padding: '5px', marginRight: '10px' }} 
              />
              <button onClick={handleEarnCoinsSubmit} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Добавить монеты</button>
            </div>
            <button onClick={() => handleAddXP(selectedUser.id, 50)} style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Добавить 50 XP</button>
            <button onClick={() => handleSetUserOnline(selectedUser.id)} style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Установить онлайн</button>
            <button onClick={handleGetOnlineUsersCount} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Получить количество онлайн пользователей</button>
          </div>
        )}
        <TaskList tasks={tasks} onDelete={handleDeleteTask} /> {/* Изменено */}
        <TaskForm onSubmit={handleCreateTask} task={selectedTask} />
      </div>
    </div>
  );
};

export default AdminPage;
