
// import React, { useState, useEffect } from 'react';

// // Компонент для отображения списка задач
// const TaskList = ({ tasks, onDelete }) => (
//   <div>
//     <h2>Список задач</h2>
//     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//       <thead>
//         <tr>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>ID</th>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Описание</th>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Тип</th>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Награда</th>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Изображение</th>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Ссылка</th>
//           <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Действия</th>
//         </tr>
//       </thead>
//       <tbody>
//         {tasks.map(task => (
//           <tr key={task.id}>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.id}</td>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.description}</td>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.type}</td>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.rewardAmount}</td>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.imgSrc}</td>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.link}</td>
//             <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
//               <button onClick={() => onDelete(task.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>Удалить</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// // Компонент для формы задачи (создание/обновление)
// const TaskForm = ({ onSubmit, task }) => {
//   const [description, setDescription] = useState(task?.description || '');
//   const [type, setType] = useState(task?.type || '');
//   const [rewardAmount, setRewardAmount] = useState(task?.rewardAmount || 0);
//   const [imgSrc, setImgSrc] = useState(task?.imgSrc || '');
//   const [link, setLink] = useState(task?.link || '');

//   useEffect(() => {
//     setDescription(task?.description || '');
//     setType(task?.type || '');
//     setRewardAmount(task?.rewardAmount || 0);
//     setImgSrc(task?.imgSrc || '');
//     setLink(task?.link || '');
//   }, [task]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ description, type, rewardAmount, imgSrc, link });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Описание</label>
//         <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
//       </div>
//       <div>
//         <label>Тип</label>
//         <input type="text" value={type} onChange={e => setType(e.target.value)} required />
//       </div>
//       <div>
//         <label>Награда</label>
//         <input type="number" value={rewardAmount} onChange={e => setRewardAmount(e.target.value)} required />
//       </div>
//       <div>
//         <label>Изображение</label>
//         <input type="text" value={imgSrc} onChange={e => setImgSrc(e.target.value)} required />
//       </div>
//       <div>
//         <label>Ссылка</label>
//         <input type="text" value={link} onChange={e => setLink(e.target.value)} required />
//       </div>
//       <button type="submit">Сохранить</button>
//     </form>
//   );
// };

// export { TaskList, TaskForm };


import React, { useState, useEffect } from 'react';

// Компонент для отображения списка задач
const TaskList = ({ tasks, onDelete }) => (
  <div>
    <h2>Список задач</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>ID</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Описание</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Тип</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Награда</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Изображение</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Ссылка</th>
          <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Действия</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.id}</td>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.description}</td>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.type}</td>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.rewardAmount}</td>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.imgSrc}</td>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{task.link}</td>
            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
              <button onClick={() => onDelete(task.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Компонент для формы задачи (создание/обновление)
const TaskForm = ({ onSubmit, task }) => {
  const [description, setDescription] = useState(task?.description || '');
  const [type, setType] = useState(task?.type || '');
  const [rewardAmount, setRewardAmount] = useState(task?.rewardAmount || 0);
  const [imgSrc, setImgSrc] = useState(task?.imgSrc || '');
  const [link, setLink] = useState(task?.link || '');
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!description) newErrors.description = 'Описание обязательно';
    if (!type) newErrors.type = 'Тип обязателен';
    if (!rewardAmount) newErrors.rewardAmount = 'Награда обязательна';
    if (!imgSrc) newErrors.imgSrc = 'Изображение обязательно';
    if (!link) newErrors.link = 'Ссылка обязательна';
    return newErrors;
  };
  useEffect(() => {
    setDescription(task?.description || '');
    setType(task?.type || '');
    setRewardAmount(task?.rewardAmount || 0);
    setImgSrc(task?.imgSrc || '');
    setLink(task?.link || '');
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({ description, type, rewardAmount, imgSrc, link });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Описание</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}

      </div>
      <div>
        <label>Тип</label>
        <input type="text" value={type} onChange={e => setType(e.target.value)} required />
        {errors.type && <p style={{ color: 'red' }}>{errors.type}</p>}

      </div>
      <div>
        <label>Награда</label>
        <input type="number" value={rewardAmount} onChange={e => setRewardAmount(e.target.value)} required />
        {errors.rewardAmount && <p style={{ color: 'red' }}>{errors.rewardAmount}</p>}

      </div>
      <div>
        <label>Изображение</label>
        <input type="text" value={imgSrc} onChange={e => setImgSrc(e.target.value)} required />
        {errors.imgSrc && <p style={{ color: 'red' }}>{errors.imgSrc}</p>}

      </div>
      <div>
        <label>Ссылка</label>
        <input type="text" value={link} onChange={e => setLink(e.target.value)} required />
        {errors.link && <p style={{ color: 'red' }}>{errors.link}</p>}

      </div>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export { TaskList, TaskForm };
